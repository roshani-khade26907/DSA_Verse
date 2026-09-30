import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { HeroSection } from '../components/landing/HeroSection';
import { ValueStrip } from '../components/landing/ValueStrip';
import { FeaturesGrid } from '../components/landing/FeaturesGrid';
import { FeatureShowcase } from '../components/landing/FeatureShowcase';
import { SyllabusSection } from '../components/landing/SyllabusSection';
import { HowItWorks } from '../components/landing/HowItWorks';
import { PictExclusivity } from '../components/landing/PictExclusivity';
import { FinalCTA } from '../components/landing/FinalCTA';
import { LandingFooter } from '../components/landing/LandingFooter';

export const LandingPage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    // Handle smooth scrolling to anchors
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="min-h-screen overflow-hidden font-sans selection:bg-teal-500/30">
      <LandingNavbar />
      
      <main>
        <HeroSection />
        <ValueStrip />
        <FeaturesGrid />
        <FeatureShowcase />
        <SyllabusSection />
        <HowItWorks />
        <PictExclusivity />
        <FinalCTA />
      </main>

      <LandingFooter />
    </div>
  );
};
