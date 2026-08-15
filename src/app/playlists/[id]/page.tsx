'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPlaylist } from '@/data/bhaktiPlaylists';
import { usePlayer } from '@/context/PlayerContext';

export default function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const playlist = getPlaylist(id);
  const { playSong, currentSong, isPlaying, setQueue, playPlaylist } = usePlayer();

  if (!playlist) {
    notFound();
  }

  const handlePlaySong = (index: number) => {
    playPlaylist(playlist.songs, index);
  };

  const handlePlayAll = () => {
    playPlaylist(playlist.songs, 0);
  };

  // Calculate total duration
  const totalMinutes = playlist.songs.reduce((acc, song) => {
    const parts = song.duration.split(':');
    return acc + parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }, 0);
  const totalHours = Math.floor(totalMinutes / 3600);
  const totalMins = Math.floor((totalMinutes % 3600) / 60);

  return (
    <main className="relative w-full min-h-screen bg-shade">
      {/* Top Nav */}
      <header className="sticky top-0 z-30 bg-shade/80 backdrop-blur-sm border-b border-cream/10">
        <div className="mx-auto max-w-3xl flex items-center gap-2 px-5 py-3 sm:px-8">
          <Link href="/" className="bhakti-chip">← Radio</Link>
          <Link href="/playlists" className="bhakti-chip">Playlists</Link>
          <span className="flex-1" />
          <a href={playlist.sourceUrl} target="_blank" rel="noreferrer noopener" className="bhakti-chip">
            {playlist.source === 'spotify' ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 text-[#1ED760]">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.12-.899-.48-.12-.421.12-.78.479-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.362 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 text-[#FF0033]">
                <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
              </svg>
            )}
            <span className="hidden sm:inline">{playlist.source === 'spotify' ? 'Spotify' : 'YT Music'}</span>
          </a>
        </div>
      </header>

      {/* Playlist Info */}
      <div className="mx-auto max-w-3xl px-5 pt-10 pb-6 sm:px-8">
        <p className="font-mono text-[0.65rem] tracking-[0.28em] uppercase text-sand/60">
          {playlist.songCount} songs · {totalHours > 0 ? `${totalHours}h ` : ''}{totalMins} min
        </p>
        <h1 className="mt-2 font-display text-5xl font-bold leading-[0.9] text-cream sm:text-6xl lg:text-7xl">
          {playlist.titleHindi}
        </h1>
        <p className="mt-3 font-mono text-xs tracking-[0.3em] uppercase text-sand/70">
          {playlist.title}
        </p>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-sand/80">
          {playlist.description}
        </p>

        {/* Play All button */}
        <button
          onClick={handlePlayAll}
          className="mt-6 bhakti-play-btn !w-auto !h-auto px-6 py-2.5 flex items-center gap-2 text-sm font-semibold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
          </svg>
          Play All
        </button>
      </div>

      {/* Song List */}
      <div className="mx-auto max-w-3xl px-5 pb-48 sm:px-8">
        {playlist.songs.map((song, index) => {
          const isActive = currentSong?.id === song.id;
          return (
            <button
              key={song.id}
              onClick={() => handlePlaySong(index)}
              className={`w-full flex items-center gap-4 py-4 px-2 border-t border-cream/5 text-left transition-colors hover:bg-cream/5 group ${isActive ? 'bg-cream/5' : ''}`}
            >
              {/* Number */}
              <span className={`w-8 text-right font-mono text-sm tabular-nums shrink-0 ${isActive && isPlaying ? 'text-saffron' : 'text-sand/40'}`}>
                {isActive && isPlaying ? (
                  <span className="flex justify-end items-center gap-[2px]">
                    <span className="w-[3px] h-3 bg-saffron rounded-full animate-pulse" />
                    <span className="w-[3px] h-4 bg-saffron rounded-full animate-pulse [animation-delay:150ms]" />
                    <span className="w-[3px] h-2 bg-saffron rounded-full animate-pulse [animation-delay:300ms]" />
                  </span>
                ) : (
                  String(index + 1).padStart(3, '0')
                )}
              </span>

              {/* Song Info */}
              <div className="flex-1 min-w-0">
                <p className={`font-display text-base font-bold leading-tight truncate ${isActive ? 'text-saffron' : 'text-cream'}`}>
                  {song.titleHindi || song.title}
                </p>
                <p className="text-xs text-sand/60 truncate mt-0.5">
                  {song.title}{song.deity ? ` · ${song.deity}` : ''}
                </p>
              </div>

              {/* Artist + Duration */}
              <div className="hidden sm:block text-right shrink-0">
                <p className="text-sm text-sand/80">{song.artist}</p>
                <p className="text-xs text-sand/40 font-mono mt-0.5">{song.duration}</p>
              </div>
            </button>
          );
        })}
      </div>
    </main>
  );
}
