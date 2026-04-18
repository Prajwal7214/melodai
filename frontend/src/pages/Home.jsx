import React from 'react';
import NewHeroSection from '../components/NewHeroSection';
import CassetteScroll from '../components/CassetteScroll';
import MoodSection from '../components/MoodSection';
import HowItWorksSection from '../components/HowItWorksSection';
import { CTASection, Footer } from '../components/CTAFooter';

const Home = () => {
  return (
    <div className="relative w-full bg-[#050505]">
      
      {/* New Hero Section */}
      <NewHeroSection />

      {/* Dark Scroll-Driven Hero Sequence (Old ones kept below) */}
      <CassetteScroll />
      
      {/* Light Frameblox Sections */}
      <div className="relative z-20 w-full bg-white rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <MoodSection />
        <HowItWorksSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
