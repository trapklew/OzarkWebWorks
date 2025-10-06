import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
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
      
      <main className="flex-1 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="mb-8" data-testid="button-back-blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading post...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-destructive">Failed to load blog post. Please try again later.</p>
            </div>
          )}

          {post && (
            <article>
              {post.thumbnail && (
                <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                    data-testid="img-featured"
                  />
                </div>
              )}

              <header className="mb-8">
                <h1 
                  className="text-4xl sm:text-5xl font-bold text-foreground mb-4" 
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  data-testid="text-post-title"
                >
                  {post.title}
                </h1>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <time dateTime={post.date} data-testid="text-post-date">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </header>

              <div 
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: post.content }}
                data-testid="content-post-body"
              />

              <div className="mt-12 pt-8 border-t">
                <Link href="/blog">
                  <Button variant="outline" data-testid="button-back-to-blog">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    View All Posts
                  </Button>
                </Link>
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
