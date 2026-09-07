import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold uppercase transition-[transform,filter,background-color] outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        acid:
          "bg-acid text-black shadow-[0_0_40px_-6px_rgba(172,215,14,0.45)] hover:bg-acid-bright hover:shadow-[0_0_56px_-4px_rgba(172,215,14,0.6)] active:scale-[0.99]",
        outline:
          "border border-acid/60 bg-transparent text-acid hover:border-acid hover:bg-acid/10",
        ghost: "bg-transparent text-white hover:bg-white/5",
      },
      size: {
        default: "h-11 px-6 text-sm",
        hero:
          "h-[3.5625rem] px-[clamp(1rem,2.2vw,1.75rem)] text-[clamp(0.9375rem,1.65vw,1.1875rem)] tracking-[0.005em]",
        sm: "h-9 px-4 text-xs",
      },
    },
    defaultVariants: { variant: "acid", size: "default" },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
