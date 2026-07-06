'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, FULL_MOTION_QUERY } from '../../lib/gsap';
import './marketing-base.css';
import './guidde.css';

/**
 * GuiddeApp — an ad-hoc, personalized application page for Bar Moshe's
 * "Full Stack Engineer" application to Guidde (Tel Aviv, hybrid). Built in
 * Guidde's REAL visual language, read live off guidde.com (computed styles,
 * 2026-07-03): white surface, DM Sans everywhere with giant weight-400
 * headlines at tight tracking, blue #0062FF highlight words and CTA pills,
 * a red lowercase wordmark with a period, pastel rounded cards on
 * grid-paper texture, a logo-strip marquee, radio-chip cards, and
 * Webflow-IX2-style scroll fade-ups. The centerpiece reframes Guidde's own
 * product: a step-by-step "guidde" documenting how Bar ships a feature.
 *
 * Copy is CV-register: terse, factual, first person. Three content bands
 * (hero / how I ship / work + experience) plus the close.
 *
 * Self-contained: mounts `.mp-root` only to inherit the marketing reset /
 * focus base (carried locally as marketing-base.css), then overrides
 * everything via `.gd-root`. All motion is gated on prefers-reduced-motion
 * and the page is fully legible with no JS. Standalone sibling (the
 * ADR-0132 pattern).
 */

const EMAIL =
  'mailto:1barmoshe1@gmail.com?subject=Full%20Stack%20Engineer%20application%20from%20Bar%20Moshe';
const CV = '/Bar_Moshe_CV_Guidde.pdf';

/* ── The red wordmark: guidde. sets its name lowercase with a period. ── */
function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`gd-wordmark ${className}`}>
      bar moshe<span className="gd-wordmark__dot">.</span>
    </span>
  );
}

/* ── Hero chips: Guidde's "How can Guidde help you?" radio cards. ────── */
type Chip = { id: string; label: string; caption: string; icon: React.ReactNode };

const ICON = {
  spark: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
      <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" />
    </svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5V8z" />
      <path d="M12 16v5" />
    </svg>
  ),
  queue: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3 7h8M3 12h12M3 17h8" />
      <path d="M17 5l4 4-4 4M15 15l4 4" />
    </svg>
  ),
  component: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M10 9.5l5 2.5-5 2.5v-5z" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 3h7l4 4v14H7V3z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </svg>
  ),
};

const CHIPS: Chip[] = [
  {
    id: 'ai',
    label: 'AI features',
    caption: 'MDP, MIDI GPT REST API, entailer. LLM pipelines with verified output.',
    icon: ICON.spark,
  },
  {
    id: 'sdk',
    label: 'SDKs & plugins',
    caption: 'MDP on npm: MCP server plus Claude Code and Codex plugins others install.',
    icon: ICON.plug,
  },
  {
    id: 'pipelines',
    label: 'Event pipelines',
    caption: 'One Temporal workflow over Go, Python and TS workers. On Temporal’s Code Exchange.',
    icon: ICON.queue,
  },
  {
    id: 'react',
    label: 'React UI',
    caption: 'Biome Synth: real-time React over Tone.js, Three.js and Canvas2D.',
    icon: ICON.component,
  },
  {
    id: 'video',
    label: 'Video tooling',
    caption: 'Day job since 2021: a cloud video editor at Wochit.',
    icon: ICON.play,
  },
  {
    id: 'docs',
    label: 'Docs & guides',
    caption: 'MDP renders documents and decks from Markdown. This page is one more example.',
    icon: ICON.doc,
  },
];

/* ── The stack marquee (Guidde's customer-logo strip, repurposed). ───── */
const STACK = [
  'React',
  'Node.js',
  'TypeScript',
  'Next.js',
  'Temporal',
  'MongoDB',
  'PostgreSQL',
  'Go',
  'Python',
  'AWS',
  'Docker',
  'Kubernetes',
  'OpenAI',
  'MCP',
];

