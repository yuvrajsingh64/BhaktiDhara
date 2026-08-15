'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, ChevronDown } from 'lucide-react';
import WaveformAnimation from './WaveformAnimation';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-bg">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="BhaktiDhara Hero Background"
          fill
          priority
          className="object-cover"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-deep-bg/30 to-deep-bg/80" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative mt-16 md:mt-0 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="text-gold text-2xl">✦</span>
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-heading text-cream mb-6 tracking-tight leading-tight"
          >
            Experience the Divine
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-cream/80 max-w-2xl mb-10 font-light"
          >
            Listen to soulful bhajans, aartis, mantras and devotional music that bring peace to the heart.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 w-full"
          >
            <button className="flex items-center justify-center space-x-2 bg-saffron-500 hover:bg-saffron-600 text-charcoal-dark rounded-full px-8 py-4 font-semibold transition-all shadow-[0_0_20px_rgba(255,153,51,0.3)] w-full sm:w-auto">
              <Play className="w-5 h-5 fill-current" />
              <span>Listen Now</span>
            </button>
            <button className="flex items-center justify-center space-x-2 border-2 border-cream/30 hover:border-cream/60 text-cream rounded-full px-8 py-4 font-medium transition-all w-full sm:w-auto group">
              <span>Explore Bhajans</span>
              <div className="ml-2 opacity-70 group-hover:opacity-100 transition-opacity">
                <WaveformAnimation isPlaying={true} />
              </div>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center text-cream/50"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
