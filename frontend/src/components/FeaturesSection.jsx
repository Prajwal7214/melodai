import React from 'react';
import { motion } from 'framer-motion';
import { Database, PlayCircle, Star, Zap } from 'lucide-react';

const FeaturesSection = () => {
    return (
        <section className="py-32 px-6 bg-white relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
                    >
                        Built for <span className="font-serif italic font-normal text-gray-400">Lovers</span> of sound.
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="text-gray-500 text-xl font-medium"
                    >
                        We didn't just build an AI tool. We built a flawless musical experience with all the features you expect.
                    </motion.p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Big Card - Left */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 bg-[#F9F9FB] rounded-[32px] p-10 flex flex-col justify-between overflow-hidden relative group"
                    >
                        <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-[#0A84FF]/20 to-transparent rounded-full blur-[60px]" />
                        <div className="relative z-10 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-12">
                            <Zap className="text-[#0A84FF]" size={28} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-4">Instant Generation</h3>
                            <p className="text-gray-500 text-lg font-medium max-w-md">Hit the button and get a 10-track playlist loaded with real iTunes metadata in literally under 3 seconds.</p>
                        </div>
                    </motion.div>

                    {/* Small Card - Right Top */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#1D1D1F] text-white rounded-[32px] p-10 flex flex-col"
                    >
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-auto">
                            <Database size={28} />
                        </div>
                        <div className="mt-12">
                            <h3 className="text-2xl font-bold mb-2">Cloud History</h3>
                            <p className="text-gray-400 font-medium">MongoDB saves every track so you never lose the vibe.</p>
                        </div>
                    </motion.div>

                    {/* Small Card - Left Bottom */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#F9F9FB] rounded-[32px] p-10 flex flex-col justify-between"
                    >
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-12">
                            <PlayCircle className="text-black" size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Built-in Player</h3>
                            <p className="text-gray-500 font-medium">Listen to iTunes previews directly in the browser.</p>
                        </div>
                    </motion.div>

                    {/* Big Card - Right Bottom */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-2 bg-[#F9F9FB] rounded-[32px] p-10 flex flex-col lg:flex-row items-center gap-10 overflow-hidden relative"
                    >
                        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-gradient-to-br from-[#BF5AF2]/20 to-transparent rounded-full blur-[60px]" />
                        <div className="relative z-10 flex-1">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8">
                                <Star className="text-[#BF5AF2]" size={28} />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">Loved by Audiophiles</h3>
                            <p className="text-gray-500 text-lg font-medium">"MelodAI perfectly matches music to my study sessions. The focus mode is unparalleled." <br/><br/>- Priya S.</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
