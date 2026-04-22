import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const FRAME_COUNT = 120;
// We'll aim for 24-30 fps for cinematic analog smoothness
const FPS = 24; 
const FRAME_DURATION = 1000 / FPS;

const CassetteScroll = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const [isAnimating, setIsAnimating] = useState(false);

    // 1. Setup Scroll Tracking for the typography slides
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 2. Preload Images & Setup Initial Draw
    useEffect(() => {
        let loadedCount = 0;
        const images = [];
        
        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            const frameNum = i.toString().padStart(3, '0');
            img.src = `/cassette-frames/ezgif-frame-${frameNum}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setIsAnimating(true);
                } else if (loadedCount === 1 && canvasRef.current) {
                    // Draw first frame immediately to avoid black screen flash
                    const ctx = canvasRef.current.getContext('2d');
                    canvasRef.current.width = img.width;
                    canvasRef.current.height = img.height;
                    ctx.drawImage(img, 0, 0);
                }
            };
            images.push(img);
        }
        imagesRef.current = images;
        
        return () => {
             // Cleanup if component unmounts
             imagesRef.current.forEach(img => {
                 img.onload = null;
             });
        }
    }, []);

    // 3. Independent Cassette Animation Loop (paused when off-screen)
    useEffect(() => {
        if (!isAnimating || !canvasRef.current || imagesRef.current.length < FRAME_COUNT) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let lastTime = 0;
        let currentFrame = 0;
        let isVisible = true;

        // Ensure canvas width matches the first frame
        const width = imagesRef.current[0].width;
        const height = imagesRef.current[0].height;
        canvas.width = width;
        canvas.height = height;

        const render = (time) => {
            if (isVisible && time - lastTime >= FRAME_DURATION) {
                lastTime = time;
                currentFrame = (currentFrame + 1) % FRAME_COUNT;
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(imagesRef.current[currentFrame], 0, 0, width, height);
            }
            animationFrameId = requestAnimationFrame(render);
        };

        // Pause when scrolled out of view
        const observer = new IntersectionObserver(
            ([entry]) => { isVisible = entry.isIntersecting; },
            { threshold: 0.05 }
        );
        if (containerRef.current) observer.observe(containerRef.current);

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, [isAnimating]);

    // -- SCROLL ANIMATION RANGES --
    // Easing behavior: smooth fade in, delay, smooth fade out with a slight vertical slide (y: 30 to -30)
    
    // Text 1: Hero (0-20%) - Centered
    const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const text1Y = useTransform(scrollYProgress, [0, 0.25], [0, -30]);

    // Text 2: Music Experience (25-45%) - Left Aligned
    const text2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
    const text2Y = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [30, 0, 0, -30]);

    // Text 3: Immersion (50-70%) - Right Aligned
    const text3Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
    const text3Y = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [30, 0, 0, -30]);

    // Text 4: Final CTA (80-100%) - Centered
    const text4Opacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);
    const text4Y = useTransform(scrollYProgress, [0.8, 0.9, 1], [30, 0, 0]);

    return (
        <div ref={containerRef} className="relative w-full" style={{ height: "400vh", backgroundColor: "#050505" }}>
            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#050505]">
                
                {/* Background Continuous Cassette Animation */}
                <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center opacity-30 mix-blend-screen bg-[#050505]/50">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full object-cover mix-blend-screen"
                    />
                </div>

                <div className="relative z-10 w-full h-full pointer-events-none flex items-center justify-center px-6 md:px-20 font-sans" style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}>
                    
                    {/* 1. HERO */}
                    <motion.div 
                      className="absolute max-w-4xl w-full text-center"
                      style={{ opacity: text1Opacity, y: text1Y }}
                    >
                        <h1 className="text-6xl md:text-8xl tracking-tight mb-4 text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] font-bold">
                            Experience MelodAI.
                        </h1>
                        <p className="text-2xl text-white/60 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] tracking-wide">
                            Analog soul. <span className="text-[#FF8C00] ml-2 font-bold">AI generation.</span>
                        </p>
                     </motion.div>

                    {/* 2. MUSIC EXPERIENCE */}
                    <motion.div 
                      className="absolute max-w-4xl w-full text-left md:mr-auto"
                      style={{ opacity: text2Opacity, y: text2Y }}
                    >
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] leading-tight">
                            Every beat <br /> <span className="text-[#FF8C00]">tells your story.</span>
                        </h2>
                        <p className="text-xl text-white/60 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-xl">
                            Real-time AI that reads your emotions and instantly composes music.
                        </p>
                    </motion.div>

                    {/* 3. IMMERSION */}
                    <motion.div 
                      className="absolute max-w-4xl w-full text-right md:ml-auto flex flex-col items-end"
                      style={{ opacity: text3Opacity, y: text3Y }}
                    >
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] leading-tight">
                            Six distinct <br /> <span className="text-[#FF6500]">mood profiles.</span>
                        </h2>
                        <p className="text-xl text-white/60 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-xl">
                            Tailored entirely to you. Pure sound, zero boundaries.
                        </p>
                    </motion.div>

                    {/* 4. FINAL CTA */}
                    <motion.div 
                      className="absolute max-w-4xl w-full text-center pointer-events-auto"
                      style={{ opacity: text4Opacity, y: text4Y }}
                    >
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] leading-tight">
                            Press play on <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6500] to-[#FF8C00]">MelodAI.</span>
                        </h2>
                        <p className="text-2xl text-white/70 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] mb-10">
                            Where your emotions become sound.
                        </p>
                        <Link to="/generate">
                            <button className="px-10 py-5 rounded-full bg-white text-[#050505] font-bold text-lg hover:scale-105 hover:bg-transparent hover:text-white hover:border hover:border-white hover:shadow-[0_0_30px_rgba(255,140,0,0.4)] transition-all">
                                Generate My Music
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
            
            {/* Seamless transition into white background below */}
            <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-b from-transparent to-white pointer-events-none" />
        </div>
    );
};

export default CassetteScroll;
