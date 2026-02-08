/**
 * ============================================================================
 * SRI HARI HOME STAY - CENTRALIZED DATA CONFIGURATION
 * ============================================================================
 * 
 * This file contains ALL data, images, content, links, and configuration
 * values for the entire website. Any changes here will reflect immediately
 * across all pages and components.
 * 
 * STRUCTURE:
 * - CDN_IMAGES: All production image URLs from jsDelivr CDN
 * - SITE_CONFIG: Global site configuration and metadata
 * - PAGES: Page-wise content organized by sections
 * - COMPONENTS: Reusable component data (header, footer, etc.)
 * 
 * ============================================================================
 */

// =============================================================================
// CDN IMAGES - All production images from jsDelivr CDN
// =============================================================================

export const CDN_IMAGES = {
  /**
   * Homepage banner images
   */
  homepage: {
    banners: [
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Homepage/banner.jpeg",
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Homepage/banner2.jpeg"
    ],
    // Primary hero image
    hero: "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Homepage/banner.jpeg"
  },

  /**
   * Gallery page images organized by category
   */
  gallery: {
    ambiance: [
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Gallery/Ambiance/amb1.jpeg",
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Gallery/Ambiance/amb2.jpeg",
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Gallery/Ambiance/amb3.jpeg",
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Gallery/Ambiance/amb4.jpeg",
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Gallery/Ambiance/amb5.jpeg"
    ],
    interiors: [
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Gallery/Interiors/int1.jpeg",
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Gallery/Interiors/int2.jpeg",
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Gallery/Interiors/int3.jpeg",
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Gallery/Interiors/int4.jpeg",
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Gallery/Interiors/int5.jpeg"
    ]
  },

  /**
   * Rooms page images organized by area/category
   */
  roomspage: {
    balcony: [
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Roomspage/Balcony/bac1.jpeg"
    ],
    bathroom: [
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Roomspage/Bathroom/bathroom1.jpeg",
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Roomspage/Bathroom/bathroom2.jpeg",
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Roomspage/Bathroom/bathroom3.jpeg"
    ],
    bedroom: [
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Roomspage/Bedroom/br1.jpeg",
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Roomspage/Bedroom/br2.jpeg",
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Roomspage/Bedroom/br3.jpeg"
    ],
    hall: [
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Roomspage/Hall/hall1.jpeg",
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Roomspage/Hall/hall2.jpeg",
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Roomspage/Hall/hall3.jpeg"
    ],
    kitchen: [
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Roomspage/Kithcen/k0.jpeg",
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Roomspage/Kithcen/k1.jpeg",
      "https://cdn.jsdelivr.net/gh/RevanthkumarYallanuru/shrassets@main/Roomspage/Kithcen/k2.jpeg"
    ]
  }
};

// =============================================================================
// SITE CONFIGURATION - Global settings, metadata, and contact info
// =============================================================================

