import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CakeSlice, Cookie, Coffee, Slice, Square, Wheat } from 'lucide-react';
import Image from 'next/image';
import { menuData, type MenuItem } from '@/lib/menu-data';

const MenuCategory = ({ title, icon, items }: { title: string, icon: React.ReactNode, items: MenuItem[]}) => (
  <section id={title.toLowerCase().replace(/ /g, '-')} className="mb-16 scroll-mt-20">
    <div className="flex items-center gap-4 mb-8">
      {icon}
      <h2 className="text-3xl md:text-4xl font-headline font-bold">{title}</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
      {items.map((item) => (
        <Card key={item.name} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
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
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default function MenuPage() {
  return (
    <div className="container py-12 md:py-20">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">Our Menu</h1>
        <p className="text-lg text-muted-foreground mt-2">Freshly baked delights for every taste.</p>
      </header>
      
      <MenuCategory title="Breads" icon={<Wheat className="w-10 h-10 text-primary" />} items={menuData.breads} />
      <MenuCategory title="Cakes" icon={<CakeSlice className="w-10 h-10 text-primary" />} items={menuData.cakes} />
      <MenuCategory title="Cheesecakes" icon={<CakeSlice className="w-10 h-10 text-primary" />} items={menuData.cheesecakes} />
      <MenuCategory title="Cookies" icon={<Cookie className="w-10 h-10 text-primary" />} items={menuData.cookies} />
      <MenuCategory title="Tea Cakes" icon={<Coffee className="w-10 h-10 text-primary" />} items={menuData.teaCakes} />
      <MenuCategory title="Tarts and Pies" icon={<Slice className="w-10 h-10 text-primary" />} items={menuData.tartsAndPies} />
      <MenuCategory title="Brownies" icon={<Square className="w-10 h-10 text-primary" />} items={menuData.brownies} />
    </div>
  );
}
