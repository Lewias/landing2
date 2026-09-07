<script setup lang="ts">
import FeaturedCase from "@/components/FeaturedCase.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { cases } from "@/data/content";
</script>

<template>
  <section id="results" class="section-y w-full border-t border-white/10">
    <div class="container-page">
      <SectionHeading
        :eyebrow="cases.eyebrow"
        :title="cases.title"
        :lead="cases.lead"
      />

      <div class="mt-[clamp(2.5rem,4vw,3.75rem)]">
        <FeaturedCase />
      </div>
    </div>
  </section>
</template>
