import { motion, useScroll, useSpring, type MotionValue } from "motion/react";
import type { RefObject } from "react";

const VINE_PATH =
  "M50 0 C 48 40, 52 70, 50 110 S 47.5 180, 50 220 S 52.5 300, 50 340 S 47.5 420, 50 470 S 52.5 560, 50 610 S 47.5 700, 50 760 S 52.5 850, 50 900 S 49.5 960, 50 1000";

/** The glowing vine that grows down the whole story as the visitor scrolls. */
export function Vine({ target }: { target: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
      <svg
        className="h-full w-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d={VINE_PATH} className="stroke-glow/15" strokeWidth={6} vectorEffect="non-scaling-stroke" />
        <VinePath d={VINE_PATH} progress={pathLength} />
      </svg>
    </div>
  );
}

function VinePath({ d, progress }: { d: string; progress: MotionValue<number> }) {
  return (
    <motion.path
      d={d}
      className="stroke-glow"
      strokeWidth={2.5}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      style={{ pathLength: progress, filter: "drop-shadow(0 0 6px var(--glow)) drop-shadow(0 0 18px var(--glow))" }}
    />
  );
}
