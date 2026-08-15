'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  hindiTitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  title,
  subtitle,
  hindiTitle,
  className = '',
  align = 'center',
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'} ${className}`}
    >
      <div className={`flex items-center space-x-2 mb-3 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        <span className="text-saffron-500 text-xl">✦</span>
        {align === 'center' && <div className="h-px w-12 bg-gradient-to-r from-saffron-500/50 to-transparent hidden sm:block" />}
      </div>
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-cream mb-2">
        {title}
      </h2>
      
      {hindiTitle && (
        <h3 className="font-hindi text-gold/80 text-lg md:text-xl mb-4 font-medium">
          {hindiTitle}
        </h3>
      )}
      
      {subtitle && (
        <p className="text-cream/60 text-base md:text-lg max-w-2xl mt-2 font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
