<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';

interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  containerRef?: HTMLElement | null; // Nuevo prop
}

const props = withDefaults(defineProps<TargetCursorProps>(), {
  targetSelector: '.cursor-target',
  spinDuration: 2,
  hideDefaultCursor: true,
  containerRef: null
});

const cursorRef = useTemplateRef('cursorRef');
const cornersRef = ref<NodeListOf<HTMLDivElement> | null>(null);
const spinTl = ref<gsap.core.Timeline | null>(null);

const constants = {
  borderWidth: 3,
  cornerSize: 12,
  parallaxStrength: 0.00005
};

const moveCursor = (x: number, y: number) => {
  if (!cursorRef.value) return;

  gsap.to(cursorRef.value, {
    x,
    y,
    duration: 0.1,
    ease: 'power3.out'
  });
};

let cleanupAnimation: () => void = () => {};

const setupAnimation = () => {
  if (!cursorRef.value) return;

  // Capturamos el contenedor actual para esta instancia de la animación.
  // Esto evita problemas si props.containerRef cambia antes de que se ejecute el cleanup.
  const currentContainer = props.containerRef;
  const rootElement = currentContainer || window;
  const targetElement = currentContainer || document.body;

  const originalCursor = targetElement.style.cursor;
  
  // Solo ocultamos el cursor si NO hay containerRef o si estamos dentro del container
  // Si hay containerRef, manejaremos la visibilidad en el evento mouseenter/mouseleave del container
  if (!currentContainer && props.hideDefaultCursor) {
      document.body.style.cursor = 'none';
  }

  const cursor = cursorRef.value;
  cornersRef.value = cursor.querySelectorAll<HTMLDivElement>('.target-cursor-corner');

  let activeTarget: Element | null = null;
  let currentTargetMove: ((ev: Event) => void) | null = null;
  let currentLeaveHandler: (() => void) | null = null;
  let isAnimatingToTarget = false;
  let resumeTimeout: ReturnType<typeof setTimeout> | null = null;

  const cleanupTarget = (target: Element) => {
    if (currentTargetMove) {
      target.removeEventListener('mousemove', currentTargetMove);
    }
    if (currentLeaveHandler) {
      target.removeEventListener('mouseleave', currentLeaveHandler);
    }
    currentTargetMove = null;
    currentLeaveHandler = null;
  };

  gsap.set(cursor, {
    xPercent: -50,
    yPercent: -50,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    opacity: currentContainer ? 0 : 1, // Si hay container, empieza invisible
    display: currentContainer ? 'none' : 'block'
  });

  const createSpinTimeline = () => {
    if (spinTl.value) {
      spinTl.value.kill();
    }
    spinTl.value = gsap.timeline({ repeat: -1 }).to(cursor, {
      rotation: '+=360',
      duration: props.spinDuration,
      ease: 'none'
    });
  };

  createSpinTimeline();

  // Event handler para mover el cursor
  const moveHandler = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      moveCursor(mouseEvent.clientX, mouseEvent.clientY);
  };
  
  // Añadimos el listener al rootElement (window o container)
  rootElement.addEventListener('mousemove', moveHandler as EventListener);


  // Manejo de entrada/salida del contenedor si existe
  const containerEnter = () => {
      if (props.hideDefaultCursor && currentContainer) {
          currentContainer.style.cursor = 'none';
      }
      if (cursorRef.value) {
          gsap.to(cursorRef.value, { opacity: 1, display: 'block', duration: 0.2 });
      }
  };

  const containerLeave = () => {
      if (props.hideDefaultCursor && currentContainer) {
          currentContainer.style.cursor = 'auto'; // O el que fuera
      }
      if (cursorRef.value) {
           gsap.to(cursorRef.value, { opacity: 0, display: 'none', duration: 0.2 });
      }
  };

  if (currentContainer) {
      currentContainer.addEventListener('mouseenter', containerEnter);
      currentContainer.addEventListener('mouseleave', containerLeave);
  }


  const enterHandler = (e: MouseEvent) => {
    // Si estamos restringidos a un contenedor, ignoramos eventos fuera de él (aunque mouseover burbujea)
    if (currentContainer && !currentContainer.contains(e.target as Node)) return;

    const directTarget = e.target as Element;

    const allTargets: Element[] = [];
    let current = directTarget;
    // Buscamos hacia arriba hasta encontrar el body O el containerRef
    const limit = currentContainer || document.body;
    
    while (current && current !== limit && current !== document.body) {
      if (current.matches(props.targetSelector)) {
        allTargets.push(current);
      }
      current = current.parentElement!;
    }
    // Check el limit también si es match
    if (current && current === limit && current.matches && current.matches(props.targetSelector)) {
        allTargets.push(current);
    }


    const target = allTargets[0] || null;
    if (!target || !cursorRef.value || !cornersRef.value) return;

    if (activeTarget === target) return;

    if (activeTarget) {
      cleanupTarget(activeTarget);
    }

    if (resumeTimeout) {
      clearTimeout(resumeTimeout);
      resumeTimeout = null;
    }

    activeTarget = target;
    const corners = Array.from(cornersRef.value);
    corners.forEach(corner => {
      gsap.killTweensOf(corner);
    });
    gsap.killTweensOf(cursorRef.value, 'rotation');
    spinTl.value?.pause();

    gsap.set(cursorRef.value, { rotation: 0 });

    const updateCorners = (mouseX?: number, mouseY?: number) => {
      const rect = target.getBoundingClientRect();
      const cursorRect = cursorRef.value!.getBoundingClientRect();

      const cursorCenterX = cursorRect.left + cursorRect.width / 2;
      const cursorCenterY = cursorRect.top + cursorRect.height / 2;

      const [tlc, trc, brc, blc] = Array.from(cornersRef.value!);

      const { borderWidth, cornerSize, parallaxStrength } = constants;

      const tlOffset = {
        x: rect.left - cursorCenterX - borderWidth,
        y: rect.top - cursorCenterY - borderWidth
      };
      const trOffset = {
        x: rect.right - cursorCenterX + borderWidth - cornerSize,
        y: rect.top - cursorCenterY - borderWidth
      };
      const brOffset = {
        x: rect.right - cursorCenterX + borderWidth - cornerSize,
        y: rect.bottom - cursorCenterY + borderWidth - cornerSize
      };
      const blOffset = {
        x: rect.left - cursorCenterX - borderWidth,
        y: rect.bottom - cursorCenterY + borderWidth - cornerSize
      };

      if (mouseX !== undefined && mouseY !== undefined) {
        const targetCenterX = rect.left + rect.width / 2;
        const targetCenterY = rect.top + rect.height / 2;
        const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;
        const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;

        tlOffset.x += mouseOffsetX;
        tlOffset.y += mouseOffsetY;
        trOffset.x += mouseOffsetX;
        trOffset.y += mouseOffsetY;
        brOffset.x += mouseOffsetX;
        brOffset.y += mouseOffsetY;
        blOffset.x += mouseOffsetX;
        blOffset.y += mouseOffsetY;
      }

      const tl = gsap.timeline();
      const corners = [tlc, trc, brc, blc];
      const offsets = [tlOffset, trOffset, brOffset, blOffset];

      corners.forEach((corner, index) => {
        const offset = offsets[index];
        if (!offset) return;
        tl.to(
          corner as HTMLElement,
          {
            x: offset.x,
            y: offset.y,
            duration: 0.2,
            ease: 'power2.out'
          },
          0
        );
      });
    };

    isAnimatingToTarget = true;
    updateCorners();

    setTimeout(() => {
      isAnimatingToTarget = false;
    }, 1);

    let moveThrottle: number | null = null;
    const targetMove = (ev: Event) => {
      if (moveThrottle || isAnimatingToTarget) return;
      moveThrottle = requestAnimationFrame(() => {
        const mouseEvent = ev as MouseEvent;
        updateCorners(mouseEvent.clientX, mouseEvent.clientY);
        moveThrottle = null;
      });
    };

    const leaveHandler = () => {
      activeTarget = null;
      isAnimatingToTarget = false;

      if (cornersRef.value) {
        const corners = Array.from(cornersRef.value);
        gsap.killTweensOf(corners);

        const { cornerSize } = constants;
        const positions = [
          { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: cornerSize * 0.5 },
          { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
        ];

        const tl = gsap.timeline();
        corners.forEach((corner, index) => {
          const pos = positions[index];
          if (!pos) return;
          tl.to(
            corner as HTMLElement,
            {
              x: pos.x,
              y: pos.y,
              duration: 0.3,
              ease: 'power3.out'
            },
            0
          );
        });
      }

      resumeTimeout = setTimeout(() => {
        if (!activeTarget && cursorRef.value && spinTl.value) {
          const currentRotation = gsap.getProperty(cursorRef.value, 'rotation') as number;
          const normalizedRotation = currentRotation % 360;

          spinTl.value.kill();
          spinTl.value = gsap.timeline({ repeat: -1 }).to(cursorRef.value, {
            rotation: '+=360',
            duration: props.spinDuration,
            ease: 'none'
          });

          gsap.to(cursorRef.value, {
            rotation: normalizedRotation + 360,
            duration: props.spinDuration * (1 - normalizedRotation / 360),
            ease: 'none',
            onComplete: () => {
              spinTl.value?.restart();
            }
          });
        }
        resumeTimeout = null;
      }, 50);

      cleanupTarget(target);
    };

    currentTargetMove = targetMove;
    currentLeaveHandler = leaveHandler;

    target.addEventListener('mousemove', targetMove);
    target.addEventListener('mouseleave', leaveHandler);
  };

  // Usamos el rootElement para el listener de mouseover también si es posible, 
  // pero mouseover funciona mejor en window para delegación global, 
  // si usamos containerRef, podemos ponerlo ahí también.
  rootElement.addEventListener('mouseover', enterHandler as EventListener, { passive: true });

  cleanupAnimation = () => {
    rootElement.removeEventListener('mousemove', moveHandler as EventListener);
    rootElement.removeEventListener('mouseover', enterHandler as EventListener);
    
    if (currentContainer) {
        currentContainer.removeEventListener('mouseenter', containerEnter);
        currentContainer.removeEventListener('mouseleave', containerLeave);
    }

    if (activeTarget) {
      cleanupTarget(activeTarget);
    }

    if (resumeTimeout) {
      clearTimeout(resumeTimeout);
      resumeTimeout = null;
    }

    spinTl.value?.kill();
    spinTl.value = null;

    if (cursorRef.value) {
      gsap.killTweensOf(cursorRef.value);
    }
    if (cornersRef.value) {
      gsap.killTweensOf(Array.from(cornersRef.value));
    }

    if (cursorRef.value) {
      gsap.set(cursorRef.value, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 0,
        display: 'none'
      });
    }

    // Usamos currentContainer para decidir qué cursor restaurar, no props.containerRef
    if (!currentContainer && props.hideDefaultCursor) {
        document.body.style.cursor = originalCursor;
    } else if (currentContainer && props.hideDefaultCursor) {
        currentContainer.style.cursor = originalCursor;
    }
    
    activeTarget = null;
  };
};

