<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProjects, type Project, type GalleryImage } from '../composables/useProjects';
import ProjectGalleryDialog from './ProjectGalleryDialog.vue';

const { projects, loading, error, fetchProjects } = useProjects();

const isDialogOpen = ref(false);
const selectedProjectTitle = ref('');
const selectedProjectImages = ref<GalleryImage[]>([]);

const openGallery = (project: Project) => {
  const gallerySource = project.acf?.project_gallery_source;
  
  if (gallerySource && gallerySource.formatted_value && Array.isArray(gallerySource.formatted_value)) {
    selectedProjectImages.value = gallerySource.formatted_value;
    selectedProjectTitle.value = project.title.rendered;
    isDialogOpen.value = true;
  } else {
    console.warn('No gallery images found for project:', project.title.rendered);
    // Optionally show a notification or just don't open the dialog
    // For now, we'll open it with empty images to show "No images available" message
    selectedProjectImages.value = [];
    selectedProjectTitle.value = project.title.rendered;
    isDialogOpen.value = true;
  }
};

const closeGallery = () => {
  isDialogOpen.value = false;
};

onMounted(() => {
  fetchProjects();
});
</script>

<template>
  <div class="w-full py-12">
    <h2 class="cursor-target inline-block mb-12 text-center text-4xl font-bold uppercase tracking-wider text-brand lg:text-left lg:text-6xl">
      Proyectos
    </h2>

    <div v-if="loading" class="text-center text-xl text-gray-400">
      Cargando proyectos...
    </div>

    <div v-else-if="error" class="text-center text-xl text-red-500">
      {{ error }}
    </div>

    <div v-else-if="projects.length === 0" class="text-center text-xl text-gray-400">
      No se encontraron proyectos.
    </div>

    <div v-else class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div 
        v-for="project in projects" 
        :key="project.id" 
        @click="openGallery(project)"
        class="cursor-target group flex flex-col rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-brand/50 hover:bg-white/10 cursor-pointer"
      >
        <h3 class="mb-2 text-2xl font-bold text-white group-hover:text-brand transition-colors">
          {{ project.title.rendered }}
        </h3>
        
        <p class="mb-4 text-lg font-medium text-brand/80">
          {{ project.acf?.project_tag_line }}
        </p>

        <div v-if="project.acf?.repeater_languajes" class="mb-6 flex flex-wrap gap-2">
          <span 
            v-for="(lang, index) in project.acf.repeater_languajes" 
            :key="index" 
            class="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand"
          >
            {{ lang.languaje_name }}
          </span>
        </div>

        <div class="prose prose-invert max-w-none text-gray-300">
          <p>{{ project.acf?.project_description }}</p>
        </div>
      </div>
    </div>

    <ProjectGalleryDialog 
      :is-open="isDialogOpen"
      :title="selectedProjectTitle"
      :images="selectedProjectImages"
      @close="closeGallery"
    />
  </div>
</template>
