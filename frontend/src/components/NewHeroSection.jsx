import React from 'react';
import SplashCursor from './SplashCursor';

const NewHeroSection = () => {
  return (
    <div className="relative w-full h-[100vh] bg-gradient-to-br from-[#8E1802] via-[#E24A0C] to-[#EFBC87] overflow-hidden flex items-center justify-center font-sans text-white">
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING={true}
        RAINBOW_MODE={false}
        COLOR="#FFD700"
      />
      {/* Huge Faint Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
        <h1 className="text-[18vw] font-black tracking-widest text-[#FFF2E0] opacity-10 leading-none">
          MELODAI
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 lg:px-16 h-full grid grid-cols-12 gap-8 items-center pt-20">
        
        {/* Left Text Content */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center h-full">
          <div className="mt-[-10vh]">
            <h2 className="text-6xl sm:text-7xl lg:text-[85px] font-bold leading-[0.95] tracking-tight mb-8">
              The future of<br />music listening<br />experience
            </h2>
          </div>
          
          <div className="absolute bottom-16 left-8 lg:left-16 text-sm text-white/70 space-y-1">
            <p className="text-white font-medium">MelodAI</p>
            <p>Music App</p>
          </div>
        </div>

        {/* Center / Image placeholder removed per user request */}
        <div className="col-span-12 lg:col-span-3 flex justify-center items-center h-full relative">
            {/* The phone mockup was here. It has been removed. */}
        </div>

        {/* Right Content */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-center h-full relative">
           <div className="mt-[-20vh] ml-auto w-[85%]">
            <p className="text-2xl lg:text-[32px] font-light leading-snug">
              Redefines what a<br />music app can be—<br />transforming passive<br />listening into an<br />immersive, interactive<br />experience.
            </p>
           </div>
        </div>
      </div>





      {/* Control Buttons Mock UI on the bottom right edge */}
      <div className="absolute bottom-16 right-8 lg:right-16 flex flex-col gap-4 z-20">
          <button className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex justify-center items-center hover:bg-white/20 transition-colors">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M4 12L18 4V20L4 12Z" fill="#ff7f50"/>
               <rect x="2" y="4" width="4" height="16" fill="#ff7f50"/>
             </svg>
          </button>
          <button className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex justify-center items-center hover:bg-white/30 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="5" width="4" height="14" fill="#ff7f50"/>
              <rect x="14" y="5" width="4" height="14" fill="#ff7f50"/>
            </svg>
          </button>
          <button className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex justify-center items-center hover:bg-white/20 transition-colors">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M20 12L6 20V4L20 12Z" fill="#ff7f50"/>
               <rect x="18" y="4" width="4" height="16" fill="#ff7f50"/>
             </svg>
          </button>
      </div>
    </div>
  );
};

export default NewHeroSection;
