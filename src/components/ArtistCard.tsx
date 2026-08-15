'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Artist } from '@/types';

interface ArtistCardProps {
  artist: Artist;
  index?: number;
}

export default function ArtistCard({ artist, index = 0 }: ArtistCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center group"
    >
      <Link href={`/artists/${artist.id}`} className="flex flex-col items-center">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 transition-all duration-300 group-hover:ring-2 group-hover:ring-gold group-hover:scale-105 shadow-xl bg-charcoal">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover"
          />
        </div>
        
        <h3 className="text-cream font-heading text-lg font-medium mb-1 transition-colors group-hover:text-gold">
          {artist.name}
        </h3>
        <p className="text-cream/50 text-sm mb-3">{artist.songCount} Songs</p>
        
        <div className="flex items-center gap-1 text-xs font-medium text-saffron-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
          <span>View Artist</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </Link>
    </motion.div>
  );
}
