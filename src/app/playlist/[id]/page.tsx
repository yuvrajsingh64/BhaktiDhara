'use client'

import React, { use } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Play } from 'lucide-react';
import SongCard from '@/components/SongCard';
import Footer from '@/components/Footer';
import { playlists, getSongsForPlaylist } from '@/data/playlists';
import { usePlayer } from '@/context/PlayerContext';

export default function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const playlist = playlists.find(p => p.id === resolvedParams.id);
  const { playSong } = usePlayer();
  
  if (!playlist) {
    notFound();
  }

  const playlistSongs = getSongsForPlaylist(playlist.id);

  return (
    <>
      <div className="pt-24 pb-12 px-6 bg-gradient-to-b from-charcoal-dark via-saffron-900/20 to-charcoal-dark">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-start">
          <div className="relative w-full md:w-80 aspect-square rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
            <Image 
              src={playlist.artwork || '/images/krishna.jpg'} 
              alt={playlist.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 pt-4">
            <p className="text-saffron-500 font-semibold tracking-wider uppercase text-sm mb-2">Playlist</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-cream mb-4">{playlist.title}</h1>
            <p className="text-cream/70 text-lg mb-6 max-w-2xl">{playlist.subtitle}</p>
            <div className="flex items-center gap-4 text-cream/50 text-sm mb-8">
              <span>{playlistSongs.length} Songs</span>
              <span>•</span>
              <span>{playlist.duration}</span>
            </div>
            
            <button 
              onClick={() => playlistSongs.length > 0 && playSong(playlistSongs[0])}
              className="bg-saffron-500 hover:bg-saffron-600 text-charcoal-dark rounded-full px-8 py-4 font-semibold flex items-center gap-2 transition-colors"
            >
              <Play className="w-5 h-5 fill-current" />
              Play All
            </button>
          </div>
        </div>
      </div>
      
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="space-y-2">
          {playlistSongs.length > 0 ? (
            playlistSongs.map((song, i) => (
              <SongCard key={song.id} song={song} index={i} />
            ))
          ) : (
            <p className="text-cream/50 text-center py-12">No songs available in this playlist yet.</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
