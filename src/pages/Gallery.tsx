/**
 * ============================================================================
 * GALLERY PAGE
 * ============================================================================
 * All data sourced from centralized data.js file.
 * Sections: Hero, Category Filter, Image Grid, CTA
 */

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Star, Camera, ImageOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import centralized data
import { PAGES, SITE_CONFIG } from '@/data/data';
import { SEOHead } from '@/components/SEOHead';

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// =============================================================================
// MAIN GALLERY PAGE COMPONENT
// =============================================================================
export default function GalleryPage() {
  // Get data from centralized source
  const { hero, categories, images: galleryImages, cta } = PAGES.gallery;
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<number, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const currentImageIndex = selectedImage !== null
    ? filteredImages.findIndex(img => img.id === selectedImage)
    : -1;

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (currentImageIndex === -1) return;
    
    const newIndex = direction === 'prev'
      ? (currentImageIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentImageIndex + 1) % filteredImages.length;
    
    setSelectedImage(filteredImages[newIndex].id);
  }, [currentImageIndex, filteredImages]);

  // Scroll lock when lightbox is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [selectedImage]);

  // Reset lightbox when category changes
  useEffect(() => {
    setSelectedImage(null);
  }, [activeCategory]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateImage('prev');
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateImage('next');
      }
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, navigateImage]);

  const handleImageLoad = (id: number) => {
    setImageLoadingStates(prev => ({ ...prev, [id]: false }));
  };

  const handleImageError = (id: number) => {
    setImageLoadingStates(prev => ({ ...prev, [id]: false }));
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <SEOHead
        title={SITE_CONFIG.pageSEO.gallery.title}
        description={SITE_CONFIG.pageSEO.gallery.description}
        keywords={SITE_CONFIG.pageSEO.gallery.keywords}
        canonicalPath="/gallery"
      />
      <article className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-6">
              <Camera className="w-4 h-4" />
              {hero.tagline.toUpperCase()}
            </span>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              {hero.title.split('Beautiful')[0]}<span className="text-accent italic">Beautiful Spaces</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
              {hero.description}
            </p>

            {/* Rating Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-card rounded-full shadow-soft border border-border">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-foreground font-medium">{SITE_CONFIG.rating.score}</span>
              <span className="text-muted-foreground">({SITE_CONFIG.rating.count} reviews)</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-30 bg-background/95 backdrop-blur-md border-y border-border">
        <div className="section-container py-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                aria-label={`Filter by ${category.label}`}
                aria-pressed={activeCategory === category.id}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="section-container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  variants={fadeInUp}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl bg-muted aspect-[4/3] cursor-pointer"
                  onClick={() => setSelectedImage(image.id)}
                >
                  {/* Loading Skeleton */}
                  {imageLoadingStates[image.id] !== false && !imageErrors[image.id] && (
                    <div className="absolute inset-0 bg-muted animate-pulse" />
                  )}

                  {/* Error State */}
                  {imageErrors[image.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <ImageOff className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}

                  {/* Image */}
                  <img
                    src={image.src}
                    alt={image.title}
                    loading="lazy"
                    onLoad={() => handleImageLoad(image.id)}
                    onError={() => handleImageError(image.id)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-end">
                      <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    <div>
                      <span className="inline-block px-3 py-1 bg-accent/80 text-white text-xs font-medium rounded-full mb-2 capitalize">
                        {image.category}
                      </span>
                      <h3 className="font-serif text-xl text-white mb-1">{image.title}</h3>
                      <p className="text-white/80 text-sm line-clamp-2">{image.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && currentImageIndex !== -1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[currentImageIndex].src}
                alt={filteredImages[currentImageIndex].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <h3 className="font-serif text-2xl text-white mb-2">
                  {filteredImages[currentImageIndex].title}
                </h3>
                <p className="text-white/80">{filteredImages[currentImageIndex].description}</p>
              </div>

              {/* Counter */}
              <div className="absolute top-4 left-4 px-4 py-2 bg-black/50 rounded-full text-white text-sm">
                {currentImageIndex + 1} / {filteredImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-24 bg-secondary">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              {cta.title}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg mb-10">
              {cta.description}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              {cta.buttons.map((btn, index) => (
                <Link key={index} to={btn.link}>
                  {btn.style === 'primary' ? (
                    <Button size="lg" className="btn-gold text-white px-8">
                      {btn.text}
                    </Button>
                  ) : (
                    <Button size="lg" variant="outline" className="px-8">
                      {btn.text}
                    </Button>
                  )}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </article>
    </>
  );
}
