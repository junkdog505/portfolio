<script setup lang="ts">
import Hero from './components/Hero.vue';
import AboutMe from './components/AboutMe.vue';
import Grainient from './components/Grainient.vue';
import Education from './components/Education.vue';
import Experience from './components/Experience.vue';
import Projects from './components/Projects.vue';
import Header from './components/Header.vue';
import Contact from './components/Contact.vue';
</script>

<template>
  <nav>
    <Header />
  </nav>
  <main class="relative w-full min-h-screen bg-[#0a0a0a] overflow-x-hidden selection:bg-emerald-500/30">
    
    <div class="relative w-full overflow-hidden">
      <div class="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <Grainient 
          color1="#047857" 
          color2="#1e3a8a" 
          color3="#020617" 
          :zoom="1.2"
          :timeSpeed="2.35"
          :noiseScale="1.5"
          :grain-amount="0.20"
        />
      </div>

      <div class="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

      <div class="relative z-20">
        <Hero />
      </div>
    </div>

    <div class="relative z-30 w-full max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-16 pb-20">
      <AboutMe />
      <Education />
      <Experience />
      <Projects />
      <Contact />
    </div>

  </main>
</template>

<style>
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0a0a0a;
}
::-webkit-scrollbar-thumb {
  background: #1f2937;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #10b981;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  background-color: #0a0a0a;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>