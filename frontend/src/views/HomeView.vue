<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useReveal } from '@/composables/useReveal'

useReveal()

// Typewriter effect
const displayedText = ref('')
const fullText = 'Bridging hardware & software.'
const cursor = ref(true)
let charIndex = 0
let cursorInterval: ReturnType<typeof setInterval>

onMounted(() => {
  setTimeout(() => {
    const typeInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        displayedText.value += fullText[charIndex]
        charIndex++
      } else {
        clearInterval(typeInterval)
      }
    }, 55)
  }, 600)

  cursorInterval = setInterval(() => {
    cursor.value = !cursor.value
  }, 530)
})
</script>

<template>
  <main class="min-h-screen text-slate-100 font-sans" style="color: #e2e8f0;">
    <!-- ═══════════════════════ HERO SECTION ═══════════════════════ -->
    <section class="relative max-w-6xl mx-auto px-6 pt-28 pb-20 min-h-[90vh] flex flex-col justify-center">
      <!-- Top badge -->
      <div
        class="reveal inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest mb-8 w-fit"
        style="background: rgba(0,212,255,0.08); border: 1px solid rgba(0,212,255,0.2); color: rgba(0,212,255,0.9); animation-delay: 0ms;"
      >
        <span class="pulse-dot" />
        {{ $t('home.systemInit') }}
      </div>

      <!-- Main heading -->
      <h1
        class="reveal text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight mb-6 leading-[1.05]"
        style="animation-delay: 100ms;"
      >
        <span
          class="font-mono"
          style="background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"
        >
          {{ displayedText }}<span
            v-if="cursor"
            class="inline-block w-1 h-16 ml-1 align-middle"
            style="-webkit-text-fill-color: #00d4ff; background: #00d4ff; border-radius: 1px;"
          />
        </span>
      </h1>

      <!-- Subtitle -->
      <p
        class="reveal text-base sm:text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
        style="color: rgba(226,232,240,0.55); animation-delay: 200ms;"
      >
        {{ $t('home.subtitle') }}
      </p>

      <!-- CTA Buttons -->
      <div class="reveal flex flex-col sm:flex-row gap-4 mb-20" style="animation-delay: 300ms;">
        <RouterLink to="/projects" id="hero-btn-projects" class="btn-primary font-sans">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {{ $t('home.btnProjects') }}
        </RouterLink>

        <RouterLink to="/skills" id="hero-btn-skills" class="btn-secondary font-sans">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {{ $t('home.btnSkills') }}
        </RouterLink>

        <a href="/resume.pdf" target="_blank" id="hero-btn-resume" class="btn-secondary font-sans">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {{ $t('home.btnResume') }}
        </a>
      </div>

      <!-- Stat row -->
      <div class="reveal flex flex-wrap gap-8" style="animation-delay: 400ms;">
        <div v-for="stat in [
          { value: '5+', label: $t('home.stats.projects') },
          { value: '2yr', label: $t('home.stats.robocup') },
          { value: '5+', label: $t('home.stats.languages') },
        ]" :key="stat.label" class="flex flex-col">
          <span class="text-3xl font-black font-mono gradient-text-cyan">{{ stat.value }}</span>
          <span class="text-xs font-mono uppercase tracking-widest mt-0.5" style="color: rgba(226,232,240,0.4);">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════ SPECIALIZATION CARDS ═══════════════════════ -->
    <section class="max-w-6xl mx-auto px-6 pb-20">
      <div class="reveal mb-10" style="animation-delay: 0ms;">
        <p class="section-label mb-2">{{ $t('home.expertiseLabel') }}</p>
        <h2 class="text-2xl font-bold text-white">{{ $t('home.expertiseTitle') }}</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- Low-level Systems -->
        <div
          class="reveal glass-card p-6 group"
          style="animation-delay: 100ms;"
        >
          <div
            class="w-12 h-12 flex items-center justify-center rounded-xl mb-5 transition-all duration-300 group-hover:scale-110"
            style="background: linear-gradient(135deg, rgba(0,212,255,0.15), rgba(56,112,255,0.1)); border: 1px solid rgba(0,212,255,0.2);"
          >
            <svg class="w-5 h-5" fill="none" stroke="#00d4ff" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-white mb-2 group-hover:text-cyan transition-colors">
            {{ $t('home.categories.lowlevel.title') }}
          </h3>
          <p class="text-sm leading-relaxed mb-4" style="color: rgba(226,232,240,0.5);">
            {{ $t('home.categories.lowlevel.desc') }}
          </p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="t in ['C', 'C++', 'Lua']" :key="t" class="tech-tag">{{ t }}</span>
          </div>
        </div>

        <!-- Robotics -->
        <div
          class="reveal glass-card p-6 group"
          style="animation-delay: 200ms;"
        >
          <div
            class="w-12 h-12 flex items-center justify-center rounded-xl mb-5 transition-all duration-300 group-hover:scale-110"
            style="background: linear-gradient(135deg, rgba(56,112,255,0.15), rgba(168,85,247,0.1)); border: 1px solid rgba(56,112,255,0.2);"
          >
            <svg class="w-5 h-5" fill="none" stroke="#3870ff" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-white mb-2 group-hover:text-cyan transition-colors">
            {{ $t('home.categories.robotics.title') }}
          </h3>
          <p class="text-sm leading-relaxed mb-4" style="color: rgba(226,232,240,0.5);">
            {{ $t('home.categories.robotics.desc') }}
          </p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="t in ['Fusion 360', 'Computer Vision', 'RMRC']" :key="t" class="tech-tag">{{ t }}</span>
          </div>
        </div>

        <!-- Web -->
        <div
          class="reveal glass-card p-6 group"
          style="animation-delay: 300ms;"
        >
          <div
            class="w-12 h-12 flex items-center justify-center rounded-xl mb-5 transition-all duration-300 group-hover:scale-110"
            style="background: linear-gradient(135deg, rgba(168,85,247,0.15), rgba(0,212,255,0.1)); border: 1px solid rgba(168,85,247,0.2);"
          >
            <svg class="w-5 h-5" fill="none" stroke="#a855f7" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-white mb-2 group-hover:text-cyan transition-colors">
            {{ $t('home.categories.web.title') }}
          </h3>
          <p class="text-sm leading-relaxed mb-4" style="color: rgba(226,232,240,0.5);">
            {{ $t('home.categories.web.desc') }}
          </p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="t in ['Vue 3', 'Tailwind', 'Node.js', 'Spring Boot']" :key="t" class="tech-tag">{{ t }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════ MARQUEE ═══════════════════════ -->
    <section class="relative flex overflow-x-hidden py-6 mb-8" style="border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.01);">
      <!-- Edge fades -->
      <div class="absolute inset-y-0 left-0 w-24 pointer-events-none z-10" style="background: linear-gradient(90deg, #050810, transparent);" />
      <div class="absolute inset-y-0 right-0 w-24 pointer-events-none z-10" style="background: linear-gradient(-90deg, #050810, transparent);" />

      <div
        class="flex w-[200%] hover:[animation-play-state:paused]"
        style="animation: marquee-lr 20s linear infinite;"
      >
        <div class="flex w-1/2 justify-around items-center gap-6 shrink-0 px-6">
          <span
            v-for="item in [$t('home.marquee.fast'), $t('home.marquee.secure'), $t('home.marquee.reliable'), $t('home.marquee.performance'), $t('home.marquee.systemsThinker')]"
            :key="item"
            class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest font-mono whitespace-nowrap"
            style="background: rgba(0,212,255,0.06); border: 1px solid rgba(0,212,255,0.15); color: rgba(0,212,255,0.8);"
          >
            <span class="w-1 h-1 rounded-full" style="background: #00d4ff;" />
            {{ item }}
          </span>
        </div>
        <div class="flex w-1/2 justify-around items-center gap-6 shrink-0 px-6" aria-hidden="true">
          <span
            v-for="item in [$t('home.marquee.fast'), $t('home.marquee.secure'), $t('home.marquee.reliable'), $t('home.marquee.performance'), $t('home.marquee.systemsThinker')]"
            :key="item + '-dup'"
            class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest font-mono whitespace-nowrap"
            style="background: rgba(0,212,255,0.06); border: 1px solid rgba(0,212,255,0.15); color: rgba(0,212,255,0.8);"
          >
            <span class="w-1 h-1 rounded-full" style="background: #00d4ff;" />
            {{ item }}
          </span>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════ MINI CTA ═══════════════════════ -->
    <section class="max-w-6xl mx-auto px-6 py-20">
      <div
        class="reveal glass-card p-10 md:p-14 text-center relative overflow-hidden"
        style="background: linear-gradient(135deg, rgba(0,212,255,0.04), rgba(56,112,255,0.04));"
      >
        <div class="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <h2 class="text-3xl md:text-4xl font-black text-white mb-4 relative z-10">
          {{ $t('home.ctaTitle') }}
        </h2>
        <p class="text-base mb-8 max-w-xl mx-auto relative z-10" style="color: rgba(226,232,240,0.5);">
          {{ $t('home.ctaSubtitle') }}
        </p>
        <RouterLink to="/contact" id="cta-contact-btn" class="btn-primary inline-flex relative z-10">
          {{ $t('home.ctaBtn') }}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </RouterLink>
      </div>
    </section>
  </main>
</template>
