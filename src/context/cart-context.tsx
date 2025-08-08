
'use client';

import { useToast } from '@/hooks/use-toast';
import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import allCoupons from '../../coupons.json';
import { menuData, type MenuItem } from '@/lib/menu-data';

export type AddToCartPayload = {
  id: string;
  name: string;
  price: string;
  image: string;
};

export type CartItem = AddToCartPayload & {
  quantity: number;
  isFree?: boolean;
};

export type Coupon = {
  description: string;
  type: 'percentage' | 'free_item';
  value: number | string;
  condition?: {
    minCartValue?: number;
    firstOrder?: string;
  };
};

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: AddToCartPayload) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  appliedCoupon: { code: string; coupon: Coupon } | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discount: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to find an item from menuData
const findMenuItem = (itemName: string): MenuItem | null => {
  for (const category of Object.values(menuData)) {
    // A bit fuzzy search to match "Double Chocolate Brownie" with the item name "Double Chocolate"
    const item = category.find(i => itemName.includes(i.name) || i.name.includes(itemName));
    if (item) {
      return item;
    }
  }
  return null;
};


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; coupon: Coupon } | null>(null);
  const { toast } = useToast();

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
       if (item.isFree) return total;
      const priceString = item.price.split(' ')[0] || "0";
      const price = parseFloat(priceString.replace(/[^0-9.-]+/g,""));
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;

    const { coupon } = appliedCoupon;
    if (coupon.type === 'percentage') {
      return (cartTotal * (coupon.value as number)) / 100;
    }
     if (coupon.type === 'free_item') {
      const freeItemName = coupon.value as string;
      const freeItemInCart = cartItems.find(item => item.name === freeItemName && item.isFree);
      if (freeItemInCart) {
         const priceString = findMenuItem(freeItemName)?.price.split('/')[0] || "0";
         const price = parseFloat(priceString.replace(/[^0-9.-]+/g,""));
         // The discount is the price of the free item, but only count one.
         return price * 1; 
      }
    }
    
    return 0;
  }, [cartTotal, appliedCoupon, cartItems]);

  const finalTotal = useMemo(() => Math.max(0, cartTotal - discount), [cartTotal, discount]);

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const addToCart = (item: AddToCartPayload) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    toast({
      title: "Added to cart!",
      description: `${item.name} is now in your cart.`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const applyCoupon = (code: string) => {
    const couponsData = allCoupons as Record<string, Coupon>;
    const coupon = couponsData[code];

    if (!coupon) {
      return { success: false, message: 'Invalid coupon code.' };
    }
    
    // Conditions are now checked in the UI, but we can keep this as a fallback.
    if (coupon.condition?.minCartValue && cartTotal < coupon.condition.minCartValue) {
      return { success: false, message: `Cart must be over ₹${coupon.condition.minCartValue} to use this coupon.` };
    }
    
    setAppliedCoupon({ code, coupon });
    return { success: true, message: coupon.description };
  };
  
  // Effect to manage free items from coupons
  useEffect(() => {
    if (appliedCoupon && appliedCoupon.coupon.type === 'free_item') {
      const freeItemName = appliedCoupon.coupon.value as string;
      const freeItemExists = cartItems.some(item => item.name === freeItemName && item.isFree);
      
      if (!freeItemExists) {
        const menuItem = findMenuItem(freeItemName);
        if (menuItem) {
           const priceString = menuItem.price.split('/')[0] || "0";
           const freeItem: CartItem = { 
             id: `free-${freeItemName}`, 
             name: freeItemName, 
             price: priceString,
             image: menuItem.image,
             quantity: 1, 
             isFree: true 
           };
           setCartItems(prev => [...prev, freeItem]);
        }
      }
    } else {
      // Remove any free items if coupon is removed or changed
      setCartItems(prev => prev.filter(item => !item.isFree));
    }
  }, [appliedCoupon]);


  // Effect to validate applied coupon on cart changes
  useEffect(() => {
    if (!appliedCoupon) return;

    const { code, coupon } = appliedCoupon;
    let isStillValid = true;

    if (coupon.condition?.minCartValue && cartTotal < coupon.condition.minCartValue) {
      isStillValid = false;
    }
    
    // The firstOrder check is now handled in the UI based on phone number input,
    // so we don't need to re-validate it here as we don't have the phone number context.
    // If a first-order coupon was applied, and they change the number to a returning user's,
    // the UI will remove the coupon option, and we should also remove it here.
    
    const allAvailableCoupons = Object.keys(allCoupons as Record<string, Coupon>).filter(key => {
        const c = (allCoupons as Record<string, Coupon>)[key];
        if (!c.condition) return true;
        if (c.condition.minCartValue && cartTotal < c.condition.minCartValue) return false;
        // Cant check firstOrder here, so we assume it might be valid
        return true;
    });

    if (!allAvailableCoupons.includes(code)) {
        isStillValid = false;
    }


    if (!isStillValid) {
      removeCoupon();
      toast({
        title: "Coupon removed",
        description: "Your cart no longer meets the conditions for the applied coupon.",
        variant: "destructive"
      })
    }
  }, [cartTotal, appliedCoupon, toast]);


  const clearCart = () => {
    setCartItems([]);
    removeCoupon();
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => {
      // Free items shouldn't count towards the cart item count badge
      if (item.isFree) return count;
      return count + item.quantity;
    }, 0);
  }, [cartItems]);


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discount,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
