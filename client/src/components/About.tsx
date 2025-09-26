import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Award } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Your Springfield Web Design Partner
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Based in Springfield, Missouri, Ozark Web Works is deeply rooted in the southwest Missouri business community. We specialize in creating custom websites, e-commerce solutions, and local SEO strategies that help Springfield businesses compete effectively in the digital marketplace.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              As proud members of the Springfield Area Chamber of Commerce, we understand the unique challenges facing businesses throughout the Ozarks region. Our local expertise combined with cutting-edge web technologies delivers solutions that drive real growth for Missouri businesses.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're a startup in downtown Springfield, an established business in Branson, or expanding throughout southwest Missouri, we provide the digital foundation your business needs to succeed online.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>

            <Button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-start-project"
            >
              Start Your Project
            </Button>
          </div>

          {/* Image and Info Cards */}
          <div className="space-y-6">
            {/* Placeholder for team photo */}
            <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-2" />
                <p>Team Photo Coming Soon</p>
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <Card className="p-4">
                <CardContent className="flex items-center space-x-4 p-0">
                  <MapPin className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Springfield, MO</h4>
                    <p className="text-sm text-muted-foreground">Serving the entire Ozarks region</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardContent className="flex items-center space-x-4 p-0">
                  <Award className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Chamber Member</h4>
                    <p className="text-sm text-muted-foreground">Springfield Area Chamber of Commerce</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}