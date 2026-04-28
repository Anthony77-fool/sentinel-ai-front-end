import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = ["Features", "How It Works", "Dashboard", "Contact"];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <div className="flex items-center gap-2.5">
          {/* IMAGE_PLACEHOLDER: LOGO (32×32 brand mark) */}
          {/*Logo Picture here */}
          <img className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" src="/imgs/SentinelAI_Logo.webp" alt="SentinelAI Logo" />
          <span className="text-gray-900 font-bold text-[15px] tracking-tight">SentinelAI</span>
        </div>

        {/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100
                           px-3 py-1.5 rounded-lg transition-all font-medium"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* ── CTA ── */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/login"
            className="text-sm font-semibold text-gray-600 hover:text-[#89A1EF] 
                      transition-colors px-3 py-2"
          >
            Sign In
          </Link>

          <Link
            to="/signup1"
            className="text-sm font-semibold bg-[#89A1EF] text-white px-4 py-2 
                      rounded-xl hover:bg-[#7b93e8] active:bg-[#6e86e7] 
                      transition-colors shadow-sm"
          >
            Get Started
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
               viewBox="0 0 24 24">
            {mobileOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1 shadow-lg">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="block text-sm font-medium text-gray-700 hover:text-[#89A1EF]
                         py-2.5 border-b border-gray-50 last:border-0 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <a href="#" className="text-sm font-semibold text-gray-700 py-2 text-center border border-gray-200 rounded-xl">Sign In</a>
            <a href="#" className="text-sm font-semibold bg-[#89A1EF] text-white py-2 text-center rounded-xl">Get Started</a>
          </div>
        </div>
      )}
    </nav>
  );
}
