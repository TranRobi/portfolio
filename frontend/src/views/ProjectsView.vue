<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Card from '@/components/Card.vue'
import ProjectModal from '@/components/ProjectModal.vue'
import projects from '@/data/projects.json'

const selectedProject = ref(null)

const openModal = (project: any) => {
  selectedProject.value = project
}

const closeModal = () => {
  selectedProject.value = null
}
</script>

<template>
  <main class="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12">
    <div class="max-w-5xl mx-auto pt-10">
      <RouterLink to="/" class="inline-flex text-emerald-400 mb-10 transition-colors hover:text-emerald-300">
        ← {{ $t('projects.returnMain') }}
      </RouterLink>

      <h1 class="text-4xl md:text-5xl font-extrabold mb-2">{{ $t('projects.title') }}</h1>

      <p class="text-zinc-400 text-lg mb-12 max-w-2xl">
        {{ $t('projects.subtitle') }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          v-for="project in projects"
          :key="project.id"
          :titleKey="project.titleKey"
          :descKey="project.descKey"
          :tech="project.tech"
          @open="openModal(project)"
        />
      </div>
    </div>

    <ProjectModal :project="selectedProject" @close="closeModal" />
  </main>
</template>
