import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50"
        >
          <button
            onClick={scrollToTop}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FFB200] hover:bg-[#E6A000] flex items-center justify-center shadow-[0_4px_20px_rgba(255,178,0,0.5)] hover:shadow-[0_6px_28px_rgba(255,178,0,0.65)] transition-all duration-300 border-2 border-[#2A2A2A]"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6 md:w-7 md:h-7 text-[#2A2A2A] stroke-[3]" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}