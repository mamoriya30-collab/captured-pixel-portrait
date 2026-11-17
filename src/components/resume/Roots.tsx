import { motion } from "motion/react";
import { useState } from "react";
import { ROOT_NODES } from "./data";

const ROOT_PATHS = [
  "M500 0 C 500 80, 480 120, 420 170 S 250 240, 190 330",
  "M500 0 C 500 90, 520 140, 590 190 S 760 250, 810 340",
  "M470 120 C 420 200, 330 360, 290 520 S 220 640, 170 700",
  "M530 130 C 590 230, 680 380, 720 520 S 790 640, 840 700",
  "M500 60 C 500 300, 505 500, 500 760",
  "M190 330 C 150 380, 110 400, 60 430",
  "M810 340 C 860 380, 900 400, 950 440",
];

// Node anchor positions as % of the root canvas (desktop)
const NODE_POS = [
  { left: "19%", top: "38%" },
  { left: "81%", top: "40%" },
  { left: "17%", top: "88%" },
  { left: "84%", top: "88%" },
];

export function Roots() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="roots" className="relative overflow-hidden bg-roots px-6 pb-32 pt-32 md:pb-44">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-glow">Chapter 02 · The Roots</p>
          <h2 className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] text-cream">
            Rooted in STEM.
            <span className="block italic text-glow glow-text">Growing into Strategy.</span>
          </h2>
        </motion.div>

        {/* Desktop: an interactive root map */}
        <div className="relative mx-auto mt-16 hidden aspect-[1000/780] w-full max-w-5xl md:block">
          <svg aria-hidden viewBox="0 0 1000 780" className="absolute inset-0 h-full w-full" fill="none">
            {ROOT_PATHS.map((d, i) => (
              <motion.path
                key={d}
                d={d}
                className="stroke-glow"
                strokeOpacity={i === 4 ? 0.25 : 0.6}
                strokeWidth={i < 2 ? 2.5 : 1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 2.2, delay: i * 0.15, ease: "easeInOut" }}
                style={{ filter: "drop-shadow(0 0 6px var(--glow))" }}
              />
            ))}
          </svg>
          {ROOT_NODES.map((node, i) => (
            <RootNodeCard
              key={node.id}
              node={node}
              index={i}
              open={active === node.id}
              onOpen={() => setActive(node.id)}
              onClose={() => setActive((a) => (a === node.id ? null : a))}
              style={NODE_POS[i]!}
              align={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>

        {/* Mobile: a stacked root column */}
        <div className="relative mt-14 space-y-5 border-l border-glow/40 pl-6 md:hidden">
          {ROOT_NODES.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="glass relative rounded-2xl p-5"
            >
              <span aria-hidden className="node-dot absolute -left-[35px] top-6 h-4 w-4 rounded-full" />
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-glow">{node.tag}</p>
              <p className="mt-1 font-display text-2xl text-cream">{node.title}</p>
              {node.lines.map((l) => (
                <p key={l} className="mt-2 text-sm leading-relaxed text-cream-soft">{l}</p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RootNodeCard({
  node,
  index,
  open,
  onOpen,
  onClose,
  style,
  align,
}: {
  node: (typeof ROOT_NODES)[number];
  index: number;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  style: { left: string; top: string };
  align: "left" | "right";
}) {
  return (
    <motion.div
      className="absolute z-10"
      style={style}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
      onHoverStart={onOpen}
      onHoverEnd={onClose}
    >
      <button
        type="button"
        onClick={() => (open ? onClose() : onOpen())}
        onFocus={onOpen}
        onBlur={onClose}
        aria-expanded={open}
        className="group relative -translate-x-1/2 -translate-y-1/2 focus:outline-none"
      >
        <span className="node-dot block h-6 w-6 rounded-full animate-pulse-glow group-focus-visible:ring-2 group-focus-visible:ring-glow" />
        <span
          className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-left ${
            align === "left" ? "left-9" : "right-9 text-right"
          }`}
        >
          <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-glow">{node.tag}</span>
          <span className="block font-display text-2xl text-cream">{node.title}</span>
        </span>
      </button>

      <motion.div
        initial={false}
        animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`glass absolute top-8 w-80 rounded-2xl p-5 ${
          align === "left" ? "left-0" : "right-0"
        } ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {node.lines.map((l) => (
          <p key={l} className="mt-2 text-sm leading-relaxed text-cream first:mt-0 first:font-semibold">
            {l}
          </p>
        ))}
      </motion.div>
    </motion.div>
  );
}
