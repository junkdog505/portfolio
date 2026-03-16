<script setup lang="ts">
/**
 * Interfaz para los registros educativos
 */
interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  location: string;
  status: 'completed' | 'current';
  description: string;
  skills: string[];
}

const educationHistory: EducationItem[] = [
  {
    period: '2026 - Actual',
    degree: 'Ciberseguridad y Auditoría Informática',
    institution: 'Tecsup',
    location: 'Lima, Perú',
    status: 'current',
    description: 'Especialización técnica avanzada enfocada en la protección de infraestructuras críticas, análisis de vulnerabilidades y cumplimiento de normativas de seguridad informática.',
    skills: ['Pentesting', 'ISO 27001', 'Network Security']
  },
  {
    period: '2020 - 2024',
    degree: 'Ingeniería de Sistemas',
    institution: 'Universidad Católica de Santa María',
    location: 'Arequipa, Perú',
    status: 'completed',
    description: 'Grado académico con sólida base en ingeniería de software, gestión de servicios de TI y diseño de soluciones tecnológicas empresariales.',
    skills: ['Software Engineering', 'IT Management', 'System Architecture']
  }
];
</script>

<template>
  <section id="education" class="py-12 space-y-6">
    <!-- Encabezado - Ahora en concordancia con Sobre Mí -->
    <div class="flex items-center mb-6">
      <h2 class="text-xl font-mono font-bold text-white tracking-widest uppercase">
        FORMACIÓN_ACADÉMICA
      </h2>
    </div>

    <!-- Layout de Tarjetas Académicas -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        v-for="(edu, index) in educationHistory" 
        :key="index"
        class="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:border-emerald-500/40"
      >
        <!-- Efecto de iluminación de fondo -->
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div class="relative p-8 space-y-6 z-10">
          <!-- Cabecera de la Tarjeta -->
          <div class="flex justify-between items-start gap-4">
            <div class="space-y-1">
              <p class="text-emerald-500 font-mono text-xs font-bold tracking-widest uppercase">
                {{ edu.period }}
              </p>
              <h3 class="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300 leading-tight">
                {{ edu.degree }}
              </h3>
            </div>
            
            <!-- Badge de Estado -->
            <div 
              class="flex-shrink-0 px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-tighter border"
              :class="edu.status === 'current' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-white/5 border-white/10 text-gray-400'"
            >
              {{ edu.status === 'current' ? 'En Curso' : 'Graduado' }}
            </div>
          </div>

          <!-- Institución y Ubicación -->
          <div class="space-y-3">
            <div class="flex items-center gap-3 text-white">
              <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-emerald-500/20 transition-colors">
                <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-7h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span class="font-bold text-base tracking-tight">{{ edu.institution }}</span>
            </div>
            <div class="flex items-center gap-2 pl-1 shadow-sm text-sm text-gray-400 font-medium">
              <svg class="w-4 h-4 text-emerald-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ edu.location }}
            </div>
          </div>

          <!-- Descripción - Legibilidad mejorada -->
          <p class="text-gray-200 text-base leading-relaxed font-sans font-light">
            {{ edu.description }}
          </p>

          <!-- Skills / Tags -->
          <div class="flex flex-wrap gap-2 pt-2">
            <span 
              v-for="skill in edu.skills" 
              :key="skill"
              class="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[11px] text-emerald-400/80 font-mono group-hover:border-emerald-500/30 transition-colors"
            >
              #{{ skill }}
            </span>
          </div>
        </div>

        <!-- Línea decorativa lateral -->
        <div class="absolute left-0 top-0 bottom-0 w-[3px] bg-emerald-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optimizaciones de renderizado */
.group {
  backface-visibility: hidden;
  transform: translateZ(0);
}

.font-sans {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>