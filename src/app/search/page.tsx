'use client'

import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import SongCard from '@/components/SongCard';
import ArtistCard from '@/components/ArtistCard';
import DeityCard from '@/components/DeityCard';
import PlaylistCard from '@/components/PlaylistCard';
import Footer from '@/components/Footer';
import { songs } from '@/data/songs';
import { artists } from '@/data/artists';
import { deities } from '@/data/deities';
import { playlists } from '@/data/playlists';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.toLowerCase());
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredSongs = debouncedQuery ? songs.filter(s => 
    s.title.toLowerCase().includes(debouncedQuery) || 
    (typeof s.artist === 'string' && s.artist.toLowerCase().includes(debouncedQuery))
  ) : [];

  const filteredArtists = debouncedQuery ? artists.filter(a => 
    a.name.toLowerCase().includes(debouncedQuery)
  ) : [];

  const filteredDeities = debouncedQuery ? deities.filter(d => 
    d.name.toLowerCase().includes(debouncedQuery) || 
    d.nameHindi.includes(debouncedQuery)
  ) : [];

  const filteredPlaylists = debouncedQuery ? playlists.filter(p => 
    p.title.toLowerCase().includes(debouncedQuery)
  ) : [];

  const hasResults = filteredSongs.length > 0 || filteredArtists.length > 0 || filteredDeities.length > 0 || filteredPlaylists.length > 0;

  return (
    <>
      <div className="pt-24 pb-12 px-6 bg-gradient-to-b from-charcoal-dark via-charcoal-dark to-charcoal-dark border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-cream/50" />
            <input 
              type="text"
              placeholder="Search bhajans, artists, deities..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-16 pr-6 text-xl text-cream placeholder:text-cream/30 focus:outline-none focus:border-saffron-500 transition-colors"
              autoFocus
            />
          </div>
        </div>
      </div>
      
      <section className="py-12 px-6 max-w-7xl mx-auto min-h-[50vh]">
        {!debouncedQuery ? (
          <div className="text-center py-20 text-cream/50">
            <SearchIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-xl">Search for your favorite devotional music</p>
          </div>
        ) : !hasResults ? (
          <div className="text-center py-20 text-cream/50">
            <p className="text-xl">No results found for "{query}"</p>
          </div>
        ) : (
          <div className="space-y-16">
            {filteredSongs.length > 0 && (
              <div>
                <h2 className="text-2xl font-heading text-cream mb-6">Songs</h2>
                <div className="space-y-2">
                  {filteredSongs.slice(0, 10).map((song, i) => (
                    <SongCard key={song.id} song={song} index={i} />
                  ))}
                </div>
              </div>
            )}

            {filteredArtists.length > 0 && (
              <div>
                <h2 className="text-2xl font-heading text-cream mb-6">Artists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                  {filteredArtists.slice(0, 6).map((artist, i) => (
                    <ArtistCard key={artist.id} artist={artist} index={i} />
                  ))}
                </div>
              </div>
            )}

            {filteredDeities.length > 0 && (
              <div>
                <h2 className="text-2xl font-heading text-cream mb-6">Deities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredDeities.slice(0, 5).map((deity, i) => (
                    <DeityCard key={deity.id} deity={deity} index={i} />
                  ))}
                </div>
              </div>
            )}

            {filteredPlaylists.length > 0 && (
              <div>
                <h2 className="text-2xl font-heading text-cream mb-6">Playlists</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredPlaylists.slice(0, 4).map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
