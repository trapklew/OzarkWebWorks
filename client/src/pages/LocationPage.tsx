import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, MapPin, Phone, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import ContactFormDialog from '@/components/ContactFormDialog';

const locations: Record<string, {
  city: string;
  region: string;
  description: string;
  highlights: string[];
  nearby: string[];
}> = {
  'springfield': {
    city: 'Springfield',
    region: 'Southwest Missouri',
    description: "As the third-largest city in Missouri and the heart of the Ozarks, Springfield is home to thousands of thriving small businesses. From restaurants on Commercial Street to retail shops in downtown, I help Springfield businesses create professional websites that attract local customers and compete in today's digital marketplace.",
    highlights: [
      "Local knowledge of Springfield's business community",
      'Fast turnaround for Springfield-area businesses',
      'In-person meetings available in the Springfield area',
      'Understanding of local SEO for Greene County'
    ],
    nearby: ['Nixa', 'Ozark', 'Republic', 'Willard', 'Strafford']
  },
  'branson': {
    city: 'Branson',
    region: 'Taney County',
    description: "Branson welcomes millions of tourists each year, making a strong online presence essential for local businesses. Whether you run a show theater, restaurant, attraction, or vacation rental, I create websites that help Branson businesses stand out and capture visitor attention before they even arrive in town.",
    highlights: [
      'Tourism-focused website design',
      'Mobile-first approach for travelers',
      'Integration with booking systems',
      'Local SEO for Branson entertainment district'
    ],
    nearby: ['Hollister', 'Forsyth', 'Kimberling City', 'Reeds Spring', 'Rockaway Beach']
  },
  'joplin': {
    city: 'Joplin',
    region: 'Jasper County',
    description: "Joplin's business community has shown remarkable resilience and growth. As a regional hub for southwest Missouri and the Four States area, Joplin businesses need websites that serve customers across state lines. I help Joplin entrepreneurs and established businesses alike build their digital presence.",
    highlights: [
      'Experience with Four States regional businesses',
      'E-commerce solutions for retail shops',
      'Service-area business websites',
      'Multi-location business support'
    ],
    nearby: ['Webb City', 'Carl Junction', 'Carthage', 'Neosho', 'Miami OK']
  },
  'nixa': {
    city: 'Nixa',
    region: 'Christian County',
    description: "Nixa is one of the fastest-growing cities in Missouri, with new businesses opening regularly. I help Nixa's entrepreneurs and small business owners establish a professional online presence that grows with their business, from simple starter sites to full e-commerce solutions.",
    highlights: [
      'Serving one of Missouri\'s fastest-growing cities',
      'Affordable packages for new businesses',
      'Growth-ready website solutions',
      'Quick access from Springfield headquarters'
    ],
    nearby: ['Ozark', 'Springfield', 'Republic', 'Highlandville', 'Clever']
  },
  'ozark': {
    city: 'Ozark',
    region: 'Christian County',
    description: "The city of Ozark combines small-town charm with growing commercial opportunities. From the historic downtown square to new developments, I help Ozark businesses create websites that reflect their unique character while attracting new customers from across the region.",
    highlights: [
      'Understanding of Ozark\'s unique community',
      'Historic business and new startup support',
      'Local business network connections',
      'Christian County SEO expertise'
    ],
    nearby: ['Nixa', 'Springfield', 'Sparta', 'Highlandville', 'Rogersville']
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export default function LocationPage() {
  const { location } = useParams<{ location: string }>();
  const [contactOpen, setContactOpen] = useState(false);
  
  const locationData = locations[location?.toLowerCase() || ''];

  if (!locationData) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Location Not Found</h1>
            <p className="text-muted-foreground mb-8">
              Sorry, I don't have a dedicated page for this location yet.
            </p>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 text-primary mb-4">
                <MapPin className="h-5 w-5" />
                <span className="text-sm font-medium uppercase tracking-wide">{locationData.region}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Web Design in {locationData.city}, Missouri
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Professional, affordable website design for {locationData.city} small businesses. 
                Get a custom website that helps you stand out and attract more local customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => setContactOpen(true)} data-testid="button-location-cta">
                  Get a Free Quote
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:4179429738">
                    <Phone className="h-4 w-4 mr-2" />
                    (417) 942-9738
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Your Local {locationData.city} Web Designer
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {locationData.description}
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {locationData.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-3 p-4 rounded-lg bg-muted/30"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{highlight}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Web Design Services for {locationData.city} Businesses
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From simple one-page sites to complete business websites with custom logos and ongoing maintenance.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } }
              }}
            >
              {[
                { title: 'Starter', price: '$499', desc: 'One-page responsive website perfect for getting started' },
                { title: 'Growth', price: '$1,199', desc: 'Multi-page site with custom logo and payment integration' },
                { title: 'Complete', price: '$1,599', desc: 'Everything you need plus first month maintenance free' },
              ].map((pkg, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full hover-elevate">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {pkg.title}
                      </h3>
                      <p className="text-2xl font-bold text-primary mb-3">{pkg.price}</p>
                      <p className="text-muted-foreground text-sm">{pkg.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="text-center mt-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <Link href="/#pricing">
                <Button variant="outline">
                  View Full Pricing
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Nearby Areas */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Also Serving Nearby Areas
              </h2>
              <p className="text-muted-foreground mb-6">
                I provide web design services throughout {locationData.region} and the greater Ozarks, including:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {locationData.nearby.map((area, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss your {locationData.city} business website. Book a free consultation or send me a message to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => setContactOpen(true)} data-testid="button-location-cta-bottom">
                  Request Free Quote
                </Button>
                <Link href="/#consultation">
                  <Button size="lg" variant="outline">
                    Book Free Consultation
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ContactFormDialog 
        open={contactOpen} 
        onOpenChange={setContactOpen}
        defaultMessage={`I'm interested in web design services for my ${locationData.city} business.`}
      />
    </div>
  );
}
