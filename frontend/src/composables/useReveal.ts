import { onMounted, onUnmounted, nextTick, watch, type Ref } from 'vue'

/**
 * useReveal — auto-observes all .reveal / .reveal-left elements and marks
 * them .visible when they scroll into view.
 *
 * Call `refresh()` after dynamic content is added to re-scan the DOM.
 */
export function useReveal(rootMargin = '0px 0px -60px 0px', threshold = 0.1) {
  let observer: IntersectionObserver | null = null

  const observe = () => {
    if (!observer) return
    const targets = document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible)')
    targets.forEach((el) => observer!.observe(el))
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      { rootMargin, threshold },
    )

    // Small delay to let Vue render the initial DOM
    nextTick(() => observe())
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  /**
   * Call after dynamic content (e.g. async GitHub repos) is rendered
   * to pick up newly added .reveal elements.
   */
  const refresh = () => nextTick(() => observe())

  return { refresh }
}
