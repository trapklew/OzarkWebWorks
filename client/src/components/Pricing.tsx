import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Sparkles, Star, CreditCard, Calendar } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ContactFormDialog from './ContactFormDialog';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const packages = [
  {
    name: "Starter",
    price: 499,
    promoPrice: 399,
    monthlyPrice: 69,
    monthlyTerm: 6,
    description: "Perfect for small businesses needing a simple online presence",
    turnaround: "1-2 weeks",
    revisions: 2,
    popular: false,
    features: [
      { name: "One-page responsive website", included: true },
      { name: "Multi-page site (up to 5 pages)", included: false },
      { name: "Custom logo design", included: false },
      { name: "Basic SEO & fast loading", included: true },
      { name: "Contact/inquiry forms", included: true },
      { name: "Payment integration", included: false },
      { name: "First month maintenance included", included: false },
    ],
    maintenance: "Add $49/mo"
  },
  {
    name: "Growth",
    price: 1199,
    promoPrice: 959,
    monthlyPrice: 169,
    monthlyTerm: 6,
    description: "Best value for growing businesses - includes custom logo",
    turnaround: "2-3 weeks",
    revisions: 3,
    popular: true,
    features: [
      { name: "One-page responsive website", included: true },
      { name: "Multi-page site (up to 5 pages)", included: true },
      { name: "Custom logo design", included: true },
      { name: "Basic SEO & fast loading", included: true },
      { name: "Contact/inquiry forms", included: true },
      { name: "Payment integration", included: true },
      { name: "First month maintenance included", included: false },
    ],
    maintenance: "Add $49/mo"
  },
  {
    name: "Complete",
    price: 1599,
    promoPrice: 1279,
    monthlyPrice: 219,
    monthlyTerm: 6,
    description: "Everything you need to launch and maintain your business online",
    turnaround: "2-4 weeks",
    revisions: 4,
    popular: false,
    features: [
      { name: "One-page responsive website", included: true },
      { name: "Multi-page site (up to 5 pages)", included: true },
      { name: "Custom logo design", included: true },
      { name: "Basic SEO & fast loading", included: true },
      { name: "Contact/inquiry forms", included: true },
      { name: "Payment integration", included: true },
      { name: "First month maintenance included", included: true },
    ],
    maintenance: "$49/mo included"
  }
];

const addOns = [
  { name: "Extra pages or major revisions", price: "$99 each" },
  { name: "Standalone custom logo", price: "Starting at $199 ($159 with promo)" },
  { name: "Monthly maintenance & support", price: "$49/month" },
  { name: "Domain registration & hosting setup", price: "~$15-25/year" },
];

export default function Pricing() {
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [paymentType, setPaymentType] = useState<"one-time" | "monthly">("one-time");

  const handleGetStarted = (packageName: string, price: number, isMonthly: boolean = false, monthlyTerm?: number) => {
    const paymentInfo = isMonthly ? ` (${monthlyTerm}-month payment plan at $${price}/mo)` : '';
    setSelectedPackage(`${packageName}${paymentInfo}`);
    setContactOpen(true);
    
    // Track pricing CTA click in Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'pricing_cta_click', {
        event_category: 'Engagement',
        event_label: packageName,
        value: 1,
        package_price: price,
        payment_type: isMonthly ? 'monthly' : 'one-time'
      });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Affordable Web Design for Ozark Small Businesses
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparent Pricing, No Hidden Fees
          </p>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6 mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg text-primary" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Limited-Time Launch Promo
            </span>
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <p className="text-xl font-bold text-foreground mb-1">
            First 5 Clients Only: 20% OFF any package + Free First Month of Maintenance!
          </p>
          <p className="text-muted-foreground text-sm">
            Offer ends soon - let's get your site live!
          </p>
        </motion.div>

        <motion.p 
          className="text-center text-muted-foreground max-w-3xl mx-auto mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I'm passionate about helping local SMBs and startups get a professional online presence without the big-city price tag. 
          These packages are designed to be budget-friendly, with everything you need to get started fast. 
          Custom needs? Just ask - I'm flexible!
        </motion.p>

        <motion.div 
          className="flex justify-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className="inline-flex items-center bg-muted rounded-lg p-1" data-testid="payment-toggle">
            <button
              onClick={() => setPaymentType("one-time")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                paymentType === "one-time" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid="button-one-time"
            >
              <CreditCard className="h-4 w-4" />
              One-Time Payment
            </button>
            <button
              onClick={() => setPaymentType("monthly")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                paymentType === "monthly" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid="button-monthly"
            >
              <Calendar className="h-4 w-4" />
              Monthly Payments
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {packages.map((pkg, index) => (
            <motion.div key={index} variants={fadeInUp} transition={{ duration: 0.5 }}>
              <Card 
                className={`relative hover-elevate transition-all duration-300 h-full ${pkg.popular ? 'border-primary border-2 shadow-lg' : ''}`}
                data-testid={`card-pricing-${pkg.name.toLowerCase()}`}
              >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {pkg.name}
                </CardTitle>
                <div className="mt-4">
                  {paymentType === "one-time" ? (
                    <>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-3xl font-bold text-foreground">${pkg.promoPrice}</span>
                        <span className="text-lg text-muted-foreground line-through">${pkg.price}</span>
                      </div>
                      <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary">
                        Save ${pkg.price - pkg.promoPrice} with promo
                      </Badge>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-3xl font-bold text-foreground">${pkg.monthlyPrice}</span>
                        <span className="text-lg text-muted-foreground">/mo</span>
                      </div>
                      <Badge variant="secondary" className="mt-2 bg-secondary text-secondary-foreground">
                        {pkg.monthlyTerm} months (${pkg.monthlyPrice * pkg.monthlyTerm} total)
                      </Badge>
                    </>
                  )}
                </div>
                <CardDescription className="mt-3">
                  {pkg.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground/40 mr-2 flex-shrink-0" />
                      )}
                      <span className={feature.included ? '' : 'text-muted-foreground/60'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="border-t pt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Revisions:</span>
                    <span className="font-medium text-foreground">Up to {pkg.revisions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Turnaround:</span>
                    <span className="font-medium text-foreground">{pkg.turnaround}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maintenance:</span>
                    <span className="font-medium text-foreground">{pkg.maintenance}</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  variant={pkg.popular ? "default" : "outline"}
                  onClick={() => handleGetStarted(
                    pkg.name, 
                    paymentType === "monthly" ? pkg.monthlyPrice : pkg.promoPrice,
                    paymentType === "monthly",
                    pkg.monthlyTerm
                  )}
                  data-testid={`button-get-started-${pkg.name.toLowerCase()}`}
                >
                  Get Started
                </Button>
              </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="bg-muted/30 rounded-lg p-8">
          <h3 className="text-xl font-bold text-center mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Add-Ons & Extras
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-background rounded-lg p-4 text-center">
                <p className="font-medium text-foreground mb-1">{addon.name}</p>
                <p className="text-primary font-bold">{addon.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground space-y-2">
          <p>Choose one-time payment for the best value, or spread payments over 6 months with our monthly plan.</p>
          <p>All sites are mobile-friendly, secure, and built to grow with your business.</p>
          <p>Hosting/domain costs are separate and low (~$10-20/year).</p>
          <p>"Starting at" allows flexibility for custom requests - contact me for a free quote!</p>
        </div>
      </div>

      <ContactFormDialog 
        open={contactOpen} 
        onOpenChange={setContactOpen}
        defaultMessage={selectedPackage ? `I'm interested in the ${selectedPackage} package.` : undefined}
      />
    </section>
  );
}
