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

const closeModal = () => emit('close')

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
  if (e.key === 'ArrowRight') nextSlide()
  else if (e.key === 'ArrowLeft') prevSlide()
  else if (e.key === 'Escape') closeModal()
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
    <div
      v-if="project"
      class="fixed inset-0 z-[200] flex items-center justify-center p-3 pt-[72px] sm:p-6 sm:pt-[72px]"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0"
        style="background: rgba(5,8,16,0.88); backdrop-filter: blur(16px);"
        @click="closeModal"
      />

      <!-- Modal wrapper: relative so the close button can float outside the overflow-hidden card -->
      <div class="relative w-full max-w-4xl z-10" style="animation: scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1);">

        <!-- Close button: floats OUTSIDE the overflow-hidden card, always fully visible -->
        <button
          @click="closeModal"
          id="modal-close-btn"
          class="absolute -top-3 -right-3 z-20 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none"
          style="background: rgba(10,14,28,0.95); border: 1.5px solid rgba(0,212,255,0.5); color: #00d4ff; box-shadow: 0 0 16px rgba(0,212,255,0.2), 0 4px 12px rgba(0,0,0,0.6);"
          onmouseover="this.style.background='rgba(0,212,255,0.15)'; this.style.borderColor='rgba(0,212,255,0.9)'; this.style.boxShadow='0 0 24px rgba(0,212,255,0.4), 0 4px 12px rgba(0,0,0,0.6)'; this.style.transform='scale(1.1)'"
          onmouseout="this.style.background='rgba(10,14,28,0.95)'; this.style.borderColor='rgba(0,212,255,0.5)'; this.style.boxShadow='0 0 16px rgba(0,212,255,0.2), 0 4px 12px rgba(0,0,0,0.6)'; this.style.transform='scale(1)'"
          aria-label="Close modal"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Modal card -->
        <div
          class="relative w-full flex flex-col max-h-[calc(93vh-72px)] rounded-2xl overflow-hidden"
          style="
            background: rgba(10,14,28,0.96);
            border: 1px solid rgba(0,212,255,0.18);
            box-shadow: 0 0 60px rgba(0,212,255,0.08), 0 40px 80px rgba(0,0,0,0.6);
          "
        >

        <div class="overflow-y-auto custom-scrollbar flex-1">
          <!-- Image carousel -->
          <div
            v-if="project.images.length > 0"
            class="relative w-full aspect-video bg-black overflow-hidden group"
            style="border-bottom: 1px solid rgba(255,255,255,0.06);"
          >
            <Transition
              enter-active-class="transition-opacity duration-300 ease-out"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-200 ease-in absolute inset-0"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <img
                :key="currentSlide"
                :src="project.images[currentSlide]"
                :alt="$t(project.titleKey)"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </Transition>

            <!-- Gradient overlay -->
            <div
              class="absolute inset-0 pointer-events-none"
              style="background: linear-gradient(to top, rgba(10,14,28,0.7) 0%, transparent 50%, transparent 100%);"
            />

            <!-- Nav arrows (only if multiple images) -->
            <template v-if="project.images.length > 1">
              <button
                @click="prevSlide"
                class="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none"
                style="background: rgba(5,8,16,0.7); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(8px);"
                onmouseover="this.style.background='rgba(0,212,255,0.2)'; this.style.borderColor='rgba(0,212,255,0.4)';"
                onmouseout="this.style.background='rgba(5,8,16,0.7)'; this.style.borderColor='rgba(255,255,255,0.1)';"
                aria-label="Previous image"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                @click="nextSlide"
                class="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none"
                style="background: rgba(5,8,16,0.7); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(8px);"
                onmouseover="this.style.background='rgba(0,212,255,0.2)'; this.style.borderColor='rgba(0,212,255,0.4)';"
                onmouseout="this.style.background='rgba(5,8,16,0.7)'; this.style.borderColor='rgba(255,255,255,0.1)';"
                aria-label="Next image"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Indicator dots -->
              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                <button
                  v-for="(img, idx) in project.images"
                  :key="idx"
                  @click="currentSlide = idx"
                  class="h-1.5 rounded-full transition-all duration-300 focus:outline-none"
                  :style="idx === currentSlide
                    ? 'width: 24px; background: #00d4ff; box-shadow: 0 0 6px rgba(0,212,255,0.6);'
                    : 'width: 6px; background: rgba(255,255,255,0.35);'"
                  :aria-label="'Go to slide ' + (idx + 1)"
                />
              </div>

              <!-- Counter -->
              <div
                class="absolute bottom-4 right-4 px-2.5 py-1 rounded-lg text-xs font-mono z-10"
                style="background: rgba(5,8,16,0.7); border: 1px solid rgba(255,255,255,0.1); color: rgba(0,212,255,0.8); backdrop-filter: blur(8px);"
              >
                {{ currentSlide + 1 }} / {{ project.images.length }}
              </div>
            </template>
          </div>

          <!-- No image placeholder -->
          <div
            v-else
            class="w-full h-36 flex items-center justify-center"
            style="background: linear-gradient(135deg, rgba(0,212,255,0.04), rgba(56,112,255,0.04)); border-bottom: 1px solid rgba(255,255,255,0.06);"
          >
            <div class="flex flex-col items-center gap-2" style="color: rgba(226,232,240,0.2);">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-xs font-mono">No preview available</span>
            </div>
          </div>

          <!-- Body -->
          <div class="p-6 md:p-8">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">

              <!-- Main content -->
              <div class="md:col-span-3 space-y-7">
                <div>
                  <h2 class="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                    {{ $t(project.titleKey) }}
                  </h2>
                  <p class="text-sm leading-relaxed" style="color: rgba(226,232,240,0.6);">
                    {{ $t(project.descKey) }}
                  </p>
                </div>

                <!-- Key features -->
                <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 24px;">
                  <p class="text-[10px] font-mono uppercase tracking-widest mb-4" style="color: rgba(226,232,240,0.35);">
                    {{ $t('projects.keyFeatures') }}
                  </p>
                  <ul class="space-y-2.5">
                    <li
                      v-for="(feature, index) in tm(project.featuresKey)"
                      :key="index"
                      class="flex items-start gap-3 p-3.5 rounded-xl group transition-all duration-200"
                      style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);"
                      onmouseover="this.style.borderColor='rgba(0,212,255,0.2)'; this.style.background='rgba(0,212,255,0.04)';"
                      onmouseout="this.style.borderColor='rgba(255,255,255,0.05)'; this.style.background='rgba(255,255,255,0.02)';"
                    >
                      <div
                        class="w-6 h-6 flex items-center justify-center rounded-lg font-mono font-bold text-[10px] shrink-0"
                        style="background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.2); color: rgba(0,212,255,0.8);"
                      >
                        {{ String(Number(index) + 1).padStart(2, '0') }}
                      </div>
                      <p class="text-sm leading-relaxed" style="color: rgba(226,232,240,0.7);">
                        {{ rt(feature) }}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Sidebar -->
              <div class="md:col-span-2 space-y-4">
                <!-- Tech stack -->
                <div
                  class="p-5 rounded-2xl"
                  style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);"
                >
                  <p class="text-[10px] font-mono uppercase tracking-widest mb-3.5" style="color: rgba(226,232,240,0.35);">
                    Tech Stack
                  </p>
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="(t, index) in project.tech"
                      :key="index"
                      class="tech-tag"
                    >
                      {{ t }}
                    </span>
                  </div>
                </div>

                <!-- Live demo -->
                <div
                  v-if="project.site && project.site.length > 0"
                  class="p-5 rounded-2xl"
                  style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);"
                >
                  <p class="text-[10px] font-mono uppercase tracking-widest mb-3.5" style="color: rgba(226,232,240,0.35);">
                    {{ $t('projects.liveDemo') }}
                  </p>
                  <div class="flex flex-col gap-2">
                    <a
                      v-for="(url, idx) in project.site"
                      :key="idx"
                      :href="url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs transition-all duration-200"
                      style="background: rgba(0,212,255,0.06); border: 1px solid rgba(0,212,255,0.2); color: rgba(0,212,255,0.8);"
                      onmouseover="this.style.background='rgba(0,212,255,0.12)'; this.style.borderColor='rgba(0,212,255,0.4)';"
                      onmouseout="this.style.background='rgba(0,212,255,0.06)'; this.style.borderColor='rgba(0,212,255,0.2)';"
                    >
                      <span class="truncate mr-2">{{ url.replace(/https?:\/\//, '') }}</span>
                      <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>

                <!-- Profile links -->
                <div
                  class="p-5 rounded-2xl flex items-center justify-around"
                  style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);"
                >
                  <a
                    href="https://www.linkedin.com/in/dat-tran-duy-031541211/"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="modal-linkedin-link"
                    class="flex flex-col items-center gap-1.5 transition-colors duration-200 group"
                    style="color: rgba(226,232,240,0.4);"
                    onmouseover="this.style.color='#00d4ff'"
                    onmouseout="this.style.color='rgba(226,232,240,0.4)'"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span class="text-[10px] font-mono">LinkedIn</span>
                  </a>

                  <a
                    href="https://github.com/TranRobi"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="modal-github-link"
                    class="flex flex-col items-center gap-1.5 transition-colors duration-200"
                    style="color: rgba(226,232,240,0.4);"
                    onmouseover="this.style.color='#00d4ff'"
                    onmouseout="this.style.color='rgba(226,232,240,0.4)'"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.302 24 12 24 5.373 18.627 0 12 0z"/>
                    </svg>
                    <span class="text-[10px] font-mono">GitHub</span>
                  </a>

                  <a
                    href="/resume.pdf"
                    target="_blank"
                    id="modal-cv-link"
                    class="flex flex-col items-center gap-1.5 transition-colors duration-200"
                    style="color: rgba(226,232,240,0.4);"
                    onmouseover="this.style.color='#00d4ff'"
                    onmouseout="this.style.color='rgba(226,232,240,0.4)'"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <span class="text-[10px] font-mono">CV</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
