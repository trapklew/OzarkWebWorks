import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, Briefcase, Palette, Settings, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: "Starter Package",
    subtitle: "Starting at $499",
    description: "I'll create a clean, single-page site designed to showcase your business at a glance. Perfect for making a strong first impression and giving potential customers the key details they need.",
    features: ["One-page responsive design", "Mobile-friendly layout", "Contact forms included", "SEO-optimized & fast loading"]
  },
  {
    icon: Briefcase,
    title: "Growth Package",
    subtitle: "Starting at $1,199 (includes logo)",
    description: "My best value package for growing businesses. I'll build you a multi-page website with custom logo design, payment integration, and everything you need to scale online.",
    features: ["Up to 5 pages", "Custom logo design included", "Payment integration", "Portfolio/product showcase"]
  },
  {
    icon: Palette,
    title: "Complete Package",
    subtitle: "Starting at $1,599",
    description: "I'll provide everything you need to launch and maintain your business online. Includes all Growth features plus your first month of maintenance free.",
    features: ["All Growth features", "First month maintenance free", "Priority support", "Up to 4 revisions"]
  },
  {
    icon: Settings,
    title: "Maintenance Plan",
    subtitle: "$49/month",
    description: "I'll handle the behind-the-scenes care of your website. From updates and backups to security and performance, I'll make sure your site stays reliable so you can focus on running your business.",
    features: ["Regular security updates", "Automated backups", "Performance monitoring", "Priority technical support"]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            What I Offer
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I offer affordable web design packages for Springfield and Ozarks businesses - from simple single-page sites to complete multi-page websites with custom logos
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