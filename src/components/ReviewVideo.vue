<script setup lang="ts">
import { ref } from "vue";
import { Play } from "lucide-vue-next";
import type { Testimonial } from "@/data/content";

const props = defineProps<{ item: Testimonial }>();

const el = ref<HTMLVideoElement | null>(null);
const started = ref(false);

/**
 * Nothing is fetched until someone asks for it: the poster carries the card and
 * `preload="none"` keeps three testimonial clips off the initial page weight.
 */
function start() {
  const video = el.value;
  if (!video) return;
  // Only ever one clip talking at a time.
  document.querySelectorAll("video").forEach((other) => {
    if (other !== video) other.pause();
  });
  started.value = true;
  void video.play();
}
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-[1rem] border border-white/12 bg-background transition-colors duration-300 hover:border-acid/45"
  >
    <div class="relative aspect-[9/16] w-full bg-black">
      <video
        ref="el"
        :src="props.item.video"
        :poster="props.item.poster"
        :aria-label="props.item.alt"
        preload="none"
        playsinline
        :controls="started"
        class="h-full w-full object-cover"
        @ended="started = false"
      />

      <!-- Overlay disappears on play, handing over to the native controls. -->
      <button
        v-if="!started"
        type="button"
        :aria-label="
          props.item.name
            ? `Play the video review from ${props.item.name}`
            : 'Play the video review'
        "
        class="absolute inset-0 grid place-items-center bg-gradient-to-t from-black/75 via-black/10 to-transparent transition-colors duration-300 hover:from-black/60"
        @click="start"
      >
        <span
          class="grid size-[3.5rem] place-items-center rounded-full border border-acid/70 bg-black/60 text-acid backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-acid group-hover:text-black"
        >
          <Play class="ms-[0.1875rem] size-[1.375rem]" fill="currentColor" :stroke-width="0" />
        </span>
      </button>
    </div>

    <div class="flex items-center gap-[0.75rem] p-[1.125rem]">
      <span
        aria-hidden="true"
        class="grid size-[2.25rem] shrink-0 place-items-center rounded-full border border-acid/45 text-[0.8125rem] font-bold text-acid"
      >
        {{ (props.item.name || props.item.role).charAt(0) }}
      </span>
      <div class="min-w-0">
        <p
          v-if="props.item.name"
          class="truncate text-[0.9375rem] leading-none font-bold text-white"
        >
          {{ props.item.name }}
        </p>
        <p
          class="truncate text-[0.8125rem] leading-none text-subtle"
          :class="props.item.name ? 'mt-[0.4375rem]' : ''"
        >
          {{ props.item.role }}
        </p>
      </div>
    </div>
  </div>
</template>
