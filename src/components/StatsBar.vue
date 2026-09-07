<script setup lang="ts">
import { motion } from "motion-v";
import { stats } from "@/data/site";
import { useEnter } from "@/lib/motion";

const { enter, fadeUp } = useEnter();
</script>

<template>
  <section
    aria-label="Results in numbers"
    class="relative z-10 grid grid-cols-1 gap-x-6 gap-y-10 xl:gap-x-0 pt-[3.25rem] pb-[2.75rem] sm:grid-cols-2 lg:pt-[3.9375rem] xl:grid-cols-4 xl:gap-y-0"
  >
    <motion.div
      v-for="(stat, i) in stats"
      :key="stat.label"
      :initial="fadeUp"
      :animate="{ opacity: 1, y: 0 }"
      :transition="enter(0.6 + i * 0.08)"
      class="flex items-center gap-[1.4375rem] xl:not-first:border-l xl:not-first:border-white/28 xl:not-first:pl-[2.75rem]"
    >
      <span
        class="grid size-[4.125rem] shrink-0 place-items-center rounded-full border border-acid text-acid"
      >
        <component
          :is="stat.icon"
          class="size-[1.6875rem]"
          :fill="stat.filled ? 'currentColor' : 'none'"
          :stroke-width="stat.filled ? 1 : 1.8"
        />
      </span>

      <span class="flex flex-col">
        <span
          class="text-[2rem] leading-none font-bold tracking-[-0.015em] text-white"
        >
          {{ stat.value }}
        </span>
        <span
          class="mt-[0.25rem] text-[0.875rem] leading-none font-medium tracking-[0.03em] text-white/85 uppercase"
        >
          {{ stat.label }}
        </span>
      </span>
    </motion.div>
  </section>
</template>
