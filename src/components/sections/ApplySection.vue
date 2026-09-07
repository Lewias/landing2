<script setup lang="ts">
import { ArrowRight, Check } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/ui/Reveal.vue";
import { apply } from "@/data/apply";
import { useApplyModal } from "@/lib/apply-modal";

const { openApply } = useApplyModal();
</script>

<template>
  <section
    id="apply"
    class="section-y relative w-full overflow-hidden border-t border-acid/25"
  >
    <!-- Acid halo, echoing the glow baked into the hero artwork. -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute top-1/2 left-1/2 h-[34rem] w-[62rem] max-w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[7rem]"
      style="
        background: radial-gradient(
          ellipse at center,
          rgba(172, 215, 14, 0.16) 0%,
          rgba(110, 150, 10, 0.06) 45%,
          transparent 72%
        );
      "
    />

    <div class="container-page relative">
      <div class="flex flex-col items-center text-center">
        <Reveal
          class="flex items-center gap-[0.75rem] text-[0.8125rem] font-bold tracking-[0.16em] text-acid uppercase"
        >
          <span aria-hidden="true" class="h-px w-[1.75rem] bg-acid" />
          {{ apply.eyebrow }}
        </Reveal>

        <Reveal
          as="h2"
          :delay="0.06"
          class="mt-[1.25rem] max-w-[min(18ch,100%)] text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.08] font-black font-stretch-[89%] tracking-[-0.01em] text-white uppercase"
        >
          {{ apply.title }}
        </Reveal>

        <Reveal
          as="p"
          :delay="0.12"
          class="mt-[1.5rem] max-w-[52ch] text-[clamp(1rem,1.35vw,1.125rem)] leading-[1.6] text-body"
        >
          {{ apply.lead }}
        </Reveal>

        <Reveal
          as="ul"
          :delay="0.18"
          class="mt-[2rem] flex flex-col items-center gap-x-[2rem] gap-y-[0.875rem] sm:flex-row sm:flex-wrap sm:justify-center"
        >
          <li
            v-for="point in apply.points"
            :key="point"
            class="flex items-center gap-[0.625rem] text-[0.9375rem] leading-[1.4] text-white/80"
          >
            <span
              aria-hidden="true"
              class="grid size-[1.25rem] shrink-0 place-items-center rounded-full border border-acid/50 text-acid"
            >
              <Check class="size-[0.75rem]" :stroke-width="3" />
            </span>
            {{ point }}
          </li>
        </Reveal>

        <Reveal :delay="0.24" class="mt-[2.5rem] w-full sm:w-auto">
          <Button
            variant="acid"
            size="hero"
            class="w-full rounded-[0.625rem] font-extrabold sm:w-auto"
            @click="openApply"
          >
            {{ apply.submitLabel }}
            <ArrowRight class="size-[1.3125rem]" :stroke-width="3" />
          </Button>
        </Reveal>

        <Reveal as="p" :delay="0.3" class="mt-[1.25rem] text-[0.9375rem] text-subtle">
          {{ apply.note }}
        </Reveal>
      </div>
    </div>
  </section>
</template>
