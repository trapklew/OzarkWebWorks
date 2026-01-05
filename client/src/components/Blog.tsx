import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  thumbnail?: string;
  category: string;
  excerpt: string;
}

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const recentPosts = posts?.slice(0, 3) || [];

  return (
    <section id="blog" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Latest Web Design Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert tips on web design, branding, and building your online presence for Springfield and Missouri businesses
          </p>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading latest posts...</p>
          </div>
        )}

        {!isLoading && recentPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No blog posts yet. Check back soon for web design insights!</p>
          </div>
        )}

        {!isLoading && recentPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.slug} className="hover-elevate transition-all duration-300" data-testid={`card-blog-${post.slug}`}>
                {post.thumbnail && (
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img 
                      src={post.thumbnail} 
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <CardTitle className="text-lg font-bold hover:text-primary transition-colors cursor-pointer" 
                             style={{ fontFamily: 'Poppins, sans-serif' }}
                             data-testid={`title-${post.slug}`}>
                      {post.title}
                    </CardTitle>
                  </Link>
                  <CardDescription>
                    {post.excerpt}...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/blog/${post.slug}`}>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-primary hover:text-primary/80"
                      data-testid={`button-read-${post.slug}`}
                    >
                      Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button 
              variant="outline" 
              data-testid="button-view-all-posts"
            >
              View All Posts
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
