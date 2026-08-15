'use client'

import React, { use, useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Play, Type } from 'lucide-react';
import Footer from '@/components/Footer';
import { songs } from '@/data/songs';
import { usePlayer } from '@/context/PlayerContext';

export default function SongPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const song = songs.find(s => s.id === resolvedParams.id);
  const { playSong } = usePlayer();
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  
  if (!song) {
    notFound();
  }

  const hasLyrics = song.lyrics || song.lyricsHindi;

  return (
    <>
      <div className="pt-24 pb-12 px-6 bg-gradient-to-b from-charcoal-dark via-maroon-900/30 to-charcoal-dark">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          <div className="relative w-48 md:w-64 aspect-square rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
            <Image 
              src={song.artwork || '/images/krishna.jpg'} 
              alt={song.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 pt-2 md:pt-8">
            <p className="text-saffron-500 font-semibold tracking-wider uppercase text-sm mb-2">{song.category}</p>
            <h1 className="text-3xl md:text-5xl font-heading text-cream mb-4">{song.title}</h1>
            <p className="text-cream/80 text-lg mb-2">{song.artist}</p>
            {song.deity && <p className="text-cream/50 mb-6">Deity: {song.deity}</p>}
            
            <button 
              onClick={() => playSong(song)}
              className="bg-saffron-500 hover:bg-saffron-600 text-charcoal-dark rounded-full px-8 py-3 font-semibold flex items-center gap-2 transition-colors mx-auto md:mx-0"
            >
              <Play className="w-5 h-5 fill-current" />
              Play
            </button>
          </div>
        </div>
      </div>
      
      {hasLyrics && (
        <section className="py-12 px-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <h2 className="text-2xl font-heading text-cream">Lyrics</h2>
            <button 
              onClick={() => setFontSize(prev => prev === 'normal' ? 'large' : 'normal')}
              className="p-2 rounded-full hover:bg-white/5 text-cream/70 hover:text-cream transition-colors"
              title="Toggle Font Size"
            >
              <Type className="w-5 h-5" />
            </button>
          </div>
          
          <div className={`space-y-12 transition-all ${fontSize === 'large' ? 'text-2xl leading-loose' : 'text-lg leading-relaxed'}`}>
            {song.lyricsHindi && (
              <div>
                <h3 className="text-saffron-500 font-semibold mb-6">Hindi</h3>
                <div className="font-noto-devanagari text-cream/90 whitespace-pre-wrap">
                  {song.lyricsHindi}
                </div>
              </div>
            )}
            
            {song.lyrics && (
              <div>
                <h3 className="text-saffron-500 font-semibold mb-6">English</h3>
                <div className="text-cream/80 whitespace-pre-wrap">
                  {song.lyrics}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      
      <Footer />
    </>
  );
}
