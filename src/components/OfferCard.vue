<script setup lang="ts">
import { Sparkle } from "lucide-vue-next";
import { hero } from "@/data/site";
</script>

<template>
  <div
    class="flex w-[18.75rem] max-w-full items-center gap-[1.1875rem] rounded-[0.875rem] border border-acid/50 px-[1.125rem] py-[0.5625rem] shadow-[0_0_34px_-12px_rgba(172,215,14,0.5)]"
  >
    <span
      class="grid size-[3.125rem] shrink-0 place-items-center rounded-full border border-white/15 bg-black shadow-[0_0_26px_-4px_rgba(172,215,14,0.55)]"
    >
      <Sparkle
        class="size-[2rem] text-acid drop-shadow-[0_0_9px_rgba(172,215,14,0.9)]"
        fill="currentColor"
        :stroke-width="1"
      />
    </span>

    <span class="flex flex-col">
      <span
        class="text-[2.375rem] leading-none font-black tracking-[-0.015em] text-acid uppercase"
      >
        {{ hero.offer.amount }}
      </span>
      <span
        class="mt-[0.25rem] text-[1.1875rem] leading-none font-semibold tracking-[0.005em] text-white uppercase"
      >
        {{ hero.offer.caption }}
      </span>
    </span>
  </div>
</template>
