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