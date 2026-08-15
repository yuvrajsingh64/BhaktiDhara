'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Deity } from '@/types';

interface DeityCardProps {
  deity: Deity;
  index?: number;
}

export default function DeityCard({ deity, index = 0 }: DeityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      className="group"
    >
      <Link href={`/deities?deity=${deity.id}`} className="block relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-charcoal">
        <Image
          src={deity.image}
          alt={deity.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal-dark/50 to-transparent opacity-80" />
        
        {/* Hover Border Glow */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold/30 transition-colors duration-500" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 rounded-full bg-saffron-500 flex items-center justify-center shadow-lg"
          >
            <Play fill="currentColor" className="w-8 h-8 text-charcoal-dark ml-1" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
          <h3 className="text-gold font-hindi text-2xl mb-1">{deity.nameHindi}</h3>
          <h2 className="text-cream font-heading text-3xl font-bold tracking-wide mb-2">{deity.name}</h2>
          <p className="text-cream/70 text-sm font-medium">{deity.songCount} Bhajans</p>
        </div>
      </Link>
    </motion.div>
  );
}
