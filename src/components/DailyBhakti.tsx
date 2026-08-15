'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Music, Play } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { songs, Song } from '@/data/songs';
import { usePlayer } from '@/context/PlayerContext';

export default function DailyBhakti() {
  const { playSong } = usePlayer();
  
  const mantra = songs.find(s => s.category === 'mantra');
  const aarti = songs.find(s => s.category === 'aarti');
  const bhajan = songs.find(s => s.category === 'bhajan');
  
  const cards = [
    { type: 'Mantra', song: mantra, icon: Sparkles },
    { type: 'Aarti', song: aarti, icon: Flame },
    { type: 'Bhajan', song: bhajan, icon: Music },
  ].filter(c => c.song);
  
  return (
    <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
      <SectionHeader title="Today's Bhakti" hindiTitle="आज की भक्ति" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {cards.map((card, idx) => (
          <motion.div
            key={card.type}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-start"
          >
            <card.icon className="text-saffron-500 w-6 h-6 mb-4" />
            <span className="text-saffron-500 text-sm font-semibold uppercase tracking-wider">{card.type}</span>
            <h3 className="text-cream text-xl font-heading mt-2">{card.song?.title}</h3>
            <p className="text-cream/60 text-sm mt-1">{card.song?.artist}</p>
            <button 
              onClick={() => card.song && playSong(card.song)}
              className="mt-4 bg-saffron-500/20 hover:bg-saffron-500 text-saffron-500 hover:text-white rounded-full p-2 transition-colors"
            >
              <Play className="w-5 h-5 ml-0.5" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <span className="text-gold text-6xl font-heading opacity-50 block leading-none">❝</span>
        <p className="font-noto-devanagari text-2xl md:text-3xl text-cream/80 italic max-w-3xl mx-auto leading-relaxed mt-4">
          मन शांत हो तो हर क्षण में ईश्वर का अनुभव होता है।
        </p>
        <span className="text-gold text-6xl font-heading opacity-50 block leading-none mt-4">❞</span>
      </div>

      <div className="mt-12 flex justify-center">
        <button 
          onClick={() => {
            const validSongs = cards.map(c => c.song).filter((s): s is Song => s !== undefined);
            if (validSongs.length > 0) playSong(validSongs[0]);
          }}
          className="bg-saffron-500 hover:bg-saffron-600 text-charcoal-dark rounded-full px-8 py-4 font-semibold flex items-center gap-2 transition-colors"
        >
          <Play className="w-5 h-5 fill-current" />
          Play Today's Bhakti
        </button>
      </div>
    </section>
  );
}
