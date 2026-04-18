import React, { useState, useEffect } from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const SongCard = ({ 
  song, 
  isPlaying, 
  onPlay, 
  onToast, 
  onRemove,
  isFavoritePage = false 
}) => {
  const [isFavourited, setIsFavourited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check initial favourite state
    const checkFavourite = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/favourites/check/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: song.title, artist: song.artist })
        });
        const data = await res.json();
        setIsFavourited(data.is_favourite);
      } catch (err) {
        console.error("Error checking favourite:", err);
      }
    };
    checkFavourite();
  }, [song.title, song.artist]);

  const handleFavouriteToggle = async (e) => {
    e.stopPropagation(); // Prevent playing the song when clicking heart
    
    try {
      if (isFavourited) {
        // Remove from favourites
        const res = await fetch('http://127.0.0.1:8000/api/favourites/remove/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: song.title, artist: song.artist })
        });
        
        if (res.ok) {
          setIsFavourited(false);
          if (onToast) onToast("Removed from Favourites");
          if (onRemove) onRemove(song.id || `${song.title}-${song.artist}`);
        }
      } else {
        // Add to favourites
        const res = await fetch('http://127.0.0.1:8000/api/favourites/add/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ song })
        });
        
        if (res.ok) {
          setIsFavourited(true);
          if (onToast) onToast("❤️ Added to Favourites");
        }
      }
    } catch (err) {
      console.error("Error toggling favourite:", err);
    }
  };

  // On GenerateMusic it's a grid, on Favorites it's a grid.
  // Styles based on GenerateMusic.jsx and Favorites.jsx designs.
  return (
    <motion.div 
      layout
      initial={isFavoritePage ? { opacity: 0, scale: 0.9 } : false}
      animate={{ opacity: 1, scale: 1 }}
      exit={isFavoritePage ? { opacity: 0, scale: 0.9, transition: { duration: 0.2 } } : false}
      className={`bg-white border text-left flex flex-col shadow-sm rounded-xl p-3 transition-all cursor-pointer ${
        isPlaying ? 'border-violet-400 bg-violet-50/30' : 'border-zinc-200 hover:border-violet-300 hover:shadow-md'
      }`}
      onClick={() => onPlay(song)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-zinc-100">
        <img src={song.artwork || 'https://picsum.photos/seed/101/100/100'} alt={song.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
        
        <div className={`absolute inset-0 transition-all flex items-center justify-center ${isPlaying ? 'bg-black/30' : 'bg-black/20 opacity-0'} ${isHovered ? 'opacity-100' : ''}`}>
          <button className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
            {isPlaying ? <Pause className="w-4 h-4" fill="currentColor" /> : <Play className="w-4 h-4 ml-0.5" fill="currentColor" />}
          </button>
        </div>
      </div>
      
      <div className="flex items-start justify-between px-1 gap-2">
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <h3 className="font-bold tracking-tight text-sm text-zinc-900 truncate">{song.title}</h3>
          <p className="text-xs font-medium text-zinc-500 truncate">{song.artist}</p>
          
          {/* If on favorites page, optionally show genre/mood badge and added date */}
          {isFavoritePage && song.mood && (
            <div className="mt-1 flex items-center gap-1.5 flex-wrap">
               <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded">
                 {song.mood}
               </span>
               {song.genre && (
                 <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded">
                   {song.genre}
                 </span>
               )}
            </div>
          )}
          {isFavoritePage && song.added_at && (
             <p className="text-[10px] text-zinc-400 mt-1">{song.added_at.split(' ')[0]}</p>
          )}
        </div>
        
        {/* Heart Button */}
        <motion.button
          whileTap={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 0.3 }}
          onClick={handleFavouriteToggle}
          className={`shrink-0 flex items-center justify-center w-8 h-8 transition-colors ${
            isFavourited 
              ? 'text-pink-500 bg-pink-500/10 rounded-full' 
              : 'text-zinc-600 hover:text-zinc-300'
          }`}
        >
          <Heart size={18} fill={isFavourited ? "currentColor" : "none"} strokeWidth={isFavourited ? 0 : 2} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SongCard;