onMounted(() => {
  setupAnimation();
});

onBeforeUnmount(() => {
  cleanupAnimation();
});

watch(
  () => [props.targetSelector, props.spinDuration, props.hideDefaultCursor, props.containerRef],
  () => {
    cleanupAnimation();
    setupAnimation();
  }
);

watch(
  () => props.spinDuration,
  () => {
    if (!cursorRef.value || !spinTl.value) return;

    if (spinTl.value.isActive()) {
      spinTl.value.kill();
      spinTl.value = gsap.timeline({ repeat: -1 }).to(cursorRef.value, {
        rotation: '+=360',
        duration: props.spinDuration,
        ease: 'none'
      });
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    ref="cursorRef"
    class="top-0 left-0 z-[9999] fixed w-0 h-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-difference transform opacity-0"
    :style="{ willChange: 'transform' }"
  >
    <div
      class="top-1/2 left-1/2 absolute bg-white rounded-full w-1 h-1 -translate-x-1/2 -translate-y-1/2 transform"
      :style="{ willChange: 'transform' }"
    />
    <div
      class="top-1/2 left-1/2 absolute border-[3px] border-white border-r-0 border-b-0 w-3 h-3 -translate-x-[150%] -translate-y-[150%] target-cursor-corner transform"
      :style="{ willChange: 'transform' }"
    />
    <div
      class="top-1/2 left-1/2 absolute border-[3px] border-white border-b-0 border-l-0 w-3 h-3 -translate-y-[150%] translate-x-1/2 target-cursor-corner transform"
      :style="{ willChange: 'transform' }"
    />
    <div
      class="top-1/2 left-1/2 absolute border-[3px] border-white border-t-0 border-l-0 w-3 h-3 translate-x-1/2 translate-y-1/2 target-cursor-corner transform"
      :style="{ willChange: 'transform' }"
    />
    <div
      class="top-1/2 left-1/2 absolute border-[3px] border-white border-t-0 border-r-0 w-3 h-3 -translate-x-[150%] translate-y-1/2 target-cursor-corner transform"
      :style="{ willChange: 'transform' }"
    />
  </div>
</template>
