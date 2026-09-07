<script setup lang="ts">
import Reveal from "@/components/ui/Reveal.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { services } from "@/data/content";
</script>

<template>
  <section
    id="service"
    class="section-y w-full border-t border-white/10 bg-white/[0.015]"
  >
    <div class="container-page">
      <SectionHeading
        :eyebrow="services.eyebrow"
        :title="services.title"
        :lead="services.lead"
      />

      <ul
        class="mt-[clamp(2.5rem,4vw,3.75rem)] grid grid-cols-1 gap-[1.25rem] sm:grid-cols-2 xl:grid-cols-4"
      >
        <Reveal
          v-for="(item, i) in services.items"
          :key="item.title"
          as="li"
          :delay="0.07 * i"
          class="group flex h-full flex-col rounded-[1rem] border border-white/12 bg-background p-[clamp(1.5rem,2.2vw,2rem)] transition-colors duration-300 hover:border-acid/45"
        >
          <span
            class="grid size-[3.25rem] place-items-center rounded-full border border-acid/45 text-acid transition-[background-color,box-shadow] duration-300 group-hover:bg-acid/10 group-hover:shadow-[0_0_28px_-6px_rgba(172,215,14,0.55)]"
          >
            <component :is="item.icon" class="size-[1.5rem]" :stroke-width="1.7" />
          </span>

          <h3
            class="mt-[1.5rem] text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.3] font-bold text-white"
          >
            {{ item.title }}
          </h3>
          <p class="mt-[0.75rem] text-[1rem] leading-[1.6] text-subtle">
            {{ item.body }}
          </p>
        </Reveal>
      </ul>
    </div>
  </section>
</template>
