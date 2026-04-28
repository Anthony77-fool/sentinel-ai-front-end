import { useRef, useEffect } from "react";
import { 
  IoPulseOutline, 
  IoStatsChartOutline, 
  IoShieldCheckmarkOutline, 
  IoPersonAddOutline, 
  IoWarningOutline, 
  IoReaderOutline,
  IoShieldCheckmark
} from "react-icons/io5";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   Scroll reveal
───────────────────────────────────────────── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ─────────────────────────────────────────────
   FEATURES GRID
───────────────────────────────────────────── */
const FEATURES = [
  {
    title: "Real-Time Monitoring",
    icon: IoPulseOutline,
    desc: "Sub-50ms scanning of every employee prompt before it reaches any LLM endpoint.",
    bg: "bg-[#89A1EF]/8",
    border: "border-[#89A1EF]/20",
    color: "text-[#89A1EF]",
  },
  {
    title: "AI Usage Analytics",
    icon: IoStatsChartOutline,
    desc: "Granular breakdowns of tool usage, session length, query volume, and trend analysis over time.",
    bg: "bg-violet-50",
    border: "border-violet-200/60",
    color: "text-violet-600",
  },
  {
    title: "Policy Enforcement",
    icon: IoShieldCheckmarkOutline,
    desc: "Point-and-click rule builder to define, activate, and update compliance policies org-wide.",
    bg: "bg-emerald-50",
    border: "border-emerald-200/60",
    color: "text-emerald-600",
  },
  {
    title: "Account Approval System",
    icon: IoPersonAddOutline,
    desc: "All new AI tool registrations pass through a gated approval workflow with admin sign-off.",
    bg: "bg-amber-50",
    border: "border-amber-200/60",
    color: "text-amber-600",
  },
  {
    title: "Misuse Detection",
    icon: IoWarningOutline,
    desc: "Pattern-based and semantic detection flags jailbreak attempts, prompt injection, and data exfiltration.",
    bg: "bg-rose-50",
    border: "border-rose-200/60",
    color: "text-rose-500",
  },
  {
    title: "Audit Logging",
    icon: IoReaderOutline,
    desc: "Immutable, timestamped records of every AI interaction — ready for regulatory and legal review.",
    bg: "bg-sky-50",
    border: "border-sky-200/60",
    color: "text-sky-600",
  },
];

