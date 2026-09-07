<script setup lang="ts">
import { AccordionContent } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <AccordionContent
    class="overflow-hidden data-[state=closed]:animate-[acc-up_260ms_ease] data-[state=open]:animate-[acc-down_260ms_ease]"
  >
    <div
      :class="
        cn('max-w-[62ch] pr-[3rem] pb-[1.75rem] text-[1rem] leading-[1.65] text-body', props.class)
      "
    >
      <slot />
    </div>
  </AccordionContent>
</template>
