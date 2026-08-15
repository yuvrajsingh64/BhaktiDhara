'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Menu, X } from 'lucide-react';
import SearchBar from '@/components/SearchBar';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Bhajans', href: '/bhajans' },
  { name: 'Aartis', href: '/aartis' },
  { name: 'Mantras', href: '/mantras' },
  { name: 'Artists', href: '/artists' },
  { name: 'Deities', href: '/deities' },
  { name: 'Playlists', href: '/playlists' },
  { name: 'Lyrics', href: '/song/achyutam-keshavam' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 md:h-20 ${
        isScrolled
          ? 'bg-charcoal-dark/90 backdrop-blur-xl border-b border-gold/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50">
            <span className="font-heading text-2xl md:text-3xl font-bold bg-gradient-to-r from-gold to-saffron-400 bg-clip-text text-transparent">
              BhaktiDhara
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-cream hover:text-saffron-500 transition-colors text-sm font-medium tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 z-50">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-cream hover:text-saffron-500 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              className="text-cream hover:text-saffron-500 transition-colors hidden sm:block"
              aria-label="User account"
            >
              <User className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-cream hover:text-saffron-500 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-0 bg-charcoal-dark/95 backdrop-blur-2xl z-40 flex flex-col pt-24 px-6 lg:hidden h-screen"
          >
            <div className="flex flex-col space-y-6 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-medium text-cream hover:text-saffron-500 transition-colors block py-2 border-b border-white/5"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.5 }}
                 className="pt-6 flex justify-center"
              >
                <button className="flex items-center space-x-2 text-cream hover:text-saffron-500">
                  <User className="w-5 h-5" />
                  <span>My Account</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Search Bar Overlay */}
      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </motion.header>
  );
}
