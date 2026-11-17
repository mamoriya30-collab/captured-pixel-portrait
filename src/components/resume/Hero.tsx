import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type PointerEvent } from "react";
import { OBJECTIVE } from "./data";

const MARQUEE = "Every two years, a new soil — Always adapting — ";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const seedDrop = useTransform(scrollYProgress, [0, 1], [0, 420]);
  const rootLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  function handleMove(e: PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <section
      ref={ref}
      id="seed"
      onPointerMove={handleMove}
      className="grain relative flex min-h-[110vh] flex-col items-center justify-center overflow-hidden bg-soil px-6 pb-32 pt-28"
    >
      {/* Cursor-tracking seed */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -ml-28 -mt-28 h-56 w-56 rounded-full opacity-60 blur-2xl seed-orb"
        style={{ x: sx, y: sy }}
      />

      {/* Slow serif marquee */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[14%] z-0 overflow-hidden">
        <div className="flex w-max animate-marquee whitespace-nowrap font-display text-[18vw] leading-none text-cream/[0.06]">
          <span>{MARQUEE.repeat(2)}</span>
          <span>{MARQUEE.repeat(2)}</span>
        </div>
      </div>

      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8 text-xs font-semibold uppercase tracking-[0.4em] text-glow"
        >
          Chapter 01 · The Soil & The Seed
        </motion.p>
        <h1 className="font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] tracking-tight text-cream">
          {["Every two years,", "a new soil."].map((line, i) => (
            <motion.span
              key={line}
              className="block"
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4, delay: 0.3 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.span>
          ))}
          <motion.span
            className="block italic text-glow glow-text"
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            Always adapting.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="mt-10 max-w-xl text-lg text-cream-soft md:text-xl"
        >
          I am <span className="font-semibold text-cream">Purvai Mamoriya</span>. A first-generation
          business student building ecosystems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass mt-14 max-w-2xl rounded-3xl p-7 text-left md:p-9"
        >
          <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-glow">Objective</p>
          <p className="text-base leading-relaxed text-cream md:text-lg">
            {OBJECTIVE[0]!.replace("Objective: ", "")}
          </p>
          <p className="mt-4 font-display text-xl italic leading-snug text-cream-soft md:text-2xl">
            {OBJECTIVE[1]}
          </p>
        </motion.div>
      </motion.div>

      {/* The seed sinks and drags a root down into the next chapter */}
      <motion.div aria-hidden style={{ y: seedDrop }} className="absolute bottom-24 left-1/2 z-10 -ml-3 flex flex-col items-center">
        <div className="h-6 w-6 rounded-full seed-orb animate-pulse-glow" />
      </motion.div>
      <svg aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 z-[2] h-32 w-24 -translate-x-1/2" viewBox="0 0 40 100" fill="none">
        <motion.path
          d="M20 0 C 14 30, 26 60, 20 100"
          className="stroke-glow"
          strokeWidth={1.5}
          style={{ pathLength: rootLength }}
        />
      </svg>

      <motion.p
        style={{ opacity: fade }}
        className="absolute bottom-8 z-10 text-[0.65rem] uppercase tracking-[0.4em] text-cream-soft"
      >
        Scroll to grow
      </motion.p>
    </section>
  );
}
