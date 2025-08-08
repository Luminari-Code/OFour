
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import type { MenuItem } from '@/lib/menu-data';
import type { AddToCartPayload } from '@/context/cart-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import AddToCartButton from '@/components/add-to-cart-button';

interface OrderItemCardProps {
    item: MenuItem;
}

type Variant = {
    size: string;
    price: string;
}

export default function OrderItemCard({ item }: OrderItemCardProps) {
    const variants: Variant[] = useMemo(() => {
        // Specifically check for cookie pricing format to avoid showing variants
        if (item.price.includes('/ 250g')) {
            return [{ size: 'Standard', price: item.price }];
        }

        const priceParts = item.price.split(' / ');
        if (priceParts.length > 1) {
             return [
                { size: '0.5kg', price: priceParts[0].trim() },
                { size: '1kg', price: priceParts[1].trim() },
            ];
        }
        return [{ size: 'Standard', price: item.price }];
    }, [item.price]);

    const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0]);

    const itemForCart: AddToCartPayload = {
        name: variants.length > 1 ? `${item.name} (${selectedVariant.size})` : item.name,
        price: selectedVariant.price,
        id: `${item.name}-${selectedVariant.size}`,
        image: item.image,
    };

    return (
        <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
          <div className="w-full h-48 overflow-hidden bg-card">
            <Image 
              src={item.image} 
              alt={item.name} 
              data-ai-hint={item.hint} 
              width={600} 
              height={400} 
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle className="font-headline text-xl">{item.name}</CardTitle>
            <p className="text-lg font-semibold text-primary">{item.price}</p>
          </CardHeader>
          <CardContent className="flex-grow">
            <CardDescription as="div" className="text-base space-y-2">
              <p>{item.description}</p>
              <p><span className="font-bold">Flavour Profile:</span> {item.flavourProfile}</p>
            </CardDescription>
            {variants.length > 1 && (
                <div className="mt-4">
                    <Label className="font-semibold">Select Size:</Label>
                    <RadioGroup 
                        value={selectedVariant.size}
                        onValueChange={(size) => {
                            const newVariant = variants.find(v => v.size === size);
                            if (newVariant) setSelectedVariant(newVariant);
                        }}
                        className="mt-2 space-y-1"
                    >
                       {variants.map(variant => (
                         <div key={variant.size} className="flex items-center space-x-2">
                             <RadioGroupItem value={variant.size} id={`${item.name}-${variant.size}`} />
                             <Label htmlFor={`${item.name}-${variant.size}`}>{variant.size} ({variant.price})</Label>
                         </div>
                       ))}
                    </RadioGroup>
                </div>
            )}
          </CardContent>
          <CardFooter>
            <AddToCartButton item={itemForCart} />
          </CardFooter>
        </Card>
    );
}
