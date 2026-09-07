<script setup lang="ts">
import { AccordionRoot, type AccordionRootProps, useForwardPropsEmits } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<AccordionRootProps & { class?: string }>();
const emits = defineEmits<{ "update:modelValue": [value: string | string[] | undefined] }>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AccordionRoot v-bind="forwarded" :class="cn('w-full', props.class)">
    <slot />
  </AccordionRoot>
</template>
