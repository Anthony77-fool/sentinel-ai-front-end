import { Helmet } from 'react-helmet-async';
import Navbar       from "./Navbar";
import HeroSection   from "./HeroSection";
import TrustSection  from "./TrustSection";
import HowItWorks    from "./HowItWorks";
import AdminSection  from "./AdminSection";
import {
  FeaturesGrid,
  SecurityBanner,
  CTASection,
  Footer,
} from "./Sections";

/**
 * LandingPage — full SentinelAI marketing page
 *
 * Sections (in order):
 *   1. Navbar           — sticky, scrolled-aware
 *   2. HeroSection      — headline + video placeholder + mini stats
 *   3. TrustSection     — 3 pillars + logo strip
 *   4. HowItWorks       — scroll-storytelling 4-step with sticky video
 *   5. AdminSection     — command center split layout
 *   6. FeaturesGrid     — 6-feature card grid
 *   7. SecurityBanner   — emphasis callout
 *   8. CTASection       — final conversion section
 *   9. Footer           — links + social + copyright
 */
export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Sentinel AI</title>
        <meta
          name="description"
          content="Landing Page"
        />
      </Helmet>
      <div className="min-h-screen bg-white antialiased">
        <Navbar />
        <HeroSection />
        <TrustSection />
        <HowItWorks />
        <AdminSection />
        <FeaturesGrid />
        <SecurityBanner />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}
