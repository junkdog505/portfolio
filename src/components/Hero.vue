<script setup lang="ts">
import TerminalHero from './TerminalHero.vue';
import Grainient from './Grainient.vue';
</script>

<template>
  <!-- Contenedor principal 100vh. min-h asegura que no colapse en móviles muy pequeños -->
  <section class="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#0a0a0a] font-sans flex items-center">
    
    <!-- 1. CAPA DE FONDO (Z-0): Grainient WebGL -->
    <div class="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
      <Grainient 
        color1="#047857" 
        color2="#1e3a8a" 
        color3="#020617" 
        :zoom="1.2"
        :timeSpeed="2.35"
        :noiseScale="1.5"
        :grain-amount="0.20"
        :grain-scale="1.0"
        :grain-animated="true"
      />
    </div>

    <!-- 2. CAPA DE GRADIENTE (Z-10): Mejora la legibilidad del texto en el lado izquierdo -->
    <div class="absolute inset-0 z-10 bg-gradient-to-b lg:bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent pointer-events-none"></div>

    <!-- FADE INFERIOR (Z-30): Conecta suavemente esta sección con el siguiente contenedor oscuro -->
    <div class="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-30 pointer-events-none"></div>

    <!-- 3. CAPA DE CONTENIDO (Z-20): Textos y Terminal -->
    <div class="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
      
      <!-- Columna Izquierda: Textos y Llamados a la acción -->
      <div class="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 animate-fade-in-up mt-16 lg:mt-0">
        
        <!-- Título principal mejorado -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Desarrollador <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Full Stack.</span>
        </h1>
        
        <!-- Subtítulo mejorado -->
        <p class="text-lg sm:text-xl text-gray-300 max-w-lg font-light leading-relaxed">
          Diseño arquitecturas robustas y experiencias fluidas. Apasionado por el ecosistema de Vue.js y el desarrollo de interfaces modernas.
        </p>
        
        <!-- Botones (CTAs) -->
        <div class="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
          <!-- Botón de Descargar CV con Ícono -->
          <a href="/ruta-a-tu-cv.pdf" download class="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Descargar CV
          </a>
          <!-- Botón Secundario -->
          <a href="#contacto" class="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center">
            Contáctame
          </a>
        </div>
      </div>

      <!-- Columna Derecha: Terminal Component -->
      <div class="w-full lg:w-1/2 flex justify-center lg:justify-end animate-fade-in delay-300">
        <!-- Contenedor restrictivo para evitar que el SVG crezca infinitamente -->
        <div class="w-full max-w-[500px] lg:max-w-[600px] drop-shadow-[0_20px_40px_rgba(16,185,129,0.15)] hover:drop-shadow-[0_20px_50px_rgba(16,185,129,0.25)] transition-all duration-700 hover:-translate-y-2 cursor-default relative z-40">
          <TerminalHero 
            username="junkdog"
            hostname="war-machine"
            name= "Cristian Amézquita",
            country="Perú"
            stack="Vue, TypeScript, Express, Node.js"
          />
        </div>
      </div>
      
    </div>
  </section>
</template>

<style scoped>
/* Animaciones ligeras y optimizadas delegadas a la GPU usando transform y opacity */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: scale(0.95);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.delay-300 {
  animation-delay: 0.3s;
}
</style>