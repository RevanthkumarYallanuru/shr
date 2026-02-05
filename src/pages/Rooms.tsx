/**
 * ============================================================================
 * ROOMS PAGE
 * ============================================================================
 * All data sourced from centralized data.js file.
 * Sections: Hero, Gallery, Browse by Area, Room Details, Why Choose Us
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wifi, Wind, Coffee, Car, Clock, Mountain, Star, X,
  Bed, Sofa, Bath, ChefHat, MessageCircle, Check, ImageOff, ZoomIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import centralized data
import { PAGES, SITE_CONFIG, CDN_IMAGES } from '@/data/data';
import { SEOHead } from '@/components/SEOHead';

// =============================================================================
// IMAGE CATEGORIES WITH ICONS
// =============================================================================
const imageCategories = [
  { id: 'bedroom', label: 'Bedroom', icon: Bed, color: 'from-blue-500 to-blue-600' },
  { id: 'hall', label: 'Hall', icon: Sofa, color: 'from-purple-500 to-purple-600' },
  { id: 'bathroom', label: 'Bathroom', icon: Bath, color: 'from-cyan-500 to-cyan-600' },
  { id: 'balcony', label: 'Balcony', icon: Mountain, color: 'from-emerald-500 to-emerald-600' },
  { id: 'kitchen', label: 'Kitchen', icon: ChefHat, color: 'from-orange-500 to-orange-600' },
];

// Images organized by category using CDN from centralized data
const categorizedImages: Record<string, string[]> = {
  bedroom: CDN_IMAGES.roomspage.bedroom,
  hall: CDN_IMAGES.roomspage.hall,
  bathroom: CDN_IMAGES.roomspage.bathroom,
  balcony: CDN_IMAGES.roomspage.balcony,
  kitchen: CDN_IMAGES.roomspage.kitchen,
};

// Amenity icons mapping
const amenityIcons: Record<string, React.ElementType> = {
  'High-Speed WiFi': Wifi,
  'Air Conditioning': Wind,
  'Balcony with Mountain View': Mountain,
  'Daily Housekeeping': Coffee,
  'Free Parking': Car,
  '24-Hour Check-in/Check-out': Clock,
};

// =============================================================================
// MAIN ROOMS PAGE COMPONENT
// =============================================================================
export default function RoomsPage() {
  // Get data from centralized source
  const { hero, mainGallery, browseByArea, details, whyChooseUs } = PAGES.rooms;
  
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('bedroom');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<number, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  // Browse by Area state
  const [browseCategory, setBrowseCategory] = useState('all');
  const [browseImageIndex, setBrowseImageIndex] = useState<number | null>(null);

  // Filter browse areas by category
  const filteredBrowseAreas = browseCategory === 'all'
    ? browseByArea.areas
    : browseByArea.areas.filter(area => area.category === browseCategory);

  const categoryImages = categorizedImages[selectedCategory] || [];

  // Scroll lock when lightbox is open
  useEffect(() => {
    if (lightboxOpen || browseImageIndex !== null) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [lightboxOpen, browseImageIndex]);

  // Reset lightbox when category changes
  useEffect(() => {
    setLightboxOpen(false);
    setLightboxImageIndex(0);
  }, [selectedCategory]);

  // Reset browse lightbox when browse category changes
  useEffect(() => {
    setBrowseImageIndex(null);
  }, [browseCategory]);

  // Keyboard navigation for lightboxes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevLightboxImage();
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextLightboxImage();
        }
        if (e.key === 'Escape') {
          setLightboxOpen(false);
        }
      }
      
      if (browseImageIndex !== null) {
        if (e.key === 'Escape') {
          setBrowseImageIndex(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, browseImageIndex, selectedCategory, categoryImages.length]);

  const handleImageLoad = (id: number) => {
    setImageLoadingStates(prev => ({ ...prev, [id]: false }));
  };

  const handleImageError = (id: number) => {
    setImageLoadingStates(prev => ({ ...prev, [id]: false }));
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  // Handle WhatsApp booking
  const handleBookNow = () => {
    const message = `
🏨 *Booking Inquiry - ${SITE_CONFIG.name}*

📋 *Room Details:*
Room Type: ${details.type}
Price: ₹${details.pricePerNight}/night
Check-in: ${details.checkInDetails.checkIn}
Check-out: ${details.checkInDetails.checkOut}
Special Features: Mountain View, Balcony

✨ *Amenities:*
${details.amenities.join(', ')}

Please provide your details:
- Guest Name
- Number of Guests
- Check-in Date
- Check-out Date

I would like to book this apartment. Please confirm availability and finalize the booking.
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=${SITE_CONFIG.contact.whatsapp}&text=${encodedMessage}`, '_blank');
  };

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev + 1) % categoryImages.length);
  };

  const prevLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev - 1 + categoryImages.length) % categoryImages.length);
  };

  return (
    <>
      <SEOHead
        title={SITE_CONFIG.pageSEO.rooms.title}
        description={SITE_CONFIG.pageSEO.rooms.description}
        keywords={SITE_CONFIG.pageSEO.rooms.keywords}
        canonicalPath="/rooms"
      />
      <article className="min-h-screen bg-background pt-20 pb-12">
      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 md:p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={categoryImages[lightboxImageIndex]}
                alt={`${selectedCategory} view ${lightboxImageIndex + 1}`}
                className="w-full h-auto rounded-lg max-h-[85vh] object-cover"
              />

              {/* Close button */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-2 right-2 md:top-4 md:right-4 p-1.5 md:p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Navigation - Hidden on small screens */}
              <button
                onClick={prevLightboxImage}
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all items-center justify-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextLightboxImage}
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all items-center justify-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Mobile Navigation */}
              <div className="md:hidden flex gap-2 justify-center mt-4">
                <button
                  onClick={prevLightboxImage}
                  className="px-3 py-1.5 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all text-sm"
                >
                  ← Prev
                </button>
                <button
                  onClick={nextLightboxImage}
                  className="px-3 py-1.5 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all text-sm"
                >
                  Next →
                </button>
              </div>

              {/* Counter */}
              <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 md:px-4 md:py-2 bg-black/60 text-white rounded-full text-xs md:text-sm font-medium">
                {lightboxImageIndex + 1} / {categoryImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="bg-secondary py-8 md:py-12">
        <div className="section-container text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-semibold text-sm md:text-base tracking-wider uppercase"
          >
            {hero.tagline}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-bold mt-3 md:mt-4 mb-3 md:mb-5 drop-shadow-sm"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground max-w-md"
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Main Product Section - Mobile Responsive */}
      <section className="py-6 md:py-12">
        <div className="section-container px-4 md:px-0">
          {/* Mobile: Stack vertically, Desktop: Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
            {/* LEFT SIDE - IMAGE GALLERY */}
            <div className="lg:col-span-3 order-1 lg:order-1">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative mb-4 md:mb-6 bg-muted rounded-lg overflow-hidden"
              >
                <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                  <img
                    src={mainGallery[mainImageIndex]}
                    alt="Room main view"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Thumbnail Navigation - Horizontal Scroll */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-3 -mx-4 px-4 md:mx-0 md:px-0">
                {mainGallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImageIndex(index)}
                    className={`flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-md md:rounded-lg overflow-hidden border-2 transition-all ${
                      mainImageIndex === index
                        ? 'border-accent ring-2 ring-accent/50'
                        : 'border-border hover:border-accent'
                    }`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Browse by Area Section - Mobile: Below thumbnails, Desktop: Left column */}
              <div className="mt-6 md:mt-8">
                <div className="mb-4">
                  <h3 className="font-serif text-lg md:text-xl text-foreground mb-2">
                    {browseByArea.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {browseByArea.description}
                  </p>
                </div>

                {/* Category Filter - Compact for left column */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {browseByArea.categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setBrowseCategory(category.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                        browseCategory === category.id
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>

                {/* Micro Image Grid - 5 columns */}
                <motion.div
                  layout
                  className="grid grid-cols-5 gap-1"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredBrowseAreas.map((area, index) => (
                      <motion.div
                        key={area.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                        className="relative aspect-square overflow-hidden rounded cursor-pointer group"
                        onClick={() => setBrowseImageIndex(index)}
                      >
                        <img
                          src={area.src}
                          alt={area.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onLoad={() => handleImageLoad(area.id)}
                          onError={() => handleImageError(area.id)}
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                          <ZoomIn className="w-3 h-3 md:w-4 md:h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>

            {/* RIGHT SIDE - ROOM DETAILS */}
            <div className="lg:col-span-2 order-2 lg:order-2">
              <div className="lg:sticky lg:top-24">
                {/* Room Title & Rating */}
                <div className="mb-4 md:mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs font-medium rounded">
                      {details.type}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                      <span className="rating-score text-sm uniform-num">{details.rating.score}</span>
                      <span className="count-badge text-xs uniform-num">({details.rating.count})</span>
                    </div>
                  </div>
                  <h2 className="font-serif text-xl md:text-2xl text-foreground mb-2">
                    {SITE_CONFIG.name}
                  </h2>
                  <div className="flex items-baseline gap-1">
                    <span className="price-primary text-2xl md:text-3xl uniform-num">
                      <span className="currency">₹</span>{details.pricePerNight.toLocaleString()}
                    </span>
                    <span className="price-suffix text-base">/night</span>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6 p-3 md:p-4 bg-secondary rounded-lg">
                  <div className="text-center">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 mx-auto text-accent mb-1" />
                    <p className="text-[10px] md:text-xs text-muted-foreground">Check-in</p>
                    <p className="metric-small text-xs md:text-sm">{details.checkInDetails.checkIn}</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 mx-auto text-accent mb-1" />
                    <p className="text-[10px] md:text-xs text-muted-foreground">Check-out</p>
                    <p className="metric-small text-xs md:text-sm">{details.checkInDetails.checkOut}</p>
                  </div>
                  <div className="text-center">
                    <Car className="w-4 h-4 md:w-5 md:h-5 mx-auto text-accent mb-1" />
                    <p className="text-[10px] md:text-xs text-muted-foreground">Parking</p>
                    <p className="metric-small text-xs md:text-sm">{details.checkInDetails.parking}</p>
                  </div>
                  <div className="text-center">
                    <Wifi className="w-4 h-4 md:w-5 md:h-5 mx-auto text-accent mb-1" />
                    <p className="text-[10px] md:text-xs text-muted-foreground">WiFi</p>
                    <p className="metric-small text-xs md:text-sm">{details.checkInDetails.wifi}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4 md:mb-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {details.description}
                  </p>
                </div>

                {/* Amenities */}
                <div className="mb-4 md:mb-6">
                  <h3 className="text-sm font-medium text-foreground mb-2 md:mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {details.amenities.map((amenity, index) => {
                      const Icon = amenityIcons[amenity] || Check;
                      return (
                        <div key={index} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                          <Icon className="w-3 h-3 md:w-4 md:h-4 text-accent flex-shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4 md:mb-6">
                  <h3 className="text-sm font-medium text-foreground mb-2 md:mb-3">Features</h3>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {details.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary text-xs text-muted-foreground rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book Now Button */}
                <Button
                  onClick={handleBookNow}
                  className="w-full btn-gold text-white gap-2 py-5 md:py-6 text-sm md:text-base"
                >
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                  Book via WhatsApp
                </Button>

                <p className="text-[10px] md:text-xs text-center text-muted-foreground mt-2">
                  <span className="stat-number">{details.totalUnits}</span> apartments available
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Area Lightbox */}
      <AnimatePresence>
        {browseImageIndex !== null && filteredBrowseAreas[browseImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 md:p-4"
            onClick={() => setBrowseImageIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredBrowseAreas[browseImageIndex].src}
                alt={filteredBrowseAreas[browseImageIndex].title}
                className="w-full h-auto rounded-lg max-h-[80vh] object-contain"
              />

              {/* Close button */}
              <button
                onClick={() => setBrowseImageIndex(null)}
                className="absolute top-2 right-2 md:top-4 md:right-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 p-3 md:p-4 bg-black/60 backdrop-blur-sm rounded-lg text-white">
                <h3 className="font-medium text-sm md:text-base">{filteredBrowseAreas[browseImageIndex].title}</h3>
                <p className="text-xs md:text-sm text-white/70">{filteredBrowseAreas[browseImageIndex].description}</p>
              </div>

              {/* Navigation */}
              {filteredBrowseAreas.length > 1 && (
                <>
                  <button
                    onClick={() => setBrowseImageIndex((prev) => prev !== null ? (prev - 1 + filteredBrowseAreas.length) % filteredBrowseAreas.length : 0)}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setBrowseImageIndex((prev) => prev !== null ? (prev + 1) % filteredBrowseAreas.length : 0)}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Counter */}
              <div className="absolute top-2 left-2 md:top-4 md:left-4 px-2 md:px-3 py-1 bg-black/60 text-white rounded-full text-xs">
                <span className="metric-small">{browseImageIndex + 1}</span> / <span className="metric-small">{filteredBrowseAreas.length}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="section-container px-4">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground text-center mb-8 md:mb-12">
            Why Choose {SITE_CONFIG.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {whyChooseUs.map((item, index) => {
              const iconMap: Record<string, React.ElementType> = {
                Wifi, Wind, Mountain, Car, Clock, Coffee
              };
              const Icon = iconMap[item.icon] || Check;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-card rounded-lg"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <h3 className="text-xs md:text-sm font-medium text-foreground mb-1">{item.title}</h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </article>
    </>
  );
}
