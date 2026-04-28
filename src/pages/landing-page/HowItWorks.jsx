import { useState, useEffect, useRef } from "react";

const STEPS = [
  {
    number: "01",
    title:  "Employee Interaction",
    desc:   "Employees interact with AI through a secured, familiar chat interface — just like any LLM tool, but with SentinelAI silently acting as a compliance layer between them and the model.",
    detail: "Zero friction for users. Full control for administrators.",
    video:  "STEP 1",
    hint:   "Show a user typing naturally into a Gemini-style interface with smooth keystrokes and a clean UI.",
    accent: "bg-[#89A1EF]",
  },
  {
    number: "02",
    title:  "Real-Time Monitoring",
    desc:   "SentinelAI analyzes every interaction in real time, scanning for sensitive keywords, PII patterns, and policy violations the moment text is typed — before it leaves the device.",
    detail: "Sub-50ms detection. Nothing escapes notice.",
    video:  "STEP 2",
    hint:   "Highlight scanning animation: text underlined, sensitive words glowing, subtle warning indicators appearing.",
    accent: "bg-violet-500",
  },
  {
    number: "03",
    title:  "Auto Protection",
    desc:   "Sensitive data is automatically masked and replaced with safe placeholders before it reaches any LLM. Emails become ****, SSNs vanish, and confidential terms are redacted on the fly.",
    detail: "Automatic. Invisible. Instantaneous.",
    video:  "STEP 3",
    hint:   "Show text transforming: 'john@acme.com' morphing into '****@****.***' with a smooth blur/mask animation.",
    accent: "bg-emerald-500",
  },
  {
    number: "04",
    title:  "Admin Oversight",
    desc:   "Every flagged interaction surfaces immediately in the Admin Command Center — with risk scores, violation types, employee activity timelines, and one-click remediation actions.",
    detail: "Full visibility. Immediate control.",
    video:  "STEP 4",
    hint:   "Show the admin dashboard with charts updating live, a new report being flagged, and the risk score panel refreshing.",
    accent: "bg-amber-500",
  },
];

/* ── Single step trigger (left column) ── */
function StepTrigger({ step, isActive, stepRef }) {
  return (
    <div
      ref={stepRef}
      className="flex gap-5 py-16 first:pt-8"
    >
      {/* Number track */}
      <div className="flex flex-col items-center gap-2 flex-shrink-0 pt-1">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center font-black
                      text-sm transition-all duration-300
                      ${isActive
                        ? `${step.accent} text-white shadow-lg`
                        : "bg-gray-100 text-gray-400"}`}
        >
          {step.number}
        </div>
        <div className="flex-1 w-px bg-gray-200 min-h-[32px]" />
      </div>

      {/* Content */}
      <div
        className={`flex-1 transition-all duration-500
                    ${isActive ? "opacity-100" : "opacity-40"}`}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-[#89A1EF] mb-2">
          Step {step.number}
        </p>
        <h3 className="text-2xl font-black text-gray-900 mb-3">{step.title}</h3>
        <p className="text-gray-500 leading-relaxed text-[15px] mb-3">{step.desc}</p>
        <p className="text-xs font-semibold text-gray-900 bg-gray-100 rounded-xl
                      inline-block px-3 py-1.5">
          {step.detail}
        </p>
      </div>
    </div>
  );
}

/* ── Sticky video panel (right column) ── */
function VideoPanel({ step }) {
  return (
    <div
      className="relative bg-gray-50 border border-gray-200 rounded-3xl overflow-hidden
                 aspect-[4/3] flex flex-col items-center justify-center gap-4
                 shadow-xl shadow-gray-100/80 transition-all duration-500"
    >
      {/* VIDEO_PLACEHOLDER — see `hint` on each step for exact video spec */}
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center
                    ${step.accent} shadow-lg`}
      >
        {/* ICON_PLACEHOLDER: step-specific icon */}
        <svg className="w-7 h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </div>

      <div className="text-center px-8">
        <p className="text-sm font-bold text-gray-700 mb-1">
          [VIDEO_PLACEHOLDER: {step.video}]
        </p>
        <p className="text-xs text-gray-400 leading-relaxed">{step.hint}</p>
      </div>

      {/* Step label badge */}
      <div className="absolute top-4 left-4 bg-white border border-gray-200 rounded-lg
                      px-2.5 py-1 shadow-sm">
        <span className="text-[10px] font-bold text-gray-600">Step {step.number}</span>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveStep(i); },
        { threshold: 0.55, rootMargin: "-10% 0px -30% 0px" }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Heading ── */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#89A1EF] mb-3">
            How It Works
          </p>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">
            From interaction to protection
            <br />
            <span className="text-[#89A1EF]">in milliseconds.</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            A four-stage pipeline that runs silently in the background — protecting your
            organization without disrupting your workforce.
          </p>
        </div>

        {/* ── Scroll storytelling layout ── */}
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: step triggers */}
          <div>
            {STEPS.map((step, i) => (
              <StepTrigger
                key={step.number}
                step={step}
                isActive={activeStep === i}
                stepRef={(el) => (stepRefs.current[i] = el)}
              />
            ))}
          </div>

          {/* Right: sticky video panel */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              {/* Progress dots */}
              <div className="flex items-center gap-2 mb-5 justify-end">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      stepRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className={`rounded-full transition-all duration-300
                                ${activeStep === i ? "w-6 h-2 bg-[#89A1EF]" : "w-2 h-2 bg-gray-300"}`}
                    aria-label={`Jump to step ${i + 1}`}
                  />
                ))}
              </div>

              <VideoPanel step={STEPS[activeStep]} />

              {/* Step label below panel */}
              <div className="mt-4 flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${STEPS[activeStep].accent}`}
                />
                <p className="text-sm font-semibold text-gray-700">
                  {STEPS[activeStep].title}
                </p>
                <span className="ml-auto text-xs text-gray-400">
                  {activeStep + 1} / {STEPS.length}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile: video under each step */}
          <div className="lg:hidden -mt-4 space-y-8">
            {STEPS.map((step) => (
              <VideoPanel key={step.number} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
