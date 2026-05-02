<script setup lang="ts">
const props = defineProps({
  title: String,
  desc: String,
  tech: Array,
})
</script>
<template>
  <article
    class="transform hover:scale-110 flex flex-col border border-zinc-800 bg-zinc-900/40 p-6 md:p-8 rounded-lg hover:border-emerald-500/50 transition-colors group"
  >
    <div class="mb-4">
      <h2
        class="text-2xl font-bold text-zinc-100 mb-2 group-hover:text-emerald-400 transition-colors"
      >
        {{ title }}
      </h2>
      <p class="text-zinc-400 text-sm leading-relaxed">
        {{ desc }}
      </p>
    </div>

    <!-- Spacer to push tags to the bottom -->
    <div class="grow"></div>

    <!-- Tech Tags -->
    <div class="flex flex-wrap gap-2 mt-6">
      <span
        v-for="(t, index) in tech"
        :key="index"
        class="px-2 py-1 bg-zinc-950 border border-zinc-800 text-xs text-emerald-400 rounded-md font-mono"
      >
        {{ t }}
      </span>
    </div>
  </article>
</template>