export const SITE_CONFIG = {
  /**
   * Basic site information
   */
  name: "Sri Hari Home Stay",
  tagline: "Best 2BHK stays in Tirupati",
  type: "Home Stay",
  description: "",
  
  /**
   * SEO metadata - Global defaults
   */
  meta: {
    title: "Sri Hari Home Stay | Family Home Stay in Tirupati",
    keywords: "Tirupati homestay, family accommodation Tirupati, Sri Hari Home Stay, Tirumala lodging, pilgrim stay Tirupati",
    description: "Book your stay at Sri Hari Home Stay - a top-rated family home stay in Tirupati. Clean rooms, excellent service, and a secure environment for pilgrims and families."
  },

  /**
   * Page-specific SEO metadata
   */
  pageSEO: {
    home: {
      title: "Sri Hari Home Stay | Premium 2BHK Family Homestay in Tirupati",
      description: "",
      keywords: "Tirupati homestay, 2BHK Tirupati, family accommodation, pilgrim stay, Sri Hari Home Stay"
    },
    rooms: {
      title: "Our Rooms | 2BHK Apartments in Tirupati",
      description: "Explore our fully-furnished 2BHK apartments with modern amenities, mountain views, and premium comfort at Sri Hari Home Stay, Tirupati.",
      keywords: "2BHK apartment Tirupati, rooms Tirupati, homestay rooms, furnished apartment"
    },
    gallery: {
      title: "Photo Gallery | Sri Hari Home Stay Tirupati",
      description: "View photos of our elegant rooms, interiors, and serene ambiance at Sri Hari Home Stay. See what awaits you in Tirupati.",
      keywords: "homestay photos, Tirupati accommodation gallery, room photos, Sri Hari images"
    },
    booking: {
      title: "Book Your Stay | Sri Hari Home Stay Tirupati",
      description: "Reserve your room at Sri Hari Home Stay. Easy booking, flexible check-in/out, and instant WhatsApp confirmation.",
      keywords: "book homestay Tirupati, reserve room, Tirupati accommodation booking"
    },
    contact: {
      title: "Contact Us | Sri Hari Home Stay Tirupati",
      description: "Get in touch with Sri Hari Home Stay for reservations and inquiries. Located in Mangalam, Tirupati - reach us via phone or WhatsApp.",
      keywords: "contact Sri Hari, Tirupati homestay phone, homestay address"
    }
  },

  /**
   * Contact information
   */
  contact: {
    phone: "+91 8639058016",
    phoneRaw: "918639058016",
    email: "contact@sriharihomestay.com",
    whatsapp: "918639058016",
    whatsappLink: "https://wa.me/918639058016",
    website: "https://sri-hari-home-stay.netlify.app"
  },

  /**
   * Address details
   */
  address: {
    line1: "22-4-52/104",
    area: "Bank Employees Colony, Sri Venkateshwara Colony",
    locality: "Mangalam",
    city: "Tirupati",
    state: "Andhra Pradesh",
    pincode: "517507",
    country: "India",
    full: "22-4-52/104, Bank Employees Colony, Sri Venkateshwara Colony, Mangalam, Tirupati, Andhra Pradesh 517507",
    short: "22-4-52/104, Mangalam, Tirupati, AP 517507"
  },

  /**
   * Social media links
   */
  social: {
    facebook: null,
    instagram: null,
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Sri+Hari+Home+Stay+Tirupati",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.147116209216!2d79.4412307104078!3d13.64881348667707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b004e2b8147%3A0x8c2138179518952f!2sSri%20Hari%20Home%20Stay!5e0!3m2!1sen!2sin!4v1770172197156!5m2!1sen!2sin"
  },

  /**
   * Rating information
   */
  rating: {
    score: 5.0,
    count: 42,
    platform: "Google Reviews"
  },

  /**
   * Theme colors - Regal Heritage Luxury (HSL values defined in CSS)
   */
  theme: {
    primaryColor: "#982B1C",      /* Heritage Red */
    accentColor: "#FFB200",       /* Premium Gold (micro-use) */
    backgroundColor: "#F2E8C6",   /* Luxury Canvas */
    secondaryBg: "#DAD4B5",       /* Secondary Background */
    deepRed: "#800000",           /* Deep Accent Red */
    coolAccent: "#7EACB5",        /* Cool Supporting Accent */
    textColor: "#2A2A2A"          /* Primary Text */
  }
};

// =============================================================================
// ROOM CONFIGURATION - Room types, pricing, and amenities
// =============================================================================

export const ROOM_CONFIG = {
  /**
   * Default room type configuration
   */
  default: {
    type: "2BHK Apartment",
    totalUnits: 18,
    pricePerNight: 4000,
    checkIn: "24h",
    checkOut: "24h",
    rating: { score: 4.9, count: 256 }
  },

  /**
   * Room features list
   */
  features: [
    "2 Spacious Bedrooms",
    "Living Area with Balcony",
    "Mountain View",
    "Modern Furnishings",
    "Equipped Kitchen",
    "Attached Bathrooms"
  ],

  /**
   * Available amenities
   */
  amenities: [
    "High-Speed WiFi",
    "Air Conditioning",
    "Balcony with Mountain View",
    "Free Parking",
    "24-Hour Check-in/Check-out",
    "Daily Housekeeping"
  ],

  /**
   * Check-in details
   */
  checkInDetails: {
    checkIn: "24h",
    checkOut: "24h",
    parking: "Free",
    wifi: "High-Speed"
  },

  /**
   * Room descriptions
   */
  description: "Experience premium living in our fully-furnished 2-bedroom, 1-hall, 1-balcony apartment. Perfect for families and groups seeking comfort and convenience near Lord Venkateswara Temple in Tirupati.",
  longDescription: "Ideal for families, pilgrims, and groups visiting Tirupati. Our 2BHK apartments are thoughtfully designed to provide maximum comfort with all modern conveniences. Whether you're here for a spiritual journey or leisure, our property ensures a memorable stay."
};

