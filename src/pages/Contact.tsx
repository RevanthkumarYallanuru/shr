/**
 * ============================================================================
 * CONTACT PAGE
 * ============================================================================
 * All data sourced from centralized data.js file.
 * Sections: Hero, Contact Info & Map, Contact Form
 */

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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

// =============================================================================
// ICON MAPPING
// =============================================================================
const iconMap: Record<string, React.ElementType> = {
  MapPin,
  Phone,
  Mail,
  Clock,
};

// =============================================================================
// MAIN CONTACT PAGE COMPONENT
// =============================================================================
export default function ContactPage() {
  const { toast } = useToast();
  
  // Get data from centralized source
  const { hero, info, form } = PAGES.contact;

  return (
    <>
      <SEOHead
        title={SITE_CONFIG.pageSEO.contact.title}
        description={SITE_CONFIG.pageSEO.contact.description}
        keywords={SITE_CONFIG.pageSEO.contact.keywords}
        canonicalPath="/contact"
      />
      <article className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="section-container text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-medium text-sm tracking-wider uppercase"
          >
            {hero.tagline.toUpperCase()}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            {hero.description}
          </motion.p>
        </div>
      </section>

      {/* Contact Details & Map */}
      <section className="py-16 lg:py-24">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeInUp} className="mb-12">
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">Contact Information</h2>
                <p className="text-muted-foreground">Reach out to us through any of these methods.</p>
              </motion.div>

              <div className="space-y-8">
                {/* Address Card */}
                <motion.div variants={fadeInUp} className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-foreground mb-2">Address</h3>
                      <p className="text-muted-foreground mb-2">
                        {SITE_CONFIG.name}<br />
                        {SITE_CONFIG.address.line1}<br />
                        {SITE_CONFIG.address.area}<br />
                        {SITE_CONFIG.address.locality}, {SITE_CONFIG.address.city}<br />
                        {SITE_CONFIG.address.state} {SITE_CONFIG.address.pincode}
                      </p>
                      <a
                        href={SITE_CONFIG.social.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                      >
                        View on Google Maps →
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Phone Card */}
                <motion.div variants={fadeInUp} className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-foreground mb-2">Phone</h3>
                      <p className="text-muted-foreground mb-2">
                        <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className="hover:text-accent transition-colors">
                          {SITE_CONFIG.contact.phone}
                        </a>
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Available for reservations and inquiries
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* WhatsApp Card */}
                <motion.div variants={fadeInUp} className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-foreground mb-2">WhatsApp</h3>
                      <p className="text-muted-foreground mb-3">
                        Chat with us directly on WhatsApp for quick responses
                      </p>
                      <a
                        href={SITE_CONFIG.contact.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                      >
                        Message on WhatsApp →
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Email Card */}
                <motion.div variants={fadeInUp} className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-foreground mb-2">Email</h3>
                      <p className="text-muted-foreground mb-2">
                        <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-accent transition-colors">
                          {SITE_CONFIG.contact.email}
                        </a>
                      </p>
                      <p className="text-muted-foreground text-sm">
                        We respond to emails within 2 hours during business hours
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Hours Card */}
                <motion.div variants={fadeInUp} className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-foreground mb-2">Hours</h3>
                      <p className="text-muted-foreground">
                        {info.find(item => item.title === "Hours")?.content.map((line, idx, arr) => (
                          <span key={idx}>
                            {line}
                            {idx < arr.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="card-premium overflow-hidden h-full min-h-[400px] relative"
            >
              <div className="w-full h-full min-h-[400px] lg:min-h-[600px] relative">
                <iframe
                  src={SITE_CONFIG.social.googleMapsEmbed}
                  title="Sri Hari Home Stay Location Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Contact Form Section */}
      <section className="py-20 bg-secondary">
        <div className="section-container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{form.title}</h2>
            <p className="text-muted-foreground">
              {form.description}
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card-premium p-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              toast({
                title: "Message Sent!",
                description: form.successMessage,
              });
              (e.target as HTMLFormElement).reset();
            }}
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
              <input
                type="tel"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <textarea
                required
                rows={5}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>

            <Button type="submit" className="btn-gold w-full text-white">
              {form.submitText}
            </Button>
          </motion.form>
        </div>
      </section>
    </article>
    </>
  );
}
