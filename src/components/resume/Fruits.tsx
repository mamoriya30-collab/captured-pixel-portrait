import { motion, useInView } from "motion/react";
import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FRUITS, FRUIT_KINDS, type FruitKind } from "./data";

/**
 * Physics sandbox: fruits drop from the canopy and can be grabbed, dragged and thrown.
 * matter-js is loaded only in the browser, after the sandbox scrolls into view.
 */
export function Fruits() {
  const boxRef = useRef<HTMLDivElement>(null);
  const fruitRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tipRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boxRef, { once: true, amount: 0.3 });
  const [hovered, setHovered] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const box = boxRef.current;
    if (!box) return;
    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const Matter = (await import("matter-js")).default;
      if (cancelled) return;
      const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint, Query, Events } = Matter;

      const engine = Engine.create();
      engine.gravity.y = 1;

      let w = box.clientWidth;
      let h = box.clientHeight;
      const scale = w < 640 ? 0.62 : w < 1024 ? 0.82 : 1;
      box.style.setProperty("--fruit-scale", String(scale));
      const T = 200;
      const wallOpts = { isStatic: true, restitution: 0.4, friction: 0.3 };
      const ground = Bodies.rectangle(w / 2, h + T / 2, w * 3, T, wallOpts);
      const left = Bodies.rectangle(-T / 2, h / 2 - 1000, T, h * 2 + 2000, wallOpts);
      const right = Bodies.rectangle(w + T / 2, h / 2 - 1000, T, h * 2 + 2000, wallOpts);
      Composite.add(engine.world, [ground, left, right]);

      const radii = FRUITS.map((f) => FRUIT_KINDS[f.kind].radius * scale);
      const bodies = FRUITS.map((_, i) => {
        const r = radii[i]!;
        const x = r + ((i * 137) % Math.max(1, w - 2 * r));
        return Bodies.circle(x, -r - i * 70, r, {
          restitution: 0.55,
          friction: 0.08,
          frictionAir: 0.012,
          density: 0.002,
          label: String(i),
        });
      });
      Composite.add(engine.world, bodies);

      const mouse = Mouse.create(box);
      // Let the page keep scrolling with the wheel while over the sandbox.
      const m = mouse as unknown as { mousewheel: EventListener; element: HTMLElement };
      m.element.removeEventListener("wheel", m.mousewheel);
      const mc = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.18, damping: 0.1, render: { visible: false } },
      });
      Composite.add(engine.world, mc);
      Events.on(mc, "startdrag", () => setDragging(true));
      Events.on(mc, "enddrag", () => setDragging(false));

      let lastHover: number | null = null;
      const onMove = () => {
        const hit = Query.point(bodies, mouse.position)[0];
        const idx = hit ? Number(hit.label) : null;
        if (idx !== lastHover) {
          lastHover = idx;
          setHovered(idx);
        }
      };
      const onLeave = () => {
        lastHover = null;
        setHovered(null);
      };
      box.addEventListener("mousemove", onMove);
      box.addEventListener("touchstart", onMove, { passive: true });
      box.addEventListener("mouseleave", onLeave);

      const ro = new ResizeObserver(() => {
        w = box.clientWidth;
        h = box.clientHeight;
        Body.setPosition(ground, { x: w / 2, y: h + T / 2 });
        Body.setPosition(right, { x: w + T / 2, y: h / 2 - 1000 });
      });
      ro.observe(box);

      let raf = 0;
      let last = performance.now();
      let acc = 0;
      const STEP = 1000 / 60;
      const tick = (now: number) => {
        // Fixed 60Hz steps so the fall speed is the same on slow and fast screens.
        acc += Math.min(100, now - last);
        last = now;
        while (acc >= STEP) {
          Engine.update(engine, STEP);
          acc -= STEP;
        }
        bodies.forEach((b, i) => {
          if (b.position.y > h + 400 || b.position.x < -400 || b.position.x > w + 400) {
            Body.setPosition(b, { x: w / 2, y: -radii[i]! });
            Body.setVelocity(b, { x: 0, y: 0 });
          }
          const el = fruitRefs.current[i];
          if (el) {
            const r = radii[i]!;
            el.style.transform = `translate3d(${b.position.x - r}px, ${b.position.y - r}px, 0) rotate(${b.angle}rad)`;
          }
        });
        if (lastHover !== null && tipRef.current) {
          const b = bodies[lastHover]!;
          const half = tipRef.current.offsetWidth / 2;
          const tx = Math.min(Math.max(b.position.x, half + 12), w - half - 12);
          const ty = Math.max(b.position.y - radii[lastHover]! - 14, tipRef.current.offsetHeight + 12);
          tipRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -100%)`;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        box.removeEventListener("mousemove", onMove);
        box.removeEventListener("touchstart", onMove);
        box.removeEventListener("mouseleave", onLeave);
        Composite.clear(engine.world, false);
        Engine.clear(engine);
        const handlers = mouse as unknown as Record<"mousemove" | "mousedown" | "mouseup", EventListener>;
        const map: [string, EventListener][] = [
          ["mousemove", handlers.mousemove],
          ["mousedown", handlers.mousedown],
          ["mouseup", handlers.mouseup],
          ["touchmove", handlers.mousemove],
          ["touchstart", handlers.mousedown],
          ["touchend", handlers.mouseup],
        ];
        map.forEach(([evt, fn]) => m.element.removeEventListener(evt, fn));
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
      setHovered(null);
    };
  }, [inView, round]);

  const hoveredFruit = hovered !== null ? FRUITS[hovered] : null;
  const grouped = (Object.keys(FRUIT_KINDS) as FruitKind[]).map((k) => ({
    kind: k,
    items: FRUITS.filter((f) => f.kind === k),
  }));

  return (
    <section id="fruits" className="relative bg-fruits px-6 pb-24 pt-36">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-ink-soft">Chapter 06 · The Fruits</p>
          <h2 className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] text-ink">
            Harvesting <span className="italic text-forest">Impact.</span>
          </h2>
          <p className="mt-6 text-sm uppercase tracking-[0.3em] text-ink-soft">Grab, drag and throw the fruit · hover to read</p>
        </motion.div>

        <div
          ref={boxRef}
          style={{ ["--fruit-scale" as string]: 1 }}
          className={`glass-light relative mt-14 h-[62vh] min-h-[420px] select-none overflow-hidden rounded-[2.5rem] md:h-[72vh] ${
            dragging ? "cursor-grabbing" : hovered !== null ? "cursor-grab" : "cursor-default"
          }`}
        >
          {FRUITS.map((f, i) => {
            const k = FRUIT_KINDS[f.kind];
            return (
              <div
                key={`${round}-${f.label}`}
                ref={(el) => {
                  fruitRefs.current[i] = el;
                }}
                className="pointer-events-none absolute left-0 top-0 will-change-transform"
                style={{
                  width: `calc(${k.radius * 2}px * var(--fruit-scale))`,
                  height: `calc(${k.radius * 2}px * var(--fruit-scale))`,
                  transform: "translate3d(-999px,-999px,0)",
                }}
              >
                <div
                  className={`fruit h-full w-full rounded-full transition-[filter] duration-200 ${
                    hovered === i ? "brightness-110" : ""
                  }`}
                  style={{ ["--fruit-color" as string]: k.colorVar }}
                />
                <span className="absolute -top-[10%] left-1/2 h-[22%] w-[5%] -translate-x-1/2 rounded-full bg-forest" />
                <span className="absolute -top-[6%] left-[52%] h-[16%] w-[28%] rounded-[100%_0] bg-sage" />
              </div>
            );
          })}

          <div
            ref={tipRef}
            className={`pointer-events-none absolute left-0 top-0 z-20 w-max max-w-[16rem] rounded-2xl bg-ink px-4 py-3 text-cream shadow-xl transition-opacity duration-150 ${
              hoveredFruit && !dragging ? "opacity-100" : "opacity-0"
            }`}
          >
            {hoveredFruit && (
              <>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-glow">
                  {FRUIT_KINDS[hoveredFruit.kind].label}
                </p>
                <p className="mt-1 text-sm font-semibold leading-snug">{hoveredFruit.label}</p>
                {hoveredFruit.detail && <p className="mt-1 text-xs leading-snug text-cream-soft">{hoveredFruit.detail}</p>}
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setRound((r) => r + 1)}
            className="absolute right-5 top-5 z-30 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cream transition-transform hover:scale-105"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Shake the tree
          </button>
        </div>

        {/* Readable harvest list */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {grouped.map(({ kind, items }) => (
            <div key={kind}>
              <p className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-ink-soft">
                <span className="fruit inline-block h-3 w-3 rounded-full" style={{ ["--fruit-color" as string]: FRUIT_KINDS[kind].colorVar }} />
                {kind === "skill" ? "Skills" : kind === "hobby" ? "Hobbies" : kind === "project" ? "Projects" : "Athletics"}
              </p>
              <ul className="mt-3 space-y-1.5">
                {items.map((f) => (
                  <li key={f.label} className="text-sm leading-snug text-ink">
                    {f.label}
                    {f.detail && <span className="text-ink-soft"> — {f.detail}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