// =============================================================================
// PAGES - Page-wise content organized by sections
// =============================================================================

export const PAGES = {
  // ===========================================================================
  // HOME PAGE
  // ===========================================================================
  home: {
    /**
     * Hero Section
     */
    hero: {
      tagline: "Best 2BHK stays in Tirupati",
      title: "Sri Hari Home Stay",
      subtitle: "Your Home Away From Home",
      description: "",
      image: CDN_IMAGES.homepage.hero,
      banners: CDN_IMAGES.homepage.banners,
      cta: [
        { text: "Book Your Stay", link: "/booking", style: "primary" },
        { text: "Explore Rooms", link: "/rooms", style: "secondary" }
      ]
    },

    /**
     * About Section
     */
    about: {
      tagline: "About Sri Hari Home Stay",
      title: "Best Budget Friendly Home Stay in Tirupati",
      description: "Experience comfort and Luxury at Sri Hari Home Stay in Tirupati. Discover clean, spacious rooms perfect for families.",
      images: [
        CDN_IMAGES.roomspage.bedroom[0],
        CDN_IMAGES.roomspage.hall[0]
      ],
      stats: [
        { icon: "Star", label: "Rating", value: "5.0", subtext: "42 Reviews" },
        { icon: "MapPin", label: "Prime Location", value: "Mangalam", subtext: "Tirupati, Andhra Pradesh" }
      ],
      testimonial: "Room facilities are good, Room cleaning is excellent, and Staff service is very good"
    },

    /**
     * Features/Amenities Section
     */
    features: {
      tagline: "Our Amenities",
      title: "Why Choose Sri Hari Home Stay",
      items: [
        {
          id: "clean-rooms",
          icon: "CheckCircle2",
          name: "Clean and Spacious Rooms",
          description: "Well-maintained, hygienic rooms with ample space for families"
        },
        {
          id: "room-service",
          icon: "Bell",
          name: "Excellent Room Service",
          description: "Prompt and courteous room service available 24/7"
        },
        {
          id: "family-friendly",
          icon: "Shield",
          name: "Secure & Family-Friendly",
          description: "Safe environment perfect for families and pilgrims"
        }
      ]
    },

    /**
     * Rooms Preview Section
     */
    roomsPreview: {
      tagline: "The Art of Stay",
      title: "Explore Comfort at Our Stays",
      rooms: [
        { id: "room-1", name: "Master Bed Room", type: "Bed Room", image: CDN_IMAGES.roomspage.bedroom[0] },
        { id: "room-2", name: "Luxury Furniture", type: "Living Room", image: CDN_IMAGES.roomspage.hall[0] },
        { id: "room-3", name: "Equiped Kitchen", type: "Kitchen", image: CDN_IMAGES.roomspage.kitchen[0] }
      ],
      cta: [
        { text: "View All Rooms", link: "/rooms", style: "secondary", icon: "ChevronRight" },
        { text: "Book Now", link: "/booking", style: "primary", icon: "ArrowRight" }
      ]
    },

    /**
     * Testimonials Section
     */
    testimonials: {
      tagline: "Guest Experience",
      title: "What Our Guests Say",
      rating: "5.0",
      count: 42,
      items: [
        { name: "Rajendra Desai", role: "Verified Stay", rating: 5, comment: "Room facilities are good" },
        { name: "Pramod Akula", role: "Verified Stay", rating: 5, comment: "Room cleaning is excellent" },
        { name: "Arun B", role: "Verified Stay", rating: 5, comment: "Staff service is very good" },
        { name: "Girish P", role: "Verified Stay", rating: 5, comment: "Safe and secure stay for families" }
      ]
    },

    /**
     * CTA Section
     */
    cta: {
      tagline: "Begin Your Journey",
      title: "Ready to experience serenity?",
      description: "Book your stay at Sri Hari Home Stay today. A sanctuary of peace awaits you in the heart of the spiritual capital.",
      buttons: [
        { text: "Book Your Stay", link: "/booking", style: "primary" },
        { text: "Contact Host", link: "/contact", style: "secondary" }
      ]
    }
  },

  // ===========================================================================
  // ROOMS PAGE
  // ===========================================================================
  rooms: {
    /**
     * Hero Section
     */
    hero: {
      tagline: "Premium Accommodation",
      title: "2BHK Apartments",
      subtitle: "Mountain View & Luxuary Stay",
      description: "Discover our fully-furnished 2-bedroom apartments with modern amenities and premium comfort"
    },

    /**
     * Main Gallery Images (thumbnail slider)
     */
    mainGallery: [
      CDN_IMAGES.roomspage.bedroom[0],
      CDN_IMAGES.roomspage.hall[0],
      CDN_IMAGES.roomspage.bathroom[0],
      CDN_IMAGES.roomspage.balcony[0],
      CDN_IMAGES.roomspage.kitchen[0]
    ],

    /**
     * Browse by Area Section
     */
    browseByArea: {
      title: "Browse by Area",
      description: "Explore different areas of our property",
      categories: [
        { id: "all", label: "All Areas" },
        { id: "bedroom", label: "Bedroom" },
        { id: "hall", label: "Hall" },
        { id: "bathroom", label: "Bathroom" },
        { id: "balcony", label: "Balcony" },
        { id: "kitchen", label: "Kitchen" }
      ],
      /**
       * All area images with metadata (3 per category, 1 for balcony = 13 total)
       */
      areas: [
        // Bedroom (3 images)
        { id: 1, src: CDN_IMAGES.roomspage.bedroom[0], title: "Master Bedroom", category: "bedroom", description: "Spacious master bedroom with premium bedding" },
        { id: 2, src: CDN_IMAGES.roomspage.bedroom[1], title: "Bedroom View", category: "bedroom", description: "Comfortable bedroom with natural lighting" },
        { id: 3, src: CDN_IMAGES.roomspage.bedroom[2], title: "Second Bedroom", category: "bedroom", description: "Additional bedroom space for families" },
        // Hall (3 images)
        { id: 4, src: CDN_IMAGES.roomspage.hall[0], title: "Living Hall", category: "hall", description: "Modern living area with comfortable seating" },
        { id: 5, src: CDN_IMAGES.roomspage.hall[1], title: "Hall Interior", category: "hall", description: "Spacious hall with elegant furnishings" },
        { id: 6, src: CDN_IMAGES.roomspage.hall[2], title: "Hall View", category: "hall", description: "Well-lit hall with balcony access" },
        // Bathroom (3 images)
        { id: 7, src: CDN_IMAGES.roomspage.bathroom[0], title: "Main Bathroom", category: "bathroom", description: "Clean and modern bathroom facilities" },
        { id: 8, src: CDN_IMAGES.roomspage.bathroom[1], title: "Bathroom Fixtures", category: "bathroom", description: "Premium bathroom fittings" },
        { id: 9, src: CDN_IMAGES.roomspage.bathroom[2], title: "Bathroom Interior", category: "bathroom", description: "Hygienic bathroom with hot water" },
        // Balcony (1 image)
        { id: 10, src: CDN_IMAGES.roomspage.balcony[0], title: "Scenic Balcony", category: "balcony", description: "Balcony with mountain views" },
        // Kitchen (3 images)
        { id: 11, src: CDN_IMAGES.roomspage.kitchen[0], title: "Equipped Kitchen", category: "kitchen", description: "Fully equipped kitchen for self-cooking" },
        { id: 12, src: CDN_IMAGES.roomspage.kitchen[1], title: "Kitchen Amenities", category: "kitchen", description: "Modern kitchen appliances" },
        { id: 13, src: CDN_IMAGES.roomspage.kitchen[2], title: "Kitchen View", category: "kitchen", description: "Clean kitchen with all essentials" }
      ]
    },

    /**
     * Room Details Section
     */
    details: {
      type: "2BHK Apartment",
      pricePerNight: 4000,
      totalUnits: 18,
      rating: { score: 4.9, count: 256 },
      description: "Experience premium living in our fully-furnished 2-bedroom, 1-hall, 1-balcony apartment. Perfect for families and groups seeking comfort and convenience near Lord Venkateswara Temple in Tirupati.",
      longDescription: "Ideal for families, pilgrims, and groups visiting Tirupati. Our 2BHK apartments are thoughtfully designed to provide maximum comfort with all modern conveniences. Whether you're here for a spiritual journey or leisure, our property ensures a memorable stay.",
      features: [
        "2 Spacious Bedrooms",
        "Living Area with Balcony",
        "Mountain View",
        "Modern Furnishings",
        "Equipped Kitchen",
        "Attached Bathrooms"
      ],
      amenities: [
        "High-Speed WiFi",
        "Air Conditioning",
        "Balcony with Mountain View",
        "Free Parking",
        "24-Hour Check-in/Check-out",
        "Daily Housekeeping"
      ],
      checkInDetails: {
        checkIn: "24h",
        checkOut: "24h",
        parking: "Free",
        wifi: "High-Speed"
      }
    },

    /**
     * Why Choose Us Section
     */
    whyChooseUs: [
      { icon: "Wifi", title: "High-Speed WiFi", description: "Stay connected with premium internet" },
      { icon: "Wind", title: "Climate Control", description: "Individual AC units for comfort" },
      { icon: "Mountain", title: "Mountain Views", description: "Beautiful balcony views" },
      { icon: "Car", title: "Free Parking", description: "Secure parking for vehicle" },
      { icon: "Clock", title: "Flexible Timings", description: "24-hour check-in/check-out" },
      { icon: "Coffee", title: "Daily Service", description: "Professional housekeeping" }
    ]
  },

  // ===========================================================================
  // GALLERY PAGE
  // ===========================================================================
  gallery: {
    /**
     * Hero Section
     */
    hero: {
      tagline: "Visual Journey",
      title: "Explore Our Beautiful Spaces",
      description: "Take a visual tour of Sri Hari Home Stay. Discover our elegantly designed rooms, serene ambiance, and the warm hospitality that awaits you in Tirupati."
    },

    /**
     * Filter Categories
     */
    categories: [
      { id: "all", label: "All Photos" },
      { id: "rooms", label: "Rooms" },
      { id: "interiors", label: "Interiors" },
      { id: "ambiance", label: "Ambiance" }
    ],

    /**
     * Gallery Images with metadata
     */
    images: [
      // Rooms category
      { id: 1, src: CDN_IMAGES.roomspage.bedroom[0], title: "Master Bedroom", category: "rooms", description: "Experience ultimate comfort in our beautifully designed bedrooms" },
      { id: 2, src: CDN_IMAGES.roomspage.bedroom[1], title: "Premium Suite Bedroom", category: "rooms", description: "Spacious suite with modern amenities and elegant décor" },
      { id: 3, src: CDN_IMAGES.roomspage.bedroom[2], title: "Deluxe Room", category: "rooms", description: "Perfect blend of comfort and style for your relaxing stay" },
      { id: 4, src: CDN_IMAGES.roomspage.hall[0], title: "Living Hall", category: "rooms", description: "Ideal for families with ample space and cozy atmosphere" },
      { id: 5, src: CDN_IMAGES.roomspage.hall[1], title: "Hall Area", category: "rooms", description: "Comfortable living area for relaxation" },
      // Interiors category
      { id: 6, src: CDN_IMAGES.gallery.interiors[0], title: "Elegant Interiors", category: "interiors", description: "Thoughtfully designed spaces with attention to every detail" },
      { id: 7, src: CDN_IMAGES.gallery.interiors[1], title: "Living Area Design", category: "interiors", description: "Modern interior design with comfortable furnishings" },
      { id: 8, src: CDN_IMAGES.gallery.interiors[2], title: "Interior Details", category: "interiors", description: "Premium quality interiors throughout the property" },
      { id: 9, src: CDN_IMAGES.gallery.interiors[3], title: "Room Interiors", category: "interiors", description: "Beautifully crafted interior spaces" },
      { id: 10, src: CDN_IMAGES.gallery.interiors[4], title: "Modern Design", category: "interiors", description: "Contemporary interior styling" },
      // Ambiance category
      { id: 11, src: CDN_IMAGES.gallery.ambiance[0], title: "Serene Ambiance", category: "ambiance", description: "Peaceful environment perfect for pilgrims and families" },
      { id: 12, src: CDN_IMAGES.gallery.ambiance[1], title: "Tranquil Atmosphere", category: "ambiance", description: "Relaxing atmosphere for a comfortable stay" },
      { id: 13, src: CDN_IMAGES.gallery.ambiance[2], title: "Peaceful Setting", category: "ambiance", description: "Enjoy the calm and peaceful surroundings" },
      { id: 14, src: CDN_IMAGES.gallery.ambiance[3], title: "Cozy Environment", category: "ambiance", description: "Feel at home in our welcoming environment" },
      { id: 15, src: CDN_IMAGES.gallery.ambiance[4], title: "Homely Vibes", category: "ambiance", description: "Experience warmth and hospitality" }
    ],

    /**
     * CTA Section
     */
    cta: {
      title: "Ready to Experience This Yourself?",
      description: "Book your stay at Sri Hari Home Stay and create beautiful memories in Tirupati.",
      buttons: [
        { text: "Book Your Stay", link: "/booking", style: "primary" },
        { text: "View Rooms", link: "/rooms", style: "secondary" }
      ]
    }
  },

  // ===========================================================================
  // BOOKING PAGE
  // ===========================================================================
  booking: {
    /**
     * Hero Section
     */
    hero: {
      tagline: "Reserve Your Stay",
      title: "Book Your Perfect Room",
      description: "Choose your ideal room and let us make your stay unforgettable."
    },

    /**
     * Form Configuration
     */
    form: {
      title: "Booking Details",
      submitText: "Send Booking Request",
      successMessage: "Your booking details have been sent to our team via WhatsApp. We will confirm your reservation shortly.",
      note: "Your booking request will be sent to our team via WhatsApp for confirmation."
    }
  },

  // ===========================================================================
  // CONTACT PAGE
  // ===========================================================================
  contact: {
    /**
     * Hero Section
     */
    hero: {
      tagline: "Get in Touch",
      title: "Contact Sri Hari Home Stay",
      description: "We'd love to hear from you. Get in touch with us for reservations, inquiries, or feedback."
    },

    /**
     * Contact Information Cards
     */
    info: [
      {
        icon: "MapPin",
        title: "Address",
        content: [
          "Sri Hari Home Stay",
          "22-4-52/104",
          "Bank Employees Colony",
          "Mangalam, Tirupati",
          "Andhra Pradesh 517507"
        ],
        link: { text: "View on Google Maps →", url: SITE_CONFIG.social.googleMaps }
      },
      {
        icon: "Phone",
        title: "Phone",
        content: [SITE_CONFIG.contact.phone],
        note: "Available for reservations and inquiries",
        link: { text: SITE_CONFIG.contact.phone, url: `tel:${SITE_CONFIG.contact.phoneRaw}` }
      },
      {
        icon: "Mail",
        title: "WhatsApp",
        content: ["Chat with us directly on WhatsApp for quick responses"],
        link: { text: "Message on WhatsApp →", url: SITE_CONFIG.contact.whatsappLink }
      },
      {
        icon: "Mail",
        title: "Email",
        content: [SITE_CONFIG.contact.email],
        note: "We respond to emails within 2 hours during business hours",
        link: { text: SITE_CONFIG.contact.email, url: `mailto:${SITE_CONFIG.contact.email}` }
      },
      {
        icon: "Clock",
        title: "Hours",
        content: [
          "Reservations: 24/7",
          "Front Desk: 24/7",
          
        ]
      }
    ],

    /**
     * Contact Form
     */
    form: {
      title: "Send us a Message",
      description: "Have a specific question? Fill out the form below and we'll get back to you as soon as possible.",
      submitText: "Send Message",
      successMessage: "Thank you for reaching out. We'll contact you soon."
    },

    /**
     * FAQ Section
     */
    faq: [
      { question: "What is the check-in and check-out time?", answer: "We offer 24-hour check-in and check-out for your convenience." },
      { question: "Is parking available?", answer: "Yes, free parking is available for all our guests." },
      { question: "Do you offer WiFi?", answer: "Yes, high-speed WiFi is provided in all rooms complimentary." },
      { question: "Is the property family-friendly?", answer: "Absolutely! We are a family-friendly property with excellent facilities for families and groups." },
      { question: "What is the cancellation policy?", answer: "Please contact us directly for cancellation and refund policies." },
      { question: "How close are you to the temple?", answer: "We are located at a prime location, just a short distance from Lord Venkateswara Temple in Tirupati." }
    ]
  }
};

