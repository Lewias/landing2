<script setup lang="ts">
import { motion } from "motion-v";
import { ArrowRight } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import OfferCard from "@/components/OfferCard.vue";
import PhoneShowcase from "@/components/PhoneShowcase.vue";
import { hero } from "@/data/site";
import { useApplyModal } from "@/lib/apply-modal";
import { useEnter } from "@/lib/motion";

const { enter, fadeUp } = useEnter();
const { openApply } = useApplyModal();

/** Flattened headline text, so screen readers get one clean sentence. */
const headlineLabel = hero.headline
  .map((line) => line.map((part) => part.text).join(""))
  .join(" ")
  .replace(/\s+/g, " ")
  .trim();
</script>

<template>
  <section class="relative">
    <!--
      On large screens the artwork is taken out of flow: its black padding
      overlaps the stats row exactly like it does in the design, while the
      copy column alone sets the section height.
    -->
    <div class="relative z-10 pt-[2.875rem] lg:w-[40%] lg:pt-[4.4375rem]">
      <h1
        :aria-label="headlineLabel"
        class="text-[clamp(2rem,4.22vw,3.375rem)] leading-[1.15] font-black font-stretch-[89%] tracking-[-0.005em] whitespace-pre uppercase"
      >
        <motion.span
          v-for="(line, i) in hero.headline"
          :key="i"
          aria-hidden="true"
          :initial="fadeUp"
          :animate="{ opacity: 1, y: 0 }"
          :transition="enter(0.06 + i * 0.09)"
          class="block"
        >
          <span
            v-for="(part, j) in line"
            :key="j"
            :class="
              part.accent
                ? 'text-acid drop-shadow-[0_0_22px_rgba(172,215,14,0.35)]'
                : 'text-white'
            "
            >{{ part.text }}</span
          >
        </motion.span>
      </h1>

      <motion.p
        :initial="fadeUp"
        :animate="{ opacity: 1, y: 0 }"
        :transition="enter(0.34)"
        class="mt-[1.1875rem] max-w-[26rem] text-[1.0625rem] leading-[1.65625rem] text-body"
      >
        {{ hero.description }}
      </motion.p>

      <motion.div
        :initial="fadeUp"
        :animate="{ opacity: 1, y: 0 }"
        :transition="enter(0.42)"
        class="mt-[1.875rem]"
      >
        <OfferCard />
      </motion.div>

      <motion.div
        :initial="fadeUp"
        :animate="{ opacity: 1, y: 0 }"
        :transition="enter(0.5)"
        class="mt-[1.8125rem]"
      >
        <Button
          variant="acid"
          size="hero"
          class="w-[28.625rem] max-w-full gap-[clamp(0.625rem,1.3vw,1rem)] rounded-[0.625rem] px-[clamp(1rem,2.2vw,1.75rem)] text-[clamp(0.9375rem,1.65vw,1.3125rem)] font-extrabold"
          @click="openApply"
        >
          {{ hero.cta.label }}
          <ArrowRight class="size-[1.3125rem]" :stroke-width="3" />
        </Button>

        <p class="mt-[0.875rem] text-[1rem] leading-none text-subtle">
          {{ hero.cta.note }}
        </p>
      </motion.div>
    </div>

    <div
      class="pointer-events-none mt-10 lg:absolute lg:top-[0.0625rem] lg:-right-[1.8%] lg:mt-0 lg:w-[62%]"
    >
      <PhoneShowcase />
    </div>
  </section>
</template>
