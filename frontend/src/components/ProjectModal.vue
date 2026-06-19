<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

interface Project {
  id: number
  title: string
  desc: string
  tech: string[]
  images: string[]
  features: string[]
  site: string[]
}

const props = defineProps<{
  project: Project | null
}>()

const emit = defineEmits(['close'])

const currentSlide = ref(0)

watch(
  () => props.project,
  (newVal) => {
    if (newVal) {
      currentSlide.value = 0
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
})

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
      <div class="absolute inset-0 bg-zinc-950/85 backdrop-blur-md" @click="closeModal"></div>

      <div
        class="relative w-full max-w-4xl bg-zinc-900/95 border border-emerald-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        <button
          @click="closeModal"
          class="absolute top-4 right-4 z-20 p-2 bg-zinc-950/70 hover:bg-zinc-800 rounded-full text-zinc-300 hover:text-emerald-400 transition"
        >
          ✕
        </button>

        <div class="overflow-y-auto custom-scrollbar scroll-smooth">
          <div class="relative w-full aspect-video bg-black overflow-hidden group">
            <img
              :src="project.images[currentSlide]"
              :alt="project.title"
              class="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105"
            />

            <div
              class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"
            ></div>

            <button
              @click="prevSlide"
              class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-zinc-950/60 hover:bg-emerald-500 hover:text-black rounded-full text-xl backdrop-blur-md transition-all"
            >
              ←
            </button>

            <button
              @click="nextSlide"
              class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-zinc-950/60 hover:bg-emerald-500 hover:text-black rounded-full text-xl backdrop-blur-md transition-all"
            >
              →
            </button>

            <div
              class="absolute bottom-4 right-4 px-3 py-1 bg-zinc-950/70 text-sm text-emerald-400 rounded-full font-mono backdrop-blur-md"
            >
              {{ currentSlide + 1 }} / {{ project.images.length }}
            </div>

            <div class="absolute bottom-4 left-4 flex gap-2">
              <button
                v-for="(img, idx) in project.images"
                :key="idx"
                @click="currentSlide = idx"
                class="h-2 rounded-full transition-all duration-300"
                :class="idx === currentSlide ? 'w-8 bg-emerald-400' : 'w-2 bg-zinc-500'"
              ></button>
            </div>
          </div>

          <div class="p-6 md:p-8">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              {{ project.title }}
            </h2>

            <p class="text-zinc-300 leading-relaxed mb-8">
              {{ project.desc }}
            </p>

            <div class="flex flex-wrap gap-2 mb-8">
              <span
                v-for="(t, index) in project.tech"
                :key="index"
                class="px-3 py-1.5 bg-zinc-950 border border-zinc-800 text-sm text-emerald-400 rounded-lg font-mono"
              >
                {{ t }}
              </span>
            </div>

            <div v-if="project.site && project.site.length > 0" class="mt-8">
              <h3 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-3">Live Demo</h3>
              <div class="flex flex-wrap gap-3">
                <a
                  v-for="(url, idx) in project.site"
                  :key="idx"
                  :href="url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-sm hover:bg-emerald-500/20 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-900/30 transition-all duration-300"
                >
                  <svg class="w-4 h-4 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span>{{ url.replace(/https?:\/\//, '') }}</span>
                  <svg class="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            <div class="mt-10">
              <h3 class="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                Key Features
              </h3>

              <ul class="space-y-4">
                <li
                  v-for="(feature, index) in project.features"
                  :key="index"
                  class="group flex items-start gap-4 p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300"
                >
                  <div
                    class="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-sm shadow-md shadow-emerald-900/20 group-hover:scale-110 group-hover:border-emerald-400/60 transition-all duration-300"
                  >
                    {{ String(index + 1).padStart(2, '0') }}
                  </div>

                  <div class="flex-1">
                    <p class="text-zinc-100 font-medium leading-relaxed">
                      {{ feature }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div
              class="border-t border-zinc-800 pt-6 flex items-center justify-center gap-8 text-zinc-400"
            >
              <!-- LinkedIn -->
              <a
                href="https://www.linkedin.com/in/dat-tran-duy-031541211/"
                target="_blank"
                rel="LinkedIn profile"
                class="group flex flex-col items-center gap-2 hover:text-emerald-400 transition-all"
              >
                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  />
                </svg>
                <span
                  class="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  LinkedIn
                </span>
              </a>

              <a
                href="https://github.com/TranRobi"
                target="_blank"
                rel="Github profile"
                class="group flex flex-col items-center gap-2 hover:text-emerald-400 transition-all"
              >
                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.302 24 12c0-6.627-5.373-12-12-12z"
                  />
                </svg>
                <span
                  class="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  GitHub
                </span>
              </a>

              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex flex-col items-center gap-2 hover:text-emerald-400 transition-all"
              >
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span
                  class="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  CV
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
