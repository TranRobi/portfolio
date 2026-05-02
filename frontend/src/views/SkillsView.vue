<script setup lang="ts">
import { RouterLink } from 'vue-router'

// Your skills data pulled directly from the blueprint
const skillCategories = [
  {
    title: 'Hardware & Systems',
    description: 'Physical architecture and mechanical design.',
    skills: ['Fusion 360 (Intermediate)', 'Sensor Fusion', 'Robotics Logic'],
  },
  {
    title: 'Low-Level Languages',
    description: 'Memory management and firmware execution.',
    skills: ['C', 'C++', 'Lua'],
  },
  {
    title: 'Web Frontend',
    description: 'High-performance UI and state management.',
    skills: ['Vue 3', 'Tailwind CSS', 'Next.js', 'SCSS/CSS'],
  },
  {
    title: 'Backend & Databases',
    description: 'API design, data persistence, and routing.',
    skills: ['Node.js', 'Java Spring Boot', 'SQL'],
  },
  {
    title: 'Tooling & Workflows',
    description: 'Version control and systems testing.',
    skills: ['Git', 'Postman', 'REST API Design'],
  },
]
</script>

<template>
  <main
    class="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans selection:bg-emerald-500 selection:text-white"
  >
    <div class="max-w-5xl mx-auto pt-10">
      <!-- Back Button -->
      <RouterLink
        to="/"
        class="inline-flex text-emerald-400 hover:text-emerald-300 font-mono text-sm items-center gap-2 mb-10 transition-colors"
      >
        <span aria-hidden="true">&larr;</span> Return to Main System
      </RouterLink>

      <!-- Page Header -->
      <h1 class="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">Competency Matrix</h1>
      <p class="text-zinc-400 text-lg mb-12 max-w-2xl">
        A categorized breakdown of my technical proficiencies across hardware, firmware, and
        scalable web infrastructure.
      </p>

      <!-- Skills Grid using v-for -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="category in skillCategories"
          :key="category.title"
          class="border border-zinc-800 bg-zinc-900/40 p-6 rounded-lg hover:border-emerald-500/50 transition-colors"
        >
          <h2 class="text-xl font-bold text-zinc-100 mb-1">{{ category.title }}</h2>
          <p class="text-zinc-500 text-sm mb-4">{{ category.description }}</p>

          <ul class="space-y-2">
            <li
              v-for="skill in category.skills"
              :key="skill"
              class="flex items-center gap-2 font-mono text-sm text-emerald-400"
            >
              <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span>
              {{ skill }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </main>
</template>
