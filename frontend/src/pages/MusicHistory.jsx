import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Trash2, Calendar, Music4, Clock, Loader2, Play as PlayIcon, Target, Zap, Leaf } from 'lucide-react';
import PlayerHeartButton from '../components/PlayerHeartButton';

const MOCK_HISTORY = [
  {
    id: '1',
    mood: 'focus',
    date: 'May 14, 2026 • 10:13 AM',
    icon: Target,
    context: 'studying for finals',
    description: 'AI generated a deep focus ambient soundscape featuring cinematic pads and 80bpm rhythmic pulses.',
    duration: '4m 12s',
    trackCount: 12,
    songs: Array.from({ length: 12 }).map((_, i) => ({
      id: `s1_${i}`,
      title: `Deep Focus Block ${i + 1}`,
      artist: 'MelodAI Engine',
      duration: '4:12',
      artwork: `https://picsum.photos/seed/focus${i}/80/80`
    }))
  },
  {
    id: '2',
    mood: 'energetic',
    date: 'May 13, 2026 • 06:45 PM',
    icon: Zap,
    context: 'intense cardio workout',
    description: 'A high-BPM electronic burst designed to maximize energy output and sustain momentum during a run.',
    duration: '3m 45s',
    trackCount: 8,
    songs: Array.from({ length: 8 }).map((_, i) => ({
      id: `s2_${i}`,
      title: `Cardio Wave ${i + 1}`,
      artist: 'MelodAI Engine',
      duration: '3:45',
      artwork: `https://picsum.photos/seed/run${i}/80/80`
    }))
  },
  {
    id: '3',
    mood: 'calm',
    date: 'May 12, 2026 • 11:20 PM',
    icon: Leaf,
    context: 'winding down before sleep',
    description: 'Soft, slow binaural beats interwoven with distant nature sounds to gently guide the mind into a restful state.',
    duration: '5m 30s',
    trackCount: 5,
    songs: Array.from({ length: 5 }).map((_, i) => ({
      id: `s3_${i}`,
      title: `Midnight Drift ${i + 1}`,
      artist: 'MelodAI Engine',
      duration: '5:30',
      artwork: `https://picsum.photos/seed/moon${i}/80/80`
    }))
  }
];

const moodColors = {
  all: 'bg-zinc-800 text-zinc-300 border-zinc-700',
  happy: 'bg-yellow-500/15 text-yellow-500 border-yellow-500/20',
  sad: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  calm: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  energetic: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
  romantic: 'bg-pink-500/15 text-pink-400 border-pink-500/20',
  focus: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
};

const FILTERS = ['All', 'Happy', 'Sad', 'Calm', 'Energetic', 'Romantic', 'Focus'];

