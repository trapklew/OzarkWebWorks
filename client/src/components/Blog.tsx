import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

// TODO: Remove mock data when implementing real blog functionality
const blogPosts = [
  {
    title: "5 Ways a Mobile-Friendly Website Boosts Your Business in 2025",
    excerpt: "Discover how responsive design can dramatically increase your customer engagement and sales in today's mobile-first world.",
    author: "Kishahn Lewis",
    date: "March 15, 2025",
    category: "Web Design",
    readTime: "5 min read"
  },
  {
    title: "How to Sell Online: A Complete Guide for Missouri Businesses",
    excerpt: "Step-by-step guide to setting up your online store and reaching customers across the Ozark region and beyond.",
    author: "Kishahn Lewis", 
    date: "March 14, 2025",
    category: "E-commerce",
    readTime: "8 min read"
  },
  {
    title: "Local SEO Secrets: Getting Found in Springfield",
    excerpt: "Proven strategies to improve your local search rankings and attract more customers from the Springfield area.",
    author: "Kishahn Lewis",
    date: "March 13, 2025", 
    category: "SEO",
    readTime: "6 min read"
  }
];

export default function Blog() {
  const handleReadMore = (title: string) => {
    console.log(`Reading blog post: ${title}`);
    // TODO: Navigate to full blog post when backend is implemented
  };

  return (
    <section id="blog" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Latest Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tips, trends, and strategies to grow your business online
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-blog-${index}`}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="text-lg font-bold hover:text-primary transition-colors cursor-pointer" 
                         style={{ fontFamily: 'Poppins, sans-serif' }}
                         onClick={() => handleReadMore(post.title)}>
                  {post.title}
                </CardTitle>
                <CardDescription>
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleReadMore(post.title)}
                    className="text-primary hover:text-primary/80"
                    data-testid={`button-read-${index}`}
                  >
                    Read More <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  By {post.author}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            onClick={() => console.log('View all blog posts')}
            data-testid="button-view-all-posts"
          >
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
}