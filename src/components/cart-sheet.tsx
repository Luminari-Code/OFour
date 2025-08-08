
'use client';

import { useState, useTransition, useMemo, useEffect, useCallback } from 'react';
import { useCart, type Coupon } from '@/context/cart-context';
import { addDays, format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarIcon, Trash2, Plus, Minus, Loader2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { sendOrderEmail, checkPhoneNumber } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import allCoupons from '../../coupons.json';


interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discount,
    finalTotal 
  } = useCart();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const [message, setMessage] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handlePlaceOrder = () => {
    if (!deliveryDate || !name || phoneNumber.length < 10) return;

    // Format the date to a 'yyyy-MM-dd' string to avoid timezone issues
    const deliveryDateString = format(deliveryDate, 'yyyy-MM-dd');

    startTransition(async () => {
      const result = await sendOrderEmail({
        cartItems,
        cartTotal: finalTotal,
        name,
        phoneNumber,
        deliveryDate: deliveryDateString, // Pass the formatted string
        message,
        couponCode: appliedCoupon?.code,
      });

      if (result.success) {
        toast({
          title: "Order Placed!",
          description: "Your order has been sent. We'll be in touch shortly.",
        });
        clearCart();
        setName('');
        setPhoneNumber('');
        setDeliveryDate(undefined);
        setMessage('');
        setIsFirstTimeUser(false);
        onOpenChange(false);
      } else {
        toast({
          title: "Error",
          description: result.error || "There was a problem placing your order. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    setDeliveryDate(date);
    setIsCalendarOpen(false);
  };
  
  // Debounce function
  const debounce = <F extends (...args: any[]) => any>(func: F, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<F>): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Debounced phone number check
  const debouncedCheckPhoneNumber = useCallback(
    debounce(async (number: string) => {
      if (number.length >= 10) {
        const { isNew } = await checkPhoneNumber({ phoneNumber: number });
        setIsFirstTimeUser(isNew);
      } else {
        setIsFirstTimeUser(true); // Default to true if number is not complete
      }
    }, 500),
    []
  );
  
  useEffect(() => {
    debouncedCheckPhoneNumber(phoneNumber);
  }, [phoneNumber, debouncedCheckPhoneNumber]);


  const allCouponsList = useMemo(() => {
     return Object.entries(allCoupons as Record<string, Coupon>);
  }, []);
  
  const isCouponEligible = useCallback((coupon: Coupon) => {
      if (!coupon.condition) return true;
      
      const conditions = [
        !coupon.condition.minCartValue || cartTotal >= coupon.condition.minCartValue,
        !coupon.condition.firstOrder || isFirstTimeUser
      ];

      return conditions.every(Boolean);
  }, [cartTotal, isFirstTimeUser]);


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            Your Cart
          </SheetTitle>
          <SheetDescription>
            Review your items and place your order. Payment will be coordinated shortly.
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="flex-grow pr-4 -mr-6">
          {cartItems.length > 0 ? (
            <div className="py-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover w-16 h-16"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.isFree ? 'Free' : item.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      disabled={item.isFree}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      disabled={item.isFree}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeFromCart(item.id)}
                    disabled={item.isFree}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Separator />

              <div className="w-full space-y-4">
                
                 <div className="space-y-2 text-right">
                  <div className="flex justify-between items-center text-md">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p>₹{cartTotal.toFixed(2)}</p>
                  </div>
                  {appliedCoupon && (
                     <div className="flex justify-between items-center text-md text-green-600">
                        <p className="text-muted-foreground">Discount ({appliedCoupon.code})</p>
                        <p>- ₹{discount.toFixed(2)}</p>
                     </div>
                  )}
                  <Separator className="my-1"/>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <p>Total Amount</p>
                    <p>₹{finalTotal.toFixed(2)}</p>
                  </div>
                   <p className='text-xs font-normal text-muted-foreground text-right'>(Payment will be coordinated shortly)</p>
                   <p className='text-xs font-normal text-muted-foreground text-right'>Additional delivery charges may apply.</p>
                </div>
                
                <Separator className="my-2" />

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your 10-digit phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                   <Collapsible open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                      <CollapsibleTrigger asChild>
                         <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !deliveryDate && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {deliveryDate ? format(deliveryDate, 'PPP') : <span>Pick a delivery date</span>}
                          </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="flex justify-center pt-2">
                           <Calendar
                              mode="single"
                              selected={deliveryDate}
                              onSelect={handleDateSelect}
                              disabled={{ before: addDays(new Date(), 2) }}
                              initialFocus
                            />
                        </div>
                      </CollapsibleContent>
                   </Collapsible>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Add a message (optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="E.g., special instructions, or a message for the recipient."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                   <Label>Apply a coupon (optional)</Label>
                   {allCouponsList.length > 0 ? (
                     <RadioGroup 
                       value={appliedCoupon?.code || ""} 
                       onValueChange={(code) => {
                         if (code) {
                           applyCoupon(code);
                         }
                       }}
                       className="space-y-2"
                     >
                       {allCouponsList.map(([code, coupon]) => {
                         const eligible = isCouponEligible(coupon);
                         return (
                           <div key={code} className={cn("flex items-center space-x-2 rounded-md border p-3", { "has-[:checked]:border-primary": eligible, "opacity-50": !eligible })}>
                             <RadioGroupItem value={code} id={code} disabled={!eligible}/>
                             <Label htmlFor={code} className={cn("w-full", {"cursor-pointer": eligible, "cursor-not-allowed": !eligible})}>
                                 <div className="flex justify-between items-center">
                                    <span className="font-semibold">{code}</span>
                                    {coupon.type === 'percentage' && <span className="text-sm text-green-600 font-bold">{coupon.value}% OFF</span>}
                                    {coupon.type === 'free_item' && <span className="text-sm text-green-600 font-bold">Free {coupon.value}</span>}
                                 </div>
                                 <p className="text-xs text-muted-foreground font-normal">{coupon.description}</p>
                             </Label>
                           </div>
                         )
                       })}
                     </RadioGroup>
                   ) : (
                     <p className="text-sm text-muted-foreground">No coupons available for your current cart.</p>
                   )}
                   {appliedCoupon && (
                      <Button variant="link" size="sm" onClick={removeCoupon} className="p-0 h-auto text-destructive">Remove coupon</Button>
                   )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-lg font-semibold">Your cart is empty.</p>
              <p className="text-muted-foreground">
                Add some delicious treats to get started!
              </p>
            </div>
          )}
        </ScrollArea>

        {cartItems.length > 0 && (
          <SheetFooter className="pt-4 border-t">
            <div className="w-full space-y-2">
              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={handlePlaceOrder}
                disabled={
                  isPending ||
                  cartItems.length === 0 ||
                  name.length < 2 ||
                  phoneNumber.length < 10 ||
                  !deliveryDate
                }
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? 'Placing Order...' : 'Place Order'}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={clearCart}
                disabled={isPending}
              >
                Clear Cart
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
