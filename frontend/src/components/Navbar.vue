<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const isMenuOpen = ref(false)
const scrollPercentage = ref(0)

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'hu' : 'en'
}

const updateScrollProgress = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  if (docHeight > 0) {
    scrollPercentage.value = (scrollTop / docHeight) * 100
  } else {
    scrollPercentage.value = 0
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
  updateScrollProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 font-sans"
  >
    <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <RouterLink
        to="/"
        class="font-mono text-emerald-400 font-bold tracking-widest text-sm uppercase hover:text-emerald-300 transition-colors"
        @click="isMenuOpen = false"
      >
        SYS.ADMIN //
      </RouterLink>

      <!-- Desktop Navigation -->
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
          to="/about"
          class="text-zinc-400 hover:text-zinc-100 transition-colors"
          active-class="text-emerald-400"
        >
          {{ $t('nav.about') }}
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

      <!-- Hamburger Menu Button -->
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="flex md:hidden flex-col items-center justify-center w-8 h-8 rounded border border-zinc-800 hover:border-emerald-500/50 hover:text-emerald-400 text-zinc-400 transition-colors focus:outline-none"
        aria-label="Toggle Menu"
      >
        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            v-if="!isMenuOpen"
            fill-rule="evenodd"
            d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 5h14a1 1 0 110 2H3a1 1 0 110-2z"
            clip-rule="evenodd"
          />
          <path
            v-else
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Navigation Drawer -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMenuOpen"
        class="absolute top-16 left-0 right-0 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-lg md:hidden flex flex-col p-6 gap-6 font-sans text-base font-semibold shadow-2xl"
      >
        <RouterLink
          to="/projects"
          class="text-zinc-400 hover:text-zinc-100 hover:translate-x-1 transition-all"
          active-class="text-emerald-400"
          @click="isMenuOpen = false"
        >
          {{ $t('nav.architecture') }}
        </RouterLink>
        <RouterLink
          to="/skills"
          class="text-zinc-400 hover:text-zinc-100 hover:translate-x-1 transition-all"
          active-class="text-emerald-400"
          @click="isMenuOpen = false"
        >
          {{ $t('nav.matrix') }}
        </RouterLink>
        <RouterLink
          to="/about"
          class="text-zinc-400 hover:text-zinc-100 hover:translate-x-1 transition-all"
          active-class="text-emerald-400"
          @click="isMenuOpen = false"
        >
          {{ $t('nav.about') }}
        </RouterLink>
        <RouterLink
          to="/contact"
          class="text-zinc-400 hover:text-zinc-100 hover:translate-x-1 transition-all"
          active-class="text-emerald-400"
          @click="isMenuOpen = false"
        >
          {{ $t('nav.contact') }}
        </RouterLink>
        <a
          href="/resume.pdf"
          target="_blank"
          class="text-zinc-400 hover:text-emerald-400 hover:translate-x-1 transition-all font-mono"
          @click="isMenuOpen = false"
        >
          {{ $t('nav.resume') }}
        </a>

        <div class="border-t border-zinc-800 pt-4 flex items-center justify-between">
          <span class="text-xs font-mono text-zinc-500 uppercase tracking-widest">Language / Nyelv</span>
          <button
            @click="toggleLanguage"
            class="text-zinc-400 px-3 py-1.5 border border-zinc-700 rounded font-mono hover:border-emerald-500 hover:text-emerald-400 transition-colors uppercase text-sm"
          >
            {{ locale }}
          </button>
        </div>
      </div>
    </Transition>

    <!-- Scroll Progress Indicator Bar -->
    <div
      class="absolute bottom-0 left-0 h-[2px] bg-emerald-500 shadow-[0_0_8px_#10b981] transition-all duration-75 ease-out"
      :style="{ width: scrollPercentage + '%' }"
    ></div>
  </header>
</template>
