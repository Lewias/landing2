<script setup lang="ts">
import { ExternalLink } from "lucide-vue-next";
import Reveal from "@/components/ui/Reveal.vue";
import { featuredCase } from "@/data/content";
</script>

<template>
  <div
    class="grid grid-cols-1 gap-x-[clamp(2rem,4vw,4rem)] gap-y-[clamp(2rem,3vw,2.5rem)] rounded-[1.25rem] border border-white/12 bg-background p-[clamp(1.25rem,2.4vw,2.25rem)] lg:grid-cols-[minmax(0,34fr)_minmax(0,66fr)] lg:items-center"
  >
    <div class="flex flex-col">
      <Reveal class="text-[0.75rem] font-bold tracking-[0.16em] text-acid uppercase">
        {{ featuredCase.eyebrow }}
      </Reveal>

      <Reveal
        as="h3"
        :delay="0.05"
        class="mt-[0.875rem] text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none font-black font-stretch-[89%] tracking-[-0.01em] text-white uppercase"
      >
        {{ featuredCase.artist }}
      </Reveal>

      <Reveal
        as="p"
        :delay="0.1"
        class="mt-[1rem] max-w-[44ch] text-[0.9375rem] leading-[1.6] text-subtle"
      >
        {{ featuredCase.summary }}
      </Reveal>

      <!-- Pulled out large, because the numbers in the screenshot are tiny. -->
      <Reveal
        as="dl"
        :delay="0.15"
        class="mt-[2rem] flex flex-col gap-[1.25rem] border-t border-white/12 pt-[1.75rem]"
      >
        <div v-for="stat in featuredCase.stats" :key="stat.label">
          <dt class="text-[0.75rem] font-bold tracking-[0.12em] text-white/50 uppercase">
            {{ stat.label }}
          </dt>
          <dd
            class="mt-[0.4375rem] text-[clamp(1.5rem,2.2vw,2rem)] leading-none font-black font-stretch-[89%] tracking-[-0.01em] text-acid tabular-nums"
          >
            {{ stat.value }}
          </dd>
        </div>
      </Reveal>
    </div>

    <Reveal
      :delay="0.12"
      class="overflow-hidden rounded-[0.875rem] border border-white/12"
    >
      <a
        :href="featuredCase.shot.src"
        target="_blank"
        rel="noreferrer noopener"
        class="group block"
      >
        <span
          class="flex items-center justify-between gap-[0.75rem] border-b border-white/12 bg-white/[0.03] px-[0.875rem] py-[0.625rem]"
        >
          <span class="text-[0.6875rem] font-black tracking-[0.16em] text-white/55 uppercase">
            Spotify for artists
          </span>
          <ExternalLink
            aria-hidden="true"
            class="size-[0.875rem] shrink-0 text-white/25 transition-colors duration-300 group-hover:text-acid"
            :stroke-width="2.2"
          />
        </span>

        <img
          :src="featuredCase.shot.src"
          :alt="featuredCase.shot.alt"
          width="1713"
          height="998"
          loading="lazy"
          decoding="async"
          class="block h-auto w-full"
        />
      </a>
    </Reveal>
  </div>
</template>
