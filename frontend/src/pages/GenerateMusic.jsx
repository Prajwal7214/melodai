import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Loader2, Disc3, Sun, CloudLightning, Zap, Moon, Wind, Film, Music } from 'lucide-react';

import Antigravity from '../components/Antigravity';
import SongCard from '../components/SongCard';
import PlayerHeartButton from '../components/PlayerHeartButton';

const MOODS = [
  { id: "happy",     emoji: "😊", label: "Happy",     desc: "Upbeat & Cheerful" },
  { id: "sad",       emoji: "😢", label: "Sad",       desc: "Emotional & Deep" },
  { id: "motivated", emoji: "💪", label: "Motivated", desc: "Hustle & Grind" },
  { id: "lonely",    emoji: "🌙", label: "Lonely",    desc: "Alone & Reflective" },
  { id: "normal",    emoji: "😐", label: "Normal",    desc: "Chill & Casual" },
  { id: "energetic", emoji: "⚡", label: "Energetic", desc: "Powerful & Intense" },
  { id: "romantic",  emoji: "💕", label: "Romantic",  desc: "Soft & Tender" },
  { id: "calm",      emoji: "😌", label: "Calm",      desc: "Peaceful & Relaxing" },
  { id: "focus",     emoji: "🎯", label: "Focus",     desc: "Sharp & Minimal" },
  { id: "party",     emoji: "🎉", label: "Party",     desc: "Dance & Celebrate" },
  { id: "nostalgic", emoji: "🕰️", label: "Nostalgic", desc: "Old Memories" },
  { id: "angry",     emoji: "😤", label: "Angry",     desc: "Dark & Intense" },
];

const mockRecommendations = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  title: `Neural Synthscape ${i + 1}`,
  artist: 'MelodAI Engine',
  duration: '3:4' + i,
  artwork: `https://picsum.photos/seed/${i + 100}/100/100` // Using stable placeholder images
}));

