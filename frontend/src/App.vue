<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />

  <div class="pt-16 min-h-screen bg-zinc-950">
    <RouterView />
  </div>
</template>