const MusicHistory = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  // Player State
  const [songs, setSongs] = useState([]);
  const [playingSongId, setPlayingSongId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/get-history/');
        const data = await response.json();
        
        const msToMinSec = (ms) => {
          if (!ms) return "0:00";
          const minutes = Math.floor(ms / 60000);
          const seconds = Math.floor((ms % 60000) / 1000);
          return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };

        const formattedHistory = (data.history || []).map((item, index) => {
          const songs = item.songs || [];
          const totalMs = songs.reduce((acc, curr) => acc + (curr.duration || 0), 0);
          
          return {
            id: `hist_${index}_${Date.now()}`,
            mood: item.mood || 'normal',
            date: item.created_at || 'Unknown Date',
            icon: Music4,
            context: item.context || `Generated ${item.mood} session`,
            description: item.ai_music?.description || `Generated music session based on the ${item.mood} vibe.`,
            duration: msToMinSec(totalMs),
            trackCount: songs.length,
            songs: songs.map(s => ({
              id: s.id,
              title: s.title,
              artist: s.artist,
              duration: msToMinSec(s.duration),
              artwork: s.artwork,
              preview_url: s.preview_url
            }))
          };
        });

        // Backend records history by append so newest usually is last. We reverse it so history shows newest first.
        setHistory(formattedHistory.reverse());
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = history.filter(item => 
    activeFilter === 'All' ? true : item.mood === activeFilter.toLowerCase()
  );

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const playSong = (song, sessionSongs = null) => {
    if (sessionSongs) setSongs(sessionSongs);
    const currentSongs = sessionSongs || songs;

    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    if (!song || !song.preview_url) return;

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
      playNext(currentSongs, song.id);
    };

    audioRef.current = audio;
    audio.play().catch(e => console.log("Play error:", e));
    setIsPlaying(true);
    setPlayingSongId(song.id);
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
    } else if (songs.length > 0 && playingSongId) {
      const s = songs.find(s => s.id === playingSongId);
      if (s) playSong(s);
    }
  };

  const playNext = (currentSongs = songs, currentId = playingSongId) => {
    if (currentSongs.length === 0) return;
    const currentIndex = currentSongs.findIndex(s => s.id === currentId);
    if (currentIndex < currentSongs.length - 1) {
      playSong(currentSongs[currentIndex + 1], currentSongs);
    }
  };

  const playPrevious = () => {
    if (songs.length === 0) return;
    const currentIndex = songs.findIndex(s => s.id === playingSongId);
    if (currentIndex > 0) {
      playSong(songs[currentIndex - 1]);
    }
  };

  const handlePlaySessionClick = (e, session) => {
      e.stopPropagation();
      if(session.songs.length > 0) {
          playSong(session.songs[0], session.songs);
      }
  };

  return (
    <div className="relative min-h-screen bg-black text-white pt-28 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* PAGE HEADER */}
        <div className="mb-8">
          <span className="inline-block bg-pink-500/10 text-pink-400 rounded-full px-3 py-1 text-xs font-semibold tracking-wide mb-3">
            ARCHIVE & INSIGHTS
          </span>
          <h1 className="text-4xl md:text-5xl font-bold -tracking-[0.05em] text-white mb-2">Your Music History</h1>
          <p className="font-instrument italic text-zinc-400 text-2xl">All your past mood sessions, generated tracks, and sonic explorations.</p>
        </div>

        {/* MOOD FILTER BAR */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {FILTERS.map(filter => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-violet-600 text-white border border-violet-600'
                    : 'border border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'
                }`}
              >
                {filter}
              </button>
            )
          })}
        </div>

        {/* CONTENT AREA */}
        <div className="space-y-4 min-h-[500px]">
          {loading ? (
            /* LOADING STATE */
            Array.from({length: 3}).map((_, i) => (
              <div key={i} className="bg-zinc-800/20 border border-zinc-800/50 rounded-2xl p-6 h-48 animate-pulse flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-16 h-6 bg-zinc-700/50 rounded-full" />
                  <div className="w-24 h-6 bg-zinc-700/50 rounded-full" />
                </div>
                <div className="w-2/3 h-4 bg-zinc-700/50 rounded" />
                <div className="flex gap-2">
                  <div className="w-12 h-12 bg-zinc-700/50 rounded-lg" />
                  <div className="w-12 h-12 bg-zinc-700/50 rounded-lg" />
                  <div className="w-12 h-12 bg-zinc-700/50 rounded-lg" />
                </div>
              </div>
            ))
          ) : filteredHistory.length === 0 ? (
            /* EMPTY STATE */
            <div className="py-32 flex flex-col items-center justify-center text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/10">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                <Music4 className="w-8 h-8 text-zinc-700" />
              </div>
              <h2 className="text-xl font-semibold text-zinc-500 mb-2">No History Yet</h2>
              <p className="text-zinc-600 mb-6">Generate your first mood playlist to see it here</p>
              <a href="/generate" className="px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 hover:opacity-90 transition-opacity">
                → Start Generating
              </a>
            </div>
          ) : (
            /* HISTORY CARDS */
            <AnimatePresence>
              {filteredHistory.map(session => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  key={session.id}
                  onClick={() => setExpandedId(expandedId === session.id ? null : session.id)}
                  className="bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition-colors cursor-pointer overflow-hidden relative"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    {/* LEFT SIDE */}
                    <div className="flex-1 space-y-4">
                      {/* TOP ROW */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${moodColors[session.mood] || moodColors.all}`}>
                          {session.mood}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                          <Calendar className="w-3 h-3" />
                          {session.date}
                        </div>
                      </div>

                      {/* CONTEXT ROW */}
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-[#F9F9FB] flex items-center justify-center border border-gray-100 shrink-0">
                             <session.icon size={16} strokeWidth={2.5} className="text-gray-800" />
                          </div>
                          <span className="text-lg italic text-zinc-300 font-medium">"{session.context}"</span>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                          {session.description}
                        </p>
                      </div>

                      {/* ARTWORKS ROW */}
                      <div className="flex gap-2 pt-2">
                        {session.songs.slice(0, 4).map((s, i) => (
                           <img key={i} src={s.artwork} alt="cover" className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover bg-zinc-800" />
                        ))}
                        {session.songs.length > 4 && (
                           <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700 text-xs text-zinc-400 font-semibold">
                             +{session.songs.length - 4}
                           </div>
                        )}
                      </div>
                    </div>

                    {/* RIGHT SIDE ACTIONS & STATS */}
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4">
                       <div className="flex gap-2 shrink-0 order-2 md:order-1">
                          <button onClick={(e) => handlePlaySessionClick(e, session)} className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-violet-600 to-pink-500 text-white hover:opacity-90 transition-opacity">
                            {playingSongId && songs.some(s => s.id === playingSongId) && isPlaying && songs === session.songs ? (
                              <Pause className="w-3.5 h-3.5 fill-white" />
                            ) : (
                              <Play className="w-3.5 h-3.5 fill-white" />
                            )}
                            Play Again
                          </button>
                          <button onClick={(e) => handleDelete(e, session.id)} className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-500 hover:border-red-500/30 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                       </div>
                       
                       <div className="flex gap-6 md:gap-8 text-right order-1 md:order-2 md:mt-10">
                          <div>
                            <p className="text-[10px] font-bold text-zinc-600 tracking-wider mb-1">DURATION</p>
                            <p className="text-sm text-zinc-300 font-mono">{session.duration}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-zinc-600 tracking-wider mb-1">TRACKS</p>
                            <p className="text-sm text-zinc-300 font-mono">{session.trackCount}</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* EXPANDABLE SONG LIST */}
                  <AnimatePresence>
                    {expandedId === session.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="border-t border-zinc-800 overflow-hidden"
                      >
                         <div className="pt-6 space-y-2">
                           {session.songs.map((song) => (
                             <div 
                               key={song.id} 
                               onClick={(e) => { e.stopPropagation(); setPlayingSongId(song.id); }}
                               className={`flex items-center gap-4 p-2.5 rounded-xl transition-colors ${
                                  playingSongId === song.id ? 'bg-violet-500/10 border-l-2 border-violet-500' : 'hover:bg-zinc-800/50 border-l-2 border-transparent'
                               }`}
                             >
                                <img src={song.artwork} className="w-10 h-10 rounded object-cover bg-zinc-800" alt="song cover" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-zinc-200">{song.title}</p>
                                  <p className="text-xs text-zinc-500">{song.artist}</p>
                                </div>
                                <div className="text-xs font-mono text-zinc-600 mr-4">
                                  {song.duration}
                                </div>
                                <PlayerHeartButton song={song} onToast={showToast} />
                                <button className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-violet-600 flex items-center justify-center transition-colors shrink-0 ml-2" onClick={(e) => { e.stopPropagation(); playSong(song, session.songs); }}>
                                  {playingSongId === song.id && isPlaying ? <Pause className="w-3.5 h-3.5 text-white" /> : <PlayIcon className="w-3.5 h-3.5 text-white ml-0.5" />}
                                </button>
                             </div>
                           ))}
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

      </div>

      {/* GLOBAL MUSIC PLAYER BAR */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-zinc-900 border-t border-zinc-800/80 shadow-[0_-10px_30px_rgba(0,0,0,0.4)] px-4 md:px-8 flex items-center justify-between z-50 backdrop-blur-md bg-opacity-90">
        <div className="flex items-center gap-4 w-1/3">
          <div className="w-12 h-12 bg-zinc-800 rounded-lg overflow-hidden relative group">
            {playingSongId && songs.length ? (
              <img src={songs.find(s => s.id === playingSongId)?.artwork || 'https://picsum.photos/seed/101/100/100'} alt="Playing track" className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                 <Music4 className="w-5 h-5 text-zinc-600" />
               </div>
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
            </div>
          </div>
          <div className="hidden sm:block">
            <h4 className="text-sm font-semibold text-white truncate w-40">{playingSongId && songs.length ? songs.find(s => s.id === playingSongId)?.title : 'No track playing'}</h4>
            <p className="text-xs text-zinc-400 truncate mt-0.5">{playingSongId && songs.length ? songs.find(s => s.id === playingSongId)?.artist : 'Select a track to play'}</p>
          </div>
          {playingSongId && songs.length > 0 && (
            <PlayerHeartButton 
              song={songs.find(s => s.id === playingSongId)} 
              onToast={showToast} 
            />
          )}
        </div>

        <div className="flex flex-col items-center justify-center w-1/3 space-y-2">
          <div className="flex items-center gap-6">
             <button onClick={playPrevious} className="text-zinc-400 hover:text-white transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
             </button>
             <button onClick={togglePlayPause} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform">
               {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 border-black fill-current" />}
             </button>
             <button onClick={playNext} className="text-zinc-400 hover:text-white transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
             </button>
          </div>
          <div className="hidden md:flex items-center w-full max-w-md gap-3">
            <span className="text-xs text-zinc-500 font-mono">{formatTime(currentTime)}</span>
            <div className="h-1 flex-1 bg-zinc-800 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
              if (audioRef.current && duration) {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                audioRef.current.currentTime = pos * duration;
              }
            }}>
               <div className="h-full bg-violet-500 rounded-full transition-all duration-75" style={{ width: `${progress || 0}%` }}></div>
            </div>
            <span className="text-xs text-zinc-500 font-mono">{formatTime(duration)}</span>
          </div>
        </div>
        
        <div className="w-1/3 flex justify-end gap-3 text-zinc-400 hidden sm:flex">
             <button className="hover:text-white transition-colors">
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
               className="w-24 h-1 mt-2.5 accent-zinc-500 bg-zinc-800 rounded-full cursor-pointer" 
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

export default MusicHistory;
