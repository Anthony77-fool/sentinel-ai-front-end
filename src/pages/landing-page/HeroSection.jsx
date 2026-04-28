import { useEffect, useRef } from "react";

/* ── Fade-in on mount utility ── */
function useFadeIn(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
    const timer = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 60);
    return () => clearTimeout(timer);
  }, [delay]);
  return ref;
}

/* ── Animated badge ── */
function LiveBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-[#89A1EF]/10 border border-[#89A1EF]/25
                    text-[#89A1EF] text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-[#89A1EF] animate-pulse" />
      AI Governance Platform · Now Available
    </div>
  );
}

export default function HeroSection() {
  const r0 = useFadeIn(0);
  const r1 = useFadeIn(120);
  const r2 = useFadeIn(240);
  const r3 = useFadeIn(360);
  const r4 = useFadeIn(160);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-white overflow-hidden pt-16"
    >
      {/* ── Subtle background grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)",
          backgroundSize: "32px 32px",
          opacity: 0.55,
        }}
      />
      {/* ── Accent blob ── */}
      <div
        className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full
                   bg-[#89A1EF]/8 blur-3xl pointer-events-none"
      />
      <div
        className="absolute bottom-0 -left-24 w-[320px] h-[320px] rounded-full
                   bg-[#89A1EF]/5 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Copy ── */}
          <div>
            <div ref={r0}><LiveBadge /></div>

            <h1
              ref={r1}
              className="text-5xl lg:text-6xl font-black text-gray-900 leading-[1.08]
                         tracking-tight mb-6"
            >
              Control AI.{" "}
              <span className="text-[#89A1EF]">Protect Data.</span>
              <br />
              Empower Your<br />Workforce.
            </h1>

            <p
              ref={r2}
              className="text-lg text-gray-500 leading-relaxed mb-8 max-w-[480px]"
            >
              SentinelAI is a secure AI-governance gateway that gives organizations
              complete oversight and control over how employees interact with Large
              Language Models — preventing data leaks, detecting PII exposure, and
              enforcing compliance policies in real time.
            </p>

            <div ref={r3} className="flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-[#89A1EF] text-white
                           text-sm font-bold px-6 py-3 rounded-2xl
                           hover:bg-[#7b93e8] active:bg-[#6e86e7]
                           transition-colors shadow-md shadow-[#89A1EF]/25"
              >
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor"
                     strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12,5 19,12 12,19"/>
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-white text-gray-700
                           text-sm font-bold px-6 py-3 rounded-2xl border border-gray-200
                           hover:border-[#89A1EF]/40 hover:text-[#89A1EF]
                           transition-all shadow-sm"
              >
                {/* ICON_PLACEHOLDER: play icon */}
                <span className="w-5 h-5 rounded-full bg-[#89A1EF]/10 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-[#89A1EF] ml-0.5" fill="currentColor"
                       viewBox="0 0 24 24">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </span>
                View Dashboard
              </a>
            </div>

            {/* ── Social proof strip ── */}
            <div className="flex items-center gap-4 mt-10 pt-8 border-t border-gray-100">
              <div className="flex -space-x-2">
                {["A","B","C","D"].map((l) => (
                  <div key={l}
                    className="w-8 h-8 rounded-full bg-[#89A1EF]/10 border-2 border-white
                               flex items-center justify-center text-[10px] font-bold
                               text-[#89A1EF]">
                    {l}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Trusted by <span className="font-semibold text-gray-900">500+</span> organizations worldwide
              </p>
            </div>
          </div>

          {/* ── Right: Video placeholder ── */}
          <div ref={r4}>
            <div
              className="relative rounded-3xl overflow-hidden border border-gray-200
                         shadow-2xl shadow-gray-200/80 bg-gray-50 aspect-[16/10]
                         flex flex-col items-center justify-center gap-4 group"
            >
              {/* VIDEO_PLACEHOLDER: HERO DEMO
                  Insert a ~60–90s screen-recording showing:
                    1. Employee typing a message with PII (name, email, SSN) into an AI chat
                    2. SentinelAI automatically masking the sensitive text (e.g. email → ****)
                    3. Admin dashboard flagging the interaction in real time
                    4. Risk score updating on the analytics panel
                  Recommended: looping MP4, autoplay muted, 1280×800, ~4MB max */}
              <div className="w-14 h-14 rounded-full bg-[#89A1EF]/10 border border-[#89A1EF]/20
                              flex items-center justify-center group-hover:scale-110
                              transition-transform">
                <svg className="w-6 h-6 text-[#89A1EF] ml-0.5" fill="currentColor"
                     viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-600">
                  [VIDEO_PLACEHOLDER: HERO DEMO]
                </p>
                <p className="text-xs text-gray-400 mt-1 max-w-[240px] text-center leading-relaxed">
                  Live demo: employee chat → PII masking → admin alert
                </p>
              </div>
              {/* Decorative corner badges */}
              <div className="absolute top-3 left-3 bg-white border border-gray-200 rounded-lg
                              px-2.5 py-1 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[10px] font-semibold text-gray-600">Live Protection</span>
              </div>
              <div className="absolute bottom-3 right-3 bg-white border border-gray-200
                              rounded-lg px-2.5 py-1 shadow-sm">
                <span className="text-[10px] font-semibold text-gray-600">
                  Watch 90-sec demo ↗
                </span>
              </div>
            </div>

            {/* ── Floating stats ── */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { label: "Threats Blocked",  value: "99.8%"  },
                { label: "Response Time",    value: "<50ms"  },
                { label: "Policies Enforced",value: "200+"   },
              ].map((s) => (
                <div key={s.label}
                  className="bg-white border border-gray-200 rounded-2xl px-4 py-3
                             text-center shadow-sm">
                  <p className="text-xl font-black text-gray-900">{s.value}</p>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
