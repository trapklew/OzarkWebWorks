import { Button } from '@/components/ui/button';
import heroImage from '@assets/generated_images/Ozark_mountains_landscape_hero_afee8616.png';

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Flying Birds Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Bird 1 */}
          <div className="bird bird-1">
            <svg width="24" height="18" viewBox="0 0 32 24" className="text-white/60">
              <path fill="currentColor" d="M2 12c0-1 1-2 3-3c2-1 5-1 7 0c1 0 2 1 3 2c1-1 2-2 3-2c2-1 5-1 7 0c2 1 3 2 3 3c0 1-1 2-3 3c-2 1-5 1-7 0c-1 0-2-1-3-2c-1 1-2 2-3 2c-2 1-5 1-7 0c-2-1-3-2-3-3z"/>
              <path fill="currentColor" d="M8 8c1-2 3-4 6-4c3 0 5 2 6 4c-1-1-2-2-4-2c-2 0-4 1-4 2c0-1-2-2-4-2c-2 0-3 1-4 2z"/>
            </svg>
          </div>
          
          {/* Bird 2 */}
          <div className="bird bird-2">
            <svg width="20" height="14" viewBox="0 0 28 20" className="text-white/50">
              <path fill="currentColor" d="M1 10c0-1 1-2 3-2c2-1 4-1 6 0c1 0 2 1 2 1c0-1 1-1 2-1c2-1 4-1 6 0c2 0 3 1 3 2c0 1-1 2-3 2c-2 1-4 1-6 0c-1 0-2-1-2-1c0 1-1 1-2 1c-2 1-4 1-6 0c-2 0-3-1-3-2z"/>
              <path fill="currentColor" d="M6 6c1-1 2-3 5-3c3 0 4 2 5 3c-1 0-2-1-3-1c-1 0-2 0-2 1c0-1-1-1-2-1c-1 0-2 1-3 1z"/>
            </svg>
          </div>
          
          {/* Bird 3 */}
          <div className="bird bird-3">
            <svg width="22" height="16" viewBox="0 0 30 22" className="text-white/40">
              <path fill="currentColor" d="M1 11c0-1 1-2 4-3c2-1 5-1 7 0c1 0 2 1 3 2c1-1 2-2 3-2c2-1 5-1 7 0c3 1 4 2 4 3c0 1-1 2-4 3c-2 1-5 1-7 0c-1 0-2-1-3-2c-1 1-2 2-3 2c-2 1-5 1-7 0c-3-1-4-2-4-3z"/>
              <path fill="currentColor" d="M7 7c1-2 3-4 7-4c4 0 6 2 7 4c-1-1-3-2-5-2c-2 0-4 1-4 2c0-1-2-2-4-2c-2 0-4 1-5 2z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Springfield's Premier Web Design & Development Company
        </h1>
        <p className="text-xl sm:text-2xl mb-8 text-gray-200">
          Expert web design services for Springfield, Missouri and the greater Ozarks region. We create custom websites, e-commerce stores, and SEO-optimized digital solutions that help local businesses thrive online.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={scrollToContact}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            data-testid="button-get-started"
          >
            Get Started Today
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
            data-testid="button-learn-more"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}