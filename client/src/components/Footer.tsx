import { Button } from '@/components/ui/button';
import { Facebook, Linkedin, Mail, Phone } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ozark Web Works
            </h3>
            <p className="text-muted-foreground mb-4">
              Building exceptional websites for southwest Missouri businesses. Local expertise, 
              digital excellence, and Ozark pride in every project.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.open('https://facebook.com', '_blank')}
                data-testid="social-facebook"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.open('https://linkedin.com', '_blank')}
                data-testid="social-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-home">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-services">
                  Services
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-about">
                  About
                </a>
              </li>
              <li>
                <a href="#blog" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-blog">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Service Areas</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/web-design/springfield" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-springfield">
                  Springfield, MO
                </Link>
              </li>
              <li>
                <Link href="/web-design/branson" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-branson">
                  Branson, MO
                </Link>
              </li>
              <li>
                <Link href="/web-design/joplin" className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-joplin">
                  Joplin, MO
                </Link>
              </li>
            </ul>
            <p className="text-muted-foreground text-sm mt-3">
              Serving the entire Ozarks region and beyond
            </p>
          </div>
        </div>

        {/* Contact Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8 pt-8 border-t border-border">
          <div className="md:col-span-4">
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:klewis@ozarkwebworks.com" className="hover:text-primary transition-colors" data-testid="footer-email">
                  klewis@ozarkwebworks.com
                </a>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                <a 
                  href="tel:+14179429738" 
                  className="hover:text-primary transition-colors" 
                  data-testid="footer-phone"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'phone_click', {
                        event_category: 'Contact',
                        event_label: 'Footer Phone',
                        value: 1
                      });
                    }
                  }}
                >
                  (417) 942-9738
                </a>
              </div>
              <p className="text-muted-foreground text-sm">
                Springfield, MO
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Ozark Web Works. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-2 sm:mt-0">
            Proudly serving Southwest Missouri
          </p>
        </div>
      </div>
    </footer>
  );
}