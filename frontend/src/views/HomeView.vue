<script setup lang="ts">
// Vue 3 Composition API logic goes here if needed later
</script>

<template>
  <!-- Main Container: Deep dark background, text colors set to off-white -->
  <main
    class="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500 selection:text-white"
  >
    <!-- HERO SECTION -->
    <section class="max-w-5xl mx-auto px-6 pt-32 pb-20 flex flex-col justify-center min-h-[70vh]">
      <!-- Monospace eyebrow text -->
      <p class="text-emerald-400 font-mono text-sm md:text-base mb-4 tracking-wider uppercase">
        {{ $t('home.systemInit') }}
      </p>

      <!-- Massive bold headline -->
      <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
        {{ $t('home.title') }}
      </h1>

      <!-- Subtitle -->
      <p class="text-zinc-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
        {{ $t('home.subtitle') }}
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4">
        <RouterLink
          to="/projects"
          class="px-8 py-3 bg-emerald-500 text-zinc-950 font-bold rounded-md hover:bg-emerald-400 transition-colors text-center"
        >
          {{ $t('home.btnProjects') }}
        </RouterLink>
        <RouterLink
          to="/skills"
          class="px-8 py-3 bg-zinc-900 text-zinc-100 font-bold rounded-md border border-zinc-800 hover:border-emerald-500/50 transition-colors text-center"
        >
          {{ $t('home.btnSkills') }}
        </RouterLink>
        <a
          href="/resume.pdf"
          target="_blank"
          class="px-8 py-3 bg-zinc-900 text-zinc-100 font-bold rounded-md border border-zinc-800 hover:border-zinc-600 transition-colors text-center"
        >
          Download Resume
        </a>
      </div>
    </section>

    <!-- COMPETENCY GRID -->
    <section class="max-w-5xl mx-auto px-6 pb-32">
      <!-- Grid layout: 1 column on mobile, 3 columns on desktop -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div
          class="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg hover:border-emerald-500/50 transition-colors"
        >
          <h3 class="text-xl font-bold mb-2 text-zinc-100">Low-Level Systems</h3>
          <p class="text-zinc-400 text-sm mb-4">
            Memory management, algorithms, and logic execution.
          </p>
          <p class="font-mono text-xs text-emerald-400">C, C++, Lua</p>
        </div>

        <!-- Card 2 -->
        <div
          class="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg hover:border-emerald-500/50 transition-colors"
        >
          <h3 class="text-xl font-bold mb-2 text-zinc-100">Robotics & Hardware</h3>
          <p class="text-zinc-400 text-sm mb-4">
            Industrial automation, sensor fusion, and rapid prototyping.
          </p>
          <p class="font-mono text-xs text-emerald-400">Fusion 360, Computer Vision, RMRC</p>
        </div>

        <!-- Card 3 -->
        <div
          class="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg hover:border-emerald-500/50 transition-colors"
        >
          <h3 class="text-xl font-bold mb-2 text-zinc-100">Web Architecture</h3>
          <p class="text-zinc-400 text-sm mb-4">Responsive dashboards and scalable backend APIs.</p>
          <p class="font-mono text-xs text-emerald-400">Vue 3, Tailwind, Node.js, Spring Boot</p>
        </div>
      </div>
    </section>
  </main>
</template>
