/**
 * ============================================================================
 * PUBLIC FOOTER COMPONENT
 * ============================================================================
 * All data sourced from centralized data.js file.
 * Contains: Brand Info, Quick Links, Contact Info, Social Links
 */

import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import logoImage from '@/assets/logo.png';

// Import centralized data
import { COMPONENTS, SITE_CONFIG } from '@/data/data';

// =============================================================================
// PUBLIC FOOTER COMPONENT
// =============================================================================
export function PublicFooter() {
  // Get data from centralized source
  const { brand, exploreLinks, supportLinks, contact, copyright } = COMPONENTS.footer;

  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="section-container py-12 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt={`${brand.name} logo`}
                className="h-12 w-auto object-contain rounded-lg"
              />
              <span className="font-serif text-xl font-semibold">{brand.name}</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {brand.description}
            </p>
            <div className="flex gap-4">
              {SITE_CONFIG.social.facebook && (
                <a href={SITE_CONFIG.social.facebook} className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {SITE_CONFIG.social.instagram && (
                <a href={SITE_CONFIG.social.instagram} className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-3">
              {exploreLinks.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/70 text-sm">
                  {contact.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <a href={`mailto:${contact.email}`} className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            {copyright}
          </p>
          <p className="text-primary-foreground/50 text-sm">
            Privacy Policy • Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
