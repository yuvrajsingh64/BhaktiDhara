'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { getAllPlaylistSongs } from '@/data/bhaktiPlaylists';

export default function MusicPlayer() {
  const {
    currentSong, isPlaying, progress, currentTime, duration,
    volume, playSong, pause, resume, nextSong, prevSong,
    setVolume, seekTo, togglePlay, playPlaylist
  } = usePlayer();

  // Auto-play first song on mount if nothing is playing
  useEffect(() => {
    if (!currentSong) {
      const allSongs = getAllPlaylistSongs();
      if (allSongs.length > 0) {
        playPlaylist(allSongs, 0);
      }
    }
  }, []);

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const songTitle = currentSong?.title || 'Tuning in…';
  const songArtist = currentSong?.artist || 'BhaktiDhara radio';
  const artwork = currentSong?.artwork || '/images/krishna.jpg';
  const progressPercent = progress || 0;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="pointer-events-auto">
        <div className="relative z-30 mx-auto mb-[max(1.25rem,env(safe-area-inset-bottom))] w-full max-w-xl px-3 sm:mb-10">
          {/* Player pill */}
          <div className="bhakti-glass mb-3 flex items-center gap-3 rounded-full p-2 pr-3 sm:gap-4 sm:p-3 sm:pr-5">
            {/* Album art */}
            <div className="relative size-12 shrink-0 rounded-full overflow-hidden sm:size-14">
              <Image src={artwork} alt="" fill className="object-cover" />
            </div>

            {/* Song info + seek */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-cream sm:text-base">{songTitle}</p>
              <p className="truncate text-xs text-cream/60">{songArtist}</p>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progressPercent}
                  onChange={(e) => seekTo(Number(e.target.value))}
                  aria-label="Seek"
                  className="bhakti-range h-1 w-full"
                  style={{ '--progress': `${progressPercent}%` } as React.CSSProperties}
                />
                <span className="shrink-0 font-mono text-[0.6rem] text-cream/60 tabular-nums">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Transport controls */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <button type="button" aria-label="Previous track" className="bhakti-icon-btn" onClick={prevSong}>
                <SkipBack className="size-4" />
              </button>
              <button
                type="button"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="bhakti-play-btn"
                onClick={() => isPlaying ? pause() : resume()}
              >
                {isPlaying ? <Pause className="size-5" /> : <Play className="size-5 ml-0.5" />}
              </button>
              <button type="button" aria-label="Next track" className="bhakti-icon-btn" onClick={nextSong}>
                <SkipForward className="size-4" />
              </button>
            </div>

            {/* Volume */}
            <div className="relative flex shrink-0 items-center gap-1 sm:gap-1.5">
              {/* Mobile: just the icon */}
              <button
                type="button"
                aria-label={volume === 0 ? 'Unmute' : 'Mute'}
                className="bhakti-icon-btn sm:hidden"
                onClick={() => setVolume(volume === 0 ? 0.8 : 0)}
              >
                {volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              </button>
              {/* Desktop: icon + slider */}
              <button
                type="button"
                aria-label={volume === 0 ? 'Unmute' : 'Mute'}
                className="bhakti-icon-btn hidden sm:inline-flex"
                onClick={() => setVolume(volume === 0 ? 0.8 : 0)}
              >
                {volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={volume * 100}
                onChange={(e) => setVolume(Number(e.target.value) / 100)}
                aria-label="Volume"
                className="bhakti-range hidden h-1 w-16 sm:block"
                style={{ '--progress': `${volume * 100}%` } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Contact link */}
          <p className="block text-center text-[0.65rem] text-cream/50 transition-colors sm:text-xs">
            भक्तिधारा · Where every note becomes devotion
          </p>
        </div>
      </div>
    </div>
  );
}
