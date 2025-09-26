import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import logoImage from '@assets/Logo Transparency 3(1)_1758923496623.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-3">
              <img 
                src={logoImage} 
                alt="Ozark Web Works Logo" 
                className="h-10 w-10"
                data-testid="logo-image"
              />
              <h1 className="text-xl font-bold text-primary" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Ozark Web Works
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors" data-testid="link-home">
              Home
            </a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors" data-testid="link-services">
              Services
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors" data-testid="link-about">
              About
            </a>
            <a href="#blog" className="text-foreground hover:text-primary transition-colors" data-testid="link-blog">
              Blog
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors" data-testid="link-contact">
              Contact
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t">
              <a href="#home" className="block px-3 py-2 text-foreground hover:text-primary transition-colors" data-testid="mobile-link-home">
                Home
              </a>
              <a href="#services" className="block px-3 py-2 text-foreground hover:text-primary transition-colors" data-testid="mobile-link-services">
                Services
              </a>
              <a href="#about" className="block px-3 py-2 text-foreground hover:text-primary transition-colors" data-testid="mobile-link-about">
                About
              </a>
              <a href="#blog" className="block px-3 py-2 text-foreground hover:text-primary transition-colors" data-testid="mobile-link-blog">
                Blog
              </a>
              <a href="#contact" className="block px-3 py-2 text-foreground hover:text-primary transition-colors" data-testid="mobile-link-contact">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}