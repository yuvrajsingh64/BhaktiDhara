'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-charcoal-dark via-maroon-900/10 to-charcoal-dark">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center px-6"
      >
        <h2 className="text-3xl md:text-4xl font-heading text-cream">Stay Connected With Bhakti</h2>
        <p className="text-cream/60 text-lg mt-4">Receive new bhajans, aartis, spiritual playlists and devotional updates.</p>
        
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 flex items-center justify-center gap-2 text-saffron-500 font-semibold text-lg"
          >
            <Check className="w-6 h-6" />
            Welcome to the BhaktiDhara family! 🙏
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 w-full bg-white/10 border border-white/20 rounded-full px-6 py-4 text-cream placeholder:text-cream/40 focus:border-saffron-500 focus:outline-none transition"
            />
            <button 
              type="submit"
              className="bg-saffron-500 hover:bg-saffron-600 text-charcoal-dark rounded-full px-8 py-4 font-semibold flex items-center gap-2 whitespace-nowrap transition"
            >
              Subscribe <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
