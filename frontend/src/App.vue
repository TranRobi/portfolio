<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />

  <div class="pt-16 min-h-screen bg-zinc-950 relative overflow-hidden">
    <!-- Ambient Background Glowing Orbs -->
    <div
      class="absolute top-[10%] left-[5%] w-72 h-72 sm:w-[500px] sm:h-[500px] bg-emerald-500/5 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none z-0"
    ></div>
    <div
      class="absolute bottom-[20%] right-[10%] w-72 h-72 sm:w-[400px] sm:h-[400px] bg-emerald-500/[0.03] rounded-full blur-[100px] sm:blur-[120px] pointer-events-none z-0"
    ></div>

    <div class="relative z-10">
      <RouterView />
    </div>
  </div>
</template>
