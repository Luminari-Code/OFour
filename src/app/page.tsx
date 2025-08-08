import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import FeaturedTreatsCarousel from '@/components/featured-treats-carousel';
import { testimonials as allTestimonials } from '@/lib/testimonials-data';

export const revalidate = 300; // Revalidate every 5 minutes (in seconds)

export default function Home() {
  const testimonials = [...allTestimonials].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <div className="flex flex-col items-center">
      <section className="w-full h-[60vh] md:h-[80vh] relative flex items-center justify-center text-center text-white px-4 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full z-0 brightness-50"
          style={{ objectFit: 'cover' }}
        >
          <source src="/images/MainPage_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold font-headline drop-shadow-lg">Ò Four</h1>
          <p className="mt-4 text-lg md:text-2xl max-w-2xl">Baked with Love, Served with a Smile.</p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6 px-8">
            <Link href="/order-now">Order Online</Link>
          </Button>
        </div>
      </section>

      <section className="w-full max-w-6xl py-12 md:py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-headline text-center font-bold">Featured Treats</h2>
        <p className="text-center text-muted-foreground mt-2 mb-10">Handpicked favorites, fresh from our oven.</p>
        <FeaturedTreatsCarousel />
      </section>
      
      <div className="w-full max-w-6xl px-4">
        <Separator/>
      </div>

      <section className="w-full max-w-6xl py-12 md:py-20 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Story</h2>
              <div className="mt-4 text-lg text-muted-foreground space-y-4">
                <p>
                  Ò Four is a community-driven bakery that grew from a home kitchen passion project. Named after the French &quot;Au Four&quot; (in the oven), we&apos;re built on craft, patience, and genuine connections.
                </p>
                <p>
                  Drawing from experience at The Ritz-Carlton, Pune, every recipe is meticulously tested and refined. Many of our bestselling flavors actually came from customer suggestions and community input. We believe in slow baking, fresh serving, and keeping it real — no shortcuts.
                </p>
              </div>
              <Button asChild variant="link" className="mt-4 text-lg px-0 text-primary">
                <Link href="/about">Learn More About Us &rarr;</Link>
              </Button>
            </div>
            <div>
              <Image 
                src="/images/ChefImage.jpg" 
                alt="Our bakers at work" 
                data-ai-hint="chef portrait"
                width={600}
                height={400}
                className="rounded-lg shadow-xl w-full"
              />
            </div>
        </div>
      </section>

      <div className="w-full max-w-6xl px-4">
        <Separator/>
      </div>

      <section className="w-full max-w-6xl py-12 md:py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-headline text-center font-bold">What Our Customers Say</h2>
        <p className="text-center text-muted-foreground mt-2 mb-10">Sweet words from our sweet customers.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col bg-secondary shadow-lg">
              <CardHeader>
                <div className="flex text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={i < testimonial.rating ? "fill-accent" : "text-transparent stroke-current"} />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-secondary-foreground/90 italic">"{testimonial.review}"</p>
              </CardContent>
              <CardFooter>
                <p className="font-bold text-secondary-foreground w-full text-right">- {testimonial.name}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <div className="w-full max-w-6xl px-4">
        <Separator/>
      </div>

      <section className="w-full max-w-6xl py-12 md:py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold">Visit Us</h2>
        <div className="mt-8 text-lg flex flex-col md:flex-row justify-center gap-8 md:gap-16">
          <div className="md:text-left">
            <h3 className="font-bold font-headline text-xl">Our Hours</h3>
            <p className="mt-2">Tuesday - Friday: 7am - 6pm</p>
            <p>Saturday - Sunday: 8am - 4pm</p>
            <p>Monday: Closed</p>
          </div>
          <div className="md:text-left">
            <h3 className="font-bold font-headline text-xl">Our Location</h3>
            <p className="mt-2">Kalyaninagar, Pune.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
