<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { motion } from "motion-v";
import { ArrowRight, Instagram, Menu, X } from "lucide-vue-next";
import { brand, nav } from "@/data/site";
import { useEnter } from "@/lib/motion";
import { useApplyModal } from "@/lib/apply-modal";

const { enter } = useEnter();
const { openApply } = useApplyModal();

/** Solid backdrop only once the page has moved, so the top of the page stays clean. */
const scrolled = ref(false);
const onScroll = () => (scrolled.value = window.scrollY > 8);

const menuOpen = ref(false);

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <motion.header
    :initial="{ opacity: 0, y: -14 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="enter(0)"
    class="sticky top-0 z-50 w-full transition-colors duration-300"
    :class="
      scrolled || menuOpen
        ? 'bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/70'
        : 'bg-transparent'
    "
  >
    <div class="container-page">
      <div
        class="flex items-start justify-between gap-[1rem] border-b border-acid/50 pt-[2.1875rem] pb-[1.375rem] sm:gap-[2rem]"
      >
        <a href="#top" class="group block min-w-0">
          <span
            class="block text-[1.5625rem] leading-none font-black font-stretch-[87%] tracking-[-0.005em] text-white uppercase"
          >
            {{ brand.name
            }}<span class="align-super text-[0.8125rem] leading-none text-acid">{{
              brand.trademark
            }}</span>
          </span>
          <span
            class="mt-[0.1875rem] block text-[0.625rem] leading-none font-medium tracking-[0.055em] text-faint uppercase sm:text-[0.71875rem]"
          >
            {{ brand.tagline }}
          </span>
        </a>

        <!-- Section nav. Sits in the space the mock leaves empty, so the brand
             and the contact block keep their original positions. -->
        <nav aria-label="Sections" class="hidden items-center gap-[1.25rem] pt-[0.25rem] lg:flex xl:gap-[1.75rem]">
          <a
            v-for="link in nav"
            :key="link.href"
            :href="link.href"
            class="relative text-[0.9375rem] font-semibold text-white/75 transition-colors hover:text-acid after:absolute after:-bottom-[0.4375rem] after:left-0 after:h-px after:w-0 after:bg-acid after:transition-[width] after:duration-300 hover:after:w-full"
          >
            {{ link.label }}
          </a>
        </nav>

        <div class="-mt-[0.1875rem] flex shrink-0 items-center gap-[0.75rem] sm:gap-[1.5rem]">
          <a
            :href="brand.instagramUrl"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Feel Agency on Instagram"
            class="relative -top-[0.3125rem] hidden size-[2.375rem] place-items-center rounded-[0.6875rem] border-2 border-acid text-acid transition-colors hover:bg-acid hover:text-black sm:grid"
          >
            <Instagram class="size-[1.3125rem]" :stroke-width="2" />
          </a>

          <span
            aria-hidden="true"
            class="hidden h-[2.75rem] w-px bg-white/20 md:block"
          />

          <div class="hidden flex-col gap-[0.5625rem] md:flex">
            <button
              type="button"
              class="group flex items-center gap-[0.5625rem] text-[0.9375rem] leading-none font-bold tracking-[0.03em] text-acid uppercase"
              @click="openApply"
            >
              {{ brand.ctaLabel }}
              <ArrowRight
                class="size-[0.9375rem] transition-transform group-hover:translate-x-1"
                :stroke-width="2.6"
              />
            </button>
            <a
              :href="`mailto:${brand.email}`"
              class="text-[0.9375rem] leading-none text-white transition-colors hover:text-acid"
            >
              {{ brand.email }}
            </a>
          </div>

          <button
            type="button"
            :aria-expanded="menuOpen"
            aria-controls="mobile-nav"
            :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
            class="grid size-[2.375rem] place-items-center rounded-[0.6875rem] border border-white/20 text-white transition-colors hover:border-acid hover:text-acid lg:hidden"
            @click="menuOpen = !menuOpen"
          >
            <X v-if="menuOpen" class="size-[1.25rem]" :stroke-width="2" />
            <Menu v-else class="size-[1.25rem]" :stroke-width="2" />
          </button>
        </div>
      </div>

      <nav
        v-show="menuOpen"
        id="mobile-nav"
        aria-label="Sections"
        class="flex flex-col border-b border-white/12 py-[0.5rem] lg:hidden"
      >
        <a
          v-for="link in nav"
          :key="link.href"
          :href="link.href"
          class="border-b border-white/8 py-[0.875rem] text-[1.0625rem] font-semibold text-white/80 transition-colors last:border-b-0 hover:text-acid"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </a>
        <a
          :href="`mailto:${brand.email}`"
          class="border-b border-white/8 py-[0.875rem] text-[1.0625rem] font-bold text-acid md:hidden"
          @click="menuOpen = false"
        >
          {{ brand.email }}
        </a>
        <a
          :href="brand.instagramUrl"
          target="_blank"
          rel="noreferrer noopener"
          class="py-[0.875rem] text-[1.0625rem] font-semibold text-white/80 transition-colors hover:text-acid sm:hidden"
          @click="menuOpen = false"
        >
          Instagram
        </a>
      </nav>
    </div>
  </motion.header>
</template>
