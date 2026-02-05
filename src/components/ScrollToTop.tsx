import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
          <Button
            onClick={scrollToTop}
            size="icon"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent hover:bg-accent/90 text-primary shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}