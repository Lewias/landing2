import { ref } from "vue";

/**
 * One shared open/closed flag for the application dialog, so any CTA anywhere
 * on the page can raise the same form without prop-drilling or an event bus.
 */
const open = ref(false);

export function useApplyModal() {
  return {
    open,
    openApply: () => (open.value = true),
    closeApply: () => (open.value = false),
  };
}
