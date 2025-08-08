"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import Fade from "embla-carousel-fade"

import { menuData, type MenuItem } from "@/lib/menu-data"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type FeaturedItem = MenuItem & { categorySlug: string; uniqueKey: string };

export default function FeaturedTreatsCarousel() {
  const [featuredItems, setFeaturedItems] = React.useState<FeaturedItem[]>([]);

  React.useEffect(() => {
    // Logic to get a diverse set of items
    const allItemsWithCategory = Object.entries(menuData).flatMap(([categoryKey, items]) => {
        const categorySlug = categoryKey.toLowerCase().replace(/ /g, '-');
        // Ensure we take at least one item from each category if available
        return items.slice(0, 2).map(item => ({ 
          ...item, 
          categorySlug,
          uniqueKey: `${categorySlug}-${item.name.replace(/ /g, '-')}` 
        }));
    });
    
    // Shuffle and pick
    const shuffled = [...allItemsWithCategory].sort(() => 0.5 - Math.random());
    setFeaturedItems(shuffled.slice(0, 8));
  }, []);
  
  const autoplayPlugin = React.useRef(
      Autoplay({ delay: 7000, stopOnInteraction: false })
  );

  const pairedItems = [];
  for (let i = 0; i < featuredItems.length; i += 2) {
    pairedItems.push(featuredItems.slice(i, i + 2));
  }

  if (featuredItems.length === 0) {
    return (
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden shadow-lg">
                <Skeleton className="w-full h-56" />
                <CardContent className="p-6 text-center">
                    <Skeleton className="h-7 w-3/4 mb-4 mx-auto" />
                    <Skeleton className="h-5 w-full mb-2 mx-auto" />
                    <Skeleton className="h-5 w-3/4 mx-auto" />
                </CardContent>
            </Card>
            <div className="hidden md:block">
              <Card className="overflow-hidden shadow-lg">
                  <Skeleton className="w-full h-56" />
                  <CardContent className="p-6 text-center">
                      <Skeleton className="h-7 w-3/4 mb-4 mx-auto" />
                      <Skeleton className="h-5 w-full mb-2 mx-auto" />
                      <Skeleton className="h-5 w-3/4 mx-auto" />
                  </CardContent>
              </Card>
            </div>
        </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Carousel
        plugins={[autoplayPlugin.current, Fade()]}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent className="embla--fade">
          {pairedItems.map((pair, index) => (
            <CarouselItem key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pair.map((item) => (
                  <Link
                    key={item.uniqueKey}
                    href={`/menu#${item.categorySlug}`}
                    className="block h-full"
                  >
                    <Card className="overflow-hidden shadow-lg flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
                      <div className="w-full h-56 overflow-hidden bg-card">
                        <Image
                          src={item.image}
                          alt={item.name}
                          data-ai-hint={item.hint}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6 text-center flex-grow flex flex-col justify-center min-h-[12rem]">
                        <CardTitle className="font-headline text-2xl">{item.name}</CardTitle>
                        <CardDescription as="div" className="mt-2 text-base space-y-2">
                          <p>{item.description}</p>
                          <p><span className="font-bold">Flavour Profile:</span> {item.flavourProfile}</p>
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
