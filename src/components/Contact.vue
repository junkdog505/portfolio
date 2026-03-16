<script setup lang="ts">
import { ref } from 'vue';

// Datos ofuscados para evitar scrapers simples
// Correo: cris.amsot@gmail.com
const obfuscatedEmail = "Y3Jpcy5hbXNvdEBnbWFpbC5jb20="; 
// Teléfono: +51 922 500 091
const obfuscatedPhone = "KzUxIDkyMiA1MDAgMDkx"; 

const revealedEmail = ref('••••••••@••••.com');
const revealedPhone = ref('+51 ••• ••• •••');
const isRevealed = ref(false);

const revealData = () => {
  if (isRevealed.value) return;
  // Decodificamos solo cuando el usuario interactúa
  revealedEmail.value = atob(obfuscatedEmail);
  revealedPhone.value = atob(obfuscatedPhone);
  isRevealed.value = true;
};

// Lógica del Formulario
const form = ref({
  nombre: '',
  email: '',
  asunto: '',
  mensaje: ''
});

const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle');

const handleSubmit = async () => {
  status.value = 'sending';
  // Simulación de envío
  setTimeout(() => {
    status.value = 'success';
    form.value = { nombre: '', email: '', asunto: '', mensaje: '' };
    setTimeout(() => status.value = 'idle', 5000);
  }, 1500);
};
</script>

<template>
  <section id="contact" class="py-16 space-y-12">
    <!-- Encabezado -->
    <div class="flex items-center mb-6">
      <h2 class="text-xl font-mono font-bold text-white tracking-widest uppercase">
        CONTACTO
      </h2>
    </div>

    <div class="grid lg:grid-cols-5 gap-12 items-start">
      
      <!-- Información de Contacto & Seguridad -->
      <div class="lg:col-span-2 space-y-8">
        <div class="space-y-4">
          <h3 class="text-2xl font-bold text-white">¿Tienes un proyecto en mente?</h3>
          <p class="text-gray-400 font-sans leading-relaxed">
            Actualmente estoy disponible para nuevos desafíos en <span class="text-emerald-400">Desarrollo Web</span> y <span class="text-emerald-400">Ciberseguridad</span>. 
            Si buscas optimizar tu plataforma o proteger tu infraestructura, hablemos.
          </p>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
          <!-- Email -->
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div>
              <p class="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Correo electrónico</p>
              <button 
                @click="revealData" 
                :class="['text-lg font-mono transition-colors', isRevealed ? 'text-white' : 'text-emerald-500/50 hover:text-emerald-400 cursor-pointer']"
              >
                {{ revealedEmail }}
              </button>
            </div>
          </div>

          <!-- Teléfono -->
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div>
              <p class="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Teléfono / WhatsApp</p>
              <button 
                @click="revealData" 
                :class="['text-lg font-mono transition-colors', isRevealed ? 'text-white' : 'text-emerald-500/50 hover:text-emerald-400 cursor-pointer']"
              >
                {{ revealedPhone }}
              </button>
            </div>
          </div>

          <p v-if="!isRevealed" class="text-[10px] font-mono text-emerald-500/40 italic">
            * Haz clic para mostrar la información de contacto.
          </p>
        </div>
      </div>

      <!-- Formulario de Correo Simplificado -->
      <div class="lg:col-span-3">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid sm:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-xs font-mono text-gray-500 uppercase tracking-widest ml-2">Nombre</label>
              <input 
                v-model="form.nombre"
                required
                type="text" 
                placeholder="Escribe tu nombre completo"
                class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors font-sans"
              />
            </div>
            <div class="space-y-2">
              <label class="text-xs font-mono text-gray-500 uppercase tracking-widest ml-2">Tu correo</label>
              <input 
                v-model="form.email"
                required
                type="email" 
                placeholder="nombre@correo.com"
                class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors font-sans"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-mono text-gray-500 uppercase tracking-widest ml-2">Asunto</label>
            <input 
              v-model="form.asunto"
              required
              type="text" 
              placeholder="¿Sobre qué te gustaría hablar?"
              class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors font-sans"
            />
          </div>

          <div class="space-y-2">
            <label class="text-xs font-mono text-gray-500 uppercase tracking-widest ml-2">Mensaje</label>
            <textarea 
              v-model="form.mensaje"
              required
              rows="5" 
              placeholder="Cuéntame más sobre tu proyecto o consulta..."
              class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors font-sans resize-none"
            ></textarea>
          </div>

          <button 
            type="submit"
            :disabled="status === 'sending' || status === 'success'"
            class="group relative w-full sm:w-auto px-10 py-4 bg-emerald-500 text-gray-950 font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-3 overflow-hidden"
          >
            <span v-if="status === 'idle'" class="flex items-center gap-2">
              Enviar mensaje
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <span v-else-if="status === 'sending'" class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5 text-gray-950" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Enviando...
            </span>
            <span v-else-if="status === 'success'" class="flex items-center gap-2">
              ¡Mensaje enviado!
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.font-sans {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}
</style>