// =============================================================================
// COMPONENTS - Reusable component data (header, footer, navigation)
// =============================================================================

export const COMPONENTS = {
  /**
   * Header/Navigation
   */
  header: {
    logo: {
      text: SITE_CONFIG.name.charAt(0),
      name: SITE_CONFIG.name
    },
    navLinks: [
      { href: "/", label: "Home", icon: "Home" },
      { href: "/rooms", label: "Rooms", icon: "Bed" },
      { href: "/gallery", label: "Gallery", icon: "Camera" },
      { href: "/contact", label: "Contact", icon: "Phone" }
    ],
    cta: {
      text: "Book Now",
      href: "/booking"
    }
  },

  /**
   * Footer
   */
  footer: {
    brand: {
      name: SITE_CONFIG.name,
      logo: SITE_CONFIG.name.charAt(0),
      description: SITE_CONFIG.description
    },
    exploreLinks: [
      { label: "Our Rooms", href: "/rooms" },
      { label: "Gallery", href: "/gallery" },
      { label: "Guest Stories", href: "/reviews" }
    ],
    supportLinks: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faq" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ],
    contact: {
      address: SITE_CONFIG.address.full,
      phone: SITE_CONFIG.contact.phone,
      email: SITE_CONFIG.contact.email
    },
    social: [
      { name: "Facebook", url: SITE_CONFIG.social.facebook, icon: "Facebook" },
      { name: "Instagram", url: SITE_CONFIG.social.instagram, icon: "Instagram" }
    ],
    copyright: `© ${new Date().getFullYear()} ${SITE_CONFIG.name}.  ${SITE_CONFIG.address.city}.`
  },

  /**
   * Scroll to Top Button
   */
  scrollToTop: {
    showAfter: 300, // pixels scrolled before showing
    ariaLabel: "Scroll to top"
  }
};

