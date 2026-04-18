import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const PlayerHeartButton = ({ song, onToast }) => {
  const [isFavourited, setIsFavourited] = useState(false);

  useEffect(() => {
    if (!song) return;

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
  }, [song]);

  const handleFavouriteToggle = async () => {
    if (!song) return;

    try {
      if (isFavourited) {
        const res = await fetch('http://127.0.0.1:8000/api/favourites/remove/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: song.title, artist: song.artist })
        });
        
        if (res.ok) {
          setIsFavourited(false);
          if (onToast) onToast("Removed from Favourites");
        }
      } else {
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

  if (!song) return null;

  return (
    <motion.button
      whileTap={{ scale: [1, 1.4, 1] }}
      transition={{ duration: 0.3 }}
      onClick={handleFavouriteToggle}
      className={`ml-4 shrink-0 flex items-center justify-center w-8 h-8 transition-colors ${
        isFavourited 
          ? 'text-pink-500 bg-pink-500/10 rounded-full' 
          : 'text-zinc-600 hover:text-zinc-300'
      }`}
    >
      <Heart size={18} fill={isFavourited ? "currentColor" : "none"} strokeWidth={isFavourited ? 0 : 2} />
    </motion.button>
  );
};

export default PlayerHeartButton;
