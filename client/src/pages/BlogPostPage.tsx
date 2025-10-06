import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, ArrowLeft, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  thumbnail?: string;
  content: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug;

  const { data: post, isLoading, error } = useQuery<BlogPostData>({
    queryKey: ["/api/blog", slug],
    enabled: !!slug,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="mb-8" data-testid="button-back-blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {isLoading && (
            <div className="text-center py-20">
              <div className="inline-block animate-pulse">
                <p className="text-muted-foreground text-lg">Loading article...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-destructive text-lg mb-4">Failed to load blog post.</p>
              <p className="text-muted-foreground mb-6">Please try again later.</p>
              <Link href="/blog">
                <Button variant="outline">
                  View All Posts
                </Button>
              </Link>
            </div>
          )}

          {post && (
            <article>
              {post.thumbnail && (
                <div className="aspect-[21/9] w-full overflow-hidden rounded-xl mb-10 shadow-lg">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                    data-testid="img-featured"
                  />
                </div>
              )}

              <header className="mb-10">
                <Badge variant="secondary" className="mb-4">Article</Badge>
                
                <h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight" 
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  data-testid="text-post-title"
                >
                  {post.title}
                </h1>
                
                <div className="flex items-center gap-6 text-muted-foreground flex-wrap" style={{ fontFamily: 'Lato, sans-serif' }}>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Kishahn Lewis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date} className="text-sm" data-testid="text-post-date">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </div>
              </header>

              <Separator className="mb-10" />

              <div 
                className="prose prose-lg max-w-none dark:prose-invert
                           prose-headings:font-poppins prose-headings:font-bold prose-headings:text-foreground
                           prose-p:font-lato prose-p:text-foreground prose-p:leading-relaxed
                           prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                           prose-strong:text-foreground prose-strong:font-semibold
                           prose-ul:font-lato prose-ol:font-lato
                           prose-li:text-foreground
                           prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                           prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                           prose-img:rounded-lg prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: post.content }}
                data-testid="content-post-body"
              />

              <Separator className="mt-16 mb-10" />

              <div className="flex items-center justify-between flex-wrap gap-4">
                <Link href="/blog">
                  <Button variant="outline" data-testid="button-back-to-blog">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    View All Posts
                  </Button>
                </Link>
                
                <div className="text-sm text-muted-foreground">
                  <p>Written by <span className="font-semibold text-foreground">Kishahn Lewis</span></p>
                  <p>Ozark Web Works • Springfield, MO</p>
                </div>
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
