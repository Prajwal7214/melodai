import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import img1 from '../assets/stepsAnimation/img1.avif';
import img2 from '../assets/stepsAnimation/img2.avif';
import img3 from '../assets/stepsAnimation/img3.avif';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { num: "1", title: "Select Mood", desc: "Choose from 6 base emotional profiles.", img: img1 },
    { num: "2", title: "AI Processes", desc: "Our engine maps your mood to musical features.", img: img2 },
    { num: "3", title: "Listen instantly", desc: "A curated 10-track playlist is built instantly.", img: img3 }
  ];

  // Auto-cycle through steps permanently
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [activeStep]); // Dependency on activeStep resets the timer if clicked!

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
    <section className="py-32 px-6 bg-[#F9F9FB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Text Content */}
        <div className="md:w-1/2 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-black/5 text-sm font-bold text-gray-800 mb-6">
              Lightning Fast
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              From thought to <span className="font-serif italic font-normal text-gray-400">Track</span> in seconds.
            </h2>
            <p className="text-xl text-gray-500 font-medium mb-10 leading-relaxed">
              We leverage advanced LLMs and music APIs. You just tell us how you feel, and our AI perfectly curates iTunes tracks to match your exact emotional state. No endless searching.
            </p>
            
            <div className="space-y-4">
              {steps.map((step, i) => {
                const isActive = activeStep === i;
                return (
                  <div 
                    key={i} 
                    onClick={() => handleStepClick(i)}
                    className={`flex flex-col p-5 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden ${
                      isActive ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] scale-105' : 'hover:bg-black/5 opacity-70'
                    }`}
                  >
                    <div className="flex gap-4 items-start">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-1 transition-colors duration-300 ${
                          isActive ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
                        }`}>
                          {step.num}
                        </div>
                        <div>
                          <h4 className={`text-xl font-bold transition-colors duration-300 ${isActive ? 'text-black' : 'text-gray-600'}`}>
                            {step.title}
                          </h4>
                          <p className="text-gray-500 font-medium mt-1">{step.desc}</p>
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Visual Element */}
        <div className="md:w-1/2 relative flex justify-center mt-12 md:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full aspect-square max-w-lg"
          >
            {/* Soft decorative blur */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#64D2FF]/40 to-[#BF5AF2]/40 rounded-full blur-[80px]" />
            
            {/* The Image Container */}
            <div className="relative z-10 w-full h-full bg-white rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center justify-center overflow-hidden">
               <AnimatePresence mode="wait">
                 <motion.img
                   key={activeStep}
                   src={steps[activeStep].img}
                   alt={steps[activeStep].title}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.5, ease: "easeInOut" }}
                   className="w-full h-full object-cover"
                 />
               </AnimatePresence>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default HowItWorksSection;
