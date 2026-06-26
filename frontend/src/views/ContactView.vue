<script setup lang="ts">
import { ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'

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
  <main
    class="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans selection:bg-emerald-500 selection:text-white"
  >
    <div class="max-w-2xl mx-auto pt-10">
      <!-- Back -->
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-mono text-sm mb-10 transition-colors"
      >
        <span aria-hidden="true">←</span> {{ $t('contact.returnMain') }}
      </RouterLink>

      <!-- Header -->
      <p class="text-emerald-400 font-mono text-sm uppercase tracking-widest mb-3">
        {{ $t('contact.openChannel') }}
      </p>
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">{{ $t('contact.title') }}</h1>
      <p class="text-zinc-400 text-lg mb-12 max-w-xl leading-relaxed">
        {{ $t('contact.subtitle') }}
      </p>

      <!-- ── SUCCESS STATE ── -->
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div
          v-if="status === 'success'"
          class="flex flex-col items-center gap-5 py-16 text-center border border-emerald-500/30 rounded-2xl bg-emerald-500/5"
        >
          <div
            class="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <p class="text-xl font-bold text-white">{{ $t('contact.successTitle') }}</p>
            <p class="text-zinc-400 mt-1 text-sm">{{ $t('contact.successSubtitle') }}</p>
          </div>
          <button
            @click="reset"
            class="mt-2 px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-sm font-mono text-zinc-300 hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
          >
            {{ $t('contact.btnSendAnother') }}
          </button>
        </div>
      </Transition>

      <!-- ── FORM ── -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
      >
        <form v-if="status !== 'success'" @submit.prevent="submit" class="space-y-6" novalidate>
          <!-- Name -->
          <div class="flex flex-col gap-2">
            <label for="contact-name" class="text-xs font-mono uppercase tracking-widest text-zinc-500"
              >{{ $t('contact.labelName') }}</label
            >
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              required
              :placeholder="$t('contact.placeholderName')"
              class="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 font-mono text-sm focus:outline-none focus:border-emerald-500/60 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)] transition-all"
            />
          </div>

          <!-- Email -->
          <div class="flex flex-col gap-2">
            <label for="contact-email" class="text-xs font-mono uppercase tracking-widest text-zinc-500"
              >{{ $t('contact.labelEmail') }}</label
            >
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              required
              :placeholder="$t('contact.placeholderEmail')"
              class="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 font-mono text-sm focus:outline-none focus:border-emerald-500/60 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)] transition-all"
            />
          </div>

          <!-- Message -->
          <div class="flex flex-col gap-2">
            <label for="contact-message" class="text-xs font-mono uppercase tracking-widest text-zinc-500"
              >{{ $t('contact.labelMessage') }}</label
            >
            <textarea
              id="contact-message"
              v-model="form.message"
              required
              rows="6"
              :placeholder="$t('contact.placeholderMessage')"
              class="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 font-mono text-sm resize-none focus:outline-none focus:border-emerald-500/60 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)] transition-all"
            ></textarea>
          </div>

          <!-- Error -->
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
          >
            <p v-if="status === 'error'" class="text-sm font-mono text-red-400">
              {{ $t('contact.error', { error: errorMsg }) }}
            </p>
          </Transition>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="status === 'sending'"
            class="group relative w-full flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl font-bold transition-all duration-300 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
            :class="
              status === 'sending'
                ? 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                : 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25'
            "
          >
            <!-- Spinner -->
            <svg
              v-if="status === 'sending'"
              class="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>{{ status === 'sending' ? $t('contact.btnSending') : $t('contact.btnSend') }}</span>
            <!-- Arrow icon -->
            <svg
              v-if="status !== 'sending'"
              class="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </form>
      </Transition>

      <!-- Divider + alternative contacts -->
      <div class="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row gap-6 text-sm">
        <a
          href="https://www.linkedin.com/in/dat-tran-duy-031541211/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2.5 text-zinc-400 hover:text-emerald-400 transition-colors font-mono"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            />
          </svg>
          LinkedIn
        </a>
        <a
          href="https://github.com/TranRobi"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2.5 text-zinc-400 hover:text-emerald-400 transition-colors font-mono"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.302 24 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
          GitHub
        </a>
      </div>
    </div>
  </main>
</template>
