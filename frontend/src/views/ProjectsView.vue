<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import Card from '@/components/Card.vue'
import ProjectModal from '@/components/ProjectModal.vue'
import projects from '@/data/projects.json'
import { useReveal } from '@/composables/useReveal'
import { useGitHubRepos } from '@/composables/useGitHubRepos'

const { refresh } = useReveal()

const selectedProject = ref(null)
const openModal = (project: any) => {
  selectedProject.value = project
}
const closeModal = () => {
  selectedProject.value = null
}

// GitHub repos
const { repos: githubRepos, loading: ghLoading, error: ghError } = useGitHubRepos('TranRobi', 8)

const activeTab = ref<'featured' | 'github'>('featured')

// Re-scan for new .reveal elements after repos load or tab changes
watch(ghLoading, (isLoading) => {
  if (!isLoading) refresh()
})
watch(activeTab, () => refresh())

const clearCacheAndReload = () => {
  sessionStorage.removeItem('gh_repos_TranRobi')
  window.location.reload()
}

// Language color map
const langColors: Record<string, string> = {
  C: '#555555',
  'C++': '#f34b7d',
  Vue: '#41b883',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Lua: '#000080',
  HTML: '#e34c26',
  CSS: '#563d7c',
}
const getLangColor = (lang: string | null) => (lang ? (langColors[lang] ?? '#8b8b8b') : '#8b8b8b')

