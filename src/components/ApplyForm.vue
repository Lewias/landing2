<script setup lang="ts">
import { nextTick, reactive, ref } from "vue";
import { ArrowRight, Check, Loader2 } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { apply, type FieldSpec } from "@/data/apply";
import { sendToTelegram, telegramConfigured } from "@/lib/telegram";
import { cn } from "@/lib/utils";

type FieldName = FieldSpec["name"];
type Status = "idle" | "sending" | "sent" | "error";

const emit = defineEmits<{ sent: []; done: [] }>();

const values = reactive<Record<FieldName, string>>({
  instagram: "",
  email: "",
  description: "",
});
const errors = reactive<Partial<Record<FieldName, string>>>({});
const status = ref<Status>("idle");
/** Which delivery actually happened, so the success copy can tell the truth. */
const delivered = ref<"mail" | "posted">("mail");
/** Bots fill hidden fields; people never see this one. */
const honeypot = ref("");

const controls = new Map<FieldName, HTMLInputElement | HTMLTextAreaElement>();
const registerControl = (name: FieldName) => (el: unknown) => {
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    controls.set(name, el);
  } else {
    controls.delete(name);
  }
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(field: FieldSpec): string | undefined {
  const value = values[field.name].trim();
  if (!value) return field.required;
  if (field.name === "email" && !EMAIL.test(value)) return field.invalid;
  if (field.name === "description" && value.length < 10) return field.invalid;
  return undefined;
}

/** Re-check a field the visitor has already been told about, but never nag early. */
function revalidate(field: FieldSpec) {
  if (errors[field.name]) errors[field.name] = validate(field);
}

function payload() {
  return {
    instagram: values.instagram.trim().replace(/^@+/, ""),
    email: values.email.trim(),
    description: values.description.trim(),
  };
}

function mailtoUrl() {
  const handle = values.instagram.trim().replace(/^@+/, "");
  const body = [
    `Instagram: @${handle}`,
    `Email: ${values.email.trim()}`,
    "",
    values.description.trim(),
  ].join("\n");
  return `mailto:${apply.mailTo}?subject=${encodeURIComponent(
    apply.mailSubject,
  )}&body=${encodeURIComponent(body)}`;
}

async function onSubmit() {
  if (status.value === "sending") return;

  let firstInvalid: FieldName | undefined;
  for (const field of apply.fields) {
    const message = validate(field);
    errors[field.name] = message;
    if (message && !firstInvalid) firstInvalid = field.name;
  }
  if (firstInvalid) {
    await nextTick();
    controls.get(firstInvalid)?.focus();
    return;
  }

  // Silently accept and drop anything that filled the honeypot.
  if (honeypot.value) {
    status.value = "sent";
    emit("sent");
    return;
  }

  status.value = "sending";
  try {
    if (telegramConfigured) {
      await sendToTelegram(payload());
      delivered.value = "posted";
    } else if (apply.endpoint) {
      const res = await fetch(apply.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload()),
      });
      if (!res.ok) throw new Error(String(res.status));
      delivered.value = "posted";
    } else {
      delivered.value = "mail";
      window.location.href = mailtoUrl();
    }
    status.value = "sent";
    emit("sent");
  } catch {
    status.value = "error";
  }
}

function reset() {
  values.instagram = "";
  values.email = "";
  values.description = "";
  for (const field of apply.fields) errors[field.name] = undefined;
  honeypot.value = "";
  status.value = "idle";
}

const controlBase =
  "w-full rounded-[0.75rem] border bg-background text-[1rem] leading-[1.5] text-white transition-[border-color,box-shadow] outline-none placeholder:text-white/30 focus:border-acid focus:shadow-[0_0_0_3px_rgba(172,215,14,0.16)]";
</script>

