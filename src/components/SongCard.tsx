'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, MoreHorizontal } from 'lucide-react';
import { Song } from '@/types';
import { usePlayer } from '@/context/PlayerContext';

interface SongCardProps {
  song: Song;
  index?: number;
  showArtwork?: boolean;
}

export default function SongCard({ song, index, showArtwork = true }: SongCardProps) {
  const { playSong, currentSong, isPlaying } = usePlayer();
  const isActive = currentSong?.id === song.id;

  const handlePlay = () => {
    playSong(song);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`group flex items-center gap-4 p-3 rounded-xl transition-colors duration-300 ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}
      role="button"
      onClick={handlePlay}
    >
      {index !== undefined && (
        <span className="text-cream/30 w-6 text-right font-mono text-sm hidden sm:block">
          {index + 1}
        </span>
      )}

      {showArtwork && (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-charcoal">
          <Image
            src={song.artwork}
            alt={song.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            {isActive && isPlaying ? (
              <div className="flex gap-1 items-center h-4">
                <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-saffron-500 rounded-full" />
                <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1 bg-saffron-500 rounded-full" />
                <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1 bg-saffron-500 rounded-full" />
              </div>
            ) : (
              <Play className="w-5 h-5 text-white" fill="currentColor" />
            )}
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <h4 className={`font-medium truncate ${isActive ? 'text-saffron-500' : 'text-cream'}`}>
          {song.title}
        </h4>
        <p className="text-cream/60 text-sm truncate">{song.artist}</p>
      </div>

      <div className="flex items-center gap-4 pl-2">
        <span className="text-cream/40 font-mono text-sm hidden sm:block">{song.duration}</span>
        
        <button 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-saffron-500/0 text-cream/0 group-hover:bg-saffron-500/20 group-hover:text-saffron-500 transition-all hover:!bg-saffron-500 hover:!text-charcoal-dark md:opacity-0 md:group-hover:opacity-100"
          onClick={(e) => { e.stopPropagation(); handlePlay(); }}
        >
          <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
        </button>

        <button 
          className="text-cream/40 hover:text-cream transition-colors p-2 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
