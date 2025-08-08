'use client';

import type { AddToCartPayload } from '@/context/cart-context';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
    item: AddToCartPayload;
}

export default function AddToCartButton({ item }: AddToCartButtonProps) {
    const { addToCart } = useCart();

    return (
        <Button 
            className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => addToCart(item)}
        >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
    );
}
