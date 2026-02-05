/**
 * ============================================================================
 * PRELOADER COMPONENT
 * ============================================================================
 * Displays a branded loading screen for 3 seconds while assets load.
 * Shows the hotel logo with a subtle animation.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '@/assets/logo.png';

interface PreloaderProps {
  onLoadComplete: () => void;
  minDisplayTime?: number;
}

export function Preloader({ onLoadComplete, minDisplayTime = 3000 }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Minimum display time before completing
    const timer = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(onLoadComplete, 300); // Small delay for smooth transition
    }, minDisplayTime);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onLoadComplete, minDisplayTime]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      >
        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mb-8"
        >
          {/* Logo Image */}
          <motion.img
            src={logoImage}
            alt="Sri Hari Home Stay"
            className="w-40 h-auto md:w-52 object-contain rounded-2xl shadow-lg"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Hotel Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-serif text-2xl md:text-3xl text-foreground mb-2 text-center"
        >
          Sri Hari Home Stay
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-muted-foreground text-sm md:text-base mb-8"
        >
          Your Home Away From Home
        </motion.p>

        {/* Loading Bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '200px' }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="relative h-1 bg-muted rounded-full overflow-hidden md:w-64"
          style={{ width: '200px' }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full bg-accent rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="mt-4 text-xs text-muted-foreground tracking-wider uppercase"
        >
          Loading...
        </motion.p>

        {/* Decorative Elements */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="w-8 h-px bg-accent" />
          <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Tirupati</span>
          <div className="w-8 h-px bg-accent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
