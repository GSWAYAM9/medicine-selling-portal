'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CartItem, Order } from './types';

interface CartContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (medicineId: string, quantity: number, price: number) => void;
  removeFromCart: (medicineId: string) => void;
  updateQuantity: (medicineId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  addOrder: (order: Order) => void;
  getOrdersForUser: (userId: string) => Order[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Initialize from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedOrders = localStorage.getItem('orders');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error('Failed to parse stored cart', e);
      }
    }
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error('Failed to parse stored orders', e);
      }
    }
  }, []);

  const addToCart = useCallback((medicineId: string, quantity: number, price: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.medicineId === medicineId);
      let newCart;
      if (existingItem) {
        newCart = prevCart.map(item =>
          item.medicineId === medicineId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        newCart = [...prevCart, { medicineId, quantity, price }];
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  }, []);

  const removeFromCart = useCallback((medicineId: string) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.medicineId !== medicineId);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  }, []);

  const updateQuantity = useCallback((medicineId: string, quantity: number) => {
    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item.medicineId === medicineId ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem('cart');
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const addOrder = useCallback((order: Order) => {
    setOrders(prevOrders => {
      const newOrders = [...prevOrders, order];
      localStorage.setItem('orders', JSON.stringify(newOrders));
      return newOrders;
    });
  }, []);

  const getOrdersForUser = useCallback((userId: string) => {
    return orders.filter(order => order.userId === userId);
  }, [orders]);

  const value: CartContextType = {
    cart,
    orders,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    addOrder,
    getOrdersForUser,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
