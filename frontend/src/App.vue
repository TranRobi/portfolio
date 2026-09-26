<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />

  <div class="pt-16 min-h-screen relative overflow-hidden" style="background: #050810;">
    <!-- Animated dot grid background -->
    <div class="fixed inset-0 dot-grid pointer-events-none z-0" style="animation: grid-pulse 4s ease-in-out infinite; opacity: 0.4;" />

    <!-- Large ambient orbs -->
    <div
      class="fixed top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
      style="background: radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%); filter: blur(60px);"
    />
    <div
      class="fixed bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
      style="background: radial-gradient(circle, rgba(56,112,255,0.08) 0%, transparent 70%); filter: blur(60px);"
    />
    <div
      class="fixed top-[40%] right-[20%] w-[300px] h-[300px] rounded-full pointer-events-none z-0"
      style="background: radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%); filter: blur(40px);"
    />

    <!-- Scan line effect -->
    <div
      class="fixed left-0 right-0 h-[1px] pointer-events-none z-0"
      style="background: linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent); animation: scan 10s linear infinite; opacity: 0.6;"
    />

    <div class="relative z-10">
      <RouterView v-slot="{ Component }">
        <Transition
          enter-active-class="transition-all duration-400 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>
