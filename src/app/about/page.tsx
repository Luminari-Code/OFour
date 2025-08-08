import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-20">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">About Ò Four</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">Discover the passion, people, and tradition behind every delicious bite.</p>
      </header>

      <section className="space-y-20 mt-16 max-w-5xl mx-auto">
        <h2 className="text-4xl font-headline font-bold text-primary text-center">Our Story</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-lg text-foreground/80 space-y-4">
            <p>
              Ò Four is more than a name; it’s a promise. A playful nod to the French “Au Four” (in the oven), it captures the warmth and magic we aim to bake into every creation. This journey began in a home kitchen, fueled by a simple passion for getting things right.
            </p>
            <p>
              That meant countless hours spent testing, refining, and sometimes reimagining recipes over a hundred times. From sleepless nights to happy accidents, every item on our menu is a testament to that persistence, flavour, and love.
            </p>
          </div>
          <div className="flex justify-center">
            <Image 
              src="/images/Our Story 1.jpg"
              alt="Close up of a freshly baked good"
              data-ai-hint="freshly baked"
              width={500}
              height={333}
              className="rounded-lg shadow-lg w-full max-w-md"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-last">
            <div className="text-lg text-foreground/80 space-y-4">
               <p>
                While professional discipline was honed at The Ritz-Carlton, Pune—learning to blend precision with soul—it was the community that truly shaped us. Ò Four became a space built on connection.
              </p>
              <p>
                Many of our signature flavours came not from a recipe book, but from late-night DMs, on-the-spot suggestions, and lively menu-testing sessions with the friends and customers who believed in this from the beginning.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Image 
              src="/images/Our Story 2.jpg"
              alt="Baker kneading dough"
              data-ai-hint="kneading dough"
              width={500}
              height={333}
              className="rounded-lg shadow-lg w-full max-w-md"
            />
          </div>
        </div>
        
        <div className="text-center text-lg text-foreground/80 max-w-3xl mx-auto">
             <p>
              This bakery was built for you, and with you. That's our commitment: to bake slow, serve fresh, and always keep it real.
            </p>
        </div>

      </section>

      <Separator className="my-16 max-w-5xl mx-auto"/>

      <section className="text-center max-w-5xl mx-auto">
        <h2 className="text-3xl font-headline font-bold text-primary">Our Philosophy</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <div className="p-6">
            <h3 className="text-2xl font-headline font-semibold">Only the Good Stuff</h3>
            <p className="mt-2 text-muted-foreground">Great flavor starts with great ingredients. From quality creams to fragrant spices and couverture chocolate — everything is thoughtfully sourced with no shortcuts. If we wouldn't serve it to our family, it doesn't make the menu.</p>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-headline font-semibold">Baked, Not Frozen</h3>
            <p className="mt-2 text-muted-foreground">We never pre-make and freeze. Everything is baked fresh in small batches, right before it reaches you. No cold storage, no shortcuts — just that just-out-of-the-oven warmth in every bite.</p>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-headline font-semibold">Made for You, with You</h3>
            <p className="mt-2 text-muted-foreground">Every menu item exists because someone asked for it or inspired it. Our customers have been co-creators from day one. We bake what you love — and we love when you tell us what that is.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
