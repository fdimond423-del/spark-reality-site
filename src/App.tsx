import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStatement } from './components/BrandStatement';
import { AhmedabadShowcase } from './components/AhmedabadShowcase';
import { GandhinagarShowcase } from './components/GandhinagarShowcase';
import { PropertyGallery } from './components/PropertyGallery';
import { WhySparkReality } from './components/WhySparkReality';
import { FinalCTA } from './components/FinalCTA';
import { LeadForm } from './components/LeadForm';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ProjectRecord, siteConfig } from './config/siteConfig';
import { Phone, MessageSquare, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectRecord | null>(null);

  const scrollToEnquire = () => {
    const el = document.getElementById('enquire');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-navy text-darkText font-sans selection:bg-olive selection:text-white pb-16 sm:pb-0">
      {/* 01: Premium Minimal Navigation */}
      <Navbar onEnquireClick={scrollToEnquire} />

      <main>
        {/* 02: Cinematic Hero Introduction (Scroll-controlled on desktop, smooth on mobile) */}
        <Hero
          onExploreClick={scrollToProjects}
          onEnquireClick={scrollToEnquire}
        />

        {/* 03: Cinematic Brand Statement */}
        <BrandStatement />

        {/* 04: Ahmedabad Property Showcase */}
        <AhmedabadShowcase
          onSelectProject={(proj) => setActiveProject(proj)}
          onEnquireClick={scrollToEnquire}
        />

        {/* 05: Gandhinagar Property Showcase */}
        <GandhinagarShowcase
          onSelectProject={(proj) => setActiveProject(proj)}
          onEnquireClick={scrollToEnquire}
        />

        {/* 06: Immersive Property Gallery */}
        <PropertyGallery />

        {/* 07: Why Spark Reality (Light background, 4 pillars) */}
        <WhySparkReality />

        {/* 08: Final Cinematic CTA */}
        <FinalCTA onStartJourneyClick={scrollToEnquire} />

        {/* 09: Lead Generation Form (Crucial 3-field Meta/Google Ads optimized) */}
        <LeadForm />

        {/* 10: Contact Details & Direction Links */}
        <ContactSection />
      </main>

      {/* 11: Architectural Clean Footer */}
      <Footer />

      {/* Interactive Project Details Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onEnquire={scrollToEnquire}
      />

      {/* Mobile Sticky High-Converting Bottom Action Bar */}
      <aside
        className="fixed bottom-0 left-0 right-0 z-40 bg-navy/95 backdrop-blur-xl border-t border-white/10 px-4 py-2.5 flex items-center justify-between gap-2.5 sm:hidden shadow-2xl"
        aria-label="Mobile Quick Actions"
      >
        <a
          href={`tel:${siteConfig.brand.phoneRaw}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-[0.72rem] font-bold tracking-wider uppercase border border-white/15 transition-colors"
        >
          <Phone size={13} className="text-olive-light" />
          <span>Call</span>
        </a>

        <a
          href={siteConfig.brand.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-[0.72rem] font-bold tracking-wider uppercase transition-colors shadow-md"
        >
          <MessageSquare size={13} />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={scrollToEnquire}
          className="flex-1 inline-flex items-center justify-center gap-1 py-2.5 px-2 rounded-full bg-olive hover:bg-olive-light text-white text-[0.72rem] font-bold tracking-wider uppercase transition-colors shadow-md"
        >
          <span>Enquire</span>
          <ArrowRight size={12} />
        </button>
      </aside>
    </div>
  );
};

export default App;
