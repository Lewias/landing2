<script setup lang="ts">
import { AccordionItem, type AccordionItemProps } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<AccordionItemProps & { class?: string }>();
</script>

<template>
  <AccordionItem
    :value="props.value"
    :disabled="props.disabled"
    :class="
      cn(
        'group border-b border-white/12 transition-colors last:border-b-0 data-[state=open]:border-acid/40',
        props.class,
      )
    "
  >
    <slot />
  </AccordionItem>
</template>
