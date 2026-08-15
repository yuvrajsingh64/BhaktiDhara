'use client';

import React from 'react';

interface WaveformAnimationProps {
  isPlaying?: boolean;
  className?: string;
  barCount?: number;
}

export default function WaveformAnimation({
  isPlaying = true,
  className = '',
  barCount = 5,
}: WaveformAnimationProps) {
  const bars = Array.from({ length: barCount });
  const delays = [0, 0.15, 0.3, 0.45, 0.6];

  return (
    <div className={`flex items-end justify-center gap-[3px] h-5 ${className}`}>
      {bars.map((_, i) => (
        <div
          key={i}
          className="w-1 rounded-full bg-saffron-500 transition-all duration-300"
          style={{
            height: isPlaying ? '4px' : '4px',
            animation: isPlaying
              ? `waveformBar 1s ease-in-out ${delays[i % delays.length]}s infinite`
              : 'none',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes waveformBar {
          0%, 100% { height: 4px; }
          50% { height: 20px; }
        }
      `}</style>
    </div>
  );
}
