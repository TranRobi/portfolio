<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Card from '@/components/Card.vue'
</script>

<template>
  <main
    class="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans selection:bg-emerald-500 selection:text-white"
  >
    <div class="max-w-5xl mx-auto pt-10">
      <!-- Back Button -->
      <RouterLink
        to="/"
        class="inline-flex text-emerald-400 hover:text-emerald-300 font-mono text-sm items-center gap-2 mb-10 transition-colors"
      >
        <span aria-hidden="true">&larr;</span> Return to Main System
      </RouterLink>

      <!-- Page Header -->
      <h1 class="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">System Architecture</h1>
      <p class="text-zinc-400 text-lg mb-12 max-w-2xl">
        Core engineering case studies, hardware integrations, and technical implementations.
      </p>

      <!-- Projects Grid -->
      <div class="">
        <Card
          title="Industrial Systems Integration"
          desc="Automated a 6-axis industrial robotic arm synchronized with a secondary rotator plate.
              Integrated an image recognition camera to process visual data and trigger precise,
              asynchronous hardware actuation."
          :tech="['Lua', 'Computer Vision', 'Multi-Axis Kinematics']"
        />
        <Card
          title="RoboCup RMRC Autonomous Robot"
          desc="Designed and programmed an autonomous robot for hazardous environment navigation over a 2-year competitive period.
                Engineered custom 3D-printed chassis components in Fusion 360 and developed C++ control loops for obstacle avoidance and victim identification."
          :tech="['Fusion 360', ' C++', 'Sensor Fusion', 'Rapid Prototyping']"
        />
        <Card
          title="Bit-Level File Compressor"
          desc="Built a custom file compressor utilizing the Huffman coding algorithm. Managed memory allocation, binary tree construction, and bit-level file I/O to achieve measurable compression ratios."
          :tech="['C', 'Data structures', 'Algorithms']"
        />
        <Card
          title="RoboCup RMRC Autonomous Robot"
          desc="Designed and programmed an autonomous robot for hazardous environment navigation over a 2-year competitive period.
                Engineered custom 3D-printed chassis components in Fusion 360 and developed C++ control loops for obstacle avoidance and victim identification."
          :tech="['Fusion 360', ' C++, Sensor Fusion', 'Rapid Prototyping']"
        />
        <Card
          title="RoboCup RMRC Autonomous Robot"
          desc="Designed and programmed an autonomous robot for hazardous environment navigation over a 2-year competitive period.
                Engineered custom 3D-printed chassis components in Fusion 360 and developed C++ control loops for obstacle avoidance and victim identification."
          :tech="['Fusion 360', ' C++, Sensor Fusion', 'Rapid Prototyping']"
        />
      </div>
    </div>
  </main>
</template>