const formatDate = (iso: string) => {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
</script>

<template>
  <main class="min-h-screen text-slate-100 font-sans">
    <div class="max-w-6xl mx-auto px-6 pt-12 pb-20">
      <!-- Header -->
      <RouterLink
        to="/"
        class="reveal inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-10 transition-all duration-200 group"
        style="color: rgba(0, 212, 255, 0.6)"
      >
        <svg
          class="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {{ $t('projects.returnMain') }}
      </RouterLink>

      <div class="reveal mb-4" style="animation-delay: 50ms">
        <p class="section-label mb-3">
          {{ $t('projects.returnMain').includes('Main') ? '// Portfolio' : '// Portfólió' }}
        </p>
        <h1 class="text-4xl md:text-5xl font-black tracking-tight text-white">
          {{ $t('projects.title') }}
        </h1>
      </div>

      <p
        class="reveal text-base max-w-2xl mb-10 leading-relaxed"
        style="color: rgba(226, 232, 240, 0.5); animation-delay: 100ms"
      >
        {{ $t('projects.subtitle') }}
      </p>

      <!-- Tab Switcher -->
      <div
        class="reveal flex gap-1 mb-10 p-1 rounded-xl w-fit"
        style="
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.07);
          animation-delay: 150ms;
        "
      >
        <button
          id="tab-featured"
          @click="activeTab = 'featured'"
          class="px-5 py-2.5 rounded-lg text-sm font-semibold font-mono transition-all duration-200"
          :style="
            activeTab === 'featured'
              ? 'background: linear-gradient(135deg, rgba(0,212,255,0.2), rgba(56,112,255,0.15)); color: #00d4ff; border: 1px solid rgba(0,212,255,0.3);'
              : 'color: rgba(226,232,240,0.4); border: 1px solid transparent;'
          "
        >
          Featured
        </button>
        <button
          id="tab-github"
          @click="activeTab = 'github'"
          class="px-5 py-2.5 rounded-lg text-sm font-semibold font-mono transition-all duration-200 flex items-center gap-2"
          :style="
            activeTab === 'github'
              ? 'background: linear-gradient(135deg, rgba(0,212,255,0.2), rgba(56,112,255,0.15)); color: #00d4ff; border: 1px solid rgba(0,212,255,0.3);'
              : 'color: rgba(226,232,240,0.4); border: 1px solid transparent;'
          "
        >
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.302 24 12 24 5.373 18.627 0 12 0z"
            />
          </svg>
          GitHub
          <span
            v-if="!ghLoading && githubRepos.length"
            class="px-1.5 py-0.5 rounded text-[10px]"
            style="background: rgba(0, 212, 255, 0.15); color: rgba(0, 212, 255, 0.9)"
            >{{ githubRepos.length }}</span
          >
        </button>
      </div>

      <!-- ═══ FEATURED PROJECTS ═══ -->
      <div v-if="activeTab === 'featured'">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card
            v-for="(project, idx) in projects"
            :key="project.id"
            :titleKey="project.titleKey"
            :descKey="project.descKey"
            :tech="project.tech"
            :hasImages="project.images.length > 0"
            class="reveal"
            :style="`animation-delay: ${idx * 80}ms;`"
            @open="openModal(project)"
          />
        </div>
      </div>

      <!-- ═══ GITHUB REPOS ═══ -->
      <div v-else>
        <!-- Loading skeleton -->
        <div v-if="ghLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="i in 6" :key="i" class="glass-card p-6 animate-pulse">
            <div class="h-4 rounded mb-3 shimmer" style="width: 60%" />
            <div class="h-3 rounded mb-2 shimmer" style="width: 90%" />
            <div class="h-3 rounded mb-5 shimmer" style="width: 75%" />
            <div class="flex gap-2">
              <div class="h-6 w-16 rounded shimmer" />
              <div class="h-6 w-12 rounded shimmer" />
            </div>
          </div>
        </div>

        <!-- Error state -->
        <div
          v-else-if="ghError"
          class="glass-card p-10 text-center flex flex-col items-center gap-4"
          style="border-color: rgba(239, 68, 68, 0.2)"
        >
          <svg class="w-10 h-10" fill="none" stroke="rgba(239,68,68,0.7)" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
          <div>
            <p class="text-sm font-mono font-semibold" style="color: rgba(239, 68, 68, 0.9)">
              Failed to load GitHub repos
            </p>
            <p class="text-xs mt-1" style="color: rgba(226, 232, 240, 0.4)">{{ ghError }}</p>
          </div>
          <button @click="clearCacheAndReload" class="btn-secondary text-xs font-mono">
            Clear cache & retry
          </button>
        </div>

        <!-- Empty state -->
        <div
          v-else-if="!ghLoading && githubRepos.length === 0"
          class="glass-card p-12 text-center flex flex-col items-center gap-4"
        >
          <svg class="w-12 h-12" fill="none" stroke="rgba(0,212,255,0.3)" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          <div>
            <p class="text-sm font-semibold text-white">No public repos found</p>
            <p class="text-xs mt-1" style="color: rgba(226, 232, 240, 0.4)">
              GitHub may be rate-limiting. Try again in a moment.
            </p>
          </div>
          <button @click="clearCacheAndReload" class="btn-secondary text-xs font-mono">
            Retry
          </button>
        </div>

        <!-- Repos grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <a
            v-for="(repo, idx) in githubRepos"
            :key="repo.id"
            :href="repo.html_url"
            target="_blank"
            rel="noopener noreferrer"
            class="glass-card p-6 flex flex-col group reveal"
            :style="`animation-delay: ${idx * 60}ms; text-decoration: none;`"
          >
            <!-- Repo name -->
            <div class="flex items-start justify-between gap-2 mb-2">
              <h3
                class="text-sm font-bold text-white group-hover:text-cyan transition-colors truncate"
              >
                {{ repo.name }}
              </h3>
              <svg
                class="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                stroke="#00d4ff"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>

            <!-- Description -->
            <p
              class="text-xs leading-relaxed mb-4 line-clamp-2 grow"
              style="color: rgba(226, 232, 240, 0.45)"
            >
              {{ repo.description ?? 'No description provided.' }}
            </p>

            <!-- Topics -->
            <div v-if="repo.topics.length" class="flex flex-wrap gap-1.5 mb-3">
              <span
                v-for="topic in repo.topics.slice(0, 4)"
                :key="topic"
                class="px-2 py-0.5 rounded text-[10px] font-mono"
                style="
                  background: rgba(0, 212, 255, 0.07);
                  border: 1px solid rgba(0, 212, 255, 0.15);
                  color: rgba(0, 212, 255, 0.7);
                "
                >{{ topic }}</span
              >
            </div>

            <!-- Footer stats -->
            <div
              class="flex items-center justify-between pt-3"
              style="border-top: 1px solid rgba(255, 255, 255, 0.05)"
            >
              <div class="flex items-center gap-1.5" v-if="repo.language">
                <span
                  class="w-2.5 h-2.5 rounded-full shrink-0"
                  :style="`background: ${getLangColor(repo.language)};`"
                />
                <span class="text-[11px] font-mono" style="color: rgba(226, 232, 240, 0.45)">{{
                  repo.language
                }}</span>
              </div>
              <div class="flex items-center gap-3 ml-auto">
                <span
                  class="flex items-center gap-1 text-[11px] font-mono"
                  style="color: rgba(226, 232, 240, 0.35)"
                >
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </svg>
                  {{ repo.stargazers_count }}
                </span>
                <span class="text-[11px] font-mono" style="color: rgba(226, 232, 240, 0.3)">{{
                  formatDate(repo.updated_at)
                }}</span>
              </div>
            </div>
          </a>

          <!-- View all on GitHub card -->
          <a
            href="https://github.com/TranRobi"
            target="_blank"
            rel="noopener noreferrer"
            id="github-view-all"
            class="glass-card p-6 flex flex-col items-center justify-center text-center group min-h-[180px]"
            style="
              border-style: dashed;
              border-color: rgba(255, 255, 255, 0.1);
              text-decoration: none;
            "
          >
            <svg
              class="w-8 h-8 mb-3 transition-transform duration-300 group-hover:scale-110"
              fill="currentColor"
              style="color: rgba(226, 232, 240, 0.3)"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.302 24 12 24 5.373 18.627 0 12 0z"
              />
            </svg>
            <p
              class="text-sm font-semibold group-hover:text-cyan transition-colors"
              style="color: rgba(226, 232, 240, 0.4)"
            >
              View all on GitHub
            </p>
          </a>
        </div>
      </div>
    </div>

    <ProjectModal :project="selectedProject" @close="closeModal" />
  </main>
</template>
