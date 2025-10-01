import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, Briefcase, Palette, Settings, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: "Simple Website Design",
    subtitle: "Perfect for Small Businesses",
    description: "This is a 'brochure style' website consisting of a single page that highlights your Springfield business to potential customers. Clean, professional, and effective for establishing your online presence in the Ozarks region.",
    features: ["Single-page professional design", "Mobile-responsive layout", "Contact information prominently displayed", "Fast loading and SEO-optimized"]
  },
  {
    icon: Briefcase,
    title: "Basic Portfolio or Product Website",
    subtitle: "Showcase Your Work & Accept Payments",
    description: "Are you a Photographer, Hair Stylist, or Artist in the Springfield area? Do you need a site where you can take payments and someone can view your work/services and learn more about you? We create portfolio and product-based websites that help Missouri creatives and service providers grow their business.",
    features: ["Portfolio/product showcase", "Secure payment integration", "Service/product descriptions", "Customer inquiry forms"]
  },
  {
    icon: Palette,
    title: "Logo Design",
    subtitle: "Your Brand's First Impression",
    description: "Your logo is your customer's first impression of your brand, and it should instill confidence and set the stage for their experience. We design memorable logos for Springfield and Ozarks businesses that capture your unique identity and resonate with Missouri customers.",
    features: ["Custom logo concepts", "Multiple revision rounds", "All file formats provided", "Brand style guide included"]
  },
  {
    icon: Settings,
    title: "Maintenance/Service Plan",
    subtitle: "Keep Your Site Secure & Updated",
    description: "We can take on the stress of making sure your site is protected, maintained, backed up, and secure off your shoulders so you can focus on running your Springfield business. Our maintenance plans ensure your Missouri website stays fast, safe, and up-to-date.",
    features: ["Regular security updates", "Automated backups", "Performance monitoring", "Priority technical support"]
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
            From simple brochure sites to complete portfolio websites, logo design, and ongoing maintenance - we provide everything Springfield and Ozarks businesses need to succeed online
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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