<script setup lang="ts">
/**
 * Interface for social networks
 */
interface Social {
  name: string;
  url: string;
  icon: string;
  color: string;
}

interface Props {
  profileImage?: string;
  bio?: string;
}

const props = withDefaults(defineProps<Props>(), {
  profileImage: 'profile.jpg',
  bio: 'Soy un desarrollador que encuentra belleza en la lógica y la eficiencia. Mi enfoque no es solo escribir líneas de código, sino diseñar sistemas que respiren estabilidad. Me muevo como pez en el agua en terminales Linux y arquitecturas Vue, siempre buscando la optimización máxima.'
});

const socials: Social[] = [
  { 
    name: 'GitHub', 
    url: 'https://github.com/youruser', 
    color: '#f0f6fc',
    icon: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
  },
  { 
    name: 'LinkedIn', 
    url: 'https://linkedin.com/in/youruser', 
    color: '#0a66c2',
    icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
  }
];
</script>

<template>
  <section id="about" class="py-12 space-y-6">
    <!-- Section Title -->
    <div class="flex items-center mb-6">
      <h2 class="text-xl font-mono font-bold text-white tracking-widest uppercase">
        SOBRE_MÍ
      </h2>
    </div>

    <!-- Bento Grid Layout -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      
      <!-- Block 1: Bio Principal & AMSOT Logic -->
      <div class="md:col-span-9 bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.07] transition-all group relative overflow-hidden flex flex-col items-start">
        <div class="absolute -right-10 -bottom-10 p-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
          <svg class="w-64 h-64 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
        </div>
        
        <div class="relative z-10 space-y-5">
          <div class="space-y-1">
            <p class="text-emerald-500 font-mono text-xs uppercase tracking-widest">Conóceme un poco más</p>
            <h3 class="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Me llamo <span class="text-white">Edison Cristian</span> 
              <span class="text-emerald-400">Am</span>ezquita 
              <span class="text-emerald-400">Sot</span>o.
            </h3>
          </div>

          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10">
            <span class="text-gray-400 font-mono text-xs">root@amsot:</span>
            <span class="text-emerald-400 font-mono text-xs font-bold">
              [<span class="text-white">Am</span>]ezquita + [<span class="text-white">Sot</span>]o
            </span>
          </div>

          <p class="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl font-sans">
            {{ props.bio }}
          </p>
        </div>
      </div>

      <!-- Block 2: Profile Photo -->
      <div class="md:col-span-3 bg-neutral-900 rounded-3xl overflow-hidden relative group border border-white/5 aspect-[4/5] md:aspect-auto">
        <img 
          :src="props.profileImage" 
          alt="Profile" 
          class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
        <div class="absolute bottom-5 left-5">
          <p class="text-white font-mono font-bold text-base">@amsot</p>
          <p class="text-emerald-500 text-xs font-mono uppercase tracking-tighter">Main Admin</p>
        </div>
      </div>

      <!-- Block 3: Social Networks -->
      <div class="md:col-span-4 bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col">
        <h4 class="text-white font-bold mb-5 flex items-center gap-2 text-sm font-mono uppercase tracking-wider">
          <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          CONECTAR
        </h4>
        <div class="flex flex-col gap-3 flex-1 justify-center">
          <a 
            v-for="social in socials" 
            :key="social.name"
            :href="social.url"
            target="_blank"
            class="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all group"
          >
            <div class="flex items-center gap-3">
              <svg class="w-4 h-4" :fill="social.color" viewBox="0 0 24 24">
                <path :d="social.icon" />
              </svg>
              <span class="text-gray-200 font-mono text-xs uppercase tracking-tight">{{ social.name }}</span>
            </div>
            <svg class="w-3.5 h-3.5 text-gray-600 group-hover:text-emerald-400 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>
      </div>

      <!-- Block 4: Method & Environment -->
      <div class="md:col-span-8 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
        <div class="flex flex-col h-full">
          <h4 class="text-white font-bold mb-6 flex items-center gap-2 text-sm font-mono uppercase tracking-wider">
            <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z"/></svg>
            MÉTODO_Y_ENTORNO
          </h4>
          
          <div class="grid sm:grid-cols-2 gap-8">
            <div class="space-y-3">
              <h5 class="text-emerald-500 font-mono text-xs font-bold uppercase tracking-widest">Cómo trabajo</h5>
              <p class="text-gray-400 text-sm leading-relaxed font-sans">
                Priorizo la comunicación asíncrona, la documentación clara y el código autodecriptivo. No creo en las soluciones rápidas que generan deuda técnica innecesaria.
              </p>
            </div>
            <div class="space-y-3">
              <h5 class="text-emerald-500 font-mono text-xs font-bold uppercase tracking-widest">Mi Entorno</h5>
              <p class="text-gray-400 text-sm leading-relaxed font-sans">
                Mi flujo de trabajo nace en Neovim, se compila en Linux y se despliega con la confianza de que cada bit está en su lugar correcto dentro de la arquitectura.
              </p>
            </div>
          </div>
        </div>
        <!-- Decorative background line -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.rounded-3xl {
  border-radius: 1.5rem;
}

/* Custom scrollbar for subtle touch */
::-webkit-scrollbar {
  height: 4px;
}
</style>