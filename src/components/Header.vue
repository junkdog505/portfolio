<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const showSidebar = ref(false);
const isMobileMenuOpen = ref(false);

const navLinks = [
  { 
    name: 'Sobre mí', 
    href: '#about', 
    id: '01',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' 
  },
  { 
    name: 'Proyectos', 
    href: '#proyectos', 
    id: '02',
    icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' 
  },
  { 
    name: 'Experiencia', 
    href: '#experience', 
    id: '03',
    icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' 
  },
  { 
    name: 'Educación', 
    href: '#education', 
    id: '04',
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' 
  },
  { 
    name: 'Contacto', 
    href: '#contact', 
    id: '05',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' 
  }
];

const handleScroll = () => {
  const scrollY = window.scrollY;
  // Solo aplicamos la lógica de ocultar/mostrar sidebar en pantallas grandes (Desktop)
  if (window.innerWidth >= 1024) {
    isScrolled.value = scrollY > 80;
    showSidebar.value = scrollY > 250;
  } else {
    // En mobile y tablet, mantenemos el header superior siempre visible
    isScrolled.value = false;
    showSidebar.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleScroll);
});
</script>

<template>
  <!-- HEADER SUPERIOR (TOP BAR) -->
  <header 
    :class="[
      'fixed top-0 left-0 w-full h-20 z-[100] transition-all duration-500 ease-in-out px-6 lg:px-12 flex items-center justify-between pointer-events-auto',
      'bg-[#0a0a0a]/80 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none',
      isScrolled ? 'lg:-translate-y-full lg:opacity-0' : 'translate-y-0 opacity-100'
    ]"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center font-mono font-bold text-gray-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
        A
      </div>
      <span class="text-white font-mono font-bold tracking-tighter text-xl">
        amsot<span class="text-emerald-500">_</span>
      </span>
    </div>

    <!-- Navegación Horizontal (Desktop) -->
    <nav class="hidden lg:flex items-center gap-10">
      <a 
        v-for="link in navLinks" 
        :key="link.name" 
        :href="link.href"
        class="group relative py-2"
      >
        <span class="font-mono text-[11px] tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors uppercase">
          {{ link.name }}
        </span>
        <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
      </a>
    </nav>

    <!-- Botón Hamburguesa (Mobile/Tablet) -->
    <button 
      @click="isMobileMenuOpen = !isMobileMenuOpen" 
      class="lg:hidden p-2 text-white transition-transform active:scale-90"
      aria-label="Abrir menú"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>
  </header>

  <!-- SIDEBAR DERECHO (Solo PC en Scroll) -->
  <aside 
    v-if="!isMobileMenuOpen"
    :class="[
      'fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center gap-10 py-8 px-3 bg-neutral-900/60 backdrop-blur-md border border-white/5 rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-2xl',
      showSidebar ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0'
    ]"
  >
    <!-- Letra A (Orientación vertical estándar) -->
    <div class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-mono font-bold text-gray-950 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
      A
    </div>

    <!-- Navegación por Iconos -->
    <nav class="flex flex-col gap-8">
      <a 
        v-for="link in navLinks" 
        :key="link.name" 
        :href="link.href"
        class="group relative flex items-center justify-center p-2 rounded-lg hover:bg-emerald-500/10 transition-colors"
      >
        <svg 
          class="w-5 h-5 text-gray-500 group-hover:text-emerald-400 transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="link.icon" />
        </svg>

        <!-- Tooltip lateral -->
        <span class="absolute right-full mr-4 px-3 py-1.5 bg-neutral-800 text-emerald-400 text-[10px] font-mono font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none uppercase tracking-widest border border-white/5 shadow-xl">
          {{ link.name }}
        </span>
      </a>
    </nav>
  </aside>

  <!-- OVERLAY DE MENÚ MÓVIL -->
  <Transition name="fade">
    <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[150] bg-[#0a0a0a]/98 backdrop-blur-xl flex flex-col p-10 lg:hidden">
      <div class="flex justify-between items-center mb-16">
        <span class="text-emerald-500 font-mono font-bold tracking-widest uppercase text-sm">Navegación</span>
        <button @click="isMobileMenuOpen = false" class="text-white p-2">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <nav class="flex flex-col gap-6">
        <a 
          v-for="link in navLinks" 
          :key="link.name" 
          :href="link.href"
          @click="isMobileMenuOpen = false"
          class="flex items-center gap-6 py-4 border-b border-white/5 text-2xl font-bold text-white hover:text-emerald-400 transition-colors font-mono"
        >
          <span class="text-xs text-emerald-500/50">#{{ link.id }}</span>
          {{ link.name }}
        </a>
      </nav>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

:global(html) {
  scroll-behavior: smooth;
}

* {
  -webkit-tap-highlight-color: transparent;
}
</style>