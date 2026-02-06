/**
 * ============================================================================
 * INDEX PAGE (Homepage)
 * ============================================================================
 * All data sourced from centralized data.js file.
 * Sections: Hero, About, Features, Rooms Preview, Testimonials, CTA
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wifi, Wind, Utensils, Car, MapPin, Star, ChevronRight, CheckCircle2, Home, Sparkles, Bell, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import centralized data
import { PAGES, SITE_CONFIG } from '@/data/data';
import { SEOHead } from '@/components/SEOHead';

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// =============================================================================
// ICON MAPPING
// =============================================================================
const iconMap: Record<string, React.ElementType> = {
  CheckCircle2,
  Home,
  Sparkles,
  Bell,
  Shield,
  Wifi,
  Wind,
  Utensils,
  Car,
};

const getIcon = (iconName?: string) => {
  return (iconName && iconMap[iconName]) ? iconMap[iconName] : CheckCircle2;
};

// =============================================================================
// HERO SECTION
// =============================================================================
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Data from centralized source
  const { hero } = PAGES.home;

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden" aria-label="Welcome to Sri Hari Home Stay">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={hero.image}
          alt={`${SITE_CONFIG.name} - Premium 2BHK homestay in ${SITE_CONFIG.address.city}`}
          className="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 hero-gradient" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center section-container"
      >
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-5 py-2.5 bg-white/95 backdrop-blur-md rounded-full text-primary text-sm font-semibold mb-6 uppercase tracking-wider shadow-lg border border-white/20"
          >
            {hero.tagline}
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-tight mb-6"
          >
            {hero.title}<br/>
            <span className="italic text-accent">{hero.subtitle}</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-xl"
          >
            {hero.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {hero.cta.map((btn, index) => (
              <Link key={index} to={btn.link}>
                {btn.style === 'primary' ? (
                  <Button size="lg" className="btn-gold gap-2 text-base px-8 text-white">
                    {btn.text}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:text-white gap-2 font-medium"
                  >
                    {btn.text}
                  </Button>
                )}
              </Link>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// =============================================================================
// ABOUT SECTION
// =============================================================================
function AboutSection() {
  const { about } = PAGES.home;

  return (
    <section className="py-24 bg-secondary">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <span className="text-accent font-medium text-sm tracking-wider uppercase">
              {about.tagline}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
              {about.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {about.description}
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              {about.stats.map((stat, index) => {
                const Icon = stat.icon === 'Star' ? Star : MapPin;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-foreground">
                        <span className={stat.label === 'Rating' ? 'rating-score text-xl uniform-num' : 'stat-number text-lg uniform-num'}>{stat.value}</span>
                        {stat.label === 'Rating' && <span className="text-muted-foreground text-sm ml-1">Rating</span>}
                      </p>
                      <p className="text-sm count-badge uniform-num">{stat.subtext}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="relative">
            <div className="grid grid-cols-2 gap-4">
              {about.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`About ${index + 1}`}
                  className={`rounded-2xl shadow-heavy w-full h-48 sm:h-64 object-cover ${index === 1 ? 'mt-8' : ''}`}
                />
              ))}
            </div>
            <div className="relative sm:absolute sm:-bottom-6 sm:-left-6 bg-card p-4 sm:p-6 rounded-xl shadow-heavy max-w-xs mt-4 sm:mt-0 mx-auto sm:mx-0">
              <p className="font-serif text-base sm:text-lg text-foreground italic text-center sm:text-left">
                "{about.testimonial}"
              </p>
              <p className="text-sm text-muted-foreground mt-2 text-center sm:text-left">Guest Review Highlight</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// FEATURES SECTION
// =============================================================================
function FeaturesSection() {
  const { features } = PAGES.home;

  return (
    <section className="py-24">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-accent font-medium text-sm tracking-wider uppercase">
            {features.tagline}
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl text-foreground mt-4">
            {features.title}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.items.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            return (
              <motion.div
                key={feature.id || index}
                variants={fadeInUp}
                className="card-premium p-6 text-center group"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-medium text-foreground mb-2">{feature.name}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// ROOMS PREVIEW SECTION
// =============================================================================
function RoomsPreviewSection() {
  const { roomsPreview } = PAGES.home;

  return (
    <section className="py-24 bg-secondary">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.span variants={fadeInUp} className="text-accent font-medium text-sm tracking-wider uppercase">
            {roomsPreview.tagline}
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl text-foreground mt-4">
            {roomsPreview.title}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {roomsPreview.rooms.map((room) => (
            <motion.div
              key={room.id}
              variants={fadeInUp}
              className="relative group overflow-hidden rounded-2xl h-80 cursor-pointer"
            >
              <img
                src={room.image}
                alt={room.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <span className="px-3 py-1 bg-accent/90 rounded-full text-xs font-medium text-white w-fit">
                  {room.type}
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-white mb-2">{room.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {roomsPreview.cta.map((btn, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Link to={btn.link}>
                {btn.style === 'primary' ? (
                  <Button size="lg" className="btn-gold text-white gap-2 px-8">
                    {btn.text}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                ) : (
                  <Button size="lg" variant="outline" className="gap-2 px-8">
                    {btn.text}
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// TESTIMONIALS SECTION
// =============================================================================
function TestimonialsSection() {
  const { testimonials } = PAGES.home;

  return (
    <section className="py-24">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-accent font-medium text-sm tracking-wider uppercase">
            {testimonials.tagline}
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl text-foreground mt-4">
            {testimonials.title}
          </motion.h2>
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mt-6">
            <span className="rating-score text-5xl md:text-6xl uniform-num">{testimonials.rating}</span>
            <div className="flex flex-col items-start">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(Number(testimonials.rating)) ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
                ))}
              </div>
              <span className="count-badge text-sm mt-1 uniform-num">({testimonials.count} reviews)</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-5xl mx-auto"
        >
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.items.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    variants={fadeInUp}
                    className="card-premium p-8 h-full"
                  >
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6 italic">
                      "{testimonial.comment}"
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious className="relative h-10 w-10 md:h-12 md:w-12 rounded-full bg-accent hover:bg-accent/90 text-primary border-0 transform-none translate-y-0" />
              <CarouselNext className="relative h-10 w-10 md:h-12 md:w-12 rounded-full bg-accent hover:bg-accent/90 text-primary border-0 transform-none translate-y-0" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// CTA SECTION
// =============================================================================
function CTASection() {
  const { cta } = PAGES.home;

  return (
    <section className="py-24 bg-accent">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.span variants={fadeInUp} className="text-foreground font-medium text-sm tracking-wider uppercase">
            {cta.tagline}
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6">
            {cta.title.split('serenity')[0]}
            <span className="italic text-primary">serenity?</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-foreground/70 text-lg max-w-2xl mx-auto mb-10">
            {cta.description}
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            {cta.buttons.map((btn, index) => (
              <Link key={index} to={btn.link}>
                {btn.style === 'primary' ? (
                  <Button size="lg" className="btn-gold gap-2 text-base px-6 md:px-8 text-white">
                    {btn.text}
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/10 px-6 md:px-8"
                  >
                    {btn.text}
                  </Button>
                )}
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// MAIN INDEX PAGE EXPORT
// =============================================================================
export default function Index() {
  return (
    <>
      <SEOHead
        title={SITE_CONFIG.pageSEO.home.title}
        description={SITE_CONFIG.pageSEO.home.description}
        keywords={SITE_CONFIG.pageSEO.home.keywords}
        canonicalPath="/"
      />
      <article>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <RoomsPreviewSection />
        <TestimonialsSection />
        <CTASection />
      </article>
    </>
  );
}
