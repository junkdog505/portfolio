<script setup lang="ts">
import { ref, onMounted } from 'vue';

/**
 * Interfaz para la estructura de un Proyecto
 * estado: 0 = En proceso, 1 = En desarrollo, 2 = Completado
 */
interface Proyecto {
  titulo: string;
  descripcion: string;
  imagenDestacada: string;
  linkProyecto: string;
  estado: number; 
  tecnologias?: string[];
  galeria: string[];
}

/**
 * Interfaz para el JSON organizado por categorías
 */
interface ProyectosData {
  fullStack: Proyecto[];
  disenoWeb: Proyecto[];
  pluginsWordpress: Proyecto[];
}

const proyectosData = ref<ProyectosData | null>(null);
const cargando = ref(true);
const modalAbierto = ref(false);
const proyectoSeleccionado = ref<Proyecto | null>(null);

const nombresCategorias: Record<keyof ProyectosData, string> = {
  fullStack: 'Full Stack',
  disenoWeb: 'Diseño Web',
  pluginsWordpress: 'Plugins WordPress'
};

/**
 * Retorna la configuración visual según el código de estado
 */
const getEstadoInfo = (estado: number) => {
  switch (estado) {
    case 0: return { texto: 'En proceso', clase: 'bg-red-500/10 border-red-500/20 text-red-400' };
    case 1: return { texto: 'En desarrollo', clase: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' };
    case 2: return { texto: 'Completado', clase: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' };
    default: return { texto: 'Desconocido', clase: 'bg-gray-500/10 border-gray-500/20 text-gray-400' };
  }
};

onMounted(async () => {
  try {
    const response = await fetch('/proyectos.json');
    if (response.ok) {
      proyectosData.value = await response.json();
    }
  } catch (error) {
    console.error("Error cargando proyectos.json:", error);
  } finally {
    cargando.value = false;
  }
});

const abrirDetalle = (proyecto: Proyecto) => {
  proyectoSeleccionado.value = proyecto;
  modalAbierto.value = true;
  document.body.style.overflow = 'hidden';
};

const cerrarModal = () => {
  modalAbierto.value = false;
  proyectoSeleccionado.value = null;
  document.body.style.overflow = 'auto';
};
</script>

<template>
  <section id="proyectos" class="py-16 space-y-20">
    <div class="flex items-center mb-10">
      <h2 class="text-xl font-mono font-bold text-white tracking-widest uppercase">
        PROYECTOS_Y_DESPLIEGUES
      </h2>
    </div>

    <div v-if="cargando" class="flex justify-center py-20">
      <div class="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
    </div>

    <div v-else-if="proyectosData" class="space-y-24">
      <div v-for="(lista, key) in proyectosData" :key="key" class="space-y-10">
        <div class="flex items-center gap-4">
          <h3 class="text-emerald-400 font-mono text-sm font-bold uppercase tracking-tighter">
            // {{ nombresCategorias[key as keyof ProyectosData] }}
          </h3>
          <div class="h-px flex-1 bg-white/5"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(proyecto, index) in lista" 
            :key="index"
            @click="abrirDetalle(proyecto)"
            class="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:border-emerald-500/40 cursor-pointer flex flex-col"
          >
            <div class="relative h-52 overflow-hidden bg-neutral-900">
              <img 
                :src="proyecto.imagenDestacada" 
                :alt="proyecto.titulo" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                :class="proyecto.estado < 2 ? 'opacity-30 grayscale' : 'opacity-70'"
              />
              <div 
                v-if="proyecto.estado < 2"
                class="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
              >
                <div class="flex flex-col items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-emerald-500" :class="proyecto.estado === 1 ? 'animate-pulse' : ''"></div>
                  <span class="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                    {{ getEstadoInfo(proyecto.estado).texto }}
                  </span>
                </div>
              </div>
            </div>

            <div class="p-7 flex-1 flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex justify-between items-start gap-2">
                  <h4 class="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {{ proyecto.titulo }}
                  </h4>
                  <span :class="['text-[8px] px-2 py-0.5 rounded border font-mono uppercase', getEstadoInfo(proyecto.estado).clase]">
                    {{ getEstadoInfo(proyecto.estado).texto }}
                  </span>
                </div>
                <p class="text-gray-400 text-sm leading-relaxed line-clamp-2 font-sans font-light">
                  {{ proyecto.descripcion }}
                </p>
              </div>

              <div v-if="proyecto.tecnologias" class="flex flex-wrap gap-2 pt-5">
                <span 
                  v-for="tech in proyecto.tecnologias" 
                  :key="tech"
                  class="text-[10px] font-mono text-gray-500 uppercase"
                >
                  #{{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div 
          v-if="modalAbierto && proyectoSeleccionado" 
          class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          @click.self="cerrarModal"
        >
          <div class="bg-[#0f0f0f] border border-white/10 w-full max-w-5xl max-h-[90vh] rounded-[2rem] overflow-hidden flex flex-col shadow-2xl">
            <div class="flex items-center justify-between p-6 border-b border-white/5">
              <div class="flex items-center gap-4">
                <span class="text-emerald-500 font-mono text-xs font-bold uppercase tracking-[0.2em]">Detalles_Proyecto</span>
                <span :class="['text-[9px] px-2 py-0.5 rounded border font-mono uppercase', getEstadoInfo(proyectoSeleccionado.estado).clase]">
                  {{ getEstadoInfo(proyectoSeleccionado.estado).texto }}
                </span>
              </div>
              <button 
                @click="cerrarModal" 
                class="group/close p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all cursor-pointer active:scale-90"
              >
                <svg class="w-6 h-6 transition-transform group-hover/close:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>

            <div class="overflow-y-auto p-8 lg:p-12 space-y-12 custom-scrollbar">
              <div class="grid lg:grid-cols-2 gap-12">
                <div class="space-y-6">
                  <h3 class="text-3xl lg:text-4xl font-bold text-white leading-tight">{{ proyectoSeleccionado.titulo }}</h3>
                  <p class="text-gray-300 text-lg leading-relaxed font-light">{{ proyectoSeleccionado.descripcion }}</p>
                  
                  <div v-if="proyectoSeleccionado.linkProyecto" class="pt-4">
                    <a 
                      :href="proyectoSeleccionado.linkProyecto" 
                      target="_blank"
                      class="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold rounded-2xl transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      Explorar Proyecto
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </a>
                  </div>
                </div>

                <div v-if="proyectoSeleccionado.tecnologias" class="space-y-4">
                  <h5 class="text-emerald-500 font-mono text-xs font-bold uppercase tracking-widest">Stack Técnico</h5>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="t in proyectoSeleccionado.tecnologias" 
                      :key="t" 
                      class="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 font-mono"
                    >
                      {{ t }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Galería Deslizable -->
              <div v-if="proyectoSeleccionado.galeria.length > 0" class="space-y-6">
                <div class="flex items-center justify-between">
                  <h5 class="text-emerald-500 font-mono text-xs font-bold uppercase tracking-widest">Galería_Capturas</h5>
                  <span class="text-[10px] text-gray-600 font-mono uppercase tracking-tighter sm:hidden">Desliza →</span>
                </div>
                
                <div class="relative group/slider">
                  <div class="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 custom-scrollbar scroll-smooth">
                    <div 
                      v-for="(img, i) in proyectoSeleccionado.galeria" 
                      :key="i"
                      class="flex-none w-[90%] sm:w-[80%] lg:w-[70%] snap-center rounded-2xl overflow-hidden border border-white/10 aspect-video bg-neutral-900 shadow-xl"
                    >
                      <img :src="img" class="w-full h-full object-cover select-none" loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.font-sans {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(16, 185, 129, 0.4);
}

@media (min-width: 1024px) {
  .snap-x::-webkit-scrollbar {
    height: 4px;
  }
}
</style>