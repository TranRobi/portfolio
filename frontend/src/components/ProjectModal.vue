<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

interface Project {
  id: number
  titleKey: string
  descKey: string
  tech: string[]
  images: string[]
  featuresKey: string
  site: string[]
}

const props = defineProps<{
  project: Project | null
}>()

const emit = defineEmits(['close'])

const { tm, rt } = useI18n()

const currentSlide = ref(0)

const closeModal = () => {
  emit('close')
}

const nextSlide = () => {
  if (props.project) {
    currentSlide.value = (currentSlide.value + 1) % props.project.images.length
  }
}

const prevSlide = () => {
  if (props.project) {
    currentSlide.value =
      currentSlide.value === 0 ? props.project.images.length - 1 : currentSlide.value - 1
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (!props.project) return
  if (e.key === 'ArrowRight') {
    nextSlide()
  } else if (e.key === 'ArrowLeft') {
    prevSlide()
  } else if (e.key === 'Escape') {
    closeModal()
  }
}

watch(
  () => props.project,
  (newVal) => {
    if (newVal) {
      currentSlide.value = 0
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="project" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <!-- Backdrop blur overlay -->
      <div class="absolute inset-0 bg-zinc-950/85 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]" @click="closeModal"></div>

      <!-- Modal Card -->
      <div
        class="relative w-full max-w-4xl bg-zinc-900/95 border border-emerald-500/20 rounded-2xl shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col max-h-[92vh] animate-[scaleIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)] z-10"
      >
        <!-- Premium Close Button -->
        <button
          @click="closeModal"
          class="absolute top-4 right-4 z-30 w-10 h-10 flex items-center justify-center bg-zinc-950/85 border border-zinc-800 rounded-full text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 backdrop-blur-md transition-all duration-300 focus:outline-none"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div class="overflow-y-auto custom-scrollbar scroll-smooth flex-1">
          <!-- Image Carousel aspect-video -->
          <div class="relative w-full aspect-video bg-zinc-950 overflow-hidden group border-b border-zinc-800/80">
            <Transition
              enter-active-class="transition-opacity duration-300 ease-out"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-300 ease-in absolute inset-0"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <img
                :key="currentSlide"
                :src="project.images[currentSlide]"
                :alt="$t(project.titleKey)"
                class="w-full h-full object-cover scale-100 group-hover:scale-102 transition-transform duration-700"
              />
            </Transition>

            <!-- Bottom visual shadow blend -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none"
            ></div>

            <!-- Navigation slide arrows -->
            <button
              @click="prevSlide"
              class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-zinc-950/60 hover:bg-emerald-500 hover:text-black rounded-full text-xl backdrop-blur-md transition-all duration-300 focus:outline-none shadow-md"
              aria-label="Previous image"
            >
              ←
            </button>

            <button
              @click="nextSlide"
              class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-zinc-950/60 hover:bg-emerald-500 hover:text-black rounded-full text-xl backdrop-blur-md transition-all duration-300 focus:outline-none shadow-md"
              aria-label="Next image"
            >
              →
            </button>

            <!-- Numerator Indicator -->
            <div
              class="absolute bottom-4 right-4 px-3 py-1.5 bg-zinc-950/70 text-xs text-emerald-400 rounded-full font-mono backdrop-blur-md border border-zinc-800"
            >
              {{ currentSlide + 1 }} / {{ project.images.length }}
            </div>

            <!-- Indicator dots -->
            <div class="absolute bottom-4 left-4 flex gap-2 z-10">
              <button
                v-for="(img, idx) in project.images"
                :key="idx"
                @click="currentSlide = idx"
                class="h-2 rounded-full transition-all duration-300 focus:outline-none"
                :class="idx === currentSlide ? 'w-8 bg-emerald-400' : 'w-2 bg-zinc-500 hover:bg-zinc-400'"
                :aria-label="'Go to slide ' + (idx + 1)"
              ></button>
            </div>
          </div>

          <!-- Body contents -->
          <div class="p-6 md:p-8">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
              
              <!-- Main Content Area: description, key features -->
              <div class="md:col-span-3 space-y-6">
                <div>
                  <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                    {{ $t(project.titleKey) }}
                  </h2>
                  <p class="text-zinc-300 leading-relaxed text-sm sm:text-base">
                    {{ $t(project.descKey) }}
                  </p>
                </div>

                <div class="border-t border-zinc-800/80 pt-6">
                  <h3 class="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
                    {{ $t('projects.keyFeatures') }}
                  </h3>

                  <ul class="space-y-3">
                    <li
                      v-for="(feature, index) in tm(project.featuresKey)"
                      :key="index"
                      class="group flex items-start gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-950/40 hover:border-emerald-500/30 hover:bg-zinc-950/60 transition-all duration-300"
                    >
                      <div
                        class="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-xs shrink-0 group-hover:scale-110 group-hover:border-emerald-400/50 transition-all duration-300 shadow-sm"
                      >
                        {{ String(Number(index) + 1).padStart(2, '0') }}
                      </div>

                      <div class="flex-1">
                        <p class="text-zinc-300 text-sm font-medium leading-relaxed group-hover:text-zinc-100 transition-colors">
                          {{ rt(feature) }}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Sidebar panel area -->
              <div class="md:col-span-2 space-y-6">
                <!-- Tech Stack Card -->
                <div class="bg-zinc-950/40 border border-zinc-800/80 p-6 rounded-2xl shadow-sm">
                  <h3 class="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
                    Tech Stack
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="(t, index) in project.tech"
                      :key="index"
                      class="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 text-xs text-emerald-400 rounded-lg font-mono"
                    >
                      {{ t }}
                    </span>
                  </div>
                </div>

                <!-- Live Demo Card -->
                <div v-if="project.site && project.site.length > 0" class="bg-zinc-950/40 border border-zinc-800/80 p-6 rounded-2xl shadow-sm">
                  <h3 class="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
                    {{ $t('projects.liveDemo') }}
                  </h3>
                  <div class="flex flex-col gap-3">
                    <a
                      v-for="(url, idx) in project.site"
                      :key="idx"
                      :href="url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 font-mono text-xs hover:bg-emerald-500/10 hover:border-emerald-400/50 transition-all duration-300 shadow-sm"
                    >
                      <span class="truncate mr-2">{{ url.replace(/https?:\/\//, '') }}</span>
                      <svg class="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>

                <!-- Footer Profiles Card -->
                <div class="bg-zinc-950/40 border border-zinc-800/80 p-6 rounded-2xl flex items-center justify-around text-zinc-400 shadow-sm">
                  <!-- LinkedIn -->
                  <a
                    href="https://www.linkedin.com/in/dat-tran-duy-031541211/"
                    target="_blank"
                    rel="LinkedIn profile"
                    class="group flex flex-col items-center gap-1.5 hover:text-emerald-400 transition-colors"
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      />
                    </svg>
                    <span
                      class="text-[10px] font-mono opacity-60 group-hover:opacity-100 transition-opacity"
                    >
                      LinkedIn
                    </span>
                  </a>

                  <!-- GitHub -->
                  <a
                    href="https://github.com/TranRobi"
                    target="_blank"
                    rel="Github profile"
                    class="group flex flex-col items-center gap-1.5 hover:text-emerald-400 transition-colors"
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.302 24 12c0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                    <span
                      class="text-[10px] font-mono opacity-60 group-hover:opacity-100 transition-opacity"
                    >
                      GitHub
                    </span>
                  </a>

                  <!-- CV -->
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group flex flex-col items-center gap-1.5 hover:text-emerald-400 transition-colors"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span
                      class="text-[10px] font-mono opacity-60 group-hover:opacity-100 transition-opacity"
                    >
                      CV
                    </span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
