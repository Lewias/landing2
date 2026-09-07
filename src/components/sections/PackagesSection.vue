<script setup lang="ts">
import { Check } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/ui/Reveal.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { packages } from "@/data/content";
import { useApplyModal } from "@/lib/apply-modal";

const { openApply } = useApplyModal();
</script>

<template>
  <section
    id="pricing"
    class="section-y w-full border-t border-white/10"
  >
    <div class="container-page">
      <SectionHeading
        :eyebrow="packages.eyebrow"
        :title="packages.title"
        :lead="packages.lead"
      />

      <ul
        class="mt-[clamp(2.5rem,4vw,3.75rem)] grid grid-cols-1 items-stretch gap-[1.25rem] sm:grid-cols-2 xl:grid-cols-4"
      >
        <Reveal
          v-for="(plan, i) in packages.plans"
          :key="plan.name"
          as="li"
          :delay="0.07 * i"
          :class="[
            'relative flex h-full flex-col rounded-[1.25rem] p-[clamp(1.5rem,2vw,1.875rem)] transition-colors duration-300',
            plan.featured
              ? 'border border-acid/60 bg-acid/[0.06] shadow-[0_0_60px_-24px_rgba(172,215,14,0.7)]'
              : 'border border-white/12 bg-background hover:border-acid/45',
          ]"
        >
          <span
            v-if="plan.featured"
            class="absolute -top-[0.8125rem] left-[clamp(1.5rem,2vw,1.875rem)] rounded-full bg-acid px-[0.875rem] py-[0.375rem] text-[0.6875rem] font-black tracking-[0.14em] text-black uppercase"
          >
            Most popular
          </span>

          <div class="flex items-baseline justify-between gap-[0.75rem]">
            <h3
              class="text-[0.8125rem] font-bold tracking-[0.16em] uppercase"
              :class="plan.featured ? 'text-acid' : 'text-white/70'"
            >
              {{ plan.name }}
            </h3>
            <span
              aria-hidden="true"
              class="text-[0.8125rem] font-bold text-white/25 tabular-nums"
            >
              {{ plan.index }}
            </span>
          </div>

          <p
            class="mt-[0.875rem] text-[clamp(2.25rem,3vw,2.75rem)] leading-none font-black font-stretch-[89%] tracking-[-0.015em] text-white tabular-nums"
          >
            {{ plan.price }}
          </p>

          <p class="mt-[0.75rem] text-[0.9375rem] leading-[1.4] text-body">
            {{ plan.tagline }}
          </p>

          <!--
            The whole comparison lives in these two or three lines: big enough
            to read across four cards without stopping to compare bullet lists.
          -->
          <ul
            class="mt-[1.5rem] flex flex-col gap-[0.5rem] border-t border-white/12 pt-[1.5rem]"
          >
            <li
              v-for="highlight in plan.highlights"
              :key="highlight.label"
              class="text-[clamp(1.0625rem,1.35vw,1.25rem)] leading-[1.15] font-black font-stretch-[89%] tracking-[-0.005em] text-white uppercase"
            >
              <span
                v-if="highlight.value"
                class="me-[0.3em] text-acid tabular-nums"
                >{{ highlight.value }}</span
              >{{ highlight.label }}
            </li>
          </ul>

          <ul class="mt-[1.5rem] flex flex-col gap-[0.5rem]">
            <li
              v-for="detail in plan.details"
              :key="detail"
              class="flex items-start gap-[0.5rem] text-[0.8125rem] leading-[1.4] text-white/55"
            >
              <Check
                aria-hidden="true"
                class="mt-[0.1875rem] size-[0.75rem] shrink-0 text-acid/70"
                :stroke-width="3"
              />
              {{ detail }}
            </li>
          </ul>

          <div class="mt-auto pt-[1.75rem]">
            <Button
              :variant="plan.featured ? 'acid' : 'outline'"
              class="h-[3rem] w-full rounded-[0.625rem] text-[0.875rem] font-extrabold"
              @click="openApply"
            >
              {{ plan.cta }}
            </Button>
          </div>
        </Reveal>
      </ul>

      <Reveal
        as="p"
        :delay="0.12"
        class="mt-[2rem] text-center text-[0.9375rem] text-subtle"
      >
        {{ packages.note }}
      </Reveal>
    </div>
  </section>
</template>
