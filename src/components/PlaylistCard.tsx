'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Playlist } from '@/types';

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/playlists/${playlist.id}`} className="block relative aspect-square rounded-xl overflow-hidden shadow-lg bg-charcoal mb-3">
        <Image
          src={playlist.artwork}
          alt={playlist.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-saffron-500 flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play fill="currentColor" className="w-6 h-6 text-charcoal-dark ml-1" />
          </div>
        </div>
      </Link>
      
      <div className="px-1">
        <h3 className="text-cream font-heading text-xl font-medium mb-1 truncate">{playlist.title}</h3>
        {playlist.subtitle && (
          <p className="text-cream/60 text-sm truncate mb-1">{playlist.subtitle}</p>
        )}
        <div className="flex items-center gap-2 text-cream/40 text-xs">
          <span>{playlist.songCount} tracks</span>
          <span>•</span>
          <span>{playlist.duration}</span>
        </div>
      </div>
    </motion.div>
  );
}
