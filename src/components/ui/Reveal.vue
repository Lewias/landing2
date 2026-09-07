<script setup lang="ts">
import { Motion } from "motion-v";
import { useEnter } from "@/lib/motion";

/**
 * Scroll-triggered fade-up. Fires once, when a fifth of the element is on
 * screen — so it only ever animates while the reader is actually looking at it.
 *
 * `as-child` keeps Motion off the rendered node, which means classes and
 * semantics (`li`, `h2`, `p`) stay on an element we control.
 */
type ClassValue = string | undefined | (string | false | null | undefined)[];

const props = withDefaults(
  defineProps<{ delay?: number; as?: string; class?: ClassValue }>(),
  { delay: 0, as: "div" },
);

const { enter, fadeUp } = useEnter();
</script>

<template>
  <Motion
    as-child
    :initial="fadeUp"
    :while-in-view="{ opacity: 1, y: 0 }"
    :in-view-options="{ once: true, amount: 0.2 }"
    :transition="enter(props.delay)"
  >
    <component :is="props.as" :class="props.class">
      <slot />
    </component>
  </Motion>
</template>
