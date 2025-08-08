"use client"

import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import Fade from "embla-carousel-fade"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const imageMap = {
    'Event Catering': {
        paths: ['/images/Event Catering/1.jpg', '/images/Event Catering/2.jpg'],
        hint: 'catering pastry platter'
    },
    'Custom Orders': {
        paths: ['/images/Custom Orders/1.jpg', '/images/Custom Orders/2.jpg', '/images/Custom Orders/3.jpg'],
        hint: 'custom celebration cake'
    },
    'Baking Workshops': {
        paths: ['/images/Baking Workshops/1.jpg', '/images/Baking Workshops/2.jpg', '/images/Baking Workshops/3.jpg'],
        hint: 'baking class'
    }
}

interface ServiceImageCarouselProps {
    serviceName: keyof typeof imageMap;
    containerClassName?: string;
    imageClassName?: string;
    showControls?: boolean;
}

export default function ServiceImageCarousel({ serviceName, containerClassName, imageClassName, showControls = false }: ServiceImageCarouselProps) {
  const imageConfig = imageMap[serviceName];
  
  const autoplayPlugin = React.useRef(
      Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  if (!imageConfig) {
    return <div className="w-full h-80 bg-card"><Skeleton className="w-full h-full" /></div>
  }

  return (
      <Carousel
        plugins={[autoplayPlugin.current, Fade()]}
        opts={{ loop: true }}
        className={cn("w-full h-80 overflow-hidden bg-card relative group", containerClassName)}
      >
        <CarouselContent className="embla--fade h-full">
          {imageConfig.paths.map((path, index) => (
            <CarouselItem key={index} className="h-full">
                <Image
                    src={path}
                    alt={`${serviceName} image ${index + 1}`}
                    data-ai-hint={imageConfig.hint}
                    width={600}
                    height={400}
                    className={cn("w-full h-full object-cover", imageClassName)}
                    unoptimized
                />
            </CarouselItem>
          ))}
        </CarouselContent>
        {showControls && (
            <>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
        )}
      </Carousel>
  );
}
