import { CakeSlice, Cookie, Coffee, Slice, Square, Wheat } from 'lucide-react';
import { menuData, type MenuItem } from '@/lib/menu-data';
import OrderItemCard from '@/components/order-item-card';

const MenuCategory = ({ title, icon, items }: { title: string, icon: React.ReactNode, items: MenuItem[]}) => (
  <section id={title.toLowerCase().replace(/ /g, '-')} className="mb-16 scroll-mt-28 md:scroll-mt-24">
    <div className="flex items-center gap-4 mb-8">
      {icon}
      <h2 className="text-3xl md:text-4xl font-headline font-bold">{title}</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
      {items.map((item) => (
        <OrderItemCard key={item.name} item={item} />
      ))}
    </div>
  </section>
);

export default function OrderNowPage() {
  const menuCategories = [
    { title: "Breads", icon: <Wheat className="w-10 h-10 text-primary" />, items: menuData.breads },
    { title: "Cakes", icon: <CakeSlice className="w-10 h-10 text-primary" />, items: menuData.cakes },
    { title: "Cheesecakes", icon: <CakeSlice className="w-10 h-10 text-primary" />, items: menuData.cheesecakes },
    { title: "Cookies", icon: <Cookie className="w-10 h-10 text-primary" />, items: menuData.cookies },
    { title: "Tea Cakes", icon: <Coffee className="w-10 h-10 text-primary" />, items: menuData.teaCakes },
    { title: "Tarts and Pies", icon: <Slice className="w-10 h-10 text-primary" />, items: menuData.tartsAndPies },
    { title: "Brownies", icon: <Square className="w-10 h-10 text-primary" />, items: menuData.brownies },
  ];

  const getSlug = (title: string) => title.toLowerCase().replace(/ /g, '-');

  return (
    <div className="container py-12 md:py-20">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">Place Your Order</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-4xl mx-auto">
          Add items to your cart and click the cart icon in the top right to finalize your order.
        </p>
      </header>
      
      <div className="flex flex-col md:flex-row md:gap-12 max-w-6xl mx-auto">
        {/* Desktop Navigation */}
        <aside className="hidden md:block md:w-60 md:sticky top-24 self-start h-[calc(100vh-8rem)] overflow-y-auto pr-4">
          <h3 className="text-2xl font-headline font-bold mb-4">Categories</h3>
          <nav className="flex flex-col gap-3">
            {menuCategories.map(category => (
              <a 
                key={category.title} 
                href={`#${getSlug(category.title)}`}
                className="text-lg text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-x-1"
              >
                {category.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Mobile Navigation and Main Content */}
        <main className="flex-1">
           {/* Mobile Navigation */}
          <nav className="md:hidden sticky top-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 z-40 -mx-4 px-4 mb-8 border-b">
            <div className="flex overflow-x-auto space-x-2">
                {menuCategories.map(category => (
                <a 
                    key={category.title} 
                    href={`#${getSlug(category.title)}`}
                    className="text-base font-semibold text-muted-foreground hover:text-primary transition-colors whitespace-nowrap px-3 py-1 rounded-md"
                >
                    {category.title}
                </a>
                ))}
            </div>
          </nav>

          <div className="space-y-16">
            {menuCategories.map(({ title, icon, items }) => (
              <MenuCategory key={title} title={title} icon={icon} items={items} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
