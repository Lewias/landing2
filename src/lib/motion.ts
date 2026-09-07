import { computed, onUnmounted, ref } from "vue";
import type { Transition } from "motion-v";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Tracks the user's OS-level motion preference.
 *
 * Read synchronously during setup so the very first render already knows the
 * answer — waiting for onMounted would let one animation slip through.
 */
export function useReducedMotion() {
  const mq =
    typeof window !== "undefined" && "matchMedia" in window
      ? window.matchMedia(QUERY)
      : undefined;

  const reduced = ref(!!mq?.matches);
  const sync = () => (reduced.value = !!mq?.matches);

  mq?.addEventListener("change", sync);
  onUnmounted(() => mq?.removeEventListener("change", sync));

  return reduced;
}

/**
 * Enter animation presets that collapse to an instant cut when the user has
 * asked for reduced motion.
 */
export function useEnter() {
  const reduced = useReducedMotion();

  const enter = (delay = 0, duration = 0.6): Transition =>
    reduced.value
      ? { duration: 0 }
      : { duration, delay, ease: [0.22, 1, 0.36, 1] };

  const fadeUp = computed(() =>
    reduced.value ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
  );

  return { reduced, enter, fadeUp };
}
