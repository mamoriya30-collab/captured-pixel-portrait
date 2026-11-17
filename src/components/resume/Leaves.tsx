import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useState } from "react";
import { LEAVES, type LeafItem } from "./data";

// Deterministic pseudo-random layout so server and browser render the same leaves.
const FALLING = Array.from({ length: 22 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 97.13 + n * 13.7) + 1) / 2);
  return {
    left: `${Math.round(r(1) * 100)}%`,
    size: 14 + Math.round(r(2) * 22),
    duration: `${14 + Math.round(r(3) * 16)}s`,
    delay: `-${Math.round(r(4) * 24)}s`,
    hue: i % 3,
  };
});

const SPOTS = [
  { left: "14%", top: "18%", delay: "0s" },
  { left: "62%", top: "8%", delay: "-2s" },
  { left: "36%", top: "52%", delay: "-4s" },
];

export function LeafShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 2 C 34 8, 38 24, 20 38 C 2 24, 6 8, 20 2 Z" fill="currentColor" />
      <path d="M20 6 L20 36" stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.2} className="text-ink" />
    </svg>
  );
}

export function Leaves() {
  const [open, setOpen] = useState<LeafItem | null>(null);

  return (
    <section id="leaves" className="relative min-h-[130vh] overflow-hidden bg-leaves px-6 pb-32 pt-36">
      {/* Drifting canopy */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {FALLING.map((l, i) => (
          <div
            key={i}
            className="absolute top-0 animate-leaf-fall"
            style={{ left: l.left, animationDuration: l.duration, animationDelay: l.delay }}
          >
            <div style={{ width: l.size, height: l.size }}>
              <LeafShape
                className={`h-full w-full ${
                  l.hue === 0 ? "text-glow" : l.hue === 1 ? "text-sage" : "text-forest/70"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-ink-soft">Chapter 05 · The Leaves</p>
          <h2 className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] text-ink">
            Providing Shade:
            <span className="block italic text-forest">Social Impact & Volunteering.</span>
          </h2>
          <p className="mt-6 text-sm uppercase tracking-[0.3em] text-ink-soft">Catch a leaf to read its story</p>
        </motion.div>

        <div className="relative mt-16 hidden h-[34rem] md:block">
          {LEAVES.map((leaf, i) => (
            <button
              key={leaf.id}
              type="button"
              onClick={() => setOpen(leaf)}
              className="group absolute flex animate-leaf-sway flex-col hover:[animation-play-state:paused] items-center gap-3 focus:outline-none"
              style={{ left: SPOTS[i]!.left, top: SPOTS[i]!.top, animationDelay: SPOTS[i]!.delay }}
            >
              <span className="relative block h-36 w-36 transition-transform duration-500 group-hover:scale-110 group-focus-visible:scale-110">
                <span className="absolute inset-4 rounded-full bg-glow/40 blur-2xl" />
                <LeafShape className="relative h-full w-full text-forest drop-shadow-xl" />
              </span>
              <span className="glass-light rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-ink">
                {leaf.tag}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-14 grid gap-5 md:hidden">
          {LEAVES.map((leaf) => (
            <button
              key={leaf.id}
              type="button"
              onClick={() => setOpen(leaf)}
              className="glass-light flex items-center gap-4 rounded-2xl p-4 text-left"
            >
              <LeafShape className="h-12 w-12 shrink-0 animate-leaf-sway text-forest" />
              <span>
                <span className="block text-[0.6rem] font-bold uppercase tracking-[0.3em] text-ink-soft">{leaf.tag}</span>
                <span className="block font-display text-2xl text-ink">{leaf.title}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <Dialog.Root open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <AnimatePresence>
          {open && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount>
                <motion.div
                  className="glass-light fixed left-1/2 top-1/2 z-50 w-[min(92vw,34rem)] rounded-[2rem] p-8 md:p-10"
                  initial={{ opacity: 0, scale: 0.85, x: "-50%", y: "-40%", rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%", rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-45%", rotate: 4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                >
                  <LeafShape className="h-14 w-14 text-forest" />
                  <Dialog.Description className="sr-only">{open.tag}</Dialog.Description>
                  <p className="mt-5 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-ink-soft">{open.tag}</p>
                  <Dialog.Title className="mt-2 font-display text-4xl leading-tight text-ink md:text-5xl">
                    {open.title}
                  </Dialog.Title>
                  <p className="mt-5 text-base leading-relaxed text-ink md:text-lg">{open.body}</p>
                  <Dialog.Close
                    className="absolute right-5 top-5 rounded-full p-2 text-ink transition-colors hover:bg-ink/10"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </Dialog.Close>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </section>
  );
}
