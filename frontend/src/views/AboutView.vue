<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useReveal } from '@/composables/useReveal'

useReveal()
</script>

<template>
  <main class="min-h-screen text-slate-100 font-sans">
    <div class="max-w-6xl mx-auto px-6 pt-12 pb-20">

      <!-- Back -->
      <RouterLink
        to="/"
        class="reveal inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-10 transition-all duration-200 group"
        style="color: rgba(0,212,255,0.6);"
      >
        <svg class="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        {{ $t('about.returnMain') }}
      </RouterLink>

      <!-- Section Header -->
      <div class="reveal mb-3" style="animation-delay: 50ms;">
        <p class="section-label mb-3">{{ $t('about.label') }}</p>
        <h1 class="text-4xl md:text-5xl font-black tracking-tight text-white">{{ $t('about.title') }}</h1>
      </div>
      <p class="reveal text-base max-w-3xl mb-14 leading-relaxed" style="color: rgba(226,232,240,0.5); animation-delay: 100ms;">
        {{ $t('about.subtitle') }}
      </p>

      <!-- ═══ Info grid ═══ -->
      <div class="reveal grid grid-cols-1 md:grid-cols-5 gap-6 items-start mb-16" style="animation-delay: 150ms;">

        <!-- Left: System Parameters -->
        <div class="md:col-span-2 glass-card p-6 flex flex-col gap-6">
          <h2 class="text-xs font-mono uppercase tracking-widest flex items-center gap-2.5" style="color: rgba(0,212,255,0.8); border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 12px;">
            <span class="pulse-dot" />
            {{ $t('about.meta.title') }}
          </h2>

          <div class="space-y-4 font-mono text-sm">
            <div
              v-for="row in [
                { key: $t('about.meta.role'), val: $t('about.meta.roleVal'), accent: false },
                { key: $t('about.meta.focus'), val: $t('about.meta.focusVal'), accent: false },
                { key: $t('about.meta.location'), val: $t('about.meta.locationVal'), accent: false },
                { key: $t('about.meta.status'), val: $t('about.meta.statusVal'), accent: true },
              ]"
              :key="row.key"
              class="flex flex-col gap-1"
              style="border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 12px;"
            >
              <span class="text-[10px] uppercase tracking-widest" style="color: rgba(226,232,240,0.3);">{{ row.key }}</span>
              <span
                class="font-semibold text-sm flex items-center gap-1.5"
                :style="row.accent ? 'color: #00d4ff;' : 'color: rgba(226,232,240,0.85);'"
              >
                <span
                  v-if="row.accent"
                  class="w-1.5 h-1.5 rounded-full shrink-0"
                  style="background: #00d4ff; box-shadow: 0 0 6px #00d4ff;"
                />
                {{ row.val }}
              </span>
            </div>
          </div>

          <!-- Social links -->
          <div class="flex gap-3 pt-2">
            <a
              href="https://github.com/TranRobi"
              target="_blank"
              rel="noopener noreferrer"
              id="about-github-link"
              class="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
              style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);"
              onmouseover="this.style.borderColor='rgba(0,212,255,0.35)'; this.style.color='#00d4ff';"
              onmouseout="this.style.borderColor='rgba(255,255,255,0.08)'; this.style.color='rgba(226,232,240,0.5)';"
            >
              <svg class="w-4 h-4" fill="currentColor" style="color: rgba(226,232,240,0.5);" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.302 24 12 24 5.373 18.627 0 12 0z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/dat-tran-duy-031541211/"
              target="_blank"
              rel="noopener noreferrer"
              id="about-linkedin-link"
              class="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
              style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);"
              onmouseover="this.style.borderColor='rgba(0,212,255,0.35)'; this.style.color='#00d4ff';"
              onmouseout="this.style.borderColor='rgba(255,255,255,0.08)'; this.style.color='rgba(226,232,240,0.5)';"
            >
              <svg class="w-4 h-4" fill="currentColor" style="color: rgba(226,232,240,0.5);" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              id="about-resume-link"
              class="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
              style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);"
              onmouseover="this.style.borderColor='rgba(0,212,255,0.35)'; this.style.color='#00d4ff';"
              onmouseout="this.style.borderColor='rgba(255,255,255,0.08)'; this.style.color='rgba(226,232,240,0.5)';"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" style="color: rgba(226,232,240,0.5);" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Right: Story -->
        <div class="md:col-span-3 glass-card p-7 md:p-9">
          <h2 class="text-2xl font-bold text-white mb-5">{{ $t('about.storyTitle') }}</h2>
          <div class="space-y-4">
            <p class="text-sm leading-relaxed" style="color: rgba(226,232,240,0.65);">{{ $t('about.storyBody1') }}</p>
            <p class="text-sm leading-relaxed" style="color: rgba(226,232,240,0.65);">{{ $t('about.storyBody2') }}</p>
          </div>
        </div>
      </div>

      <!-- ═══ Core Values ═══ -->
      <div class="reveal mb-8" style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 48px; animation-delay: 200ms;">
        <p class="section-label mb-2">// Core</p>
        <h2 class="text-2xl font-bold text-white">{{ $t('about.valuesTitle') }}</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
        <div
          v-for="(value, idx) in [
            { t: $t('about.values.v1.title'), d: $t('about.values.v1.desc') },
            { t: $t('about.values.v2.title'), d: $t('about.values.v2.desc') },
            { t: $t('about.values.v3.title'), d: $t('about.values.v3.desc') },
          ]"
          :key="idx"
          class="reveal glass-card p-6 group flex flex-col gap-4"
          :style="`animation-delay: ${220 + idx * 80}ms;`"
        >
          <div
            class="w-10 h-10 flex items-center justify-center rounded-xl font-mono font-black text-sm transition-all duration-300 group-hover:scale-110"
            style="background: linear-gradient(135deg, rgba(0,212,255,0.12), rgba(56,112,255,0.08)); border: 1px solid rgba(0,212,255,0.2); color: #00d4ff;"
          >
            {{ String(idx + 1).padStart(2, '0') }}
          </div>
          <div>
            <h3 class="text-base font-bold text-white mb-2 group-hover:text-cyan transition-colors">{{ value.t }}</h3>
            <p class="text-sm leading-relaxed" style="color: rgba(226,232,240,0.5);">{{ value.d }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
