'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-context';
import { mockMedicines } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/header';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { user, isAuthenticated } = useAuth();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-12 px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-muted-foreground mb-6">Please login to view your cart.</p>
            <Link href="/login">
              <Button size="lg">Go to Login</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-12 px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">Start shopping by browsing our collection of medicines.</p>
            <Link href="/medicines">
              <Button size="lg" className="gap-2">
                Continue Shopping <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const total = getCartTotal();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => {
                const medicine = mockMedicines.find(m => m.id === item.medicineId);
                if (!medicine) return null;

                return (
                  <Card key={item.medicineId} className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{medicine.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{medicine.dosage} • {medicine.manufacturer}</p>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <label className="text-sm text-muted-foreground">Qty:</label>
                            <input
                              type="number"
                              min="1"
                              max={medicine.stock}
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.medicineId, parseInt(e.target.value) || 1)}
                              className="w-16 rounded border border-input bg-background px-2 py-1 text-sm text-foreground"
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.medicineId)}
                        className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 sticky top-24 space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Order Summary</h2>

                <div className="space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground font-medium">${(total * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-primary text-lg">${(total * 1.08).toFixed(2)}</span>
                </div>

                <div className="space-y-2 pt-4">
                  <Link href="/checkout" className="block">
                    <Button className="w-full">Proceed to Checkout</Button>
                  </Link>
                  <Link href="/medicines" className="block">
                    <Button variant="outline" className="w-full">Continue Shopping</Button>
                  </Link>
                </div>

                <button
                  onClick={clearCart}
                  className="w-full text-sm text-destructive hover:text-destructive/80 py-2 rounded transition-colors"
                >
                  Clear Cart
                </button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
