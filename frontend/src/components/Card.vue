<script setup lang="ts">
const props = defineProps({
  titleKey: { type: String, required: true },
  descKey: { type: String, required: true },
  tech: Array,
  hasImages: { type: Boolean, default: false },
})

defineEmits(['open'])
</script>

<template>
  <article
    @click="$emit('open')"
    class="project-card p-6 md:p-8 group relative overflow-hidden"
  >
    <!-- Corner accent -->
    <div
      class="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style="background: radial-gradient(circle at top right, rgba(0,212,255,0.12), transparent 70%);"
    />

    <!-- Top row: title + arrow -->
    <div class="flex items-start justify-between gap-4 mb-3">
      <h2
        class="text-xl font-bold text-white leading-tight group-hover:text-cyan transition-colors duration-200"
      >
        {{ $t(titleKey) }}
      </h2>
      <div
        class="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style="background: rgba(0,212,255,0.12); border: 1px solid rgba(0,212,255,0.25);"
      >
        <svg class="w-4 h-4" fill="none" stroke="#00d4ff" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </div>

    <!-- Description -->
    <p class="text-sm leading-relaxed line-clamp-3 mb-6" style="color: rgba(226,232,240,0.5);">
      {{ $t(descKey) }}
    </p>

    <!-- Spacer -->
    <div class="grow" />

    <!-- Tech tags -->
    <div class="flex flex-wrap gap-1.5 mt-auto">
      <span
        v-for="(t, index) in tech"
        :key="index"
        class="tech-tag"
      >
        {{ t }}
      </span>
    </div>

    <!-- Bottom bar -->
    <div
      class="mt-5 pt-4 flex items-center gap-2 text-xs font-mono transition-colors duration-200"
      style="border-top: 1px solid rgba(255,255,255,0.05); color: rgba(226,232,240,0.35);"
    >
      <svg class="w-3.5 h-3.5 group-hover:text-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      <span class="group-hover:text-cyan transition-colors">{{ $t('projects.clickForMore') }}</span>
    </div>
  </article>
</template>
