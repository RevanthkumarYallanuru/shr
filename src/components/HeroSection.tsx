import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Church, Bus } from 'lucide-react';
import { SITE_CONFIG, CDN_IMAGES } from '@/data/data';

const heroBanner = CDN_IMAGES.homepage.hero;

interface HeroSectionProps {
  showMapsSection?: boolean;
}

export function HeroSection({ showMapsSection = true }: HeroSectionProps) {
  return (
    <>
      <section
        className="hero-section"
        aria-label={`${SITE_CONFIG.name} Hero`}
      >
        <img
          src={heroBanner}
          alt={`${SITE_CONFIG.name} - Premium 2BHK homestay in Tirupati`}
          className="hero-background"
        />
        <div className="hero-overlay" />

        {/* Left Badge */}
        <div className="hero-badge">
          <div className="hero-badge-content">
            <span>Best</span>
            <span>2BHK</span>
            <span>Flats</span>
          </div>
        </div>

        {/* Center Title Block */}
        <div className="hero-center">
          <h1 className="hero-title">
            SRIHARI
            <span className="hero-title-divider"></span>
            HOME STAYS
          </h1>

          <div className="hero-buttons">
            <Link to="/booking" className="hero-button">
              <span>BOOK YOUR STAY</span>
              <ArrowRight className="hero-button-icon" aria-hidden="true" />
            </Link>
            <Link to="/rooms" className="hero-button">
              <span>VIEW OUR ROOMS</span>
              <ArrowRight className="hero-button-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Bottom Info Strip */}
        <div className="hero-bottom-strip">
          <div className="hero-bottom-container">
            {/* Column 1: Google Maps */}
            <div className="hero-card hero-card-map">
              <iframe 
                src={SITE_CONFIG.social.googleMapsEmbed}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title={`${SITE_CONFIG.name} Location Map`}
                className="hero-maps-iframe"
              />
              <div className="hero-map-overlay">
                <MapPin className="hero-map-pin" aria-hidden="true" />
              </div>
            </div>

            {/* Column 2: Location Information Panel */}
            <div className="hero-card hero-card-info">
              <div className="hero-info-panel">
                <MapPin className="hero-info-icon" aria-hidden="true" />
                <div className="hero-info-text">
                  <span>Location details and</span>
                  <span>navigation to Google Maps</span>
                </div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.address.full || SITE_CONFIG.address.line1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-maps-link"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

            {/* Column 3: Enhanced Yellow Distance Box */}
            <div className="hero-card hero-card-distance">
              <div className="hero-distance-enhanced">
                <div className="hero-distance-row">
                  <Church className="hero-distance-icon" aria-hidden="true" />
                  <div className="hero-distance-info">
                    <span className="hero-distance-number uniform-num">5 km</span>
                    <span className="hero-distance-label">to Alipiri</span>
                  </div>
                </div>
                
                <div className="hero-distance-divider"></div>
                
                <div className="hero-distance-row">
                  <Bus className="hero-distance-icon" aria-hidden="true" />
                  <div className="hero-distance-info">
                    <span className="hero-distance-number uniform-num">5 km</span>
                    <span className="hero-distance-label">from Bus Stand</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
