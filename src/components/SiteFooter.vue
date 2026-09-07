<script setup lang="ts">
import { ArrowUpRight, Instagram, Youtube } from "lucide-vue-next";
import { TikTokIcon } from "@/components/icons";
import { footer } from "@/data/content";
import { useApplyModal } from "@/lib/apply-modal";
import { brand } from "@/data/site";

const socials = [
  { label: "Instagram", href: brand.instagramUrl, icon: Instagram },
  { label: "TikTok", href: brand.tiktokUrl, icon: TikTokIcon },
  { label: "YouTube", href: brand.youtubeUrl, icon: Youtube },
];

const { openApply } = useApplyModal();

const isExternal = (href?: string) => !!href?.startsWith("http");
</script>

<template>
  <footer class="w-full border-t border-white/10 bg-white/[0.015]">
    <div class="container-page">
      <div
        class="grid grid-cols-1 gap-[clamp(2.5rem,4vw,4rem)] pt-[clamp(3.5rem,5vw,5rem)] pb-[clamp(2.5rem,3.5vw,3.5rem)] lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]"
      >
        <div>
          <a href="#top" class="inline-block">
            <span
              class="block text-[1.5625rem] leading-none font-black font-stretch-[87%] tracking-[-0.005em] text-white uppercase"
            >
              {{ brand.name
              }}<span class="align-super text-[0.8125rem] leading-none text-acid">{{
                brand.trademark
              }}</span>
            </span>
          </a>

          <p class="mt-[1.25rem] max-w-[42ch] text-[1rem] leading-[1.6] text-subtle">
            {{ footer.blurb }}
          </p>

          <ul class="mt-[1.75rem] flex items-center gap-[0.75rem]">
            <li v-for="social in socials" :key="social.label">
              <a
                :href="social.href"
                target="_blank"
                rel="noreferrer noopener"
                :aria-label="`Feel Agency on ${social.label}`"
                class="grid size-[2.625rem] place-items-center rounded-[0.75rem] border border-white/15 text-white/70 transition-colors hover:border-acid hover:text-acid"
              >
                <component :is="social.icon" class="size-[1.125rem]" />
              </a>
            </li>
          </ul>
        </div>

        <div class="grid gap-[2.5rem] sm:grid-cols-2">
          <nav v-for="column in footer.columns" :key="column.title">
            <h2
              class="text-[0.8125rem] font-bold tracking-[0.16em] text-acid uppercase"
            >
              {{ column.title }}
            </h2>
            <ul class="mt-[1.25rem] flex flex-col gap-[0.875rem]">
              <li v-for="link in column.links" :key="link.label">
                <button
                  v-if="link.action === 'apply'"
                  type="button"
                  class="text-[1rem] text-white/75 transition-colors hover:text-acid"
                  @click="openApply"
                >
                  {{ link.label }}
                </button>
                <a
                  v-else
                  :href="link.href"
                  :target="isExternal(link.href) ? '_blank' : undefined"
                  :rel="isExternal(link.href) ? 'noreferrer noopener' : undefined"
                  class="group inline-flex items-center gap-[0.375rem] text-[1rem] text-white/75 transition-colors hover:text-acid"
                >
                  {{ link.label }}
                  <ArrowUpRight
                    v-if="isExternal(link.href)"
                    aria-hidden="true"
                    class="size-[0.875rem] opacity-0 transition-opacity group-hover:opacity-100"
                    :stroke-width="2.4"
                  />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div
        class="flex flex-col gap-[0.75rem] border-t border-white/10 py-[1.75rem] text-[0.875rem] text-white/45 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>{{ footer.legal }}</p>
        <p>{{ brand.tagline }}</p>
      </div>
    </div>
  </footer>
</template>
