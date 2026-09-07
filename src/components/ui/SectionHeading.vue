<script setup lang="ts">
import Reveal from "@/components/ui/Reveal.vue";

/**
 * Editorial two-column heading: the title holds the left of the grid and the
 * lead paragraph sits opposite it, so the block uses the full container width
 * instead of stranding half of it.
 */
const props = defineProps<{
  eyebrow: string;
  title: string;
  lead?: string;
}>();
</script>

<template>
  <!--
    Only split into two columns when there is a lead to put opposite the title.
    Without this the FAQ heading, which sits in a narrow column of its own, gets
    squeezed to about a fifth of the container and breaks a word per line.
  -->
  <div
    class="grid grid-cols-1 gap-x-[clamp(2rem,4vw,5rem)] gap-y-[1.5rem]"
    :class="
      props.lead ? 'lg:grid-cols-[minmax(0,54fr)_minmax(0,46fr)] lg:items-end' : ''
    "
  >
    <div>
      <Reveal
        class="flex items-center gap-[0.75rem] text-[0.8125rem] font-bold tracking-[0.16em] text-acid uppercase"
      >
        <span aria-hidden="true" class="h-px w-[1.75rem] bg-acid" />
        {{ props.eyebrow }}
      </Reveal>

      <Reveal
        as="h2"
        :delay="0.06"
        class="mt-[1.25rem] max-w-[min(18ch,100%)] text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.08] font-black font-stretch-[89%] tracking-[-0.01em] text-white uppercase"
      >
        {{ props.title }}
      </Reveal>
    </div>

    <Reveal
      v-if="props.lead"
      as="p"
      :delay="0.12"
      class="max-w-[52ch] text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.6] text-body lg:pb-[0.375rem]"
    >
      {{ props.lead }}
    </Reveal>
  </div>
</template>
