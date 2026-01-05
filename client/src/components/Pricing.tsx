import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Sparkles, Star } from 'lucide-react';
import { useState } from 'react';
import ContactFormDialog from './ContactFormDialog';

const packages = [
  {
    name: "Starter",
    price: 499,
    promoPrice: 399,
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

  const handleGetStarted = (packageName: string, price: number) => {
    setSelectedPackage(packageName);
    setContactOpen(true);
    
    // Track pricing CTA click in Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'pricing_cta_click', {
        event_category: 'Engagement',
        event_label: packageName,
        value: 1,
        package_price: price
      });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Affordable Web Design for Ozark Small Businesses
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparent Pricing, No Hidden Fees
          </p>
        </div>

        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6 mb-12 text-center">
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
        </div>

        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
          I'm passionate about helping local SMBs and startups get a professional online presence without the big-city price tag. 
          These packages are designed to be budget-friendly, with everything you need to get started fast. 
          Custom needs? Just ask - I'm flexible!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <Card 
              key={index} 
              className={`relative hover-elevate transition-all duration-300 ${pkg.popular ? 'border-primary border-2 shadow-lg' : ''}`}
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
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-foreground">${pkg.promoPrice}</span>
                    <span className="text-lg text-muted-foreground line-through">${pkg.price}</span>
                  </div>
                  <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary">
                    Save ${pkg.price - pkg.promoPrice} with promo
                  </Badge>
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
                  onClick={() => handleGetStarted(pkg.name, pkg.promoPrice)}
                  data-testid={`button-get-started-${pkg.name.toLowerCase()}`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

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
          <p>Prices are one-time for design; hosting/domain costs are separate and low (~$10-20/year).</p>
          <p>All sites are mobile-friendly, secure, and built to grow with your business.</p>
          <p>"Starting at" allows flexibility for custom requests - contact me for a free quote!</p>
          <p>Payment plans available (e.g., 50% upfront, balance on launch).</p>
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
