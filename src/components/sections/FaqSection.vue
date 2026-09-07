<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Reveal from "@/components/ui/Reveal.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { faq } from "@/data/content";

/** Open the first question by default. */
const defaultOpen = faq.items[0]?.question ?? "";
</script>

<template>
  <section
    id="faq"
    class="section-y w-full border-t border-white/10 bg-white/[0.015]"
  >
    <div class="container-page">
      <div class="grid grid-cols-1 gap-[clamp(2.5rem,4vw,4rem)] lg:grid-cols-[minmax(0,38fr)_minmax(0,62fr)]">
        <SectionHeading :eyebrow="faq.eyebrow" :title="faq.title" />

        <Reveal :delay="0.08">
          <Accordion type="single" collapsible :default-value="defaultOpen">
            <AccordionItem
              v-for="item in faq.items"
              :key="item.question"
              :value="item.question"
            >
              <AccordionTrigger>{{ item.question }}</AccordionTrigger>
              <AccordionContent>{{ item.answer }}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Reveal>
      </div>
    </div>
  </section>
</template>
