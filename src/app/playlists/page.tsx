'use client';

import Link from 'next/link';
import { bhaktiPlaylists } from '@/data/bhaktiPlaylists';

export default function PlaylistsPage() {
  return (
    <main className="relative w-full min-h-screen bg-shade">
      {/* Top Nav */}
      <header className="sticky top-0 z-30 bg-shade/80 backdrop-blur-sm border-b border-cream/10">
        <div className="mx-auto max-w-3xl flex items-center gap-2 px-5 py-3 sm:px-8">
          <Link href="/" className="bhakti-chip">← Radio</Link>
          <span className="bhakti-chip bg-cream/15 border-cream/20 text-cream">Playlists</span>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-5 pt-10 pb-48 sm:px-8">
        <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl">
          प्लेलिस्ट
        </h1>
        <p className="mt-2 font-mono text-xs tracking-[0.3em] uppercase text-sand/70">
          Playlists · {bhaktiPlaylists.length} collections
        </p>

        <div className="mt-10 space-y-4">
          {bhaktiPlaylists.map((playlist) => (
            <Link
              key={playlist.id}
              href={`/playlists/${playlist.id}`}
              className="block bhakti-glass rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:border-cream/20 hover:bg-cream/5 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-2xl font-bold text-cream group-hover:text-saffron transition-colors sm:text-3xl">
                    {playlist.titleHindi}
                  </h2>
                  <p className="mt-1 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-sand/60">
                    {playlist.title}
                  </p>
                  <p className="mt-3 text-sm text-sand/70 leading-relaxed line-clamp-2">
                    {playlist.description}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-sand/50">
                    <span>{playlist.songCount} songs</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      {playlist.source === 'spotify' ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 text-[#1ED760]"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.12-.899-.48-.12-.421.12-.78.479-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.362 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 text-[#FF0033]"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"/></svg>
                      )}
                      {playlist.source === 'spotify' ? 'Spotify' : 'YT Music'}
                    </span>
                  </div>
                </div>
                {/* Arrow */}
                <span className="text-cream/30 group-hover:text-cream/60 transition-colors text-xl mt-1 shrink-0">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