/* ── The centerpiece: how Bar ships, documented as a guidde. ─────────── */
type Step = { num: string; title: string; desc: string };

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Capture the brief',
    desc: 'Map the ask to data models and API contracts.',
  },
  {
    num: '02',
    title: 'Build the full stack',
    desc: 'Node services to React UI. One owner, no handoffs.',
  },
  {
    num: '03',
    title: 'Wire the AI',
    desc: 'Generation, retrieval, agents. Verified before merge.',
  },
  {
    num: '04',
    title: 'Ship and document',
    desc: 'Deployed, tested, written down.',
  },
];

/* Per-step flat illustrations in Guidde's product-mockup style. */
function StepVisual({ step }: { step: number }) {
  return (
    <div className="gd-player__stage" aria-hidden="true">
      {step === 0 && (
        <svg className="gd-stage" viewBox="0 0 320 200" focusable="false">
          <rect className="gd-stage__card" x="34" y="26" width="180" height="148" rx="10" />
          <rect className="gd-stage__bar gd-stage__bar--blue" x="52" y="46" width="86" height="10" rx="5" />
          <rect className="gd-stage__line" x="52" y="70" width="130" height="6" rx="3" />
          <rect className="gd-stage__line" x="52" y="84" width="110" height="6" rx="3" />
          <rect className="gd-stage__line" x="52" y="98" width="122" height="6" rx="3" />
          <rect className="gd-stage__chip gd-stage__chip--blue" x="52" y="120" width="52" height="18" rx="9" />
          <rect className="gd-stage__chip gd-stage__chip--purple" x="112" y="120" width="52" height="18" rx="9" />
          <circle className="gd-stage__cursor" cx="236" cy="128" r="10" />
          <path className="gd-stage__cursor-tip" d="M232 120l14 8-6 2-2 6-6-16z" />
          <rect className="gd-stage__mini" x="226" y="48" width="64" height="44" rx="8" />
          <rect className="gd-stage__bar gd-stage__bar--yellow" x="234" y="58" width="34" height="7" rx="3.5" />
          <rect className="gd-stage__line" x="234" y="72" width="44" height="5" rx="2.5" />
        </svg>
      )}
      {step === 1 && (
        <svg className="gd-stage" viewBox="0 0 320 200" focusable="false">
          <rect className="gd-stage__card" x="28" y="24" width="128" height="152" rx="10" />
          <rect className="gd-stage__bar gd-stage__bar--purple" x="44" y="42" width="64" height="9" rx="4.5" />
          <rect className="gd-stage__row" x="44" y="66" width="96" height="12" rx="6" />
          <rect className="gd-stage__row" x="44" y="88" width="96" height="12" rx="6" />
          <rect className="gd-stage__row gd-stage__row--active" x="44" y="110" width="96" height="12" rx="6" />
          <rect className="gd-stage__row" x="44" y="132" width="72" height="12" rx="6" />
          <path className="gd-stage__wire" d="M156 100h36" />
          <circle className="gd-stage__pulse" cx="174" cy="100" r="4" />
          <rect className="gd-stage__card" x="192" y="52" width="100" height="96" rx="10" />
          <rect className="gd-stage__bar gd-stage__bar--blue" x="206" y="68" width="52" height="9" rx="4.5" />
          <rect className="gd-stage__line" x="206" y="88" width="70" height="6" rx="3" />
          <rect className="gd-stage__line" x="206" y="102" width="58" height="6" rx="3" />
          <rect className="gd-stage__chip gd-stage__chip--blue" x="206" y="120" width="44" height="16" rx="8" />
        </svg>
      )}
      {step === 2 && (
        <svg className="gd-stage" viewBox="0 0 320 200" focusable="false">
          <rect className="gd-stage__card" x="36" y="34" width="150" height="132" rx="10" />
          <rect className="gd-stage__bar gd-stage__bar--pink" x="52" y="52" width="72" height="9" rx="4.5" />
          <rect className="gd-stage__line" x="52" y="74" width="112" height="6" rx="3" />
          <rect className="gd-stage__line" x="52" y="88" width="96" height="6" rx="3" />
          <rect className="gd-stage__glow" x="52" y="108" width="118" height="38" rx="8" />
          <rect className="gd-stage__line gd-stage__line--onglow" x="64" y="120" width="80" height="5" rx="2.5" />
          <rect className="gd-stage__line gd-stage__line--onglow" x="64" y="132" width="62" height="5" rx="2.5" />
          <path className="gd-stage__spark" d="M228 60l5 14 14 5-14 5-5 14-5-14-14-5 14-5 5-14z" />
          <path className="gd-stage__spark gd-stage__spark--sm" d="M262 112l3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8z" />
          <path className="gd-stage__wire" d="M186 96h30" />
          <circle className="gd-stage__pulse" cx="201" cy="96" r="4" />
        </svg>
      )}
      {step === 3 && (
        <svg className="gd-stage" viewBox="0 0 320 200" focusable="false">
          <rect className="gd-stage__card" x="42" y="30" width="236" height="140" rx="12" />
          <circle className="gd-stage__dot gd-stage__dot--r" cx="62" cy="48" r="4" />
          <circle className="gd-stage__dot gd-stage__dot--y" cx="76" cy="48" r="4" />
          <circle className="gd-stage__dot gd-stage__dot--g" cx="90" cy="48" r="4" />
          <rect className="gd-stage__url" x="104" y="40" width="150" height="16" rx="8" />
          <rect className="gd-stage__bar gd-stage__bar--blue" x="62" y="72" width="110" height="10" rx="5" />
          <rect className="gd-stage__line" x="62" y="94" width="150" height="6" rx="3" />
          <rect className="gd-stage__line" x="62" y="108" width="128" height="6" rx="3" />
          <rect className="gd-stage__chip gd-stage__chip--blue" x="62" y="128" width="64" height="20" rx="10" />
          <circle className="gd-stage__check" cx="238" cy="118" r="22" />
          <path className="gd-stage__check-mark" d="M228 118l7 7 14-14" />
        </svg>
      )}
    </div>
  );
}

