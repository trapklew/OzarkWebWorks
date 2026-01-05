import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, ArrowRight, ArrowLeft, Search, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  thumbnail?: string;
  category: string;
  excerpt: string;
}

export default function BlogListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const categories = useMemo(() => {
    if (!posts) return [];
    const cats = [...new Set(posts.map(p => p.category))];
    return cats.sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    return posts.filter(post => {
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === null || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-home">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Web Design Insights
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" style={{ fontFamily: 'Lato, sans-serif' }}>
                Expert tips on web design, branding, and building your online presence for Springfield and Missouri businesses
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                  data-testid="input-blog-search"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    data-testid="button-clear-search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {categories.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                    data-testid="button-category-all"
                  >
                    All
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              )}

              {hasActiveFilters && (
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground"
                    data-testid="button-clear-filters"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear filters
                  </Button>
                </div>
              )}
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

          {posts && posts.length > 0 && filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <p className="text-muted-foreground text-lg mb-6">No articles match your search criteria.</p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            </div>
          )}

          {filteredPosts.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {filteredPosts.map((post) => (
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
                        <Badge 
                          variant="secondary" 
                          className="cursor-pointer"
                          onClick={() => setSelectedCategory(post.category)}
                          data-testid={`badge-category-${post.slug}`}
                        >
                          {post.category}
                        </Badge>
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

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredPosts.length} of {posts.length} {posts.length === 1 ? 'article' : 'articles'}
                  {hasActiveFilters && " (filtered)"}
                </p>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
