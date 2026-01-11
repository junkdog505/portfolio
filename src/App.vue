<script setup lang="ts">
/**
 * Importaciones necesarias de Vue y componentes.
 */
import { useTemplateRef, computed } from "vue";
import FaultyTerminal from "./components/FaultyTerminal.vue";
import ProfileCard from "./components/ProfileCard.vue";
import TargetCursor from "./components/TargetCursor.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import { Instagram, Github, Linkedin, MessageCircle } from "lucide-vue-next";

const handleContactClick = () => {
  console.log("Contact button clicked!");
};

// Referencia para el contenedor de la sección de contenido
const contentRef = useTemplateRef<HTMLDivElement>("contentRef");
const contentElement = computed(() => contentRef.value);

</script>

<template>
  <!-- 
    Sección Hero (Entrada)
    Ocupa toda la altura de la pantalla (h-screen).
    Contiene la terminal de fondo y la tarjeta de presentación.
  -->
  <div
    class="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black px-4"
  >
    <!-- 
      Fondo: Terminal
      Posicionado absolutamente para cubrir todo el contenedor padre.
      z-0 asegura que quede detrás del contenido.
    -->
    <div class="absolute inset-0 z-0">
      <FaultyTerminal
        :scale="1.8"
        :grid-mul="[2, 1]"
        :digit-size="1.2"
        :time-scale="1.5"
        :pause="false"
        :scanline-intensity="0.6"
        :glitch-amount="1"
        :flicker-amount="1"
        :noise-amp="1"
        :chromatic-aberration="0.3"
        :dither="0"
        :curvature="0.2"
        tint="#619b59"
        :mouse-react="true"
        :mouse-strength="0.3"
        :page-load-animation="false"
        :brightness="0.5"
      />
    </div>

    <!-- 
      Tarjeta de Contenido Principal
      Centrada en la pantalla.
      Usa clases de Tailwind para estilos responsive y visuales:
      - w-full max-w-2xl: Ancho completo pero limitado a 2xl en pantallas grandes.
      - mx-4: Margen horizontal para no pegar a los bordes en móviles.
      - bg-black/40 backdrop-blur-sm: Efecto de cristal oscuro.
      - border-brand/30: Borde con el color de marca (definido en CSS) semitransparente.
    -->
    <div
      class="z-10 flex w-full max-w-8xl flex-col items-center justify-center p-8 text-white"
    >
      <!-- Título principal -->
      <h1
        class="mb-4 text-center text-5xl font-bold tracking-wider uppercase md:text-8xl sm:text-6xl"
      >
        Junk Dog
      </h1>

      <!-- Descripción -->
      <p class="text-center text-gray-200 opacity-90 text-2xl md:text-3xl">
        Bienvenido a mi espacio digital. Aquí encontrarás mis proyectos,
        experimentos y más.
      </p>
    </div>
  </div>

  <!-- 
    Sección de Contenido (Scroll)
    Aparece debajo del Hero.
    min-h-screen asegura que al menos ocupe una pantalla de alto.
  -->
  <div ref="contentRef" class="relative min-h-screen w-full bg-neutral-900 p-8 text-brand">
    
    <!-- 
      Componente TargetCursor
      Maneja el cursor personalizado que reacciona a elementos con la clase 'cursor-target'.
      hide-default-cursor: Oculta el cursor nativo del navegador.
      container-ref: Limita el cursor a este contenedor.
      v-if="contentElement": Asegura que el componente solo se monte cuando el contenedor exista,
                             evitando que tome el body por defecto y oculte el cursor globalmente.
    -->
    <TargetCursor 
        v-if="contentElement"
        :spin-duration="2" 
        :hide-default-cursor="true" 
        :container-ref="contentElement" 
    />

    <!-- 
      Contenedor Principal del Layout
      - max-w-7xl: Limita el ancho máximo para pantallas grandes.
      - mx-auto: Centra el contenedor horizontalmente.
      - flex flex-col lg:flex-row: Diseño en columna para móvil, fila para escritorio (lg).
      - items-center: Centra verticalmente los elementos.
      - gap-12: Espaciado entre la tarjeta y el texto.
    -->
    <div class="mx-auto flex max-w-7xl flex-col items-center justify-center gap-12 py-12 lg:flex-row lg:justify-between lg:py-24">
      
      <!-- 
        Columna Izquierda: ProfileCard
        - w-full lg:w-auto: Ancho completo en móvil, auto en escritorio.
        - flex justify-center: Centra la tarjeta.
      -->
      <div class="flex w-full justify-center lg:w-1/2">
        <ProfileCard
          name="Cristian Amezquita"
          title="Ingeniero de Sistemas"
          handle="dev.junkdog"
          status="Online"
          contact-text="Contáctame"
          avatar-url="/profile.png"
          icon-url="/linux-tux.svg"
          :show-user-info="true"
          :show-behind-gradient="false"
          :enable-tilt="true"
          @contact-click="handleContactClick"
        />
      </div>

      <!-- 
        Columna Derecha: Contenido de Texto
        - w-full lg:w-1/2: Ancho completo en móvil, mitad en escritorio.
        - flex flex-col gap-6: Organiza el texto en columna con separación.
        - text-center lg:text-left: Texto centrado en móvil, alineado a la izquierda en escritorio.
      -->
      <div class="flex w-full flex-col gap-6 text-center lg:w-1/2 lg:text-left">
        
        <!-- 
          Título
          - cursor-target: Clase para activar el efecto del TargetCursor.
          - text-4xl lg:text-6xl: Tipografía grande y responsiva.
          - w-fit: Asegura que el ancho sea el del contenido, no el 100%.
          - inline-block: Comportamiento de caja ajustada al texto.
        -->
        <div>
          <h2 class="cursor-target inline-block text-4xl font-bold uppercase tracking-wider text-brand lg:text-6xl">
            Sobre Mí
          </h2>
        </div>
        
        <!-- 
          Subtítulo / Rol
          - cursor-target: Activa el cursor.
        -->
        <div>
          <h3 class="cursor-target inline-block text-xl font-medium text-gray-300 lg:text-2xl">
            Desarrollador Full Stack & Entusiasta de Linux
          </h3>
        </div>

        <!-- 
          Descripción
          - cursor-target: Activa el cursor.
          - leading-relaxed: Mejora la legibilidad.
        -->
        <div>
          <p class="cursor-target inline-block text-lg leading-relaxed text-gray-400 lg:text-xl">
            Me especializo en construir experiencias web inmersivas y aplicaciones robustas. 
            Me apasiona el código limpio, el diseño minimalista y la estética cyberpunk.
            Siempre buscando nuevos desafíos y tecnologías para explorar.
          </p>
        </div>
        
        <!-- 
          Botón de Acción: Descargar CV
          - cursor-target: Activa el cursor.
        -->
        <div class="mt-4 flex flex-col items-center gap-6 lg:items-start">
            <button 
                class="cursor-target rounded-full border border-brand bg-brand/10 px-8 py-3 text-lg font-bold uppercase tracking-wider text-brand transition-all hover:bg-brand hover:text-black"
            >
                Descargar CV
            </button>

            <!-- Iconos Sociales -->
            <div class="flex gap-6 mt-2">
                <a href="#" class="cursor-target inline-block text-gray-400 hover:text-brand transition-colors transform hover:scale-110">
                    <Instagram :size="32" />
                </a>
                <a href="#" class="cursor-target inline-block text-gray-400 hover:text-brand transition-colors transform hover:scale-110">
                    <MessageCircle :size="32" /> <!-- WhatsApp representation -->
                </a>
                <a href="#" class="cursor-target inline-block text-gray-400 hover:text-brand transition-colors transform hover:scale-110">
                    <Github :size="32" />
                </a>
                <a href="#" class="cursor-target inline-block text-gray-400 hover:text-brand transition-colors transform hover:scale-110">
                    <Linkedin :size="32" />
                </a>
            </div>
        </div>
      </div>

    </div>

    <!-- Sección de Proyectos -->
    <div class="mx-auto max-w-7xl px-8 pb-24">
      <ProjectsSection />
    </div>
  </div>
</template>
