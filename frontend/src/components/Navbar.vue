<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const route = useRoute()

const isMenuOpen = ref(false)
const scrollPercentage = ref(0)
const isScrolled = ref(false)

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'hu' : 'en'
}

const updateScrollProgress = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollPercentage.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
  isScrolled.value = scrollTop > 20
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
  updateScrollProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})

const navLinks = [
  { to: '/projects', labelKey: 'nav.architecture' },
  { to: '/skills', labelKey: 'nav.matrix' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/contact', labelKey: 'nav.contact' },
]
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 font-sans transition-all duration-300"
    :class="isScrolled
      ? 'border-b border-white/[0.06] shadow-[0_4px_32px_rgba(0,0,0,0.5)]'
      : 'border-b border-transparent'"
    :style="isScrolled ? 'background: rgba(5,8,16,0.88); backdrop-filter: blur(20px);' : 'background: transparent;'"
  >
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink
        to="/"
        class="flex items-center gap-2 font-mono font-bold tracking-widest text-sm uppercase transition-all duration-200 group"
        style="color: #00d4ff;"
        @click="isMenuOpen = false"
      >
        <span
          class="w-6 h-6 flex items-center justify-center rounded text-[10px] font-black"
          style="background: linear-gradient(135deg, rgba(0,212,255,0.2), rgba(56,112,255,0.2)); border: 1px solid rgba(0,212,255,0.3);"
        >&lt;/&gt;</span>
        <span class="group-hover:text-white transition-colors">TranRobi</span>
      </RouterLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-7 text-sm font-medium">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="route.path === link.to ? 'active' : ''"
        >
          {{ $t(link.labelKey) }}
        </RouterLink>

        <a
          href="/resume.pdf"
          target="_blank"
          class="nav-link"
        >
          {{ $t('nav.resume') }}
        </a>

        <!-- Language Toggle -->
        <button
          id="nav-lang-toggle"
          @click="toggleLanguage"
          class="ml-1 px-3 py-1.5 rounded-lg font-mono text-xs uppercase font-bold transition-all duration-200"
          style="background: rgba(0,212,255,0.08); border: 1px solid rgba(0,212,255,0.2); color: rgba(0,212,255,0.8);"
          onmouseover="this.style.background='rgba(0,212,255,0.15)'; this.style.borderColor='rgba(0,212,255,0.4)';"
          onmouseout="this.style.background='rgba(0,212,255,0.08)'; this.style.borderColor='rgba(0,212,255,0.2)';"
        >
          {{ locale }}
        </button>
      </nav>

      <!-- Hamburger -->
      <button
        id="nav-hamburger"
        @click="isMenuOpen = !isMenuOpen"
        class="flex md:hidden flex-col items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 focus:outline-none"
        style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);"
        aria-label="Toggle Menu"
      >
        <span
          class="block w-4 h-0.5 transition-all duration-300"
          :style="`background: ${isMenuOpen ? '#00d4ff' : 'rgba(226,232,240,0.6)'}; transform: ${isMenuOpen ? 'rotate(45deg) translateY(5px)' : 'none'};`"
        />
        <span
          class="block w-4 h-0.5 mt-1 transition-all duration-300"
          :style="`background: ${isMenuOpen ? '#00d4ff' : 'rgba(226,232,240,0.6)'}; opacity: ${isMenuOpen ? '0' : '1'};`"
        />
        <span
          class="block w-4 h-0.5 mt-1 transition-all duration-300"
          :style="`background: ${isMenuOpen ? '#00d4ff' : 'rgba(226,232,240,0.6)'}; transform: ${isMenuOpen ? 'rotate(-45deg) translateY(-9px)' : 'none'};`"
        />
      </button>
    </div>

    <!-- Mobile Drawer -->
    <Transition
      enter-active-class="transition-all duration-250 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div
        v-if="isMenuOpen"
        class="absolute top-full left-0 right-0 md:hidden flex flex-col p-6 gap-5 font-sans text-sm font-semibold shadow-2xl"
        style="background: rgba(5,8,16,0.95); backdrop-filter: blur(24px); border-bottom: 1px solid rgba(255,255,255,0.06);"
      >
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="transition-colors duration-200 flex items-center gap-2"
          :style="route.path === link.to ? 'color: #00d4ff;' : 'color: rgba(226,232,240,0.6);'"
          @click="isMenuOpen = false"
        >
          <span class="w-1 h-1 rounded-full" :style="`background: ${route.path === link.to ? '#00d4ff' : 'rgba(226,232,240,0.3)'};`" />
          {{ $t(link.labelKey) }}
        </RouterLink>

        <a
          href="/resume.pdf"
          target="_blank"
          style="color: rgba(226,232,240,0.6);"
          class="transition-colors duration-200 flex items-center gap-2"
          @click="isMenuOpen = false"
        >
          <span class="w-1 h-1 rounded-full" style="background: rgba(226,232,240,0.3);" />
          {{ $t('nav.resume') }}
        </a>

        <div class="flex items-center justify-between pt-2" style="border-top: 1px solid rgba(255,255,255,0.06);">
          <span class="text-xs font-mono uppercase tracking-widest" style="color: rgba(226,232,240,0.3);">Lang / Nyelv</span>
          <button
            @click="toggleLanguage"
            class="px-3 py-1.5 rounded-lg text-xs font-mono uppercase font-bold transition-all duration-200"
            style="background: rgba(0,212,255,0.08); border: 1px solid rgba(0,212,255,0.2); color: rgba(0,212,255,0.8);"
          >
            {{ locale }}
          </button>
        </div>
      </div>
    </Transition>

    <!-- Scroll Progress Bar -->
    <div
      class="absolute bottom-0 left-0 h-[2px] transition-all duration-75 ease-out"
      :style="{
        width: scrollPercentage + '%',
        background: 'linear-gradient(90deg, #00d4ff, #3870ff)',
        boxShadow: '0 0 8px rgba(0,212,255,0.6)'
      }"
    />
  </header>
</template>
