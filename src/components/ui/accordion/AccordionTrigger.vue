<script setup lang="ts">
import { AccordionHeader, AccordionTrigger } from "reka-ui";
import { Plus } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      :class="
        cn(
          'flex flex-1 items-center justify-between gap-[1.5rem] py-[1.5rem] text-left text-[clamp(1rem,1.35vw,1.1875rem)] leading-[1.35] font-bold text-white transition-colors hover:text-acid data-[state=open]:text-acid',
          props.class,
        )
      "
    >
      <slot />
      <span
        aria-hidden="true"
        class="grid size-[2.125rem] shrink-0 place-items-center rounded-full border border-white/20 text-acid transition-[transform,border-color] duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-acid/60"
      >
        <Plus class="size-[1.0625rem]" :stroke-width="2.2" />
      </span>
    </AccordionTrigger>
  </AccordionHeader>
</template>
