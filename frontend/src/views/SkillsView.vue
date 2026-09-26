<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useReveal } from '@/composables/useReveal'

useReveal()

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

// Skill proficiency levels (0-100) for visual bars
const proficiencyMap: Record<string, number> = {
  'C': 80,
  'C++': 75,
  'Lua': 65,
  'Fusion 360 (Intermediate)': 70,
  'Fusion 360 (Középszint)': 70,
  'Sensor Fusion': 65,
  'Szenzorfúzió': 65,
  'Robotics Logic': 72,
  'Robotikai Logika': 72,
  'Vue 3': 85,
  'Tailwind CSS': 88,
  'Next.js': 70,
  'SCSS/CSS': 82,
  'Node.js': 78,
  'Java Spring Boot': 68,
  'SQL': 72,
  'Git': 90,
  'Postman': 80,
  'REST API Design': 78,
  'REST API Tervezés': 78,
}

const getProficiency = (skill: string): number => {
  return proficiencyMap[skill] ?? 65
}

// Category icons
const categoryIcons = [
  // Hardware
  `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>`,
  // Low-level
  `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
  // Frontend
  `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
  // Backend
  `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/></svg>`,
  // Tooling
  `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
]

const categoryColors = [
  { icon: 'rgba(0,212,255,0.9)', bg: 'rgba(0,212,255,0.1)', border: 'rgba(0,212,255,0.2)' },
  { icon: 'rgba(168,85,247,0.9)', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.2)' },
  { icon: 'rgba(56,112,255,0.9)', bg: 'rgba(56,112,255,0.1)', border: 'rgba(56,112,255,0.2)' },
  { icon: 'rgba(34,197,94,0.9)', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)' },
  { icon: 'rgba(251,146,60,0.9)', bg: 'rgba(251,146,60,0.1)', border: 'rgba(251,146,60,0.2)' },
]

// Animate bars once mounted
const barsVisible = ref(false)
onMounted(() => {
  setTimeout(() => { barsVisible.value = true }, 300)
})
</script>

<template>
  <main class="min-h-screen text-slate-100 font-sans">
    <div class="max-w-6xl mx-auto px-6 pt-12 pb-20">

      <!-- Back link -->
      <RouterLink
        to="/"
        class="reveal inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-10 transition-all duration-200 group"
        style="color: rgba(0,212,255,0.6);"
      >
        <svg class="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        {{ $t('skills.returnMain') }}
      </RouterLink>

      <!-- Header -->
      <div class="reveal mb-3" style="animation-delay: 50ms;">
        <p class="section-label mb-3">// Competency Matrix</p>
        <h1 class="text-4xl md:text-5xl font-black tracking-tight text-white">{{ $t('skills.title') }}</h1>
      </div>
      <p class="reveal text-base max-w-2xl mb-14 leading-relaxed" style="color: rgba(226,232,240,0.5); animation-delay: 100ms;">
        {{ $t('skills.subtitle') }}
      </p>

      <!-- Skills grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <article
          v-for="(category, idx) in categories"
          :key="rt(category.title)"
          class="reveal glass-card p-6 group"
          :style="`animation-delay: ${100 + idx * 80}ms;`"
        >
          <!-- Icon + Title -->
          <div class="flex items-center gap-3 mb-5">
            <div
              class="w-10 h-10 flex items-center justify-center rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110"
              :style="`background: ${categoryColors[idx % categoryColors.length]!.bg}; border: 1px solid ${categoryColors[idx % categoryColors.length]!.border};`"
            >
              <span
                class="w-5 h-5 block"
                :style="`color: ${categoryColors[idx % categoryColors.length]!.icon};`"
                v-html="categoryIcons[idx % categoryIcons.length]"
              />
            </div>
            <div>
              <h2 class="text-base font-bold text-white leading-tight">{{ rt(category.title) }}</h2>
              <p class="text-xs mt-0.5" style="color: rgba(226,232,240,0.4);">{{ rt(category.description) }}</p>
            </div>
          </div>

          <!-- Skills with bars -->
          <ul class="space-y-4">
            <li
              v-for="skill in category.skills"
              :key="rt(skill)"
              class="flex flex-col gap-1.5"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono" style="color: rgba(226,232,240,0.75);">{{ rt(skill) }}</span>
                <span class="text-[10px] font-mono" :style="`color: ${categoryColors[idx % categoryColors.length]!.icon}; opacity: 0.7;`">
                  {{ getProficiency(rt(skill)) }}%
                </span>
              </div>
              <div class="skill-bar-bg">
                <div
                  class="skill-bar-fill"
                  :style="`
                    width: ${barsVisible ? getProficiency(rt(skill)) : 0}%;
                    background: linear-gradient(90deg, ${categoryColors[idx % categoryColors.length]!.icon.replace('0.9', '0.9')}, ${categoryColors[idx % categoryColors.length]!.icon.replace('0.9', '0.5')});
                    box-shadow: 0 0 8px ${categoryColors[idx % categoryColors.length]!.icon.replace('0.9', '0.4')};
                  `"
                />
              </div>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </main>
</template>
