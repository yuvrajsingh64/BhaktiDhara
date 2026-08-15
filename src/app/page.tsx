'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MusicPlayer from '@/components/MusicPlayer';

export default function HomePage() {
  // Simulate live listener count
  const [listeners, setListeners] = useState(0);
  useEffect(() => {
    setListeners(Math.floor(Math.random() * 30) + 15);
    const interval = setInterval(() => {
      setListeners(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(8, prev + delta);
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative w-full bg-shade">
      {/* Fixed Background */}
      <div className="fixed inset-0">
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/temple-backdrop.jpg" />
          <img
            src="/images/temple-backdrop-mobile.jpg"
            alt="Illustration of an Indian temple at dawn with warm golden light, oil lamps, and devotees"
            width="1920"
            height="1088"
            className="absolute inset-0 size-full object-cover"
          />
        </picture>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bhakti-vignette" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bhakti-grain" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-[100dvh] flex-col">
        {/* Header */}
        <header className="relative z-20 flex items-center justify-between gap-3 px-4 pt-4 text-sand sm:px-8 sm:pt-6">
          {/* Left spacer */}
          <span className="min-w-[4.5rem] font-mono text-xs tracking-[0.2em] uppercase sm:text-sm" />
          
          {/* Live count */}
          <span className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-live opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-live" />
            </span>
            <span className="font-semibold tabular-nums">{listeners}</span>
            <span className="text-sand/70">listening</span>
          </span>

          {/* Nav chips — 2 playlists */}
          <nav className="flex flex-col items-end gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <Link href="/playlists/hindi-bhakti" className="bhakti-chip">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 text-[#FF0033]">
                  <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
                </svg>
                <span className="hidden sm:inline">Hindi Bhakti</span>
              </Link>
              <Link href="/playlists/bhojpuri-bhakti" className="bhakti-chip">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 text-[#FF0033]">
                  <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
                </svg>
                <span className="hidden sm:inline">Bhojpuri Bhakti</span>
              </Link>
              <Link href="/playlists" className="bhakti-chip">All</Link>
            </div>
          </nav>
        </header>

        {/* Centered Title */}
        <div className="relative z-10 flex flex-col items-center px-6 pt-10 text-center sm:pt-14">
          <h1 className="font-display text-6xl leading-[0.9] font-bold text-cream drop-shadow-[0_6px_24px_oklch(0.18_0.06_28_/_0.65)] sm:text-8xl lg:text-9xl">
            <span className="block">भक्ति</span>
            <span className="block">धारा</span>
          </h1>
          <p className="mt-3 font-mono text-[0.6rem] tracking-[0.45em] text-cream/70 uppercase sm:text-xs">
            BhaktiDhara · हर स्वर में भक्ति
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* WhatsApp CTA */}
        <div className="mb-[10.5rem] sm:mb-[11rem]">
          <a
            href="#"
            className="group relative z-20 mx-auto mb-4 block w-full max-w-md px-4"
          >
            <div className="bhakti-glass flex items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-cream transition-all duration-200 hover:border-[#25D366]/60">
              <span className="absolute left-0 top-0 h-full w-1 bg-[#25D366]" aria-hidden="true" />
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366] shadow-[0_6px_20px_-6px_rgba(37,211,102,0.5)] transition-transform duration-200 group-hover:scale-105">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.67-.51-.173 0-.372-.025-.571-.025-.198 0-.522.074-.796.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.134 1.585 5.929L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-bold text-cream">Get daily bhajans & spiritual updates 🙏</p>
                <p className="truncate text-[0.7rem] text-cream/80">Join the BhaktiDhara community — daily mantras, playlists & devotional drops.</p>
              </div>
              <span className="shrink-0 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white shadow-[0_4px_14px_-4px_rgba(37,211,102,0.45)] transition-all duration-200 group-hover:scale-105">Join Free</span>
            </div>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 border-t border-cream/10 bg-shade/80 px-5 pt-10 pb-40 text-sand backdrop-blur-sm sm:px-8">
        <div className="mx-auto w-full max-w-3xl">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-saffron/20 flex items-center justify-center text-saffron text-lg">🙏</div>
            <div>
              <p className="font-display text-2xl leading-none font-extrabold text-cream">भक्तिधारा</p>
              <p className="mt-1 font-mono text-[0.6rem] tracking-[0.3em] uppercase text-sand/70">BhaktiDhara</p>
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 max-w-md text-sm leading-relaxed text-sand/80">
            Bhajans, aartis & mantras, playing round the clock — the kind of music that never stops at a temple. Immerse yourself in devotion, anytime.
          </p>

          {/* Playlists */}
          <p className="mt-8 font-mono text-[0.65rem] tracking-[0.28em] uppercase text-sand/60">Playlists</p>
          <nav className="mt-3 grid grid-cols-1 gap-y-2 text-sm">
            <Link href="/playlists/hindi-bhakti" className="text-cream/90 underline-offset-4 transition-colors hover:text-cream hover:underline">
              Hindi Bhakti Songs · Devotional Songs
            </Link>
            <Link href="/playlists/bhojpuri-bhakti" className="text-cream/90 underline-offset-4 transition-colors hover:text-cream hover:underline">
              Bhojpuri Bhakti Songs
            </Link>
          </nav>

          {/* Nav chips */}
          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs">
            <Link href="/playlists" className="bhakti-chip">All Playlists</Link>
          </div>

          {/* Legal */}
          <div className="mt-8 space-y-3 text-xs leading-relaxed text-sand/55">
            <p>Audio plays through YouTube&apos;s embedded player. Nothing is hosted on this site, and all rights stay with the labels, composers and performers.</p>
            <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-sand/40">© 2026 bhaktidhara.in</p>
          </div>
        </div>
      </footer>

      {/* Floating Player */}
      <MusicPlayer />
    </main>
  );
}
