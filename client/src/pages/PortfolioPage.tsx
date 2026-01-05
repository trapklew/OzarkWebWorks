import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ExternalLink, Globe, TrendingUp, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  location: string;
  category: string;
  thumbnail: string;
  description: string;
  results: { label: string; value: string }[];
  services: string[];
  testimonial?: { quote: string; author: string; role: string };
}

const caseStudies: CaseStudy[] = [
  {
    id: "springfield-cafe",
    title: "Modern Website Redesign",
    client: "Downtown Springfield Cafe",
    location: "Springfield, MO",
    category: "Restaurant",
    thumbnail: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop",
    description: "Transformed a dated website into a modern, mobile-friendly experience with online ordering integration and local SEO optimization that doubled their online visibility.",
    results: [
      { label: "Increase in Online Orders", value: "150%" },
      { label: "Google Maps Ranking", value: "Top 3" },
      { label: "Mobile Traffic Increase", value: "200%" }
    ],
    services: ["Web Design", "Local SEO", "Mobile Optimization"],
    testimonial: {
      quote: "Our new website has completely changed how customers find us. We're getting orders from people who never knew we existed!",
      author: "Sarah M.",
      role: "Owner"
    }
  },
  {
    id: "branson-tours",
    title: "Tourism Booking Platform",
    client: "Ozark Adventure Tours",
    location: "Branson, MO",
    category: "Tourism",
    thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop",
    description: "Built a comprehensive booking system for a Branson tourism company, featuring real-time availability, secure payments, and automated confirmation emails.",
    results: [
      { label: "Booking Conversion Rate", value: "+85%" },
      { label: "Phone Inquiries Reduced", value: "60%" },
      { label: "Revenue Growth", value: "120%" }
    ],
    services: ["E-Commerce", "Booking System", "Payment Integration"],
    testimonial: {
      quote: "The booking system Ozark Web Works built has saved us countless hours and our customers love how easy it is to reserve tours online.",
      author: "Mike R.",
      role: "Operations Manager"
    }
  },
  {
    id: "joplin-retail",
    title: "E-Commerce Launch",
    client: "Heartland Crafts & Gifts",
    location: "Joplin, MO",
    category: "Retail",
    thumbnail: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop",
    description: "Launched a full e-commerce store for a local artisan shop, enabling them to sell Missouri-made products to customers across the state and beyond.",
    results: [
      { label: "New Revenue Stream", value: "35%" },
      { label: "Product Listings", value: "200+" },
      { label: "Out-of-State Orders", value: "40%" }
    ],
    services: ["E-Commerce", "Product Photography", "SEO"],
    testimonial: {
      quote: "We went from a small local shop to shipping products across Missouri and beyond. Our online store opened up a whole new world for us.",
      author: "Jennifer L.",
      role: "Owner"
    }
  }
];

const categories = ["All", "Restaurant", "Tourism", "Retail"];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredStudies = selectedCategory === "All" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-home">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Our Work</Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Portfolio & Case Studies
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" style={{ fontFamily: 'Lato, sans-serif' }}>
                Real results for real Ozarks businesses. See how we've helped local companies grow their online presence and attract more customers.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`button-filter-${category.toLowerCase()}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-16">
            {filteredStudies.map((study, index) => (
              <Card key={study.id} className="overflow-hidden" data-testid={`card-case-study-${study.id}`}>
                <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`relative aspect-video lg:aspect-auto ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img 
                      src={study.thumbnail} 
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                        {study.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="mb-2 text-sm text-muted-foreground flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      {study.location}
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {study.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {study.client}
                    </p>
                    <p className="text-muted-foreground mb-6" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {study.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.services.map((service) => (
                        <Badge key={service} variant="outline">
                          {service}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {study.results.map((result, i) => (
                        <div key={i} className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-xl lg:text-2xl font-bold text-primary" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {result.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {result.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {study.testimonial && (
                      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                        "{study.testimonial.quote}"
                        <footer className="mt-2 text-sm not-italic">
                          <strong>{study.testimonial.author}</strong>, {study.testimonial.role}
                        </footer>
                      </blockquote>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Card className="p-8 lg:p-12 bg-primary/5 border-primary/20">
              <div className="max-w-2xl mx-auto">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl lg:text-3xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Ready to Be Our Next Success Story?
                </h3>
                <p className="text-muted-foreground mb-6" style={{ fontFamily: 'Lato, sans-serif' }}>
                  Join dozens of Ozarks businesses that have transformed their online presence. 
                  Let's discuss how we can help grow your business.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/#contact">
                    <Button size="lg" data-testid="button-get-started">
                      Get Your Free Consultation
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/#pricing">
                    <Button variant="outline" size="lg" data-testid="button-view-pricing">
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <Users className="h-5 w-5" />
              <span style={{ fontFamily: 'Lato, sans-serif' }}>
                New case studies added as projects are completed
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
