/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Telegram bot credentials. Both are inlined into the public bundle at build
   * time — never point these at a bot that can do anything but post into the
   * one chat below.
   */
  readonly VITE_TELEGRAM_BOT_TOKEN?: string;
  readonly VITE_TELEGRAM_CHAT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}