<template>
  <div>
    <!-- Success panel replaces the fields so the outcome is unmistakable. -->
    <div v-if="status === 'sent'" class="flex flex-col items-start py-[0.5rem]">
      <span
        class="grid size-[3.25rem] place-items-center rounded-full border border-acid/60 bg-acid/10 text-acid shadow-[0_0_30px_-6px_rgba(172,215,14,0.6)]"
      >
        <Check class="size-[1.625rem]" :stroke-width="2.6" />
      </span>
      <h3
        class="mt-[1.5rem] text-[clamp(1.25rem,1.8vw,1.5rem)] leading-none font-black font-stretch-[89%] text-white uppercase"
      >
        {{ delivered === "posted" ? apply.success.titlePosted : apply.success.titleMail }}
      </h3>
      <p class="mt-[1rem] max-w-[46ch] text-[1rem] leading-[1.6] text-body">
        {{ delivered === "posted" ? apply.success.bodyPosted : apply.success.bodyMail }}
      </p>
      <div class="mt-[1.75rem] flex flex-wrap items-center gap-x-[1.5rem] gap-y-[0.75rem]">
        <button
          type="button"
          class="text-[0.9375rem] font-bold text-acid underline underline-offset-4 transition-opacity hover:opacity-80"
          @click="reset"
        >
          {{ apply.success.reset }}
        </button>
        <button
          type="button"
          class="text-[0.9375rem] font-semibold text-white/60 transition-colors hover:text-white"
          @click="emit('done')"
        >
          {{ apply.success.close }}
        </button>
      </div>
    </div>

    <form v-else novalidate class="relative flex flex-col gap-[1rem]" @submit.prevent="onSubmit">
      <div v-for="field in apply.fields" :key="field.name" class="flex flex-col">
        <label
          :for="`apply-${field.name}`"
          class="text-[0.75rem] font-bold tracking-[0.14em] text-white/55 uppercase"
        >
          {{ field.label }}
        </label>

        <div class="relative mt-[0.625rem]">
          <span
            v-if="field.prefix"
            aria-hidden="true"
            class="pointer-events-none absolute top-1/2 left-[1rem] -translate-y-1/2 text-[1rem] font-semibold text-acid"
          >
            {{ field.prefix }}
          </span>

          <textarea
            v-if="field.multiline"
            :id="`apply-${field.name}`"
            :ref="registerControl(field.name)"
            v-model="values[field.name]"
            :placeholder="field.placeholder"
            rows="4"
            :aria-invalid="errors[field.name] ? 'true' : undefined"
            :aria-describedby="errors[field.name] ? `apply-${field.name}-error` : undefined"
            :class="
              cn(
                controlBase,
                'min-h-[6.5rem] resize-y px-[1rem] py-[0.875rem]',
                errors[field.name] ? 'border-danger' : 'border-white/15',
              )
            "
            @blur="revalidate(field)"
            @input="revalidate(field)"
          />

          <input
            v-else
            :id="`apply-${field.name}`"
            :ref="registerControl(field.name)"
            v-model="values[field.name]"
            :type="field.type ?? 'text'"
            :placeholder="field.placeholder"
            :autocomplete="field.autocomplete"
            :inputmode="field.inputmode"
            :aria-invalid="errors[field.name] ? 'true' : undefined"
            :aria-describedby="errors[field.name] ? `apply-${field.name}-error` : undefined"
            :class="
              cn(
                controlBase,
                'h-[3.375rem]',
                field.prefix ? 'pr-[1rem] pl-[2.25rem]' : 'px-[1rem]',
                errors[field.name] ? 'border-danger' : 'border-white/15',
              )
            "
            @blur="revalidate(field)"
            @input="revalidate(field)"
          />
        </div>

        <p
          v-if="errors[field.name]"
          :id="`apply-${field.name}-error`"
          role="alert"
          class="mt-[0.5rem] text-[0.8125rem] leading-[1.45] text-danger"
        >
          {{ errors[field.name] }}
        </p>
      </div>

      <!-- Honeypot: off-screen, not tabbable, hidden from assistive tech. -->
      <div aria-hidden="true" class="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label for="apply-company">{{ apply.honeypotLabel }}</label>
        <input
          id="apply-company"
          v-model="honeypot"
          type="text"
          tabindex="-1"
          autocomplete="off"
        />
      </div>

      <Button
        type="submit"
        variant="acid"
        size="hero"
        class="mt-[0.5rem] w-full rounded-[0.75rem] font-extrabold"
        :disabled="status === 'sending'"
      >
        <Loader2 v-if="status === 'sending'" class="size-[1.25rem] animate-spin" />
        <template v-else>
          {{ apply.submitLabel }}
          <ArrowRight class="size-[1.25rem]" :stroke-width="3" />
        </template>
      </Button>

      <div v-if="status === 'error'" role="alert" class="text-[0.875rem] leading-[1.5]">
        <p class="text-danger">{{ apply.failure }}</p>
        <a
          :href="mailtoUrl()"
          class="mt-[0.375rem] inline-block font-bold text-acid underline underline-offset-4"
        >
          {{ apply.failureAction }}
        </a>
      </div>
      <p v-else class="text-[0.875rem] leading-[1.5] text-subtle">
        {{ apply.note }}
      </p>
    </form>
  </div>
</template>
