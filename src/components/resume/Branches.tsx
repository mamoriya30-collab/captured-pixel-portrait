import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const BRANCHES = [
  {
    id: "iims",
    tag: "Branch 01",
    title: "IIM Sambalpur",
    program: "BS in Management and Public Policy",
    body: "Pursuing a BS in Management and Public Policy. Targeting a role in the Career and Skill Development Committee to drive corporate outreach.",
  },
  {
    id: "iimb",
    tag: "Branch 02",
    title: "IIM Bangalore",
    program: "BBA in Digital Business and Entrepreneurship",
    body: "Enrolled in the BBA in Digital Business and Entrepreneurship. Bridging public policy with digital ecosystems.",
  },
];

const LEADERSHIP = [
  "Active member of the School Model United Nations (MUN) Committee",
  "Delegate in the Youth Policy Dialogue (2022)",
  "Member of the Student Council",
];

export function Branches() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yLeft = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const yRight = useTransform(scrollYProgress, [0, 1], [220, -60]);
  const rotLeft = useTransform(scrollYProgress, [0, 0.5, 1], [-6, 0, 3]);
  const rotRight = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -3]);
  const branchDraw = useTransform(scrollYProgress, [0.05, 0.45], [0, 1]);
  const ys = [yLeft, yRight];
  const rots = [rotLeft, rotRight];

  return (
    <section ref={ref} id="branches" className="relative overflow-hidden bg-branches px-6 pb-40 pt-36" style={{ perspective: 1200 }}>
      <svg aria-hidden viewBox="0 0 1000 900" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[75%] w-full" fill="none">
        {[
          "M500 0 C 500 160, 480 260, 330 360 S 140 520, 90 700",
          "M500 0 C 500 160, 520 260, 670 360 S 860 520, 910 700",
          "M330 360 C 280 330, 230 330, 170 300",
          "M670 360 C 720 330, 770 330, 830 300",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            className="stroke-forest"
            strokeOpacity={i < 2 ? 0.55 : 0.35}
            strokeWidth={i < 2 ? 3 : 1.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: branchDraw }}
          />
        ))}
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-ink-soft">Chapter 04 · The Branches</p>
          <h2 className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] text-ink">
            Branching Out:
            <span className="block italic text-forest">The Dual Journey.</span>
          </h2>
        </motion.div>

        <div className="mt-24 grid gap-10 md:grid-cols-2 md:gap-20">
          {BRANCHES.map((b, i) => (
            <motion.article
              key={b.id}
              style={{ y: ys[i]!, rotateY: rots[i]! }}
              className="glass-light rounded-[2rem] p-8 md:p-10"
            >
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-ink-soft">{b.tag}</p>
              <h3 className="mt-3 font-display text-5xl leading-none text-ink md:text-6xl">{b.title}</h3>
              <p className="mt-4 inline-block rounded-full bg-forest px-4 py-1.5 text-xs font-semibold text-cream">
                {b.program}
              </p>
              <p className="mt-6 text-base leading-relaxed text-ink md:text-lg">{b.body}</p>
            </motion.article>
          ))}
        </div>

        <motion.article
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glass-light mx-auto mt-28 max-w-3xl rounded-[2rem] p-8 text-center md:p-10"
        >
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-ink-soft">Branch 03 · Diplomacy & Leadership</p>
          <ul className="mt-6 space-y-3">
            {LEADERSHIP.map((l) => (
              <li key={l} className="font-display text-2xl leading-snug text-ink md:text-3xl">
                {l}
              </li>
            ))}
          </ul>
        </motion.article>
      </div>
    </section>
  );
}
