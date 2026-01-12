<script setup lang="ts">
/**
 * Importaciones necesarias de Vue y componentes.
 */
import { useTemplateRef, computed, ref, onMounted, onBeforeUnmount } from "vue";
import FaultyTerminal from "./components/FaultyTerminal.vue";
import ProfileCard from "./components/ProfileCard.vue";
import TargetCursor from "./components/TargetCursor.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import { Instagram, Github, Linkedin, MessageCircle } from "lucide-vue-next";

const handleContactClick = () => {
  console.log("Contact button clicked!");
};

const isMobile = ref(false);
const aspectRatio = ref(1);

const checkMobile = () => {
  isMobile.value = window.matchMedia('(max-width: 768px)').matches;
  aspectRatio.value = window.innerWidth / window.innerHeight;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
});

const terminalProps = computed(() => {
  if (isMobile.value) {
    // Calculate grid multipliers for square cells on mobile
    // We want gridMul.x / gridMul.y ~= aspect
    // Keeping Y=1, X should be aspect ratio.
    const densityY = 1.0;
    const densityX = densityY * aspectRatio.value;
    
    return {
      scale: 0.5, // Reduced scale for larger elements (zoomed in)
      gridMul: [densityX, densityY] as [number, number],
      digitSize: 1.2,
      timeScale: 1.5,
      pause: false,
      scanlineIntensity: 0.1,
      glitchAmount: 0,
      flickerAmount: 1,
      noiseAmp: 1,
      chromaticAberration: 0,
      dither: 0,
      curvature: 0,
      tint: "#619b59",
      mouseReact: true,
      mouseStrength: 0.2,
      pageLoadAnimation: false,
      brightness: 0.4
    };
  }
  return {
    scale: 1.8,
    gridMul: [2, 1] as [number, number],
    digitSize: 1.2,
    timeScale: 1.5,
    pause: false,
    scanlineIntensity: 0.6,
    glitchAmount: 1,
    flickerAmount: 1,
    noiseAmp: 1,
    chromaticAberration: 0.3,
    dither: 0,
    curvature: 0,
    tint: "#619b59",
    mouseReact: true,
    mouseStrength: 0.3,
    pageLoadAnimation: false,
    brightness: 0.5
  };
});

// Referencia para el contenedor de la sección de contenido
const contentRef = useTemplateRef<HTMLDivElement>("contentRef");
const contentElement = computed(() => contentRef.value);
</script>

