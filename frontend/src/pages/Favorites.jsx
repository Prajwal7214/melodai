import React, { useState, useEffect, useRef } from 'react';
import { Heart, Play, Pause, Music4, Disc3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SongCard from '../components/SongCard';
import PlayerHeartButton from '../components/PlayerHeartButton';

const SORT_OPTIONS = ['Recently Added', 'By Mood', 'By Artist'];

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('Recently Added');
  
  const [queue, setQueue] = useState([]);
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
    fetchFavorites();
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://127.0.0.1:8000/api/favourites/');
      const data = await res.json();
      setFavorites(data.favourites || []);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  const getSortedFavorites = () => {
    const list = [...favorites];
    if (sortOption === 'By Mood') {
      list.sort((a, b) => (a.mood || '').localeCompare(b.mood || ''));
    } else if (sortOption === 'By Artist') {
      list.sort((a, b) => (a.artist || '').localeCompare(b.artist || ''));
    }
    // 'Recently Added' is default from backend (newest first)
    return list;
  };

  const sortedFavorites = getSortedFavorites();
  const activeSong = queue.find(s => s.id === playingSongId) || favorites.find(s => s.id === playingSongId);

  // Audio Player Logic
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const playSong = (song, forceQueue = null) => {
    const currentQueue = forceQueue || queue.length > 0 ? queue : sortedFavorites;
    if (queue.length === 0) setQueue(sortedFavorites);

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
      playNext(currentQueue, song.id);
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
    } else if (favorites.length > 0 && playingSongId) {
      playSong(favorites.find(s => s.id === playingSongId));
    }
  };

  const playNext = (currentQueue = queue, currentId = playingSongId) => {
    if (currentQueue.length === 0) return;
    const currentIndex = currentQueue.findIndex(s => s.id === currentId);
    if (currentIndex < currentQueue.length - 1) {
      playSong(currentQueue[currentIndex + 1], currentQueue);
    }
  };

  const playPrevious = () => {
    if (queue.length === 0) return;
    const currentIndex = queue.findIndex(s => s.id === playingSongId);
    if (currentIndex > 0) {
      playSong(queue[currentIndex - 1], queue);
    }
  };

  const handleRemove = (songId) => {
    setFavorites(prev => prev.filter(s => s.id !== songId));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-zinc-900 pt-32 pb-32 px-6 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#F9F9FB] rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
              <Heart size={28} strokeWidth={2.5} className="text-gray-800" />
            </div>
            <div>
              <span className="inline-block bg-pink-500/10 text-pink-600 rounded-full px-3 py-1 text-xs font-semibold tracking-wide mb-1">
                SAVED TRACKS
              </span>
              <h1 className="text-4xl md:text-5xl font-bold -tracking-[0.05em] text-zinc-900">Your Favourites</h1>
              <p className="font-instrument italic text-zinc-500 text-2xl mt-2">All the songs you have loved.</p>
            </div>
          </div>

          {!loading && favorites.length > 0 && (
            <div className="flex gap-4 text-right">
              <div>
                <p className="text-[10px] font-bold text-zinc-400 tracking-wider mb-1">SONGS SAVED</p>
                <p className="text-lg font-bold text-zinc-800">{favorites.length}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-400 tracking-wider mb-1">GENRES</p>
                <p className="text-lg font-bold text-zinc-800">
                  {new Set(favorites.map(f => f.genre).filter(Boolean)).size}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SORT OPTIONS */}
        {!loading && favorites.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => setSortOption(opt)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  sortOption === opt
                    ? 'bg-zinc-900 text-white border border-zinc-900'
                    : 'border border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-800 bg-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* GRID */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3 p-3 rounded-xl animate-pulse bg-white border border-zinc-100 shadow-sm">
                <div className="w-full aspect-square bg-zinc-100 rounded-lg"></div>
                <div className="flex-1 space-y-2 mt-2">
                  <div className="h-4 bg-zinc-100 rounded w-3/4"></div>
                  <div className="h-3 bg-zinc-100 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-center border border-dashed border-zinc-200 rounded-3xl bg-zinc-50 shadow-sm">
            <div className="w-20 h-20 bg-[#F9F9FB] rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 mb-6">
              <Heart size={36} strokeWidth={2.5} className="text-zinc-700" />
            </div>
            <h2 className="text-xl font-semibold text-zinc-800 mb-2">No favourites yet</h2>
            <p className="text-zinc-500 mb-6 font-medium">Heart any song while listening to save it here.</p>
            <a href="/generate" className="px-6 py-2.5 rounded-full font-semibold text-white bg-zinc-900 shadow-md hover:bg-black transition-all hover:scale-105">
              → Discover Songs
            </a>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {sortedFavorites.map((song) => (
                <SongCard 
                  key={song.id} 
                  song={song} 
                  isPlaying={playingSongId === song.id && isPlaying} 
                  onPlay={(s) => playSong(s, sortedFavorites)} 
                  onToast={showToast}
                  onRemove={handleRemove}
                  isFavoritePage={true}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      {/* GLOBAL MUSIC PLAYER BAR */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 border-t border-zinc-200 shadow-[0_-10px_40px_rgba(0,0,0,0.04)] px-4 md:px-8 flex items-center justify-between z-50 backdrop-blur-xl">
        <div className="flex items-center gap-4 w-1/3">
          <div className="w-12 h-12 bg-zinc-100 rounded-lg overflow-hidden relative group shadow-sm border border-zinc-200/50">
            {activeSong ? (
              <img src={activeSong.artwork || 'https://picsum.photos/seed/101/100/100'} alt="Playing track" className="w-full h-full object-cover" />
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
            <h4 className="text-sm font-bold tracking-tight text-zinc-900 truncate w-40">{activeSong ? activeSong.title : 'No track playing'}</h4>
            <p className="text-xs font-medium text-zinc-500 truncate mt-0.5">{activeSong ? activeSong.artist : 'Select a track to play'}</p>
          </div>
          {activeSong && (
            <PlayerHeartButton 
              song={activeSong} 
              onToast={showToast} 
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

export default Favorites;