// =============================================================================
// UTILITY FUNCTIONS - Helper functions for data access
// =============================================================================

/**
 * Get all images for a specific room category
 * @param {string} category - Category name (bedroom, hall, bathroom, balcony, kitchen)
 * @returns {string[]} Array of image URLs
 */
export const getRoomCategoryImages = (category) => {
  return CDN_IMAGES.roomspage[category] || [];
};

/**
 * Get all gallery images for a specific category
 * @param {string} category - Category name (all, rooms, interiors, ambiance)
 * @returns {Object[]} Array of image objects
 */
export const getGalleryImagesByCategory = (category) => {
  if (category === 'all') return PAGES.gallery.images;
  return PAGES.gallery.images.filter(img => img.category === category);
};

/**
 * Get browse areas filtered by category
 * @param {string} category - Category name (all, bedroom, hall, bathroom, balcony, kitchen)
 * @returns {Object[]} Array of area objects
 */
export const getBrowseAreasByCategory = (category) => {
  if (category === 'all') return PAGES.rooms.browseByArea.areas;
  return PAGES.rooms.browseByArea.areas.filter(area => area.category === category);
};

// =============================================================================
// DEFAULT EXPORT - All data combined
// =============================================================================

const DATA = {
  CDN_IMAGES,
  SITE_CONFIG,
  ROOM_CONFIG,
  PAGES,
  COMPONENTS,
  // Utility functions
  getRoomCategoryImages,
  getGalleryImagesByCategory,
  getBrowseAreasByCategory
};

export default DATA;
