<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main
    class="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans selection:bg-emerald-500 selection:text-white"
  >
    <div class="max-w-5xl mx-auto pt-10">
      <!-- Back Link -->
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-mono text-sm mb-10 transition-colors"
      >
        <span aria-hidden="true">←</span> {{ $t('about.returnMain') }}
      </RouterLink>

      <!-- Section Header -->
      <p class="text-emerald-400 font-mono text-sm uppercase tracking-widest mb-3">
        {{ $t('about.label') }}
      </p>
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{{ $t('about.title') }}</h1>
      <p class="text-zinc-400 text-lg mb-12 max-w-3xl leading-relaxed">
        {{ $t('about.subtitle') }}
      </p>

      <!-- Dashboard Split Grid -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8 items-start mb-16">
        <!-- Left Side: System Metrics Card (2 Cols) -->
        <div
          class="md:col-span-2 bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl shadow-xl flex flex-col gap-6"
        >
          <h2
            class="text-base font-mono uppercase tracking-wider text-emerald-400 border-b border-zinc-800 pb-3 flex items-center gap-2"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
              ></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {{ $t('about.meta.title') }}
          </h2>

          <div class="space-y-4 font-mono text-sm">
            <div class="flex flex-col gap-1 border-b border-zinc-900 pb-2">
              <span class="text-zinc-500 text-xs uppercase">{{ $t('about.meta.role') }}</span>
              <span class="text-zinc-200 font-semibold">{{ $t('about.meta.roleVal') }}</span>
            </div>

            <div class="flex flex-col gap-1 border-b border-zinc-900 pb-2">
              <span class="text-zinc-500 text-xs uppercase">{{ $t('about.meta.focus') }}</span>
              <span class="text-zinc-200 font-semibold">{{ $t('about.meta.focusVal') }}</span>
            </div>

            <div class="flex flex-col gap-1 border-b border-zinc-900 pb-2">
              <span class="text-zinc-500 text-xs uppercase">{{ $t('about.meta.location') }}</span>
              <span class="text-zinc-200 font-semibold">{{ $t('about.meta.locationVal') }}</span>
            </div>

            <div class="flex flex-col gap-1">
              <span class="text-zinc-500 text-xs uppercase">{{ $t('about.meta.status') }}</span>
              <span class="text-emerald-400 font-bold flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span>
                {{ $t('about.meta.statusVal') }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right Side: Narrative (3 Cols) -->
        <div
          class="md:col-span-3 space-y-6 bg-zinc-900/20 border border-zinc-900/60 p-6 md:p-8 rounded-2xl"
        >
          <h2 class="text-2xl font-bold text-white tracking-tight">{{ $t('about.storyTitle') }}</h2>
          <p class="text-zinc-300 leading-relaxed text-sm sm:text-base">
            {{ $t('about.storyBody1') }}
          </p>
          <p class="text-zinc-300 leading-relaxed text-sm sm:text-base">
            {{ $t('about.storyBody2') }}
          </p>
        </div>
      </div>

      <!-- Core Directives Section -->
      <div class="border-t border-zinc-800/80 pt-12">
        <h2 class="text-2xl font-bold text-white tracking-tight mb-8">
          {{ $t('about.valuesTitle') }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Card 1 -->
          <div
            class="group border border-zinc-800 bg-zinc-900/40 p-6 rounded-2xl hover:border-emerald-500/30 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col gap-4"
          >
            <div
              class="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-955 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-sm shrink-0 group-hover:scale-110 group-hover:border-emerald-400/50 transition-all duration-300"
            >
              01
            </div>
            <div>
              <h3
                class="text-lg font-bold text-zinc-100 mb-2 group-hover:text-emerald-400 transition-colors"
              >
                {{ $t('about.values.v1.title') }}
              </h3>
              <p class="text-zinc-400 text-sm leading-relaxed">
                {{ $t('about.values.v1.desc') }}
              </p>
            </div>
          </div>

          <!-- Card 2 -->
          <div
            class="group border border-zinc-800 bg-zinc-900/40 p-6 rounded-2xl hover:border-emerald-500/30 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col gap-4"
          >
            <div
              class="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-955 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-sm shrink-0 group-hover:scale-110 group-hover:border-emerald-400/50 transition-all duration-300"
            >
              02
            </div>
            <div>
              <h3
                class="text-lg font-bold text-zinc-100 mb-2 group-hover:text-emerald-400 transition-colors"
              >
                {{ $t('about.values.v2.title') }}
              </h3>
              <p class="text-zinc-400 text-sm leading-relaxed">
                {{ $t('about.values.v2.desc') }}
              </p>
            </div>
          </div>

          <!-- Card 3 -->
          <div
            class="group border border-zinc-800 bg-zinc-900/40 p-6 rounded-2xl hover:border-emerald-500/30 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col gap-4"
          >
            <div
              class="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-955 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-sm shrink-0 group-hover:scale-110 group-hover:border-emerald-400/50 transition-all duration-300"
            >
              03
            </div>
            <div>
              <h3
                class="text-lg font-bold text-zinc-100 mb-2 group-hover:text-emerald-400 transition-colors"
              >
                {{ $t('about.values.v3.title') }}
              </h3>
              <p class="text-zinc-400 text-sm leading-relaxed">
                {{ $t('about.values.v3.desc') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
