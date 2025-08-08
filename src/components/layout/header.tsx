"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/context/cart-context';
import CartSheet from '@/components/cart-sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';


const navItems = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
           <Image 
              src="/images/Ofour_logo.png" 
              alt="Ò Four Logo" 
              width={140} 
              height={56} 
              className="h-14 w-auto"
            />
            <span className="text-2xl font-bold font-headline text-primary">Ò Four</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-lg font-medium">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {cartCount}
                    </span>
                )}
                <span className="sr-only">Open cart</span>
            </Button>
            <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />

            <Button asChild className="hidden md:flex bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/order-now">Order Now</Link>
            </Button>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <SheetTitle>
                        <VisuallyHidden>Mobile Navigation Menu</VisuallyHidden>
                    </SheetTitle>
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between pb-4 border-b">
                        <Link href="/" className="flex items-center gap-3" onClick={() => setIsSheetOpen(false)}>
                            <Image 
                            src="/images/Ofour_logo.png" 
                            alt="Ò Four Logo" 
                            width={140} 
                            height={56} 
                            className="h-14 w-auto"
                            />
                            <span className="text-2xl font-bold font-headline text-primary">Ò Four</span>
                        </Link>
                            <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)}>
                                <X className="h-6 w-6" />
                                <span className="sr-only">Close menu</span>
                            </Button>
                        </div>
                        <nav className="flex flex-col items-start space-y-4 mt-6 text-lg">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} className="transition-colors hover:text-primary" onClick={() => setIsSheetOpen(false)}>
                            {item.label}
                            </Link>
                        ))}
                        </nav>
                        <Button asChild className="mt-auto bg-accent text-accent-foreground hover:bg-accent/90">
                            <Link href="/order-now" onClick={() => setIsSheetOpen(false)}>Order Now</Link>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
