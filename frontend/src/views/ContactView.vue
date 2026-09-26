<script setup lang="ts">
import { ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { useReveal } from '@/composables/useReveal'

useReveal()

const form = reactive({
  name: '',
  email: '',
  message: '',
})

type Status = 'idle' | 'sending' | 'success' | 'error'
const status = ref<Status>('idle')
const errorMsg = ref('')

const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_URL || 'https://formspree.io/f/xqeorbzk'

const submit = async () => {
  if (!form.name || !form.email || !form.message) return
  status.value = 'sending'
  errorMsg.value = ''
  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...form }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.errors?.[0]?.message ?? `Error ${res.status}`)
    status.value = 'success'
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (e) {
    status.value = 'error'
    errorMsg.value = e instanceof Error ? e.message : 'Unknown error'
  }
}

const reset = () => {
  status.value = 'idle'
  errorMsg.value = ''
}
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
        Return to Main System
      </RouterLink>

      <!-- Two-column layout -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

        <!-- Left: Info column -->
        <div class="lg:col-span-2">
          <div class="reveal" style="animation-delay: 50ms;">
            <p class="section-label mb-3">// Open Channel</p>
            <h1 class="text-4xl md:text-5xl font-black tracking-tight text-white mb-5">Contact</h1>
            <p class="text-sm leading-relaxed mb-8" style="color: rgba(226,232,240,0.5);">
              Have a project, collaboration, or question? Drop a message and I'll get back to you as soon as possible.
            </p>
          </div>

          <!-- Contact cards -->
          <div class="reveal flex flex-col gap-3" style="animation-delay: 120ms;">
            <a
              href="https://www.linkedin.com/in/dat-tran-duy-031541211/"
              target="_blank"
              rel="noopener noreferrer"
              id="contact-linkedin"
              class="glass-card p-4 flex items-center gap-4 group"
            >
              <div
                class="w-10 h-10 flex items-center justify-center rounded-xl shrink-0 transition-all duration-300 group-hover:scale-110"
                style="background: rgba(56,112,255,0.12); border: 1px solid rgba(56,112,255,0.25);"
              >
                <svg class="w-5 h-5" fill="currentColor" style="color: rgba(56,112,255,0.9);" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-semibold text-white group-hover:text-cyan transition-colors">LinkedIn</p>
                <p class="text-xs font-mono" style="color: rgba(226,232,240,0.4);">dat-tran-duy</p>
              </div>
              <svg class="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5" fill="none" stroke="#00d4ff" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a
              href="https://github.com/TranRobi"
              target="_blank"
              rel="noopener noreferrer"
              id="contact-github"
              class="glass-card p-4 flex items-center gap-4 group"
            >
              <div
                class="w-10 h-10 flex items-center justify-center rounded-xl shrink-0 transition-all duration-300 group-hover:scale-110"
                style="background: rgba(226,232,240,0.06); border: 1px solid rgba(226,232,240,0.1);"
              >
                <svg class="w-5 h-5" fill="currentColor" style="color: rgba(226,232,240,0.7);" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.302 24 12 24 5.373 18.627 0 12 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-semibold text-white group-hover:text-cyan transition-colors">GitHub</p>
                <p class="text-xs font-mono" style="color: rgba(226,232,240,0.4);">@TranRobi</p>
              </div>
              <svg class="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5" fill="none" stroke="#00d4ff" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              id="contact-resume"
              class="glass-card p-4 flex items-center gap-4 group"
            >
              <div
                class="w-10 h-10 flex items-center justify-center rounded-xl shrink-0 transition-all duration-300 group-hover:scale-110"
                style="background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.2);"
              >
                <svg class="w-5 h-5" fill="none" stroke="#00d4ff" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-semibold text-white group-hover:text-cyan transition-colors">Resume / CV</p>
                <p class="text-xs font-mono" style="color: rgba(226,232,240,0.4);">Download PDF</p>
              </div>
              <svg class="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200" fill="none" stroke="#00d4ff" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Right: Form column -->
        <div class="lg:col-span-3">

          <!-- Success state -->
          <Transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div
              v-if="status === 'success'"
              class="glass-card p-12 flex flex-col items-center gap-5 text-center"
              style="border-color: rgba(0,212,255,0.2); background: linear-gradient(135deg, rgba(0,212,255,0.04), rgba(56,112,255,0.03));"
            >
              <div
                class="w-20 h-20 flex items-center justify-center rounded-full"
                style="background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.3); box-shadow: 0 0 40px rgba(0,212,255,0.15);"
              >
                <svg class="w-9 h-9" fill="none" stroke="#00d4ff" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="text-xl font-bold text-white mb-1">Message transmitted.</p>
                <p class="text-sm" style="color: rgba(226,232,240,0.5);">I'll get back to you soon.</p>
              </div>
              <button
                @click="reset"
                id="contact-send-another"
                class="btn-secondary text-sm mt-2"
              >
                Send another
              </button>
            </div>
          </Transition>

          <!-- Form -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
          >
            <form
              v-if="status !== 'success'"
              @submit.prevent="submit"
              class="reveal glass-card p-7 md:p-9 space-y-5"
              style="animation-delay: 80ms;"
              novalidate
            >
              <h2 class="text-lg font-bold text-white mb-1">Send a Message</h2>
              <p class="text-xs font-mono mb-5" style="color: rgba(226,232,240,0.35); border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 16px;">All fields required.</p>

              <!-- Name -->
              <div class="flex flex-col gap-2">
                <label for="contact-name" class="text-[10px] font-mono uppercase tracking-widest" style="color: rgba(226,232,240,0.4);">Name</label>
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Your name"
                  class="form-input"
                />
              </div>

              <!-- Email -->
              <div class="flex flex-col gap-2">
                <label for="contact-email" class="text-[10px] font-mono uppercase tracking-widest" style="color: rgba(226,232,240,0.4);">Email</label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  class="form-input"
                />
              </div>

              <!-- Message -->
              <div class="flex flex-col gap-2">
                <label for="contact-message" class="text-[10px] font-mono uppercase tracking-widest" style="color: rgba(226,232,240,0.4);">Message</label>
                <textarea
                  id="contact-message"
                  v-model="form.message"
                  required
                  rows="5"
                  placeholder="Describe your project or question..."
                  class="form-input resize-none"
                />
              </div>

              <!-- Error -->
              <Transition
                enter-active-class="transition-all duration-300"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
              >
                <p v-if="status === 'error'" class="text-xs font-mono" style="color: rgba(239,68,68,0.9);">
                  ⚠ Transmission failed: {{ errorMsg }}. Try again or reach out via LinkedIn.
                </p>
              </Transition>

              <!-- Submit -->
              <button
                id="contact-submit-btn"
                type="submit"
                :disabled="status === 'sending'"
                class="group relative w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                :style="status === 'sending'
                  ? 'background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: rgba(226,232,240,0.4);'
                  : 'background: linear-gradient(135deg, rgba(0,212,255,0.9), rgba(56,112,255,0.9)); color: #000; box-shadow: 0 0 20px rgba(0,212,255,0.25);'"
              >
                <svg
                  v-if="status === 'sending'"
                  class="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>{{ status === 'sending' ? 'Transmitting...' : 'Send Message' }}</span>
                <svg
                  v-if="status !== 'sending'"
                  class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </Transition>
        </div>
      </div>
    </div>
  </main>
</template>
