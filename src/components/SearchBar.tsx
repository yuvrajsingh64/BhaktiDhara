'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Music, User, Flame } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
// import { songs } from '@/data/songs';
// import { artists } from '@/data/artists';
// import { deities } from '@/data/deities';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Mock results for now
  const hasResults = debouncedQuery.length > 0;
  const mockSongs = hasResults ? [{ id: '1', title: 'Aigiri Nandini', artist: 'Rajalakshmee Sanjay', artwork: 'https://via.placeholder./150' }] : [];
  const mockArtists = hasResults ? [{ id: 'a1', name: 'Lata Mangeshkar', songCount: 50 }] : [];
  const mockDeities = hasResults ? [{ id: 'd1', name: 'Shiva', songCount: 120 }] : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-charcoal-dark/95 backdrop-blur-xl flex flex-col pt-10"
        >
          <div className="w-full max-w-4xl mx-auto px-4 flex flex-col h-full">
            <div className="relative flex items-center mb-8 shrink-0">
              <Search className="absolute left-4 w-6 h-6 text-gold/50" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bhajans, artists, deities..."
                className="w-full bg-transparent border-b border-gold/30 text-2xl text-cream px-14 py-4 focus:outline-none focus:border-gold/80 transition-colors placeholder:text-cream/30"
              />
              <button 
                onClick={onClose}
                className="absolute right-4 p-2 text-cream/50 hover:text-cream bg-white/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
              {debouncedQuery.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <Search className="w-16 h-16 text-gold mb-4" />
                  <p className="text-xl text-cream font-medium">What are you looking for?</p>
                  <p className="text-cream/60 mt-2">Find your favorite devotional music</p>
                </div>
              ) : !hasResults ? (
                <div className="text-center mt-20 text-cream/50">
                  No results found for "{debouncedQuery}"
                </div>
              ) : (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="space-y-10"
                >
                  {/* Songs */}
                  {mockSongs.length > 0 && (
                    <section>
                      <h3 className="text-gold font-heading text-xl mb-4 flex items-center gap-2">
                        <Music className="w-5 h-5" /> Songs
                      </h3>
                      <div className="grid gap-2">
                        {mockSongs.map(song => (
                          <div key={song.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer" onClick={onClose}>
                            <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-charcoal">
                              <Image src={song.artwork} alt={song.title} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="text-cream font-medium">{song.title}</p>
                              <p className="text-cream/60 text-sm">{song.artist}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Artists */}
                  {mockArtists.length > 0 && (
                    <section>
                      <h3 className="text-gold font-heading text-xl mb-4 flex items-center gap-2">
                        <User className="w-5 h-5" /> Artists
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {mockArtists.map(artist => (
                          <Link href={`/artists/${artist.id}`} key={artist.id} onClick={onClose} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-saffron-500/20 flex items-center justify-center">
                              <User className="w-6 h-6 text-saffron-500" />
                            </div>
                            <div>
                              <p className="text-cream font-medium">{artist.name}</p>
                              <p className="text-cream/50 text-xs">{artist.songCount} Songs</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Deities */}
                  {mockDeities.length > 0 && (
                    <section>
                      <h3 className="text-gold font-heading text-xl mb-4 flex items-center gap-2">
                        <Flame className="w-5 h-5" /> Deities
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {mockDeities.map(deity => (
                          <Link href={`/deities/${deity.id}`} key={deity.id} onClick={onClose} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-maroon/40 flex items-center justify-center">
                              <Flame className="w-6 h-6 text-gold" />
                            </div>
                            <div>
                              <p className="text-cream font-medium">{deity.name}</p>
                              <p className="text-cream/50 text-xs">{deity.songCount} Bhajans</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </section>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
