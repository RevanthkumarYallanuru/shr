/**
 * ============================================================================
 * SEO HEAD COMPONENT
 * ============================================================================
 * Manages page-specific meta tags using React Helmet-like approach.
 * All SEO data sourced from centralized data.js file.
 */

import { useEffect } from 'react';
import { SITE_CONFIG } from '@/data/data';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
}

/**
 * SEOHead Component
 * Updates document head with page-specific meta tags
 */
export function SEOHead({
  title,
  description,
  keywords,
  canonicalPath = '',
  ogImage,
  ogType = 'website',
  noIndex = false,
}: SEOHeadProps) {
  const fullTitle = title 
    ? `${title} | ${SITE_CONFIG.name}` 
    : SITE_CONFIG.meta.title;
  
  const metaDescription = description || SITE_CONFIG.meta.description;
  const metaKeywords = keywords || SITE_CONFIG.meta.keywords;
  const canonicalUrl = `${SITE_CONFIG.contact.website}${canonicalPath}`;
  const ogImageUrl = ogImage || `${SITE_CONFIG.contact.website}/og-image.jpg`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tag
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update meta description
    updateMetaTag('description', metaDescription);
    
    // Update meta keywords
    updateMetaTag('keywords', metaKeywords);

    // Update robots meta
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Update Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', metaDescription, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', ogImageUrl, true);
    updateMetaTag('og:site_name', SITE_CONFIG.name, true);

    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', metaDescription);
    updateMetaTag('twitter:image', ogImageUrl);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Cleanup function
    return () => {
      // Reset to default on unmount (optional)
      document.title = SITE_CONFIG.meta.title;
    };
  }, [fullTitle, metaDescription, metaKeywords, canonicalUrl, ogImageUrl, ogType, noIndex]);

  return null; // This component doesn't render anything
}

export default SEOHead;