const GenerateMusic = () => {
  const [selectedMood, setSelectedMood] = useState('happy');
  const [customMood, setCustomMood] = useState('');
  const [contextText, setContextText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [songs, setSongs] = useState([]);
  const [playingId, setPlayingId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fetchRecommendations = async (mood) => {
    setIsLoadingRecs(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/spotify-recommend/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood }),
      });
      const data = await response.json();
      if (data.recommendations) {
        setSongs(data.recommendations);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoadingRecs(false);
    }
  };

  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);
    setCustomMood('');
    fetchRecommendations(moodId);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const playSong = (song) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(song.preview_url);
    audio.volume = volume;
    
    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };

    audio.onended = () => {
      playNext();
    };

    audioRef.current = audio;
    audio.play();
    setIsPlaying(true);
    setPlayingId(song.id);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else if (songs.length > 0 && playingId) {
      const s = songs.find(s => s.id === playingId);
      if (s) playSong(s);
    }
  };

  const playNext = () => {
    if (songs.length === 0) return;
    const currentIndex = songs.findIndex(s => s.id === playingId);
    if (currentIndex < songs.length - 1) {
      playSong(songs[currentIndex + 1]);
    }
  };

  const playPrevious = () => {
    if (songs.length === 0) return;
    const currentIndex = songs.findIndex(s => s.id === playingId);
    if (currentIndex > 0) {
      playSong(songs[currentIndex - 1]);
    }
  };

  const handleGenerate = async () => {
    if (!contextText.trim()) return;
    
    setIsGenerating(true);
    setAiResult(null);
    setSongs([]);
    setPlayingId(null);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    try {
      const finalMood = customMood.trim() ? customMood.trim() : selectedMood;

      const response = await fetch('http://127.0.0.1:8000/api/generate-music/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: finalMood, context: contextText }),
      });
      const data = await response.json();
      
      const tracks = data.recommendations || [];
      if (tracks.length > 0) {
        setSongs(tracks);
        setAiResult({
          id: 'TRK_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
          description: `Generated based on your ${finalMood} ${contextText} session.`,
          waveform: Array.from({ length: 28 }).map((_, i) => i)
        });
        const playableSong = tracks.find(s => s.preview_url);
        if (playableSong) {
          playSong(playableSong);
        } else {
          playSong(tracks[0]);
        }
        
        if (data.saved_to_history) {
          setToastMessage('✅ Saved to History');
          setTimeout(() => setToastMessage(''), 3000);
        }
      }
    } catch (error) {
      console.error("Error generating music:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveHistory = () => {
    alert("✅ Session saved to history (Mock)");
  };

  return (
    <div className="relative min-h-screen bg-[#F5F5F7] text-zinc-900 pt-16 pb-32 px-6 transition-colors duration-500 overflow-hidden">
      
      {/* ANTIGRAVITY HERO ANIMATION (Background) */}
      <div className="absolute top-0 left-0 w-full h-[400px] pointer-events-none opacity-40">
        <Antigravity
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#000000"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 mt-12">
        
        {/* PAGE HEADER */}
        <div className="mb-10 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 bg-violet-500/10 text-violet-600 rounded-full px-3 py-1 text-xs font-semibold tracking-wide mb-3 backdrop-blur-md">
            <Music className="w-3.5 h-3.5" /> AI GENERATION
          </span>
          <h1 className="text-4xl md:text-5xl font-bold -tracking-[0.05em] text-zinc-900 mb-2">Sonic Studio</h1>
          <p className="font-instrument italic text-zinc-500 text-2xl">Sculpt your soundscape with neural synthesis.</p>
        </div>

        {/* TWO PANEL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT PANEL */}
          <div className="space-y-8">
            
            {/* Mood Selector */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                CHOOSE A VIBE
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {MOODS.map(mood => (
                  <button
                    key={mood.id}
                    onClick={() => handleMoodSelect(mood.id)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold flex items-center border transition-all duration-300 ${
                      selectedMood === mood.id && !customMood
                        ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white border-transparent shadow-md'
                        : 'border-zinc-200 text-zinc-600 bg-white hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 shadow-sm'
                    }`}
                  >
                    <span className="mr-2 text-lg leading-none">{mood.emoji}</span>
                    {mood.label}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder='Or type any mood here (e.g. "breakup", "rain", "coffee morning")...'
                value={customMood}
                onChange={(e) => setCustomMood(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-sm text-zinc-900 placeholder-zinc-400 focus:bg-white focus:border-violet-500/60 focus:ring-0 shadow-inner outline-none transition-colors"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleGenerate();
                }}
              />
            </div>

            {/* Context Input */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                WHAT ARE YOU DOING?
              </label>
              <textarea
                value={contextText}
                onChange={e => setContextText(e.target.value)}
                placeholder="studying, working out, sleeping..."
                className="w-full min-h-[100px] bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-zinc-900 placeholder-zinc-400 focus:bg-white focus:border-violet-500/60 focus:ring-0 shadow-inner outline-none resize-none transition-colors"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !contextText.trim()}
              className={`w-full py-4 rounded-xl font-semibold text-white text-base transition-all duration-300 shadow-[0_10px_30px_rgba(139,92,246,0.2)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.3)] hover:scale-[1.01] flex items-center justify-center gap-3 ${
                isGenerating || !contextText.trim() 
                  ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none hover:shadow-none hover:scale-100' 
                  : 'bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Synthesizing your soundscape...
                </>
              ) : (
                'Generate Music'
              )}
            </button>

            {/* AI Track Result Card */}
            {aiResult && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-violet-500/10 shadow-[0_15px_40px_rgba(0,0,0,0.04)] rounded-xl p-5"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-xs text-zinc-400">{aiResult.id}</span>
                  <span className="bg-violet-500/10 text-violet-600 rounded-full px-2 py-0.5 text-xs font-semibold">
                    NEURALSYNTH
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-zinc-900 mb-6 truncate">
                  {contextText} Vibe
                </h2>

                {/* Animated Waveform Visualizer */}
                <div className="flex items-end gap-1 h-20 mb-6">
                  {aiResult.waveform.map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scaleY: [0.2, 1, 0.5, 0.8, 0.3, 0.9, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.04 }}
                      style={{ originY: 1 }}
                      className="flex-1 w-full bg-gradient-to-t from-violet-600 to-pink-500 rounded-t-sm"
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <button onClick={togglePlayPause} className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-violet-600 shadow-md shadow-violet-500/20 rounded-full hover:bg-violet-500 transition-colors">
                    {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
                  </button>
                  <p className="italic text-xs text-zinc-500 leading-tight font-medium">
                    {aiResult.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['30 seconds', 'MP3', 'AI Generated', 'MelodAI v1.0'].map(tag => (
                    <span key={tag} className="bg-zinc-100 text-zinc-500 font-medium rounded-full px-2 py-1 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

          </div>

          {/* RIGHT PANEL */}
          <div className="bg-white border border-zinc-200 shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-2xl p-6 min-h-[500px]">
             
            <div className="flex justify-between items-end mb-6 border-b border-zinc-100 pb-4">
              <div>
                <p className="text-xs font-bold text-zinc-400 mb-1">CURATED FEED</p>
                <h2 className="text-xl font-bold text-zinc-900 flex items-center flex-wrap gap-1">
                  Recommended for <span className="bg-gradient-to-r from-violet-600 to-pink-500 text-transparent bg-clip-text"> {selectedMood}</span>
                </h2>
              </div>
              <button 
                onClick={handleSaveHistory}
                className="border border-zinc-200 bg-zinc-50/50 rounded-lg px-4 py-2 text-sm text-zinc-600 font-semibold hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 transition-colors"
              >
                SAVE TO HISTORY
              </button>
            </div>

            <div className={`${songs.length > 0 && !(isLoadingRecs || isGenerating) ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-1'}`}>
              {isLoadingRecs || isGenerating ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-3 p-3 rounded-xl animate-pulse bg-zinc-50 border border-zinc-100">
                      <div className="w-full aspect-square bg-zinc-200 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-zinc-200 rounded w-3/4"></div>
                        <div className="h-3 bg-zinc-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : songs.length === 0 ? (
                <div className="py-20 text-center text-zinc-400 flex flex-col items-center">
                  <Disc3 className="w-12 h-12 mb-3 opacity-20" />
                  <p>Click a vibe above to discover songs.</p>
                </div>
              ) : (
                songs.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    isPlaying={playingId === song.id && isPlaying}
                    onPlay={playSong}
                    onToast={(msg) => { setToastMessage(msg); setTimeout(() => setToastMessage(''), 3000); }}
                  />
                ))
              )}
            </div>

          </div>
        </div>
      </div>
      
      {/* GLOBAL MUSIC PLAYER BAR */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 border-t border-zinc-200 shadow-[0_-10px_40px_rgba(0,0,0,0.04)] px-4 md:px-8 flex items-center justify-between z-50 backdrop-blur-xl">
        <div className="flex items-center gap-4 w-1/3">
          <div className="w-12 h-12 bg-zinc-100 rounded-lg overflow-hidden relative group shadow-sm border border-zinc-200/50">
            {playingId ? (
              <img src={songs.find(s => s.id === playingId)?.artwork || 'https://picsum.photos/seed/101/100/100'} alt="Playing track" className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full bg-zinc-50 flex items-center justify-center">
                 <Disc3 className="w-5 h-5 text-zinc-400" />
               </div>
            )}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
            </div>
          </div>
          <div className="hidden sm:block">
            <h4 className="text-sm font-bold tracking-tight text-zinc-900 truncate w-40">{playingId && songs.length ? songs.find(s => s.id === playingId)?.title : 'No track playing'}</h4>
            <p className="text-xs font-medium text-zinc-500 truncate mt-0.5">{playingId && songs.length ? 'MelodAI Engine' : 'Select a track to play'}</p>
          </div>
          {playingId && songs.length > 0 && (
            <PlayerHeartButton 
              song={songs.find(s => s.id === playingId)} 
              onToast={(msg) => { setToastMessage(msg); setTimeout(() => setToastMessage(''), 3000); }} 
            />
          )}
        </div>

        <div className="flex flex-col items-center justify-center w-1/3 space-y-2">
          <div className="flex items-center gap-6">
             <button onClick={playPrevious} className="text-zinc-400 hover:text-zinc-600 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
             </button>
             <button onClick={togglePlayPause} className="w-10 h-10 rounded-full bg-zinc-900 shadow-md text-white flex items-center justify-center hover:scale-105 hover:bg-black transition-all">
               {isPlaying ? <Pause className="w-4 h-4" fill="currentColor" /> : <Play className="w-4 h-4 ml-0.5" fill="currentColor" />}
             </button>
             <button onClick={playNext} className="text-zinc-400 hover:text-zinc-600 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
             </button>
          </div>
          <div className="hidden md:flex items-center w-full max-w-md gap-3">
            <span className="text-[10px] font-bold text-zinc-400 font-mono">{formatTime(currentTime)}</span>
            <div className="h-1.5 flex-1 bg-zinc-200 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
              if (audioRef.current && duration) {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                audioRef.current.currentTime = pos * duration;
              }
            }}>
               <div className="h-full bg-violet-500 rounded-full transition-all duration-75" style={{ width: `${progress || 0}%` }}></div>
            </div>
            <span className="text-[10px] font-bold text-zinc-400 font-mono">{formatTime(duration)}</span>
          </div>
        </div>
        
        <div className="w-1/3 flex justify-end gap-3 text-zinc-400 hidden sm:flex">
             <button className="hover:text-zinc-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
             </button>
             <input 
               type="range" 
               min="0" 
               max="1" 
               step="0.01" 
               value={volume} 
               onChange={(e) => {
                 const newVol = parseFloat(e.target.value);
                 setVolume(newVol);
                 if (audioRef.current) audioRef.current.volume = newVol;
               }} 
               className="w-24 h-1.5 mt-2.5 accent-zinc-500 bg-zinc-200 rounded-full cursor-pointer" 
             />
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-8 bg-zinc-900 text-white px-4 py-3 rounded-xl shadow-2xl z-[100] font-medium text-sm flex items-center gap-2"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenerateMusic;
