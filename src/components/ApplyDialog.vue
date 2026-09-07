<script setup lang="ts">
import { ref, watch } from "vue";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from "reka-ui";
import { Check, X } from "lucide-vue-next";
import ApplyForm from "@/components/ApplyForm.vue";
import { apply } from "@/data/apply";
import { useApplyModal } from "@/lib/apply-modal";

const { open, closeApply } = useApplyModal();

/**
 * Reka UI keeps the content mounted between openings, so a finished submission
 * would still be on screen next time. Bumping the key remounts the form after
 * it has been sent — but only then, so a half-typed brief survives a mis-click.
 */
const formKey = ref(0);
let wasSent = false;

const onSent = () => (wasSent = true);

/**
 * Reka focuses the first tabbable node, which lands the ring on the close
 * button. Put the caret in the first field instead — but only where there is a
 * real pointer, so opening the dialog on a phone does not throw up the keyboard.
 */
function onOpenAutoFocus(event: Event) {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  const first = document.getElementById("apply-instagram");
  if (!first) return;
  event.preventDefault();
  first.focus();
}

watch(open, (isOpen) => {
  if (!isOpen && wasSent) {
    wasSent = false;
    formKey.value += 1;
  }
});
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm data-[state=closed]:animate-[fade-out_200ms_ease] data-[state=open]:animate-[fade-in_240ms_ease]"
      />

      <DialogContent
        @open-auto-focus="onOpenAutoFocus"
        class="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain p-[1rem] outline-none sm:items-center sm:p-[1.5rem] data-[state=closed]:animate-[dialog-out_200ms_ease] data-[state=open]:animate-[dialog-in_280ms_cubic-bezier(0.22,1,0.36,1)]"
      >
        <div
          class="relative my-auto w-full max-w-[34rem] rounded-[1.25rem] border border-acid/30 bg-background shadow-[0_0_90px_-20px_rgba(172,215,14,0.35)]"
        >
          <!-- Acid halo behind the panel, same treatment as the page sections. -->
          <div
            aria-hidden="true"
            class="pointer-events-none absolute -inset-[3rem] -z-10 rounded-full blur-[5rem]"
            style="
              background: radial-gradient(
                ellipse at center,
                rgba(172, 215, 14, 0.14) 0%,
                transparent 68%
              );
            "
          />

          <div
            class="flex items-start justify-between gap-[1rem] border-b border-white/10 px-[clamp(1.25rem,3vw,2rem)] pt-[clamp(1.25rem,2.6vw,1.75rem)] pb-[1rem]"
          >
            <div>
              <p
                class="flex items-center gap-[0.75rem] text-[0.75rem] font-bold tracking-[0.16em] text-acid uppercase"
              >
                <span aria-hidden="true" class="h-px w-[1.5rem] bg-acid" />
                {{ apply.eyebrow }}
              </p>
              <DialogTitle
                class="mt-[0.75rem] max-w-[18ch] text-[clamp(1.375rem,2.6vw,1.75rem)] leading-[1.1] font-black font-stretch-[89%] tracking-[-0.01em] text-white uppercase"
              >
                {{ apply.dialogTitle }}
              </DialogTitle>
              <DialogDescription
                class="mt-[0.625rem] max-w-[44ch] text-[0.9375rem] leading-[1.55] text-body"
              >
                {{ apply.dialogLead }}
              </DialogDescription>
            </div>

            <DialogClose
              aria-label="Close"
              class="grid size-[2.375rem] shrink-0 place-items-center rounded-[0.6875rem] border border-white/15 text-white/70 transition-colors hover:border-acid hover:text-acid"
            >
              <X class="size-[1.125rem]" :stroke-width="2.2" />
            </DialogClose>
          </div>

          <ul
            class="flex flex-wrap gap-x-[1.25rem] gap-y-[0.5rem] border-b border-white/10 px-[clamp(1.25rem,3vw,2rem)] py-[0.75rem]"
          >
            <li
              v-for="point in apply.points"
              :key="point"
              class="flex items-center gap-[0.5rem] text-[0.8125rem] leading-[1.35] text-white/70"
            >
              <Check aria-hidden="true" class="size-[0.875rem] shrink-0 text-acid" :stroke-width="3" />
              {{ point }}
            </li>
          </ul>

          <div class="px-[clamp(1.25rem,3vw,2rem)] py-[clamp(1.25rem,2.4vw,1.5rem)]">
            <ApplyForm :key="formKey" @sent="onSent" @done="closeApply" />
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
