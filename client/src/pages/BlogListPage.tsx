import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  thumbnail?: string;
  excerpt: string;
}

export default function BlogListPage() {
  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-home">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Web Design Insights
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" style={{ fontFamily: 'Lato, sans-serif' }}>
                Expert tips on web design, branding, and building your online presence for Springfield and Missouri businesses
              </p>
            </div>
          </div>

          {isLoading && (
            <div className="text-center py-20">
              <div className="inline-block animate-pulse">
                <p className="text-muted-foreground text-lg">Loading blog posts...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-destructive text-lg mb-4">Failed to load blog posts.</p>
              <p className="text-muted-foreground">Please try again later.</p>
            </div>
          )}

          {posts && posts.length === 0 && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <p className="text-muted-foreground text-lg mb-6">No blog posts yet. Check back soon for web design insights!</p>
                <Link href="/">
                  <Button variant="outline">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {posts && posts.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post) => (
                  <Card key={post.slug} className="hover-elevate transition-all duration-300 flex flex-col h-full" data-testid={`card-blog-${post.slug}`}>
                    {post.thumbnail && (
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                        <img 
                          src={post.thumbnail} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader className="flex-1">
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <Badge variant="secondary" data-testid={`badge-category-${post.slug}`}>Article</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </time>
                        </div>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <CardTitle className="text-xl font-bold hover:text-primary transition-colors cursor-pointer mb-3 line-clamp-2" 
                                 style={{ fontFamily: 'Poppins, sans-serif' }}
                                 data-testid={`title-${post.slug}`}>
                          {post.title}
                        </CardTitle>
                      </Link>
                      <CardDescription className="line-clamp-3" style={{ fontFamily: 'Lato, sans-serif' }}>
                        {post.excerpt}...
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Link href={`/blog/${post.slug}`}>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-primary hover:text-primary/80 w-full justify-center"
                          data-testid={`button-read-${post.slug}`}
                        >
                          Read Article <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {posts.length > 6 && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Showing {posts.length} {posts.length === 1 ? 'article' : 'articles'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
