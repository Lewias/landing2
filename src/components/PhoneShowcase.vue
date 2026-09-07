<script setup lang="ts">
import { motion } from "motion-v";
import { showcase } from "@/data/site";
import { useEnter } from "@/lib/motion";

const { enter, reduced } = useEnter();
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, scale: reduced ? 1 : 0.97 }"
    :animate="{ opacity: 1, scale: 1 }"
    :transition="enter(0.25, 0.9)"
    class="pointer-events-none relative select-none"
  >
    <picture>
      <source :srcset="showcase.src" type="image/webp" />
      <img
        :src="showcase.fallbackSrc"
        :alt="showcase.alt"
        width="750"
        height="660"
        fetchpriority="high"
        decoding="async"
        class="relative block h-auto w-full"
      />
    </picture>
  </motion.div>
</template>
