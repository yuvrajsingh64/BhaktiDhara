'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Library, Music } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  
  const tabs = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Library', href: '/playlists', icon: Library },
    { name: 'Player', href: '/bhajans', icon: Music },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-charcoal-dark/95 backdrop-blur-xl border-t border-white/10 h-16 pb-[env(safe-area-inset-bottom)]">
      <div className="flex flex-row h-full">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link 
              key={tab.name} 
              href={tab.href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 ${isActive ? 'text-saffron-500' : 'text-cream/50'}`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
