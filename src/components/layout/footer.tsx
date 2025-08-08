import Link from 'next/link';
import { Facebook, Instagram, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container py-8 flex flex-col items-center justify-center gap-6 text-center">
        <div className="flex flex-col items-center gap-y-2">
            <p className="text-sm text-secondary-foreground">
              &copy; {new Date().getFullYear()} Ò Four. All rights reserved.
            </p>
            <p className="text-sm text-secondary-foreground/80">
              Developed with love in India by <span className="font-bold">Luminari</span>
            </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://www.facebook.com/profile.php?id=61572523539961&mibextid=wwXIfr&mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://www.instagram.com/_o.four/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://wa.me/919822493951" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <Phone className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
