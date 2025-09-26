import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, ShoppingCart, Headphones, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: "Responsive Web Design",
    subtitle: "Look Great on Every Device",
    description: "Custom responsive websites designed for Springfield and Missouri businesses. Our mobile-first designs ensure your site looks exceptional on all devices while optimizing for local search visibility.",
    features: ["Mobile-first responsive design", "Springfield local SEO optimization", "Fast loading performance", "Google-friendly structure"]
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    subtitle: "Start Selling Online Today",
    description: "Full-featured e-commerce websites for Missouri businesses ready to sell online. From product catalogs to secure checkout, we build online stores that convert visitors into customers throughout the Ozarks region.",
    features: ["Secure payment integration", "Inventory management system", "Mobile-optimized shopping", "Local pickup options"]
  },
  {
    icon: Headphones,
    title: "SEO & Digital Marketing",
    subtitle: "Get Found by Local Customers",
    description: "Local SEO services specifically designed for Springfield and Missouri businesses. We help you dominate local search results and attract more customers from your service area through proven optimization strategies.",
    features: ["Springfield local search optimization", "Google My Business management", "Missouri-focused keyword targeting", "Local citation building"]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Web Design & Development Services in Springfield, MO
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive digital solutions tailored for Springfield, Missouri businesses and the broader Ozarks region - from responsive website design to e-commerce development and local SEO services
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