import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PERSON } from "./data";

export function Finale() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-sunlit px-6 pb-16 pt-28">
      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="mx-auto mb-10 h-5 w-5 rounded-full seed-orb animate-pulse-glow"
        />
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-ink-soft">Let's plant the next seed</p>
        <a
          href={`mailto:${PERSON.email}`}
          className="group mt-8 block break-all font-display text-[clamp(2.4rem,9vw,9rem)] leading-[0.95] text-ink transition-colors hover:text-forest"
        >
          {PERSON.email}
          <span className="mx-auto mt-4 block h-[3px] w-0 bg-forest transition-all duration-700 group-hover:w-2/3" />
        </a>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${PERSON.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-cream transition-transform hover:scale-105"
          >
            Write to me <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={PERSON.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-ink/5"
          >
            Connect on LinkedIn <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-24 flex flex-col items-center justify-between gap-3 border-t border-ink/10 pt-6 text-xs text-ink-soft md:flex-row">
          <span className="font-display text-lg text-ink">{PERSON.name}</span>
          <span>Seed · Roots · Trunk · Branches · Leaves · Fruit</span>
        </div>
      </div>
    </footer>
  );
}
