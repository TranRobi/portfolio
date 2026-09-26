import { ref, onMounted } from 'vue'

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
  fork: boolean
  archived: boolean
}

/**
 * Fetches public repos from GitHub for a given username.
 * Non-forked repos are returned, sorted by most recently updated.
 * Results are cached in sessionStorage to avoid re-fetching on navigation.
 */
export function useGitHubRepos(username: string, maxRepos = 12) {
  const repos = ref<GitHubRepo[]>([])
  // Start as true so the skeleton shows immediately on mount (before onMounted async runs)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const CACHE_KEY = `gh_repos_${username}`

  onMounted(async () => {
    // Check cache first — skip loading state if we have it
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      try {
        repos.value = JSON.parse(cached)
        loading.value = false
        return
      } catch {
        sessionStorage.removeItem(CACHE_KEY)
      }
    }

    loading.value = true
    error.value = null

    try {
      const res = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=public`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        },
      )

      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)

      const data: GitHubRepo[] = await res.json()

      if (!Array.isArray(data)) throw new Error('Unexpected response from GitHub API')

      // Prefer non-forked non-archived repos; fall back to all if empty
      const original = data
        .filter((r) => !r.fork && !r.archived)
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

      const result = (original.length > 0 ? original : data.filter((r) => !r.archived))
        .slice(0, maxRepos)

      repos.value = result
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(result))
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch GitHub repos'
    } finally {
      loading.value = false
    }
  })

  return { repos, loading, error }
}
