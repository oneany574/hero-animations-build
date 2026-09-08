import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ActionLink } from "@/components/ui/action";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: "search",
    theme: "blue",
    person: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=90",
    alt: "Smiling marketing professional",
    card: <>Optimize 2,000<br />web pages for<br />search, instantly</>,
    metric: null,
    metricLabel: null,
  },
  {
    id: "campaign",
    theme: "pink",
    person: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=90",
    alt: "Smiling campaign strategist",
    card: <>Scale a launch<br />campaign into 8<br />markets, within days</>,
    metric: "+35%",
    metricLabel: "Pipeline",
  },
  {
    id: "email",
    theme: "green",
    person: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=90",
    alt: "Smiling email marketing specialist",
    card: <>Create 6,000 hyper-<br />personalized emails<br />within minutes</>,
    metric: "11x",
    metricLabel: <>click-through<br />rate</>,
  },
] as const;

function DecorativeShapes({ theme }: { theme: string }) {
  if (theme === "pink") return <><div className="shape bars" /><div className="shape arrow" /><div className="shape olives"><i /><i /><i /></div></>;
  if (theme === "green") return <><div className="shape triangle" /><div className="shape strokes" /><div className="shape green-circles"><i /><i /><i /><i /></div></>;
  return null;
}

function HeroScene({ index, reduced }: { index: number; reduced: boolean }) {
  const slide = slides[index] ?? slides[0];
  return (
    <motion.div key={slide.id} className={cn("scene", `scene-${slide.theme}`)} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45 }}>
      <motion.div className="hero-grid" initial={reduced ? false : { opacity: 0, scaleX: .88 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: .55 }} />
      <motion.div className="shapes" initial={reduced ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5, delay: .08 }}><DecorativeShapes theme={slide.theme} /></motion.div>
      <motion.img src={slide.person} alt={slide.alt} width="900" height="900" className="hero-person" initial={reduced ? false : { opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: .6, ease: [0.22, 1, 0.36, 1] }} />
      <motion.div className="message-card" initial={reduced ? false : { opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .45, delay: .12 }}>
        <span className="info-mark">i</span><p>{slide.card}</p>
      </motion.div>
      {slide.metric && <motion.div className="metric-card" initial={reduced ? false : { opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .35, delay: .28 }}><strong>{slide.metric}</strong><span>{slide.metricLabel}</span></motion.div>}
    </motion.div>
  );
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const reduced = Boolean(useReducedMotion());
  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % slides.length), 4000);
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <main id="top" className="hero-shell">
      <section className="hero-copy" aria-labelledby="hero-title">
        <h1 id="hero-title">Put AI agents to work<br className="hidden sm:block" /> for marketing</h1>
        <p>Orchestrate intelligent agents to run end-to-end marketing workflows—<br className="hidden md:block" /> delivering speed, control, and measurable impact.</p>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row"><ActionLink href="#trial" variant="outline">Start Free Trial</ActionLink><ActionLink href="#demo">Get A Demo</ActionLink></div>
      </section>
      <div className="hero-art" aria-live="off"><AnimatePresence mode="sync"><HeroScene index={index} reduced={reduced} /></AnimatePresence></div>
    </main>
  );
}