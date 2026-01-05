import { Button } from '@/components/ui/button';
import heroImage from '@assets/generated_images/Ozark_mountains_landscape_hero_afee8616.png';

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with eager loading for above-fold content */}
      <div className="absolute inset-0">
        <img 
          src={heroImage}
          alt="Ozark Mountains landscape"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Flying Birds Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Bird 1 */}
        <div className="bird bird-1">
          <svg width="20" height="20" viewBox="0 0 24 24" className="text-white/60">
            <path fill="currentColor" d="M2.5 19c1.74-3.14 4.45-6.42 7.5-7.5c2.91-.83 6.73-.36 10 2.5c.67-.89 1.29-1.88 1.8-2.95C19.23 7.5 15.22 6.5 12 6.5s-7.23 1-9.8 4.55C1.71 12.12 2.08 15.78 2.5 19M12 2c1.33 0 2.71.21 4 .67C14.67 4.12 13.34 5.5 12 6.5C10.66 5.5 9.33 4.12 8 2.67C9.29 2.21 10.67 2 12 2z"/>
          </svg>
        </div>
        
        {/* Bird 2 */}
        <div className="bird bird-2">
          <svg width="16" height="16" viewBox="0 0 24 24" className="text-white/50">
            <path fill="currentColor" d="M2.5 19c1.74-3.14 4.45-6.42 7.5-7.5c2.91-.83 6.73-.36 10 2.5c.67-.89 1.29-1.88 1.8-2.95C19.23 7.5 15.22 6.5 12 6.5s-7.23 1-9.8 4.55C1.71 12.12 2.08 15.78 2.5 19M12 2c1.33 0 2.71.21 4 .67C14.67 4.12 13.34 5.5 12 6.5C10.66 5.5 9.33 4.12 8 2.67C9.29 2.21 10.67 2 12 2z"/>
          </svg>
        </div>
        
        {/* Bird 3 */}
        <div className="bird bird-3">
          <svg width="18" height="18" viewBox="0 0 24 24" className="text-white/40">
            <path fill="currentColor" d="M2.5 19c1.74-3.14 4.45-6.42 7.5-7.5c2.91-.83 6.73-.36 10 2.5c.67-.89 1.29-1.88 1.8-2.95C19.23 7.5 15.22 6.5 12 6.5s-7.23 1-9.8 4.55C1.71 12.12 2.08 15.78 2.5 19M12 2c1.33 0 2.71.21 4 .67C14.67 4.12 13.34 5.5 12 6.5C10.66 5.5 9.33 4.12 8 2.67C9.29 2.21 10.67 2 12 2z"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Professional Web Design & Development, Done Right
        </h1>
        <p className="text-xl sm:text-2xl mb-8 text-gray-200">
          Expert web design services for Springfield, Missouri and the greater Ozarks region. From simple brochure sites to portfolio websites, professional logo design, and ongoing maintenance plans - we help local businesses establish and maintain their online presence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => {
              scrollToContact();
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'hero_cta_click', {
                  event_category: 'Engagement',
                  event_label: 'Get Started Today',
                  value: 1
                });
              }
            }}
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
