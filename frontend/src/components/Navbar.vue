<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'hu' : 'en'
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 font-sans"
  >
    <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <RouterLink
        to="/"
        class="font-mono text-emerald-400 font-bold tracking-widest text-sm uppercase hover:text-emerald-300 transition-colors"
      >
        SYS.ADMIN //
      </RouterLink>

      <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
        <RouterLink
          to="/projects"
          class="text-zinc-400 hover:text-zinc-100 transition-colors"
          active-class="text-emerald-400"
        >
          {{ $t('nav.architecture') }}
        </RouterLink>
        <RouterLink
          to="/skills"
          class="text-zinc-400 hover:text-zinc-100 transition-colors"
          active-class="text-emerald-400"
        >
          {{ $t('nav.matrix') }}
        </RouterLink>
        <RouterLink
          to="/contact"
          class="text-zinc-400 hover:text-zinc-100 transition-colors"
          active-class="text-emerald-400"
        >
          {{ $t('nav.contact') }}
        </RouterLink>
        <a
          href="/resume.pdf"
          target="_blank"
          class="text-zinc-400 hover:text-emerald-400 transition-colors font-mono"
        >
          {{ $t('nav.resume') }}
        </a>

        <button
          @click="toggleLanguage"
          class="text-zinc-400 ml-4 px-2 py-1 border border-zinc-700 rounded text-xs font-mono hover:border-emerald-500 hover:text-emerald-400 transition-colors uppercase"
        >
          {{ locale }}
        </button>
      </nav>
    </div>
  </header>
</template>