/* ── Selected work: pastel Guidde cards, live links. ─────────────────── */
type Work = {
  tag: string;
  title: string;
  desc: string;
  href: string;
  open: string;
  tint: 'blue' | 'purple' | 'pink' | 'yellow' | 'coral';
};

const WORK: Work[] = [
  {
    tag: 'AI · PIPELINE ON TEMPORAL',
    title: 'MIDI GPT REST API',
    desc: 'REST API generating MIDI: a multi-step Temporal pipeline calling OpenAI, with retries and validation. Go, Python, TypeScript.',
    href: 'https://github.com/barmoshe/AI_MIDI_API',
    open: 'View the code',
    tint: 'blue',
  },
  {
    tag: 'OPEN SOURCE · NPM · MCP SERVER',
    title: 'MDP',
    desc: 'Markdown to document and deck compiler on npm, with an MCP server and Claude Code and Codex plugins.',
    href: 'https://barmoshe.github.io/mdp/',
    open: 'Open MDP',
    tint: 'purple',
  },
  {
    tag: 'MICROSERVICES · CODE EXCHANGE',
    title: 'Cross-language orchestration',
    desc: 'One Temporal workflow over Go, Python and TypeScript workers. Featured on Temporal’s Code Exchange.',
    href: 'https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal',
    open: 'See the writeup',
    tint: 'pink',
  },
  {
    tag: 'LIVE · REACT · THREE.JS · TONE.JS',
    title: 'Biome Synth',
    desc: 'Browser instrument with an AI DJ across five states. Real-time React over Tone.js, Three.js and Canvas2D.',
    href: 'https://biome-synth.lovable.app/',
    open: 'Play it live',
    tint: 'yellow',
  },
  {
    tag: 'FULL STACK · AUTH + MIDDLEWARE',
    title: 'Israelify',
    desc: 'React over a Node and MongoDB API, with user authentication, middleware and a custom logger.',
    href: 'https://github.com/barmoshe/Israelify-backend',
    open: 'View the code',
    tint: 'coral',
  },
  {
    tag: 'OPEN SOURCE · VERIFICATION',
    title: 'entailer',
    desc: 'Logic-validity toolkit: checks whether a conclusion follows from its premises.',
    href: 'https://github.com/barmoshe/entailer',
    open: 'View the code',
    tint: 'blue',
  },
  {
    tag: 'LIVE · REACT + TYPESCRIPT',
    title: 'Apartment Hunter',
    desc: 'Real-estate decision tool: side-by-side comparison, purchase-tax brackets, mortgage calculator.',
    href: 'https://apartment-hunter-one.vercel.app',
    open: 'Open the app',
    tint: 'purple',
  },
  {
    tag: 'LIVE · FULL PRODUCT CYCLE',
    title: 'Trip Planner',
    desc: 'Itinerary, budget and logistics planner with live currency conversion. Brief to deployed in days.',
    href: 'https://trip-planner-six-iota.vercel.app',
    open: 'Open the app',
    tint: 'pink',
  },
];

