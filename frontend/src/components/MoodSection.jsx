import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ScrollVelocity from './ScrollVelocity';
import { Sun, CloudLightning, Leaf, Zap, Heart, Target } from 'lucide-react';

const moods = [
  { id: 'happy', icon: Sun, name: 'Happy', desc: 'Upbeat & Cheerful', color: 'from-[#FFE53B] to-[#FF2525]', glow: 'bg-orange-400' },
  { id: 'sad', icon: CloudLightning, name: 'Sad', desc: 'Emotional & Deep', color: 'from-[#89CFF0] to-[#0000FF]', glow: 'bg-blue-400' },
  { id: 'calm', icon: Leaf, name: 'Calm', desc: 'Peaceful & Relaxing', color: 'from-[#84FAB0] to-[#8FD3F4]', glow: 'bg-emerald-400' },
  { id: 'energetic', icon: Zap, name: 'Energetic', desc: 'Powerful & Intense', color: 'from-[#FA709A] to-[#FEE140]', glow: 'bg-yellow-400' },
  { id: 'romantic', icon: Heart, name: 'Romantic', desc: 'Soft & Tender', color: 'from-[#FF9A9E] to-[#FECFEF]', glow: 'bg-pink-400' },
  { id: 'focus', icon: Target, name: 'Focus', desc: 'Sharp & Minimal', color: 'from-[#A18CD1] to-[#FBC2EB]', glow: 'bg-purple-400' }
];

const MoodCard = ({ mood, idx, navigate }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const x = useTransform(mouseX, (value) => value - 150);
  const y = useTransform(mouseY, (value) => value - 150);

  const Icon = mood.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => navigate(`/generate?mood=${mood.id}`)}
      onMouseMove={handleMouseMove}
      className="group relative bg-white border border-gray-100 rounded-[32px] p-8 cursor-pointer transition-all duration-300 hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] overflow-hidden"
    >
      {/* Intense Cursor Glow */}
      <motion.div 
        className={`absolute pointer-events-none w-[300px] h-[300px] rounded-full blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-300 z-0 ${mood.glow}`}
        style={{ x, y }}
      />
      
      {/* Ambient static glow slightly visible normally */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${mood.color} rounded-full blur-[50px] opacity-10 group-hover:opacity-30 transition-opacity duration-500 z-0`} />
      
      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        
        <div className="mb-8 w-20 h-20 bg-[#F9F9FB] rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-white transition-colors duration-300 relative overflow-hidden">
            {/* Tiny highlight inside icon container */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${mood.color} transition-opacity duration-300`} />
            <Icon size={36} strokeWidth={2.5} className="text-gray-800 relative z-10" />
        </div>
        
        <h3 className="text-2xl font-bold mb-2 text-gray-900 drop-shadow-sm">{mood.name}</h3>
        <p className="text-gray-500 font-medium text-lg flex-grow">{mood.desc}</p>
        
        <div className="mt-8 flex items-center text-sm font-bold text-gray-900 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          Generate Track →
        </div>
      </div>
    </motion.div>
  );
};

const MoodSection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-24 pb-32 px-6 relative w-full bg-[#F9F9FB] overflow-hidden" id="moods">
      
      {/* Scroll Velocity Animation */}
      <div className="mb-20">
        <ScrollVelocity
          texts={['Mood Tracks', 'Scroll Down']} 
          velocity={50}
          className="text-orange-500 font-bold custom-scroll-text"
        />
      </div>

      <div className="text-center max-w-3xl mx-auto mb-20 max-w-7xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Pick your <span className="font-serif italic font-normal text-gray-500">Vibe</span>.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-500 text-xl font-medium"
        >
          Six handcrafted moods. Infinite musical possibilities. Let AI translate your feelings into the perfect track instantly.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 max-w-7xl mx-auto">
        {moods.map((mood, idx) => (
          <MoodCard key={mood.name} mood={mood} idx={idx} navigate={navigate} />
        ))}
      </div>
    </section>
  );
};

export default MoodSection;
