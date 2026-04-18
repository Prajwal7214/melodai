import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Aurora from './Aurora';

export const CTASection = () => {
    return (
        <section className="py-32 px-6 bg-white relative">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="bg-[#1D1D1F] rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 pointer-events-none opacity-80 mix-blend-screen">
                        <Aurora
                          colorStops={["#1D1D1F", "#BF5AF2", "#0A84FF"]}
                          blend={0.5}
                          amplitude={1.0}
                          speed={0.5}
                        />
                    </div>
                    
                    <div className="relative z-10">
                        <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 text-white">
                            Ready to <span className="font-serif italic font-normal text-white/70">Listen?</span>
                        </h2>
                        <p className="text-xl text-gray-400 font-medium mb-12 max-w-2xl mx-auto">
                            Join thousands of users defining their perfect daily soundtrack. No signup required.
                        </p>
                        
                        <Link to="/generate">
                            <button className="px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(191,90,242,0.4)]">
                                Try MelodAI Free
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export const Footer = () => {
    return (
        <footer className="bg-[#F9F9FB] pt-20 pb-10 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div>
                    <div className="text-2xl font-bold tracking-tight mb-4 text-black">MelodAI</div>
                    <p className="text-gray-500 font-medium max-w-sm">
                        Redefining how you discover music by mapping audio algorithms to your emotional state.
                    </p>
                </div>
                <div className="flex gap-16 md:justify-end font-medium">
                    <div className="flex flex-col gap-3">
                        <h4 className="text-black font-bold mb-2">Platform</h4>
                        <Link to="/generate" className="text-gray-500 hover:text-black">Generator</Link>
                        <Link to="/history" className="text-gray-500 hover:text-black">History</Link>
                        <Link to="/recommendations" className="text-gray-500 hover:text-black">Saved Tracks</Link>
                    </div>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 font-medium">
                <p>© 2026 MelodAI.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-black">Terms</a>
                    <a href="#" className="hover:text-black">Privacy</a>
                </div>
            </div>
        </footer>
    );
};
