import { ref } from 'vue';
import axios from 'axios';

export interface Language {
  languaje_name: string;
}

export interface GalleryImage {
  ID: number;
  title: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  sizes?: {
    thumbnail: string;
    medium: string;
    large: string;
  };
}

export interface ProjectACF {
  project_tag_line: string;
  project_description: string;
  repeater_languajes: Language[] | false;
  project_gallery: number[] | false | string;
  project_gallery_source?: {
    formatted_value: GalleryImage[] | false;
  };
}

export interface Project {
  id: number;
  title: {
    rendered: string;
  };
  acf: ProjectACF;
}

export function useProjects() {
  const projects = ref<Project[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProjects = async () => {
    loading.value = true;
    error.value = null;
    try {
      console.log('Iniciando petición a la API de proyectos...');
      const response = await axios.get<Project[]>('https://data.amsot.net/wp-json/wp/v2/project');
      console.log('Proyectos cargados:', response.data);
      projects.value = response.data;
    } catch (e: any) {
      console.error('Error fetching projects:', e);
      error.value = e.message || 'Error al cargar los proyectos.';
    } finally {
      loading.value = false;
    }
  };

  return {
    projects,
    loading,
    error,
    fetchProjects
  };
}
