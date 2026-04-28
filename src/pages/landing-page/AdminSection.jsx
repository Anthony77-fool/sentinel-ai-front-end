import { useRef, useEffect } from "react";
import { 
  IoPulseOutline, 
  IoBarChartOutline, 
  IoShieldCheckmarkOutline, 
  IoNotificationsOutline 
} from "react-icons/io5";

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
    icon: IoPulseOutline,
    desc: "Heartbeat system monitors every employee session — active tool, duration, and anomaly signals.",
  },
  {
    title: "Risk-Level Analytics",
    icon: IoBarChartOutline,
    desc: "Each user gets a dynamic risk score based on violation history, frequency, and severity.",
  },
  {
    title: "Policy Rule Engine",
    icon: IoShieldCheckmarkOutline,
    desc: "Publish, update, and roll back compliance policies across your entire organization in seconds.",
  },
  {
    title: "Instant Flagging & Alerts",
    icon: IoNotificationsOutline,
    desc: "Critical violations surface immediately — with context, severity level, and remediation options.",
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
              {HIGHLIGHTS.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div key={h.title} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-200
                                              shadow-sm hover:border-[#89A1EF]/30 transition-colors group">
                    
                    {/* UPDATE THIS DIV BELOW */}
                    <div className="w-9 h-9 rounded-xl bg-[#89A1EF]/10 border border-[#89A1EF]/20
                                    flex items-center justify-center flex-shrink-0 mt-0.5
                                    group-hover:bg-[#89A1EF]/15 transition-colors">
                      <Icon className="text-[#89A1EF] text-lg" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-0.5">{h.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{h.desc}</p>
                    </div>
                  </div>
                );
              })}
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
            <div className="relative bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/60 aspect-[4/3] group">
              
              {/* ACTUAL IMAGE */}
              <img 
                src="/imgs/admin-dashboard-img.jpg" 
                alt="SentinelAI Admin Dashboard" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Subtle Overlay to make the badge pop */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent pointer-events-none" />

              {/* Corner badge */}
              <div className="absolute top-4 right-4 bg-[#89A1EF] text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-lg shadow-[#89A1EF]/30 uppercase tracking-wider">
                Admin View
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
