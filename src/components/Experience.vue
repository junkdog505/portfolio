<script setup lang="ts">
/**
 * Interfaz para los registros de experiencia laboral
 */
interface ExperienciaItem {
  periodo: string;
  puesto: string;
  empresa: string;
  empresaUrl?: string;
  estado: 'activo' | 'finalizado';
  descripcion: string;
  tecnologias: string[];
}

/**
 * Diccionario de descripciones para los tooltips
 */
const definicionesTech: Record<string, string> = {
  'WordPress': 'CMS líder para la gestión de contenidos y creación de sitios web dinámicos.',
  'Elementor': 'Maquetador visual avanzado para diseñar interfaces personalizadas en WordPress.',
  'Plugins a medida': 'Desarrollo de funcionalidades específicas mediante código PHP y hooks de WP.',
  'JavaScript': 'Lenguaje de programación para añadir interactividad y lógica en el cliente.',
  'Laravel': 'Framework de PHP elegante enfocado en el desarrollo backend robusto y escalable.',
  'PHP': 'Lenguaje de servidor fundamental para el desarrollo de aplicaciones web dinámicas.',
  'Testing': 'Procesos de aseguramiento de calidad mediante pruebas unitarias y de integración.',
  'Documentación': 'Creación de guías técnicas para facilitar el mantenimiento y escalabilidad del código.'
};

const historialExperiencia: ExperienciaItem[] = [
  {
    periodo: '2024 - Actual',
    puesto: 'Desarrollador y Diseñador Web',
    empresa: 'The Web Factory (Tac Digital)',
    empresaUrl: 'https://tacdigital.pe/',
    estado: 'activo',
    descripcion: 'Lidero el desarrollo y diseño de plataformas web de alto rendimiento. Especializado en la personalización profunda de WordPress y Elementor mediante la creación de plugins a medida, asegurando estándares óptimos de rendimiento, SEO y una experiencia de usuario impecable.',
    tecnologias: ['WordPress', 'Elementor', 'Plugins a medida', 'JavaScript']
  },
  {
    periodo: '2024',
    puesto: 'Desarrollador Backend',
    empresa: 'Estudios Creativos del Perú',
    empresaUrl: 'https://estudioscreativos.pe/',
    estado: 'finalizado',
    descripcion: 'Implementación de lógica de negocio robusta y escalable. Responsable del ciclo de vida de desarrollo incluyendo testing integral y la generación de documentación técnica detallada para garantizar la mantenibilidad del software.',
    tecnologias: ['Laravel', 'PHP', 'Testing', 'Documentación']
  }
];
</script>

<template>
  <section id="experience" class="py-12 space-y-8">
    <!-- Encabezado - Consistente con el resto del sistema -->
    <div class="flex items-center mb-10">
      <h2 class="text-xl font-mono font-bold text-white tracking-widest uppercase">
        EXPERIENCIA_LABORAL
      </h2>
    </div>

    <!-- Estilo de Registro de Sistema (Log Style) -->
    <div class="relative max-w-5xl mx-auto">
      <!-- Línea vertical de conexión (Estilo código) -->
      <div class="absolute left-[11px] top-2 bottom-2 w-[1px] bg-white/10 hidden sm:block"></div>

      <div class="space-y-16">
        <div 
          v-for="(trabajo, index) in historialExperiencia" 
          :key="index"
          class="relative pl-0 sm:pl-10 group/item"
        >
          <!-- Indicador de Punto de Ejecución (Dot) -->
          <div class="absolute left-0 top-1.5 hidden sm:flex items-center justify-center">
            <div 
              class="w-[23px] h-[23px] rounded-full border bg-[#0a0a0a] z-10 flex items-center justify-center"
              :class="trabajo.estado === 'activo' 
                ? 'border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' 
                : 'border-white/20'"
            >
              <div 
                class="w-1.5 h-1.5 rounded-full"
                :class="trabajo.estado === 'activo' ? 'bg-emerald-500 animate-pulse' : 'bg-white/20'"
              ></div>
            </div>
          </div>

          <!-- Contenido del Registro -->
          <div class="space-y-4">
            <!-- Línea de Título -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-3">
              <span class="text-emerald-500 font-mono text-base font-bold tracking-tighter">
                [{{ trabajo.periodo }}]
              </span>
              <h3 class="text-xl sm:text-2xl font-bold text-white leading-tight">
                {{ trabajo.puesto }}
              </h3>
            </div>

            <!-- Datos de la Empresa -->
            <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-400">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-7h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span class="font-bold text-gray-300 text-base">{{ trabajo.empresa }}</span>
              </div>
              
              <a 
                v-if="trabajo.empresaUrl" 
                :href="trabajo.empresaUrl" 
                target="_blank"
                class="text-xs font-mono text-emerald-500/60 hover:text-emerald-400 underline underline-offset-4 decoration-emerald-500/20 transition-all flex items-center gap-1"
              >
                ./visitar_sitio
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <!-- Bloque de Descripción -->
            <div class="relative bg-white/[0.03] border-l-2 border-emerald-500/30 p-5 rounded-r-2xl">
              <p class="text-gray-300 text-base leading-relaxed font-sans font-light">
                {{ trabajo.descripcion }}
              </p>
            </div>

            <!-- Parámetros / Tecnologías Clickeables con Tooltips -->
            <div class="flex flex-wrap gap-2 pt-1 overflow-visible">
              <span class="text-xs font-mono text-gray-600 mr-1 flex items-center">tecnologías:</span>
              
              <div 
                v-for="tech in trabajo.tecnologias" 
                :key="tech"
                class="group relative"
              >
                <!-- Tag Clickeable -->
                <button 
                  class="px-2 py-0.5 bg-white/5 rounded border border-white/5 text-[11px] text-gray-400 font-mono transition-all cursor-help active:scale-95 hover:text-emerald-400/80 hover:border-emerald-500/20"
                >
                  --{{ tech.toLowerCase().replace(/\s+/g, '_') }}
                </button>

                <!-- Tooltip Personalizado -->
                <div 
                  class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-neutral-900 border border-emerald-500/30 rounded-lg text-[10px] text-gray-300 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none"
                >
                  <div class="font-bold text-emerald-400 mb-1 font-mono uppercase tracking-tighter">{{ tech }}</div>
                  {{ definicionesTech[tech] || 'Tecnología utilizada en el proyecto.' }}
                  <!-- Flecha del tooltip -->
                  <div class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-neutral-900"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.font-sans {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* Efecto de parpadeo suave para el estado activo */
@keyframes soft-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: soft-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Asegurar que los tooltips no se corten */
#experience {
  isolation: isolate;
}
</style>