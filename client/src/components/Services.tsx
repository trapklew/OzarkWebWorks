import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, ShoppingCart, Headphones, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: "Responsive Web Design",
    subtitle: "Look Great on Every Device",
    description: "Custom websites that work perfectly on desktop, tablet, and mobile devices. Modern, professional designs tailored to your southwest Missouri business.",
    features: ["Mobile-first design", "Fast loading times", "SEO optimized", "Cross-browser compatible"]
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Setup",
    subtitle: "Sell Online, Anytime",
    description: "Complete online store solutions with secure payment integration through PayPal, Stripe, and more. Start selling to customers across the Ozark region and beyond.",
    features: ["Secure payment processing", "Inventory management", "Order tracking", "Customer accounts"]
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    subtitle: "Keep Your Site Running Smoothly",
    description: "Reliable maintenance and support services to keep your website updated, secure, and performing at its best. Local Springfield support you can count on.",
    features: ["Regular updates", "Security monitoring", "Backup services", "Technical support"]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive web solutions designed for southwest Missouri businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-service-${index}`}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {service.title}
                </CardTitle>
                <CardDescription className="text-primary font-medium">
                  {service.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}