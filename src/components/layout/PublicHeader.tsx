/**
 * ============================================================================
 * PUBLIC HEADER COMPONENT
 * ============================================================================
 * All data sourced from centralized data.js file.
 * Contains: Navigation, Logo, Mobile Menu, CTA Button
 */

import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Bed, Camera, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import logoImage from '@/assets/logo.png';

// Import centralized data
import { COMPONENTS } from '@/data/data';

// =============================================================================
// PUBLIC HEADER COMPONENT
// =============================================================================
export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Get data from centralized source
  const { logo, navLinks, cta } = COMPONENTS.header;

  const isTransparent = location.pathname === '/';

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent
          ? 'bg-primary/90 backdrop-blur-md shadow-lg'
          : 'bg-primary shadow-lg'
        }`}
      role="banner"
    >
      <nav className="section-container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" aria-label={`${logo.name} - Go to homepage`}>
            <img 
              src={logoImage} 
              alt={`${logo.name} logo`}
              className="h-12 w-auto object-contain rounded-lg"
            />
            <span
              className="font-serif text-lg md:text-xl font-semibold text-white hidden sm:inline"
            >
              {logo.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(link => {
              const IconComponent = link.icon === 'Home' ? Home : 
                                 link.icon === 'Bed' ? Bed :
                                 link.icon === 'Camera' ? Camera :
                                 link.icon === 'Phone' ? Phone : Home;
              const isActive = location.pathname === link.href;
              
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-accent text-primary shadow-lg scale-105'
                      : 'text-white/90 hover:text-white hover:bg-white/10 hover:scale-105'
                  }`}
                >
                  <IconComponent className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-white/90'}`} />
                  <span className="font-bold tracking-wide">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to={cta.href}>
              <Button className="btn-gold px-6 text-white">{cta.text}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden py-4 border-t border-white/10 bg-primary"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map(link => {
                  const IconComponent = link.icon === 'Home' ? Home : 
                                       link.icon === 'Bed' ? Bed :
                                       link.icon === 'Camera' ? Camera :
                                       link.icon === 'Phone' ? Phone : Home;
                  const isActive = location.pathname === link.href;
                  
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-lg transition-all ${
                        isActive
                          ? 'text-accent bg-white/20 shadow-lg'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <IconComponent className={`w-6 h-6 ${isActive ? 'text-accent' : 'text-white/80'}`} />
                      <span className="font-bold tracking-wide">{link.label}</span>
                    </Link>
                  );
                })}
                <div className="px-4 pt-4 border-t border-white/10 flex flex-col gap-2">
                  <Link to={cta.href} onClick={() => setMobileMenuOpen(false)}>
                    <Button className="btn-gold w-full text-white">{cta.text}</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
