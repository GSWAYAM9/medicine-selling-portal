'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-context';
import { mockMedicines } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/header';
import { ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { cart, clearCart, getCartTotal, addOrder } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Form state
  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [prescriptionUrl, setPrescriptionUrl] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-12 px-4">
          <Link href="/login" className="text-primary hover:underline flex items-center gap-2 mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Login
          </Link>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-muted-foreground mb-6">Please login to checkout.</p>
            <Link href="/login">
              <Button size="lg">Go to Login</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (cart.length === 0 && !orderCompleted) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-12 px-4">
          <Link href="/medicines" className="text-primary hover:underline flex items-center gap-2 mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Medicines
          </Link>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-muted-foreground mb-6">Your cart is empty.</p>
            <Link href="/medicines">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Check if any items require prescription
  const requiresPrescription = cart.some(item => {
    const medicine = mockMedicines.find(m => m.id === item.medicineId);
    return medicine?.requiresPrescription;
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate prescription if needed
    if (requiresPrescription && !prescriptionUrl) {
      alert('Please provide a prescription for prescription-only medicines');
      setLoading(false);
      return;
    }

    if (!shippingAddress || !phone) {
      alert('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    // Create order
    const order = {
      id: `order${Date.now()}`,
      userId: user!.id,
      items: cart,
      totalAmount: getCartTotal(),
      status: 'processing' as const,
      requiresPrescription,
      prescriptionUrl: prescriptionUrl || undefined,
      shippingAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Simulate processing
    setTimeout(() => {
      addOrder(order);
      clearCart();
      setOrderCompleted(true);
      setLoading(false);
    }, 2000);
  };

  if (orderCompleted) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-12 px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6">
              <CheckCircle2 className="h-16 w-16 mx-auto text-green-600 mb-4" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6">Your order has been successfully placed and is now being processed.</p>
            <div className="bg-muted p-6 rounded-lg mb-8 text-left space-y-2">
              <p><span className="font-semibold text-foreground">Order ID:</span> <span className="text-muted-foreground font-mono">{`order${Date.now()}`}</span></p>
              <p><span className="font-semibold text-foreground">Delivery Address:</span> <span className="text-muted-foreground">{shippingAddress}</span></p>
              <p><span className="font-semibold text-foreground">Estimated Delivery:</span> <span className="text-muted-foreground">3-5 business days</span></p>
            </div>
            <div className="space-y-3">
              <Link href="/orders" className="block">
                <Button className="w-full">View My Orders</Button>
              </Link>
              <Link href="/medicines" className="block">
                <Button variant="outline" className="w-full">Continue Shopping</Button>
              </Link>
            </div>
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
          <Link href="/cart" className="text-primary hover:underline flex items-center gap-2 mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Cart
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Shipping Information</h2>
                <form onSubmit={handleCheckout} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="address">Shipping Address *</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="123 Main St, City, State 12345"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  {/* Prescription Upload if needed */}
                  {requiresPrescription && (
                    <div className="space-y-2 bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                      <div className="flex gap-2 items-start">
                        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <Label htmlFor="prescription" className="text-amber-900 dark:text-amber-100 font-semibold">
                            Prescription Required *
                          </Label>
                          <p className="text-xs text-amber-800 dark:text-amber-200 mt-1">
                            Your order contains prescription-only medicines. Please upload a valid prescription.
                          </p>
                        </div>
                      </div>
                      <Input
                        id="prescription"
                        type="text"
                        placeholder="Enter prescription document URL or description"
                        value={prescriptionUrl}
                        onChange={(e) => setPrescriptionUrl(e.target.value)}
                        required={requiresPrescription}
                        className="mt-2"
                      />
                    </div>
                  )}

                  {/* Terms and Conditions */}
                  <div className="flex items-center gap-2">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="rounded border-input"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the Terms of Service and Privacy Policy
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="w-full"
                  >
                    {loading ? 'Processing...' : 'Complete Order'}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>

                <div className="space-y-3 border-b border-border pb-4 mb-4">
                  {cart.map(item => {
                    const medicine = mockMedicines.find(m => m.id === item.medicineId);
                    if (!medicine) return null;
                    return (
                      <div key={item.medicineId} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{medicine.name} x{item.quantity}</span>
                        <span className="text-foreground font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="text-foreground">${(total * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">Free</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-primary text-lg">${(total * 1.08).toFixed(2)}</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
