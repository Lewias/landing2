<script setup lang="ts">
import SiteHeader from "@/components/SiteHeader.vue";
import HeroSection from "@/components/HeroSection.vue";
import StatsBar from "@/components/StatsBar.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import PlatformMarquee from "@/components/sections/PlatformMarquee.vue";
import ProblemSection from "@/components/sections/ProblemSection.vue";
import CasesSection from "@/components/sections/CasesSection.vue";
import TestimonialsSection from "@/components/sections/TestimonialsSection.vue";
import ServicesSection from "@/components/sections/ServicesSection.vue";
import PackagesSection from "@/components/sections/PackagesSection.vue";
import FaqSection from "@/components/sections/FaqSection.vue";
import ApplySection from "@/components/sections/ApplySection.vue";
import ApplyDialog from "@/components/ApplyDialog.vue";
</script>

<template>
  <div id="top" class="min-h-dvh overflow-x-clip bg-background">
    <a
      href="#main"
      class="sr-only rounded-md bg-acid px-4 py-2 font-bold text-black focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60]"
    >
      Skip to content
    </a>

    <SiteHeader />

    <main id="main">
      <!-- Above the fold: the hero keeps the mock's exact 1280px geometry. -->
      <div class="container-page">
        <HeroSection />
        <StatsBar />
      </div>

      <PlatformMarquee />
      <ProblemSection />
      <ServicesSection />
      <CasesSection />
      <TestimonialsSection />
      <PackagesSection />
      <FaqSection />
      <ApplySection />
    </main>

    <SiteFooter />

    <!-- Single instance, raised by every CTA on the page. -->
    <ApplyDialog />
  </div>
</template>
