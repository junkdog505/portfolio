<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import type { GalleryImage } from '../composables/useProjects';
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next';

const props = defineProps<{
  isOpen: boolean;
  title: string;
  images: GalleryImage[];
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const dialogRef = ref<HTMLDialogElement | null>(null);
const currentIndex = ref(0);

const currentImage = computed(() => {
  if (!props.images || props.images.length === 0) return null;
  return props.images[currentIndex.value];
});

const nextImage = () => {
  if (!props.images || props.images.length === 0) return;
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

const prevImage = () => {
  if (!props.images || props.images.length === 0) return;
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
};

const handleKeydown = (e: KeyboardEvent) => {
  if (!props.isOpen) return;
  
  switch (e.key) {
    case 'ArrowRight':
      nextImage();
      break;
    case 'ArrowLeft':
      prevImage();
      break;
    case 'Escape':
      // Native dialog handles escape, but we might want to ensure custom logic if needed
      break;
  }
};

// Watch for isOpen changes to show/close the native dialog
watch(() => props.isOpen, (newVal) => {
  if (!dialogRef.value) return;
  
  if (newVal) {
    dialogRef.value.showModal();
    // Prevent scrolling on body
    document.body.style.overflow = 'hidden';
    currentIndex.value = 0; // Reset to first image
    window.addEventListener('keydown', handleKeydown);
  } else {
    dialogRef.value.close();
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKeydown);
  }
});

const closeDialog = () => {
  emit('close');
};

const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === dialogRef.value) {
    closeDialog();
  }
};

onMounted(() => {
  // Ensure dialog is closed initially if needed
  if (!props.isOpen && dialogRef.value?.open) {
    dialogRef.value.close();
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <dialog
    ref="dialogRef"
    class="backdrop:bg-black/90 backdrop:backdrop-blur-md bg-neutral-900 text-white rounded-xl p-0 w-full max-w-7xl h-[90vh] shadow-2xl border border-brand/20 m-auto overflow-hidden cursor-auto"
    @click="handleBackdropClick"
    @close="closeDialog"
  >
    <!-- Header -->
    <div class="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
      <h3 class="text-xl font-bold uppercase tracking-wider text-brand drop-shadow-md">
        {{ title }}
      </h3>
      <button 
        @click="closeDialog"
        class="rounded-full bg-black/50 p-2 text-white transition-all hover:bg-brand hover:text-black backdrop-blur-sm"
      >
        <X :size="24" />
      </button>
    </div>

    <!-- Gallery Slider -->
    <div class="relative flex h-full w-full items-center justify-center bg-black">
      
      <div v-if="images && images.length > 0" class="relative flex h-full w-full items-center justify-center">
        <!-- Image -->
        <div class="relative h-full w-full flex items-center justify-center p-4 sm:p-12">
           <img 
            v-if="currentImage"
            :src="currentImage.url" 
            :alt="currentImage.alt || currentImage.title"
            class="max-h-full max-w-full object-contain shadow-2xl"
          />
        </div>

        <!-- Navigation Buttons -->
        <button 
          v-if="images.length > 1"
          @click.stop="prevImage"
          class="absolute left-4 z-10 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:bg-brand hover:text-black hover:scale-110 sm:left-8"
          aria-label="Previous image"
        >
          <ChevronLeft :size="32" />
        </button>
        
        <button 
          v-if="images.length > 1"
          @click.stop="nextImage"
          class="absolute right-4 z-10 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:bg-brand hover:text-black hover:scale-110 sm:right-8"
          aria-label="Next image"
        >
          <ChevronRight :size="32" />
        </button>

        <!-- Counter -->
        <div class="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 transform rounded-full bg-black/60 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm border border-white/10">
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>

      <div v-else class="flex h-full w-full items-center justify-center text-xl text-gray-500">
        No hay imágenes disponibles para este proyecto.
      </div>
    </div>
  </dialog>
</template>

<style scoped>
dialog {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.3s ease, transform 0.3s ease, display 0.3s allow-discrete, overlay 0.3s allow-discrete;
}

dialog[open] {
  opacity: 1;
  transform: scale(1);
}

@starting-style {
  dialog[open] {
    opacity: 0;
    transform: scale(0.95);
  }
}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0);
  transition: display 0.3s allow-discrete, overlay 0.3s allow-discrete, background-color 0.3s;
}

dialog[open]::backdrop {
  background-color: rgba(0, 0, 0, 0.8);
}

@starting-style {
  dialog[open]::backdrop {
    background-color: rgba(0, 0, 0, 0);
  }
}

/* Force default cursor inside the dialog */
dialog, dialog * {
  cursor: auto !important;
}

/* Custom scrollbar for gallery list if needed */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #1a1a1a;
}
::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #4ade80; /* brand color */
}
</style>
