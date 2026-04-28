import { useRef, useEffect } from "react";

function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

const HIGHLIGHTS = [
  {
    title: "Live Activity Tracking",
    desc:  "Heartbeat system monitors every employee session — active tool, duration, and anomaly signals.",
  },
  {
    title: "Risk-Level Analytics",
    desc:  "Each user gets a dynamic risk score based on violation history, frequency, and severity.",
  },
  {
    title: "Policy Rule Engine",
    desc:  "Publish, update, and roll back compliance policies across your entire organization in seconds.",
  },
  {
    title: "Instant Flagging & Alerts",
    desc:  "Critical violations surface immediately — with context, severity level, and remediation options.",
  },
];

export default function AdminSection() {
  const tagRef  = useReveal(0);
  const h2Ref   = useReveal(80);
  const bodyRef = useReveal(160);
  const imgRef  = useReveal(80);

  return (
    <section id="dashboard" className="bg-[#F8FAFC] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: text ── */}
          <div>
            <div ref={tagRef}>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#89A1EF]">
                Admin Command Center
              </span>
            </div>

            <h2
              ref={h2Ref}
              className="text-4xl font-black text-gray-900 tracking-tight mt-3 mb-5"
            >
              Total visibility.
              <br />
              <span className="text-[#89A1EF]">Absolute control.</span>
            </h2>

            <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
              The SentinelAI Admin Command Center gives security teams a single pane of
              glass to monitor every AI interaction, enforce policies, and respond to
              incidents — without writing a single line of code.
            </p>

            <div ref={bodyRef} className="space-y-4">
              {HIGHLIGHTS.map((h, i) => (
                <div key={h.title}
                  className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-200
                             shadow-sm hover:border-[#89A1EF]/30 transition-colors group">
                  {/* ICON_PLACEHOLDER */}
                  <div className="w-9 h-9 rounded-xl bg-[#89A1EF]/10 border border-[#89A1EF]/20
                                  flex items-center justify-center flex-shrink-0 mt-0.5
                                  group-hover:bg-[#89A1EF]/15 transition-colors">
                    <span className="text-[#89A1EF] text-sm font-mono">⬡</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-0.5">{h.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <a
                href="#"
                className="bg-[#89A1EF] text-white text-sm font-bold px-5 py-2.5
                           rounded-xl hover:bg-[#7b93e8] transition-colors shadow-sm"
              >
                Open Dashboard
              </a>
              <a
                href="#"
                className="text-sm font-semibold text-gray-600 hover:text-[#89A1EF]
                           px-5 py-2.5 border border-gray-200 rounded-xl
                           hover:border-[#89A1EF]/30 transition-all"
              >
                See Features →
              </a>
            </div>
          </div>

          {/* ── Right: dashboard image placeholder ── */}
          <div ref={imgRef}>
            <div
              className="relative bg-white border border-gray-200 rounded-3xl overflow-hidden
                         shadow-2xl shadow-gray-200/60 aspect-[4/3]
                         flex flex-col items-center justify-center gap-3 p-8"
            >
              {/*
                IMAGE_PLACEHOLDER: DASHBOARD PREVIEW
                Insert a high-resolution screenshot or mockup of the SentinelAI admin
                dashboard showing:
                  - Left sidebar with navigation
                  - Summary stat cards (employees, reports, usage)
                  - A line chart for AI usage over time
                  - A recent activity table with status badges
                Recommended: PNG/WebP at 2x resolution (1200×900px)
              */}

              {/* Simulated mini dashboard skeleton */}
              <div className="w-full space-y-3">
                <div className="flex gap-2">
                  {[1,2,3].map((n) => (
                    <div key={n} className="flex-1 bg-[#89A1EF]/6 border border-[#89A1EF]/15
                                            rounded-xl p-3">
                      <div className="h-2 w-12 bg-gray-200 rounded mb-2" />
                      <div className="h-5 w-8 bg-[#89A1EF]/30 rounded" />
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 h-24
                                flex items-end gap-1">
                  {[40,55,45,70,60,80,72,90,65,85].map((h, i) => (
                    <div key={i}
                      className="flex-1 rounded-sm bg-[#89A1EF]/40"
                      style={{ height: `${(h / 90) * 72}px` }}
                    />
                  ))}
                </div>
                {[1,2,3].map((n) => (
                  <div key={n} className="flex items-center gap-3 py-1.5 border-b
                                          border-gray-100 last:border-0">
                    <div className="w-6 h-6 rounded-full bg-[#89A1EF]/10 flex-shrink-0" />
                    <div className="flex-1 h-2 bg-gray-100 rounded" />
                    <div className="w-10 h-4 bg-emerald-100 rounded-full" />
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-400 font-mono text-center">
                [IMAGE_PLACEHOLDER: DASHBOARD PREVIEW]
              </p>

              {/* Corner badge */}
              <div className="absolute top-3 right-3 bg-[#89A1EF] text-white text-[10px]
                              font-bold px-2.5 py-1 rounded-lg shadow-sm">
                Admin View
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
