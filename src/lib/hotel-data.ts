import { SITE_CONFIG } from '@/data/data';

// Type-safe hotel data using centralized data.js
export const hotelData = {
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  contact: {
    phone: SITE_CONFIG.contact.phoneRaw,
    whatsapp: SITE_CONFIG.contact.whatsapp,
    email: SITE_CONFIG.contact.email,
  },
  address: {
    full: SITE_CONFIG.address.full,
  },
  social_links: {
    facebook: SITE_CONFIG.social.facebook,
    instagram: SITE_CONFIG.social.instagram,
  }
};

export default hotelData;