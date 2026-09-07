<script setup lang="ts">
import { platforms } from "@/data/content";

/** Duplicated once so the -50% translate loops seamlessly. */
const track = [...platforms, ...platforms];
</script>

<template>
  <section
    aria-label="Platforms we publish to"
    class="w-full overflow-hidden border-y border-white/10 bg-white/[0.015] py-[1.5rem]"
  >
    <div
      class="flex w-max animate-[marquee-x_38s_linear_infinite] items-center gap-[3.5rem] pr-[3.5rem] motion-reduce:animate-none"
    >
      <span
        v-for="(name, i) in track"
        :key="`${name}-${i}`"
        class="flex shrink-0 items-center gap-[3.5rem] text-[clamp(0.9375rem,1.2vw,1.0625rem)] font-bold tracking-[0.1em] whitespace-nowrap text-white/45 uppercase"
      >
        {{ name }}
        <span aria-hidden="true" class="size-[0.3125rem] rounded-full bg-acid/70" />
      </span>
    </div>
  </section>
</template>
