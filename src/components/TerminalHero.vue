<script setup lang="ts">
// Definimos la interfaz de las Props
export interface TerminalHeroProps {
  username?: string;
  hostname?: string;
  avatarUrl?: string;
  os?: string;
  name?: string;
  country?: string;
  age?: string | number;
  university?: string;
  stack?: string;
}

// Inicializamos las props con sus valores por defecto
withDefaults(defineProps<TerminalHeroProps>(), {
  username: 'junkdog',
  hostname: 'war-machine',
  avatarUrl: 'https://avatars.githubusercontent.com/u/9919?v=4',
  os: 'Linux x86_64',
  name:"Cristian Amézquita",
  country: 'Perú',
  age: 25,
  university: 'Universidad Católica de Santa María',
  stack: 'Vue.js, TypeScript'
});
</script>

<template>
  <!-- Contenedor modular. El SVG tomará el ancho disponible respetando su nueva proporción exacta -->
  <div class="w-full flex justify-center items-center font-sans">
    <svg 
      viewBox="180 120 640 448" 
      class="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#262626" />
          <stop offset="100%" stop-color="#111111" />
        </linearGradient>
      </defs>

      <!-- --- CAPA ÚNICA: LAPTOP SIMÉTRICA EXACTA --- -->
      <g>
        <!-- Chasis Exterior -->
        <rect x="220" y="120" width="560" height="360" rx="8" fill="#171717" stroke="#404040" stroke-width="2" />
        <rect x="420" y="475" width="160" height="10" rx="2" fill="#262626" />
        
        <!-- Base de la ThinkPad -->
        <path d="M 220 480 L 780 480 L 820 560 L 180 560 Z" fill="url(#laptopGrad)" />
        <path d="M 180 560 L 820 560 L 820 568 L 180 568 Z" fill="#050505" />
        
        <!-- Hueco del Teclado -->
        <path d="M 240 490 L 760 490 L 780 540 L 220 540 Z" fill="#111" stroke="#262626" stroke-width="1" />
        
        <!-- TrackPoint Rojo -->
        <circle cx="500" cy="525" r="4.5" fill="#ef4444" stroke="#7f1d1d" stroke-width="1" />
        
        <!-- Touchpad -->
        <rect x="450" y="545" width="100" height="10" rx="1.5" fill="#1f1f1f" stroke="#111" stroke-width="1" />
        <line x1="450" y1="545" x2="550" y2="545" stroke="#ef4444" stroke-width="1.5" />
        <line x1="480" y1="545" x2="480" y2="555" stroke="#111" stroke-width="1" />
        <line x1="520" y1="545" x2="520" y2="555" stroke="#111" stroke-width="1" />

        <!-- Pantalla Interior (Contenedor Terminal) -->
        <rect x="235" y="135" width="530" height="330" rx="4" fill="#050505" />
        
        <!-- Barra Superior de la Terminal -->
        <rect x="235" y="135" width="530" height="25" rx="4" fill="#1f2937" />
        <circle cx="250" cy="147.5" r="4" fill="#ef4444" />
        <circle cx="265" cy="147.5" r="4" fill="#eab308" />
        <circle cx="280" cy="147.5" r="4" fill="#22c55e" />
        <text x="500" y="152" fill="#9ca3af" font-size="11" font-family="monospace" text-anchor="middle">
          {{ username }}@{{ hostname }}: ~
        </text>

        <!-- Contenido HTML de la Terminal con Datos Dinámicos -->
        <foreignObject x="245" y="165" width="510" height="295">
          <div xmlns="http://www.w3.org/1999/xhtml" style="color: #22c55e; font-family: monospace; font-size: 13px; line-height: 1.5;">
            
            <div style="margin-bottom: 16px;">
              <span class="terminal-line cmd-line">
                <span style="color: #3b82f6;">{{ username }}</span>
                <span style="color: #e5e7eb; margin: 0 4px;">@</span>
                <span style="color: #3b82f6;">{{ hostname }}</span>
                <span style="color: #e5e7eb; margin: 0 2px;">:</span>
                <span style="color: #a855f7;">~</span>
                <span style="color: #e5e7eb; margin-left: 4px;">$ fastfetch</span>
              </span>
            </div>
            
            <div style="display: flex; flex-direction: row; gap: 24px; align-items: center;">
              <!-- Avatar -->
              <div class="fade-avatar" style="flex-shrink: 0;">
                <img 
                  :src="avatarUrl" 
                  alt="Profile Avatar" 
                  style="width: 110px; height: 110px; border-radius: 8px; border: 2px solid #42b883; object-fit: cover; box-shadow: 0 0 10px rgba(66, 184, 131, 0.2);" 
                />
              </div>

              <!-- Lista de Datos -->
              <div style="display: flex; flex-direction: column; color: #e5e7eb; width: 100%;">
                <div class="terminal-line line-1" style="padding-bottom: 4px; margin-bottom: 6px; border-bottom: 1px solid #334155;">
                  <span style="color: #3b82f6; font-weight: bold;">{{ username }}</span>
                  <span style="color: #e5e7eb; margin: 0 4px;">@</span>
                  <span style="color: #3b82f6; font-weight: bold;">{{ hostname }}</span>
                </div>
                
                <div class="terminal-line line-2"><span style="color: #42b883; font-weight: bold;">OS</span>:      {{ os }}</div>
                <div class="terminal-line line-3"><span style="color: #42b883; font-weight: bold;">Nombre</span>:  {{ name }}</div>
                <div class="terminal-line line-4"><span style="color: #42b883; font-weight: bold;">País</span>:    {{ country }}</div>
                <div class="terminal-line line-5"><span style="color: #42b883; font-weight: bold;">Edad</span>:    {{ age }}</div>
                <div class="terminal-line line-6"><span style="color: #42b883; font-weight: bold;">Universidad</span>:    {{ university }}</div>
                <div class="terminal-line line-7"><span style="color: #42b883; font-weight: bold;">Stack</span>:   {{ stack }}</div>
              </div>
            </div>
            
            <!-- Prompt -->
            <div class="prompt-line" style="margin-top: 16px;">
              <span style="color: #3b82f6;">{{ username }}</span>
              <span style="color: #e5e7eb; margin: 0 4px;">@</span>
              <span style="color: #3b82f6;">{{ hostname }}</span>
              <span style="color: #e5e7eb; margin: 0 2px;">:</span>
              <span style="color: #a855f7;">~</span>
              <span style="color: #e5e7eb; margin-left: 4px;">$</span> <span class="blink">_</span>
            </div>
            
          </div>
        </foreignObject>
      </g>
    </svg>
  </div>
</template>

<style scoped>
/* Estilos CSS puros - Animaciones delegadas a la GPU */
.terminal-line { opacity: 0; }

.cmd-line { animation: reveal 0.1s step-end forwards; }
.fade-avatar { animation: reveal 0.1s step-end forwards 0.4s; opacity: 0; }
.line-1 { animation: reveal 0.1s step-end forwards 0.7s; }
.line-2 { animation: reveal 0.1s step-end forwards 0.9s; }
.line-3 { animation: reveal 0.1s step-end forwards 1.1s; }
.line-4 { animation: reveal 0.1s step-end forwards 1.3s; }
.line-5 { animation: reveal 0.1s step-end forwards 1.5s; }
.line-6 { animation: reveal 0.1s step-end forwards 1.7s; }
.line-7 { animation: reveal 0.1s step-end forwards 1.9s; }
.prompt-line { animation: reveal 0.1s step-end forwards 2.3s; opacity: 0; }

@keyframes reveal { to { opacity: 1; } }

.blink { animation: blink 1s step-end infinite; }
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>