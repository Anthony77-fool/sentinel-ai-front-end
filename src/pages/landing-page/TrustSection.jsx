import { useRef, useEffect } from "react";
import { 
  IoShieldCheckmarkOutline, 
  IoPulseOutline, 
  IoServerOutline 
} from "react-icons/io5";

/* ── Intersection-observer fade-in hook ── */
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = "opacity 0.65s ease, transform 0.65s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const PILLARS = [
  {
    title: "Data Protection",
    icon: IoShieldCheckmarkOutline, // Add this
    desc: "Automatically detects and masks PII, credentials, and sensitive content before it reaches any LLM — keeping your organization's data inside your walls.",
    color: "text-[#89A1EF]",
    bg: "bg-[#89A1EF]/8",
    border: "border-[#89A1EF]/20",
  },
  {
    title: "Real-Time Monitoring",
    icon: IoPulseOutline, // Add this
    desc: "Every employee interaction with AI tools is tracked, scored, and logged the moment it happens — with a heartbeat system that never misses a signal.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200/60",
  },
  {
    title: "AI Governance",
    icon: IoServerOutline, // Add this
    desc: "Deploy, update, and enforce organizational AI policies centrally from the admin dashboard — with audit trails that satisfy even the most rigorous compliance teams.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200/60",
  },
];

function PillarCard({ pillar, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const Icon = pillar.icon;

  return (
    <div ref={ref} className="...">
      <div className={`w-12 h-12 rounded-2xl ${pillar.bg} border ${pillar.border}
                       flex items-center justify-center mb-5 group-hover:scale-110
                       transition-transform`}>
        <Icon className={`text-2xl ${pillar.color}`} /> 
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">{pillar.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{pillar.desc}</p>
    </div>
  );
}

export default function TrustSection() {
  const titleRef = useScrollReveal();

  return (
    <section className="bg-[#F8FAFC] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Heading ── */}
        <div ref={titleRef} className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#89A1EF] mb-3">
            Why SentinelAI
          </p>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">
            The three pillars of
            <span className="text-[#89A1EF]"> AI security</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Purpose-built for organizations that need ironclad oversight without
            slowing down their teams.
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.title} pillar={p} delay={i * 120} />
          ))}
        </div>

        {/* ── Logo strip ── */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <p className="text-center text-xs font-semibold uppercase tracking-widest
                        text-gray-400 mb-7">
            Trusted by leading organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {/* IMAGE_PLACEHOLDER: CLIENT LOGOS — replace with 5–6 grayscale SVG logos */}
            {["Acme Corp", "Meridian", "Vantage AI", "DataVault", "NexTier"].map((name) => (
              <div key={name}
                className="bg-gray-100 border border-gray-200 rounded-xl px-5 py-2.5
                           text-xs font-semibold text-gray-400 tracking-wide">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
