<script setup lang="ts">
import Reveal from "@/components/ui/Reveal.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { problem } from "@/data/content";
</script>

<template>
  <section id="problem" class="section-y w-full">
    <div class="container-page">
      <SectionHeading
        :eyebrow="problem.eyebrow"
        :title="problem.title"
        :lead="problem.lead"
      />

      <ul
        class="mt-[clamp(2.5rem,4vw,3.75rem)] grid gap-[1.25rem] md:grid-cols-3"
      >
        <Reveal
          v-for="(pain, i) in problem.pains"
          :key="pain.title"
          as="li"
          :delay="0.08 * i"
          class="group relative flex flex-col rounded-[1rem] border border-white/12 bg-white/[0.02] p-[clamp(1.5rem,2.2vw,2rem)] transition-colors duration-300 hover:border-acid/45"
        >
          <span
            aria-hidden="true"
            class="text-[0.8125rem] font-bold tracking-[0.14em] text-acid/70 tabular-nums"
          >
            0{{ i + 1 }}
          </span>
          <h3
            class="mt-[1rem] text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.3] font-bold text-white"
          >
            {{ pain.title }}
          </h3>
          <p class="mt-[0.75rem] text-[1rem] leading-[1.6] text-subtle">
            {{ pain.body }}
          </p>
        </Reveal>
      </ul>
    </div>
  </section>
</template>