function FeatureCard({ feature, delay }) {
  const ref = useReveal(delay);
  const Icon = feature.icon; // Extract the icon component

  return (
    <div
      ref={ref}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm
                 hover:shadow-md hover:border-[#89A1EF]/25 transition-all duration-300 group"
    >
      <div className={`w-10 h-10 rounded-xl ${feature.bg} border ${feature.border}
                       flex items-center justify-center mb-4
                       group-hover:scale-110 transition-transform`}>
        {/* Render the Icon component directly */}
        <Icon className={`text-lg ${feature.color}`} />
      </div>
      <h3 className="text-sm font-bold text-gray-900 mb-2">{feature.title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
    </div>
  );
}

export function FeaturesGrid() {
  const titleRef = useReveal(0);
  return (
    <section id="features" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#89A1EF] mb-3">
            Platform Features
          </p>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">
            Everything you need to
            <span className="text-[#89A1EF]"> govern AI at scale</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Six battle-tested capabilities working together to keep your organization
            secure, compliant, and in control.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECURITY EMPHASIS BANNER
───────────────────────────────────────────── */
export function SecurityBanner() {
  const ref = useReveal(0);

  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="relative overflow-hidden bg-white border border-[#89A1EF]/20
                     rounded-[3rem] px-10 py-20 text-center shadow-sm group"
        >
          {/* ── BACKGROUND IMAGE LAYER ── */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/imgs/security-bg-pattern.jpg" 
              alt="Security Background" 
              className="w-full h-full object-cover opacity-[0.03] group-hover:scale-105 transition-transform duration-1000"
            />
          </div>

          {/* ── GRADIENT OVERLAYS ── */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br
                        from-[#89A1EF]/5 via-transparent to-[#89A1EF]/5 pointer-events-none" />
          
          {/* Animated Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full
                        bg-[#89A1EF]/10 blur-[100px] pointer-events-none animate-pulse" />

          <div className="relative z-10">
            {/* MAIN SECURITY ICON */}
            <div className="w-20 h-20 rounded-3xl bg-[#89A1EF] border-4 border-white
                            flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#89A1EF]/20
                            group-hover:rotate-[360deg] transition-transform duration-700">
              <IoShieldCheckmark className="text-3xl text-white" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#89A1EF] mb-4">
              Enterprise-Grade Security
            </p>
            
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight
                           leading-tight mb-6">
              Built for organizations that take
              <br />
              <span className="text-[#89A1EF]">AI security seriously.</span>
            </h2>

            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              From Fortune 500 legal departments to healthcare systems bound by HIPAA — 
              SentinelAI is architected for environments where a single data leak 
              can have irreversible consequences.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {["SOC 2 Type II", "GDPR Ready", "HIPAA Compliant", "ISO 27001"].map((badge) => (
                <div 
                  key={badge}
                  className="bg-white border border-gray-200 text-gray-600
                             text-[11px] font-bold px-5 py-2.5 rounded-2xl shadow-sm
                             hover:border-[#89A1EF]/40 hover:text-[#89A1EF] transition-colors"
                >
                  {badge}
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <button className="text-[#89A1EF] text-sm font-bold hover:underline decoration-2 underline-offset-4">
                Download Security Whitepaper →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FINAL CTA SECTION
───────────────────────────────────────────── */
export function CTASection() {
  const ref = useReveal(0);
  return (
    <section id="contact" className="bg-white py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div ref={ref}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#89A1EF] mb-4">
            Get Started Today
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-5">
            Start securing your AI
            <br />
            <span className="text-[#89A1EF]">workflows today.</span>
          </h2>
          <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-lg mx-auto">
            Join hundreds of organizations that have already deployed SentinelAI to
            protect their data and empower their employees to use AI safely.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup1" // Replace with your target route
              className="inline-flex items-center gap-2 bg-[#89A1EF] text-white
                        font-bold text-sm px-8 py-4 rounded-2xl
                        hover:bg-[#7b93e8] active:bg-[#6e86e7]
                        transition-colors shadow-lg shadow-[#89A1EF]/20"
            >
              Get Started — Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor"
                  strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12,5 19,12 12,19"/>
              </svg>
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-700
                         border border-gray-200 px-8 py-4 rounded-2xl
                         hover:border-[#89A1EF]/40 hover:text-[#89A1EF] transition-all shadow-sm"
            >
              {/* ICON_PLACEHOLDER: calendar or chat icon */}
              Contact Sales
            </a>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            No credit card required · All free · Accessible anytime
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
const FOOTER_LINKS = {
  Product:  ["Dashboard", "Features", "Pricing", "Changelog"],
  Company:  ["About",    "Blog",     "Careers", "Press"],
  Legal:    ["Privacy",  "Terms",    "Security", "Cookies"],
  Support:  ["Docs",     "API",      "Status",  "Contact"],
};

export function Footer() {
  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Top row ── */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-14">

          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              {/* IMAGE_PLACEHOLDER: LOGO (light variant for dark bg) */}
              <div className="w-8 h-8 rounded-lg bg-[#89A1EF]/20 border border-[#89A1EF]/30
                              flex items-center justify-center">
                <span className="text-[11px] font-black text-[#89A1EF] font-mono">S</span>
              </div>
              <span className="font-bold text-[15px] tracking-tight">SentinelAI</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-[220px]">
              The AI governance gateway trusted by security-conscious organizations worldwide.
            </p>
            <div className="flex gap-3 mt-5">
              {/* ICON_PLACEHOLDER: social icons (Twitter/X, LinkedIn, GitHub) */}
              {["X", "in", "gh"].map((s) => (
                <a key={s}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10
                             flex items-center justify-center text-gray-400 text-xs
                             font-bold hover:bg-[#89A1EF]/15 hover:text-[#89A1EF]
                             hover:border-[#89A1EF]/30 transition-all">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                {group}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center
                        justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} SentinelAI. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            All systems operational
          </div>
        </div>

      </div>
    </footer>
  );
}
