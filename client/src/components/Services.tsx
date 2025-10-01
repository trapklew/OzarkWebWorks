import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, Briefcase, Palette, Settings, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: "Simple Website Design",
    subtitle: "Perfect for Small Businesses",
    description: "A clean, single-page site designed to showcase your business at a glance. Perfect for making a strong first impression and giving potential customers the key details they need.",
    features: ["Single-page professional design", "Mobile-responsive layout", "Contact information prominently displayed", "Fast loading and SEO-optimized"]
  },
  {
    icon: Briefcase,
    title: "Basic Portfolio or Product Website",
    subtitle: "Showcase Your Work & Accept Payments",
    description: "An easy-to-manage site built for creatives and entrepreneurs. Whether you're a photographer, stylist, or artist, this option lets you share your work, highlight your services, and even accept payments online.",
    features: ["Portfolio/product showcase", "Secure payment integration", "Service/product descriptions", "Customer inquiry forms"]
  },
  {
    icon: Palette,
    title: "Logo Design",
    subtitle: "Your Brand's First Impression",
    description: "Your logo is the face of your brand. I'll create a design that captures your identity, builds trust, and sets the foundation for a lasting impression.",
    features: ["Custom logo concepts", "Multiple revision rounds", "All file formats provided", "Brand style guide included"]
  },
  {
    icon: Settings,
    title: "Maintenance / Service Plan",
    subtitle: "Keep Your Site Secure & Updated",
    description: "Let me handle the behind-the-scenes care of your website. From updates and backups to security and performance, I'll make sure your site stays reliable so you can focus on running your business.",
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