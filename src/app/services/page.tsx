'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ServiceImageCarousel from '@/components/service-image-carousel';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      title: 'Event Catering',
      description: "Planning a gathering? We create thoughtfully curated dessert spreads for any occasion — intimate dinners to large celebrations. Corporate events, weddings, or festive parties — we'll craft a menu that delights your guests and fits your vibe.",
      carouselName: 'Event Catering'
    },
    {
      title: 'Custom Orders',
      description: "From celebration cakes to curated dessert boxes, we bring your ideas to life. Have a flavor in mind or a specific vision? We'll create something just for you. Perfect for birthdays, weddings, or any sweet moment worth celebrating.",
      carouselName: 'Custom Orders'
    },
    {
      title: 'Baking Workshops',
      description: "Join our signature workshops throughout the year, or bring the fun to your space! Birthday parties, bridal showers, or cosy gatherings — we'll host a hands-on baking experience at your event.",
      carouselName: 'Baking Workshops'
    },
  ];

  return (
    <div className="container py-12 md:py-20">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">Our Services</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">Beyond the counter, we offer special services to make your events and celebrations even more memorable.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
        {services.map((service) => (
            <Card key={service.title} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <ServiceImageCarousel serviceName={service.carouselName as 'Event Catering' | 'Custom Orders' | 'Baking Workshops'} />
                <div className="flex-1 overflow-y-auto">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardContent>
                </div>
            </Card>
        ))}
      </div>

      <section className="mt-20 text-center bg-secondary py-16 rounded-lg px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-headline font-bold text-secondary-foreground">Have an Idea?</h2>
        <p className="mt-2 text-lg text-secondary-foreground/80 max-w-2xl mx-auto">We love a creative challenge! If you have a special request or a unique event, get in touch and let's create something wonderful together.</p>
        <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </section>
    </div>
  );
}
