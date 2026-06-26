<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { tm, rt } = useI18n()

interface SkillCategory {
  title: string
  description: string
  skills: string[]
}

const categories = computed(() => {
  const raw = tm('skills.categories') as Record<string, SkillCategory>
  return Object.values(raw)
})
</script>

<template>
  <main
    class="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans selection:bg-emerald-500 selection:text-white"
  >
    <div class="max-w-5xl mx-auto pt-10">
      <RouterLink
        to="/"
        class="inline-flex text-emerald-400 hover:text-emerald-300 font-mono text-sm items-center gap-2 mb-10 transition-colors"
      >
        <span aria-hidden="true">&larr;</span> {{ $t('skills.returnMain') }}
      </RouterLink>

      <h1 class="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">{{ $t('skills.title') }}</h1>
      <p class="text-zinc-400 text-lg mb-12 max-w-2xl">
        {{ $t('skills.subtitle') }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="category in categories"
          :key="rt(category.title)"
          class="border border-zinc-800 bg-zinc-900/40 p-6 rounded-lg hover:border-emerald-500/50 transition-colors"
        >
          <h2 class="text-xl font-bold text-zinc-100 mb-1">{{ rt(category.title) }}</h2>
          <p class="text-zinc-500 text-sm mb-4">{{ rt(category.description) }}</p>

          <ul class="space-y-2">
            <li
              v-for="skill in category.skills"
              :key="rt(skill)"
              class="flex items-center gap-2 font-mono text-sm text-emerald-400"
            >
              <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span>
              {{ rt(skill) }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </main>
</template>
