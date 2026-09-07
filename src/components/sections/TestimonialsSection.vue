<script setup lang="ts">
import ReviewVideo from "@/components/ReviewVideo.vue";
import Reveal from "@/components/ui/Reveal.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { testimonials } from "@/data/content";
</script>

<template>
  <section
    id="reviews"
    class="section-y w-full border-t border-white/10 bg-white/[0.015]"
  >
    <div class="container-page">
      <SectionHeading
        :eyebrow="testimonials.eyebrow"
        :title="testimonials.title"
        :lead="testimonials.lead"
      />

      <!--
        Vertical clips, so the grid stays narrow: three across on a wide screen,
        never wider than a phone-shaped card.
      -->
      <ul
        class="mx-auto mt-[clamp(2.5rem,4vw,3.75rem)] grid max-w-[64rem] grid-cols-1 gap-[1.25rem] sm:grid-cols-2 lg:grid-cols-3"
      >
        <Reveal
          v-for="(item, i) in testimonials.items"
          :key="item.video"
          as="li"
          :delay="0.08 * i"
        >
          <ReviewVideo :item="item" />
        </Reveal>
      </ul>
    </div>
  </section>
</template>
