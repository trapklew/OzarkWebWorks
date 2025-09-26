import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import logoImage from '@assets/Logo Transparency 3(1)_1758923496623.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md border-b border-border/50 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-3 py-2">
              <div className="relative">
                <img 
                  src={logoImage} 
                  alt="Ozark Web Works Logo" 
                  className="h-12 w-12 transition-transform duration-300 hover:scale-105"
                  data-testid="logo-image"
                />
              </div>
              <div>
                <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-primary' : 'text-white'
                }`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Ozark Web Works
                </h1>
                <p className={`text-sm transition-colors duration-300 ${
                  isScrolled ? 'text-muted-foreground' : 'text-white/80'
                }`}>
                  Springfield, MO
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {['Home', 'Services', 'About', 'Blog', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  isScrolled
                    ? 'text-foreground hover:text-primary hover:bg-primary/10'
                    : 'text-white hover:text-primary hover:bg-white/10 backdrop-blur-sm'
                }`}
                data-testid={`link-${item.toLowerCase()}`}
              >
                {item}
              </a>
            ))}
            <Button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className={`ml-4 transition-all duration-300 hover:scale-105 ${
                isScrolled
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30'
              }`}
              data-testid="button-get-quote"
            >
              Get Quote
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-all duration-300 ${
                isScrolled
                  ? 'text-foreground hover:text-primary hover:bg-primary/10'
                  : 'text-white hover:text-primary hover:bg-white/10 backdrop-blur-sm'
              }`}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-background/95 backdrop-blur-md border-t border-border/50">
              {['Home', 'Services', 'About', 'Blog', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300 font-medium"
                  data-testid={`mobile-link-${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Button
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="mobile-button-get-quote"
              >
                Get Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}