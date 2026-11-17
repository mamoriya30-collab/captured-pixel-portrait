import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { INTERVIEWS, OFFERS } from "./data";

type Inst = { name: string; note?: string };

export function Trunk() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const trunkGlow = useTransform(smooth, [0, 0.5, 1], [0.4, 1, 0.6]);

  return (
    <section ref={sectionRef} id="trunk" className="relative h-[320vh] bg-trunk">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* The thick glowing trunk */}
        <motion.div
          aria-hidden
          style={{ opacity: trunkGlow }}
          className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-16 -translate-x-1/2 rounded-full bg-glow/25 blur-2xl"
        />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-[3px] -translate-x-1/2 bg-glow shadow-glow" />

        <motion.div ref={trackRef} style={{ x }} className="relative z-10 flex items-stretch gap-8 pl-[6vw] pr-[10vw] md:gap-14">
          {/* Panel 1 – the headline */}
          <div className="flex w-[86vw] shrink-0 flex-col justify-center md:w-[62vw]">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-ink">Chapter 03 · The Trunk</p>
            <h2 className="font-display text-[clamp(2.6rem,6.5vw,6.5rem)] leading-[0.92] text-cream">
              The Breakthrough:
              <span className="block italic text-ink">Proving the Potential.</span>
            </h2>
            <div className="mt-10 flex items-end gap-5">
              <span className="font-display text-[clamp(6rem,18vw,16rem)] leading-[0.8] text-cream glow-text">2026</span>
              <span className="mb-3 max-w-[12rem] text-sm font-semibold uppercase leading-snug tracking-[0.25em] text-ink">
                Admissions Breakthrough
              </span>
            </div>
          </div>

          <BreakthroughCard
            count="07"
            title="Admission Offers"
            lead="Secured Undergraduate & Integrated Program Admission Offers from:"
            items={OFFERS}
          />
          <BreakthroughCard
            count="05"
            title="Interview Invitations"
            lead="Earned highly competitive interview invitations from:"
            items={INTERVIEWS}
            footnote="2026"
          />
        </motion.div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 h-1 w-40 -translate-x-1/2 overflow-hidden rounded-full bg-ink/15">
          <motion.div style={{ scaleX: smooth }} className="h-full origin-left bg-ink" />
        </div>
      </div>
    </section>
  );
}

function BreakthroughCard({
  count,
  title,
  lead,
  items,
  footnote,
}: {
  count: string;
  title: string;
  lead: string;
  items: Inst[];
  footnote?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 120 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass-deep flex w-[84vw] shrink-0 flex-col justify-between rounded-[2rem] p-7 md:w-[38rem] md:p-10"
    >
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-display text-[clamp(5rem,10vw,8rem)] leading-none text-cream glow-text">{count}</span>
          {footnote && (
            <span className="rounded-full border border-cream/30 px-3 py-1 text-xs font-semibold tracking-widest text-cream">
              {footnote}
            </span>
          )}
        </div>
        <h3 className="mt-2 text-sm font-bold uppercase tracking-[0.3em] text-glow">{title}</h3>
        <p className="mt-5 text-base leading-relaxed text-cream md:text-lg">{lead}</p>
      </div>
      <ul className="mt-8 flex flex-wrap gap-2.5">
        {items.map((it) => (
          <li
            key={it.name}
            className="rounded-full border border-cream/25 bg-cream/10 px-4 py-2 text-sm font-medium text-cream"
          >
            {it.name}
            {it.note && <span className="ml-1.5 text-cream-soft">({it.note})</span>}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