/* ── Experience: compact CV rows, same section as the work grid. ─────── */
const EXPERIENCE = [
  {
    when: '2025 to present',
    what: 'Software Developer, Joomsy',
    detail: 'Primary engineer at a five-person startup. Full-stack product plus DevOps. Employer work is named, never linked.',
  },
  {
    when: '2021 to present',
    what: 'Customer Support Engineer, Wochit',
    detail: 'Cloud video editor at scale. Reproduce and resolve real users’ issues; feed fixes back to product.',
  },
  {
    when: '2023',
    what: 'B.Sc. Computer Science, Afeka College',
    detail: 'Plus a Wix DevOps workshop (EKS, Kubernetes, Terraform) and a full-stack bootcamp (Node, React, MongoDB).',
  },
];

const STEP_MS = 4200;

export default function GuiddeApp() {
  const scope = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);

  const [chip, setChip] = useState<string>('ai');
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [motionOk, setMotionOk] = useState(false);

  /* Reduced-motion gate for the auto-advancing walkthrough. */
  useEffect(() => {
    const mq = matchMedia(FULL_MOTION_QUERY);
    const apply = () => setMotionOk(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  /* Only auto-advance while the player is actually on screen. */
  useEffect(() => {
    const el = playerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView || !motionOk) return;
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), STEP_MS);
    return () => clearInterval(id);
  }, [playing, inView, motionOk]);

  /* Webflow-IX2-style entrance: rise the hero, fade-up everything else. */
  useGSAP(
    () => {
      if (!matchMedia(FULL_MOTION_QUERY).matches) return;

      gsap.from('.gd-hero [data-rise]', {
        y: 26,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.09,
        delay: 0.05,
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    },
    { scope },
  );

  const activeChip = CHIPS.find((c) => c.id === chip) ?? CHIPS[0];

  const selectStep = (i: number) => {
    setStep(i);
    setPlaying(false);
  };

  return (
    <div className="mp-root gd-root" ref={scope}>
      <a className="gd-skip" href="#main">Skip to content</a>

      {/* ── Top navigation ──────────────────────────────────── */}
      <header className="gd-nav">
        <div className="gd-nav__inner">
          <a className="gd-brand" href="#main" aria-label="Bar Moshe">
            <Wordmark />
          </a>
          <span className="gd-nav__tag">for Guidde</span>
          <nav className="gd-nav__links" aria-label="Sections">
            <a className="gd-nav__link" href="#guidde">How I ship</a>
            <a className="gd-nav__link" href="#work">Work</a>
          </nav>
          <div className="gd-nav__cta">
            <a className="gd-btn gd-btn--ghost gd-btn--sm" href={CV} target="_blank" rel="noopener noreferrer">
              View CV
            </a>
            <a className="gd-btn gd-btn--primary gd-btn--sm" href={EMAIL}>
              Start now
            </a>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {/* ── Hero: giant centered headline, chips, CTAs ─────── */}
        <section className="gd-hero">
          <div className="gd-hero__inner">
            <p className="gd-eyebrow" data-rise>
              BAR MOSHE · FULL STACK ENGINEER APPLICATION
            </p>
            <h1 className="gd-title" data-rise>
              Full-stack engineer,
              <br />
              <span className="gd-hl gd-hl--blue">end to end</span>
            </h1>
            <p className="gd-lede" data-rise>
              React, Node, TypeScript. Primary developer at Joomsy since 2025. Open-source
              tooling on npm with an MCP server, a pipeline on Temporal&rsquo;s Code Exchange,
              and a day job inside a cloud video editor. Tel Aviv.
            </p>

            <fieldset className="gd-chips" data-rise>
              <legend className="gd-chips__label">What the role needs</legend>
              <div className="gd-chips__row" role="radiogroup" aria-label="What the role needs">
                {CHIPS.map((c) => (
                  <label key={c.id} className={`gd-chip${chip === c.id ? ' is-active' : ''}`}>
                    <input
                      className="gd-chip__input"
                      type="radio"
                      name="gd-need"
                      value={c.id}
                      checked={chip === c.id}
                      onChange={() => setChip(c.id)}
                    />
                    <span className="gd-chip__icon">{c.icon}</span>
                    <span className="gd-chip__text">{c.label}</span>
                  </label>
                ))}
              </div>
              <p className="gd-chips__caption" aria-live="polite">{activeChip.caption}</p>
            </fieldset>

            <div className="gd-hero__cta" data-rise>
              <a className="gd-btn gd-btn--primary" href={EMAIL}>
                Start a conversation
                <span className="gd-btn__arrow" aria-hidden="true">→</span>
              </a>
              <a className="gd-btn gd-btn--outline" href={CV} target="_blank" rel="noopener noreferrer">
                View my CV
              </a>
            </div>
          </div>

          {/* the customer-logo strip, repurposed as the stack Bar ships with */}
          <div className="gd-marquee" data-rise aria-label="Technologies Bar works with">
            <p className="gd-marquee__label">The stack I ship with</p>
            <div className="gd-marquee__viewport">
              <ul className="gd-marquee__track">
                {STACK.map((s) => (
                  <li key={s} className="gd-marquee__item">{s}</li>
                ))}
              </ul>
              <ul className="gd-marquee__track" aria-hidden="true">
                {STACK.map((s) => (
                  <li key={`b-${s}`} className="gd-marquee__item">{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Centerpiece: how Bar ships, as a guidde ────────── */}
        <section id="guidde" className="gd-section gd-section--grid">
          <div className="gd-wrap">
            <h2 className="gd-h2 gd-h2--center" data-reveal>
              How I ship,
              <span className="gd-hl gd-hl--yellow"> as a guidde</span>
            </h2>

            <div className="gd-guide" data-reveal ref={playerRef}>
              <div className="gd-guide__steps" role="tablist" aria-label="How Bar ships, step by step">
                {STEPS.map((s, i) => (
                  <button
                    key={s.num}
                    role="tab"
                    id={`gd-step-${i}`}
                    aria-selected={step === i}
                    aria-controls="gd-step-panel"
                    className={`gd-step${step === i ? ' is-active' : ''}`}
                    onClick={() => selectStep(i)}
                  >
                    <span className="gd-step__num">{s.num}</span>
                    <span className="gd-step__meta">
                      <span className="gd-step__title">{s.title}</span>
                      <span className="gd-step__desc">{s.desc}</span>
                    </span>
                    <span className="gd-step__progress" aria-hidden="true">
                      <span
                        className={`gd-step__fill${step === i && playing && motionOk ? ' is-running' : ''}`}
                        style={step === i && playing && motionOk ? { animationDuration: `${STEP_MS}ms` } : undefined}
                      />
                    </span>
                  </button>
                ))}
              </div>

              <div id="gd-step-panel" role="tabpanel" aria-labelledby={`gd-step-${step}`} className="gd-player">
                <div className="gd-player__chrome" aria-hidden="true">
                  <span className="gd-player__dot gd-player__dot--r" />
                  <span className="gd-player__dot gd-player__dot--y" />
                  <span className="gd-player__dot gd-player__dot--g" />
                  <span className="gd-player__url">barmoshe.dev / how-bar-ships</span>
                </div>
                <StepVisual step={step} />
                <div className="gd-player__foot">
                  <span className="gd-player__count">
                    Step {step + 1} of {STEPS.length} · {STEPS[step].title}
                  </span>
                  <button
                    type="button"
                    className="gd-player__toggle"
                    onClick={() => setPlaying((p) => !p)}
                    aria-pressed={playing}
                  >
                    {playing ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Work + experience, one section ─────────────────── */}
        <section id="work" className="gd-section gd-section--soft">
          <div className="gd-wrap">
            <h2 className="gd-h2 gd-h2--center" data-reveal>
              Selected work,
              <span className="gd-hl gd-hl--purple"> mapped to the role</span>
            </h2>
            <p className="gd-sub gd-sub--center" data-reveal>
              Live links where available. Employer work is named, not shown.
            </p>
            <div className="gd-work">
              {WORK.map((w) => (
                <a
                  key={w.title}
                  className={`gd-wcard gd-wcard--${w.tint}`}
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-reveal
                >
                  <span className="gd-wcard__tag">{w.tag}</span>
                  <h3 className="gd-wcard__title">{w.title}</h3>
                  <p className="gd-wcard__desc">{w.desc}</p>
                  <span className="gd-wcard__link">
                    {w.open} <span aria-hidden="true">→</span>
                  </span>
                </a>
              ))}
            </div>

            <div className="gd-exp" data-reveal>
              {EXPERIENCE.map((e) => (
                <div key={e.what} className="gd-exp__row">
                  <span className="gd-exp__when">{e.when}</span>
                  <span className="gd-exp__what">{e.what}</span>
                  <span className="gd-exp__detail">{e.detail}</span>
                </div>
              ))}
            </div>

            <p className="gd-work__more" data-reveal>
              More on{' '}
              <a href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── Close ──────────────────────────────────────────── */}
        <section className="gd-close">
          <div className="gd-close__inner" data-reveal>
            <h2 className="gd-h2 gd-h2--center">
              <span className="gd-hl gd-hl--blue">Let&rsquo;s talk</span>
            </h2>
            <p className="gd-sub gd-sub--center">
              Applying for the Full Stack Engineer role at Guidde. Tel Aviv, hybrid works.
            </p>
            <div className="gd-close__cta">
              <a className="gd-btn gd-btn--primary" href={EMAIL}>
                Email me
                <span className="gd-btn__arrow" aria-hidden="true">→</span>
              </a>
              <a className="gd-btn gd-btn--outline" href="https://www.linkedin.com/in/barmoshe/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a className="gd-btn gd-btn--outline" href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a className="gd-btn gd-btn--outline" href={CV} target="_blank" rel="noopener noreferrer">
                View my CV
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="gd-footer">
        <div className="gd-footer__inner">
          <div className="gd-footer__brand">
            <Wordmark className="gd-footer__mark" />
            <p className="gd-footer__tag">
              An application page Bar Moshe built for the Full Stack Engineer role at
              Guidde, Tel Aviv. Not affiliated with Guidde.
            </p>
          </div>
          <div className="gd-footer__col">
            <p className="gd-footer__h">The work</p>
            <ul>
              <li><a className="gd-footer__link" href="https://barmoshe.github.io/mdp/" target="_blank" rel="noopener noreferrer">MDP + MCP server</a></li>
              <li><a className="gd-footer__link" href="https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal" target="_blank" rel="noopener noreferrer">Temporal Code Exchange</a></li>
              <li><a className="gd-footer__link" href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
          <div className="gd-footer__col">
            <p className="gd-footer__h">Get in touch</p>
            <ul>
              <li className="gd-footer__hire">
                <a className="gd-footer__link" href={EMAIL}>1barmoshe1@gmail.com</a>
                <span className="gd-sticker" aria-hidden="true">
                  <svg className="gd-sticker__arrow" viewBox="0 0 48 24" focusable="false">
                    <path d="M44 4c-10 12-24 16-38 13" fill="none" />
                    <path d="M12 13l-6 4 7 2" fill="none" />
                  </svg>
                  Hiring?
                </span>
              </li>
              <li><a className="gd-footer__link" href="https://www.linkedin.com/in/barmoshe/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a className="gd-footer__link" href={CV} target="_blank" rel="noopener noreferrer">View my CV</a></li>
            </ul>
          </div>
        </div>
        <div className="gd-footer__bottom">
          <div className="gd-footer__bottom-inner">
            <span>Built by Bar Moshe for this application, in Guidde&rsquo;s design language.</span>
            <span>Tel Aviv · 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
