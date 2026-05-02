<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Card from '@/components/Card.vue'
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
      <h1 class="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">System Architecture</h1>
      <p class="text-zinc-400 text-lg mb-12 max-w-2xl">
        Core engineering case studies, hardware integrations, and technical implementations.
      </p>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          title="Industrial Systems Integration"
          desc="Automated a 6-axis industrial robotic arm synchronized with a secondary rotator plate.
              Integrated an image recognition camera to process visual data and trigger precise,
              asynchronous hardware actuation."
          :tech="['Lua', 'Computer Vision', 'Multi-Axis Kinematics']"
        />
        <Card />
      </div>
    </div>
  </main>
</template>