<template>
  <!-- 
    Sección Hero (Entrada)
    Ocupa toda la altura de la pantalla (h-screen).
    Contiene la terminal de fondo y la tarjeta de presentación.
  -->
  <div
    class="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black px-4"
  >
    <!-- 
      Fondo: Terminal
      Posicionado absolutamente para cubrir todo el contenedor padre.
      z-0 asegura que quede detrás del contenido.
    -->
    <div class="absolute inset-0 z-0">
      <FaultyTerminal v-bind="terminalProps" />
    </div>

    <!-- 
      Tarjeta de Contenido Principal
      Centrada en la pantalla.
      Usa clases de Tailwind para estilos responsive y visuales:
      - w-full max-w-2xl: Ancho completo pero limitado a 2xl en pantallas grandes.
      - mx-4: Margen horizontal para no pegar a los bordes en móviles.
      - bg-black/40 backdrop-blur-sm: Efecto de cristal oscuro.
      - border-brand/30: Borde con el color de marca (definido en CSS) semitransparente.
    -->
    <div
      class="z-10 flex w-full max-w-8xl flex-col items-center justify-center p-8 text-white"
    >
      <!-- Título principal -->
      <h1
        class="mb-4 text-center text-5xl font-bold tracking-wider uppercase md:text-8xl sm:text-6xl"
      >
        Junk Dog
      </h1>

      <!-- Descripción -->
      <p class="text-center text-gray-200 opacity-90 text-2xl md:text-3xl">
        Bienvenido a mi espacio digital. Aquí encontrarás mis proyectos,
        experimentos y más.
      </p>
    </div>
  </div>

  <!-- 
    Sección de Contenido (Scroll)
    Aparece debajo del Hero.
    min-h-screen asegura que al menos ocupe una pantalla de alto.
    overflow-x-hidden: Previene scroll horizontal accidental.
  -->
  <div
    ref="contentRef"
    class="relative min-h-screen w-full  bg-neutral-900 p-8 text-brand flex"
  >
    <!-- 
      Componente TargetCursor
      Maneja el cursor personalizado que reacciona a elementos con la clase 'cursor-target'.
      hide-default-cursor: Oculta el cursor nativo del navegador.
      container-ref: Limita el cursor a este contenedor.
      v-if="contentElement": Asegura que el componente solo se monte cuando el contenedor exista,
                             evitando que tome el body por defecto y oculte el cursor globalmente.
    -->
    <TargetCursor
      v-if="contentElement"
      :spin-duration="2"
      :hide-default-cursor="true"
      :container-ref="contentElement"
    />

    <!-- 
      Contenedor Principal del Layout
      - max-w-full: Ocupa más espacio como se solicitó.
      - mx-auto: Centra el contenedor horizontalmente.
      - flex flex-col lg:flex-row: Diseño en columna para móvil, fila para escritorio (lg).
      - items-center: Centra verticalmente los elementos.
      - gap-12: Espaciado entre la tarjeta y el texto.
    -->
    <div
      class="mx-auto flex max-w-[90rem] flex-col items-center justify-center gap-12 py-12 px-6 lg:flex-row lg:justify-between lg:py-24"
    >
      <!-- 
        Columna Izquierda: ProfileCard
        - w-full lg:w-auto: Ancho completo en móvil, auto en escritorio.
        - flex justify-center: Centra la tarjeta.
      -->
      <div class="flex w-full justify-center">
        <ProfileCard
          name="Cristian Amezquita"
          title="Ingeniero de Sistemas"
          handle="dev.junkdog"
          status="Online"
          contact-text="Contáctame"
          avatar-url="/profile.png"
          icon-url="/linux-tux.svg"
          :show-user-info="true"
          :show-behind-gradient="false"
          :enable-tilt="true"
          @contact-click="handleContactClick"
        />
      </div>

      <!-- 
        Columna Derecha: Contenido de Texto
        - w-full lg:w-1/2: Ancho completo en móvil, mitad en escritorio.
        - flex flex-col gap-6: Organiza el texto en columna con separación.
        - text-center lg:text-left: Texto centrado en móvil, alineado a la izquierda en escritorio.
      -->
      <div class="flex w-full flex-col gap-6 text-center lg:text-left">
        <!-- 
          Título
          - cursor-target: Clase para activar el efecto del TargetCursor.
          - text-4xl lg:text-6xl: Tipografía grande y responsiva.
          - w-fit: Asegura que el ancho sea el del contenido, no el 100%.
          - inline-block: Comportamiento de caja ajustada al texto.
        -->
        <div>
          <h2
            class="cursor-target inline-block text-3xl font-bold uppercase tracking-wider text-brand sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          >
            Sobre Mí
          </h2>
        </div>

        <!-- 
          Subtítulo / Rol
          - cursor-target: Activa el cursor.
        -->
        <div>
          <h3
            class="cursor-target inline-block text-lg font-medium text-gray-300 sm:text-xl md:text-2xl lg:text-3xl"
          >
            Desarrollador Full Stack & Entusiasta de Linux
          </h3>
        </div>

        <!-- 
          Descripción
          - cursor-target: Activa el cursor.
          - leading-relaxed: Mejora la legibilidad.
        -->
        <div>
          <p
            class="cursor-target inline-block text-base leading-relaxed text-gray-400 sm:text-lg md:text-xl lg:text-2xl"
          >
            Me especializo en construir experiencias web inmersivas y
            aplicaciones robustas. Me apasiona el código limpio, el diseño
            minimalista y la estética cyberpunk. Siempre buscando nuevos
            desafíos y tecnologías para explorar.
          </p>
        </div>

        <!-- 
          Botón de Acción: Descargar CV
          - cursor-target: Activa el cursor.
        -->
        <div class="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center">
          <button
            class="cursor-target rounded-full border border-brand bg-brand/10 px-8 py-3 text-lg font-bold uppercase tracking-wider text-brand transition-all hover:bg-brand hover:text-black"
          >
            Descargar CV
          </button>

          <!-- Iconos Sociales -->
          <div class="flex gap-8">
            <a
              href="#"
              class="cursor-target inline-block text-gray-400 hover:text-brand transition-colors transform hover:scale-110"
            >
              <Instagram :size="32" />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=51922500091" target="_blank"
              class="cursor-target inline-block text-gray-400 hover:text-brand transition-colors transform hover:scale-110"
            >
              <MessageCircle :size="32" />
              <!-- WhatsApp representation -->
            </a>
            <a
              href="https://github.com/junkdog505" target="_blank"
              class="cursor-target inline-block text-gray-400 hover:text-brand transition-colors transform hover:scale-110"
            >
              <Github :size="32" />
            </a>
            <a
              href="https://www.linkedin.com/in/edison-cristian-amezquita-soto/" target="_blank"
              class="cursor-target inline-block text-gray-400 hover:text-brand transition-colors transform hover:scale-110"
            >
              <Linkedin :size="32" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Sección de Proyectos -->
  <div class="w-full bg-neutral-900 p-8 text-brand">
    <div class="mx-auto max-w-[90rem] px-6 py-12 lg:py-24">
      <ProjectsSection />
    </div>
  </div>
</template>
