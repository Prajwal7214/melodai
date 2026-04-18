import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeadphoneScroll = () => {
    const containerRef = useRef(null);

    // 1. Setup Scroll Tracking for the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // -- SCROLL ANIMATION RANGES --
    
    // Text 1: 0% to 25%
    const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const text1Y = useTransform(scrollYProgress, [0, 0.25], [0, -50]);

    // Text 2: 40% to 65%
    const text2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
    const text2Y = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [50, 0, 0, -50]);

    // Text 3: 80% to 100%
    const text3Opacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);
    const text3Y = useTransform(scrollYProgress, [0.75, 0.85, 1], [50, 0, 0]);

    return (
        <div ref={containerRef} className="relative w-full" style={{ height: "500vh" }}>
            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#0D0D0D]">
                
                <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center">
                    <img
                        className="w-full h-full object-cover opacity-80"
                        src="/hero_headphone.jpeg" 
                        alt="Headphone Background"
                    />
                </div>

                <div className="relative z-10 w-full h-full pointer-events-none flex items-center justify-center px-6 md:px-20">
                    
                    {/* Text 1: 0% - 25% */}
                    <motion.div 
                      className="absolute max-w-4xl w-full text-center"
                      style={{ opacity: text1Opacity, y: text1Y }}
                    >
                        <h1 className="text-6xl md:text-8xl tracking-tight mb-4 text-white/90 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                            <span className="font-bold">MelodAI</span> <span className="font-serif italic font-light">Redefined</span>
                        </h1>
                        <p className="text-2xl text-white/60 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                            Your Emotions, Reimagined as Sound.
                        </p>
                    </motion.div>

                    {/* Text 2: 40% - 65% */}
                    <motion.div 
                      className="absolute max-w-4xl w-full text-center"
                      style={{ opacity: text2Opacity, y: text2Y }}
                    >
                        <h2 className="text-5xl md:text-7xl tracking-tight mb-4 text-white/90 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                            <span className="font-bold">AI-Powered</span> <span className="font-serif italic font-light">Intelligence.</span>
                        </h2>
                        <p className="text-xl text-white/60 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mx-auto max-w-2xl">
                            Deep learning that reads your emotions and composes perfectly tailored music in real time.
                        </p>
                    </motion.div>

                    {/* Text 3: 80% - 100% */}
                    <motion.div 
                      className="absolute max-w-4xl w-full text-center pointer-events-auto"
                      style={{ opacity: text3Opacity, y: text3Y }}
                    >
                        <h2 className="text-6xl md:text-8xl tracking-tight mb-8 text-white/90 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                            <span className="font-bold">Feel Every</span> <span className="font-serif italic font-light">Note.</span>
                        </h2>
                        <Link to="/generate">
                            <button className="px-10 py-5 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#FF6584] text-white font-bold text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(108,99,255,0.6)] transition-all">
                                Generate My Music →
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
            
            {/* Transition gradient block */}
            <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-b from-transparent to-white pointer-events-none" />
        </div>
    );
};

export default HeadphoneScroll;
