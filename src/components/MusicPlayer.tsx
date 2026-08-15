'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';

export default function MusicPlayer() {
  const {
    currentSong, isPlaying, progress, currentTime, duration,
    volume, pause, resume, nextSong, prevSong,
    setVolume, seekTo,
  } = usePlayer();

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const songTitle = currentSong?.title || 'Tuning in…';
  const songArtist = currentSong?.artist || 'BhaktiDhara radio';
  const artwork = currentSong?.artwork || '/images/krishna.jpg';
  const progressPercent = progress || 0;

  const [imgSrc, setImgSrc] = useState<string>(artwork);

  useEffect(() => {
    setImgSrc(artwork);
  }, [artwork]);

  return (
    <div className="bhakti-player-fixed pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="pointer-events-auto">
        <div className="relative z-30 mx-auto mb-[max(0.75rem,env(safe-area-inset-bottom))] w-full max-w-xl px-3 sm:mb-10">
          {/* Player pill — 100% solid & non-transparent */}
          <div className="mb-2 flex items-center gap-2 rounded-2xl bg-[#1a1412] opacity-100 border border-cream/20 shadow-[0_16px_50px_rgba(0,0,0,0.95)] p-2 pr-3 sm:gap-4 sm:rounded-full sm:p-3 sm:pr-5">
            {/* Album art */}
            <div className="relative size-12 shrink-0 rounded-xl overflow-hidden sm:size-14 sm:rounded-full bg-saffron/20 border border-cream/10">
              <Image
                src={imgSrc || '/images/krishna.jpg'}
                alt={songTitle}
                fill
                className="object-cover"
                onError={() => setImgSrc('/images/krishna.jpg')}
                unoptimized={typeof imgSrc === 'string' && imgSrc.startsWith('http')}
              />
            </div>

            {/* Song info + seek */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-cream sm:text-sm leading-tight">{songTitle}</p>
              <p className="truncate text-[0.65rem] text-cream/60 mt-0.5">{songArtist}</p>
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
                <span className="shrink-0 font-mono text-[0.6rem] text-cream/60 tabular-nums hidden sm:inline">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Transport controls */}
            <div className="flex shrink-0 items-center gap-0.5 sm:gap-2">
              <button type="button" aria-label="Previous track" className="bhakti-icon-btn !p-2.5" onClick={prevSong}>
                <SkipBack className="size-4" />
              </button>
              <button
                type="button"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="bhakti-play-btn !w-10 !h-10 sm:!w-11 sm:!h-11"
                onClick={() => isPlaying ? pause() : resume()}
              >
                {isPlaying ? <Pause className="size-4 sm:size-5" /> : <Play className="size-4 sm:size-5 ml-0.5" />}
              </button>
              <button type="button" aria-label="Next track" className="bhakti-icon-btn !p-2.5" onClick={nextSong}>
                <SkipForward className="size-4" />
              </button>
            </div>

            {/* Volume (desktop only) */}
            <div className="relative hidden sm:flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                aria-label={volume === 0 ? 'Unmute' : 'Mute'}
                className="bhakti-icon-btn"
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
                className="bhakti-range h-1 w-16"
                style={{ '--progress': `${volume * 100}%` } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Tagline */}
          <p className="block text-center text-[0.6rem] text-cream/40 sm:text-xs sm:text-cream/50">
            भक्तिधारा · Where every note becomes devotion
          </p>
        </div>
      </div>
    </div>
  );
}
