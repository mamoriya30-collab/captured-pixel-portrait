import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Branches } from "@/components/resume/Branches";
import { Finale } from "@/components/resume/Finale";
import { Fruits } from "@/components/resume/Fruits";
import { Hero } from "@/components/resume/Hero";
import { Leaves } from "@/components/resume/Leaves";
import { Roots } from "@/components/resume/Roots";
import { Trunk } from "@/components/resume/Trunk";
import { Vine } from "@/components/resume/Vine";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Purvai Mamoriya — Seed to Tree to Fruit" },
      {
        name: "description",
        content:
          "The interactive résumé of Purvai Mamoriya: a first-generation business student at IIM Sambalpur and IIM Bangalore, building ecosystems.",
      },
      { property: "og:title", content: "Purvai Mamoriya — Seed to Tree to Fruit" },
      {
        property: "og:description",
        content: "An interactive résumé that grows from seed to fruit — academics, admissions, dual degrees, impact and projects.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CHAPTERS = [
  { id: "seed", label: "Seed" },
  { id: "roots", label: "Roots" },
  { id: "trunk", label: "Trunk" },
  { id: "branches", label: "Branches" },
  { id: "leaves", label: "Leaves" },
  { id: "fruits", label: "Fruit" },
];

function Index() {
  const storyRef = useRef<HTMLElement>(null);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 mix-blend-difference md:px-10">
        <a href="#seed" className="pointer-events-auto font-display text-xl text-cream">
          Purvai Mamoriya
        </a>
        <nav className="pointer-events-auto hidden gap-6 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-cream md:flex">
          {CHAPTERS.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="opacity-70 transition-opacity hover:opacity-100">
              {c.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="pointer-events-auto text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-cream md:hidden">
          Contact
        </a>
      </header>

      <main ref={storyRef} className="relative overflow-x-clip">
        <Vine target={storyRef} />
        <Hero />
        <Roots />
        <Trunk />
        <Branches />
        <Leaves />
        <Fruits />
        <Finale />
      </main>
    </>
  );
}
