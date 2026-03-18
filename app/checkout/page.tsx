'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useCart } from '@/lib/cart-context'
import { mockMedicines } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Header } from '@/components/header'
import { ArrowLeft, AlertCircle, CheckCircle2, Package, Shield, Truck } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { cart, clearCart, getTotalPrice, getTotalItems } = useCart()
  const [loading, setLoading] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const [shippingAddress, setShippingAddress] = useState(user?.address || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [prescriptionUrl, setPrescriptionUrl] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <Link href="/login" className="text-primary hover:text-primary/80 flex items-center gap-2 mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Login
            </Link>
            <div className="text-center py-16">
              <AlertCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
              <h1 className="text-3xl font-bold text-foreground mb-2">Login Required</h1>
              <p className="text-muted-foreground mb-8">Please login to proceed with checkout.</p>
              <Link href="/login">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                  Go to Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (cart.length === 0 && !orderCompleted) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <Link href="/medicines" className="text-primary hover:text-primary/80 flex items-center gap-2 mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Shopping
            </Link>
            <div className="text-center py-16">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h1 className="text-3xl font-bold text-foreground mb-2">Cart is Empty</h1>
              <p className="text-muted-foreground mb-8">Add some medicines to proceed with checkout.</p>
              <Link href="/medicines">
                <Button size="lg">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  const requiresPrescription = cart.some(item => {
    const medicine = mockMedicines.find(m => m.id === item.medicineId)
    return medicine?.requiresPrescription
  })

  const total = getCartTotal()
  const tax = total * 0.08
  const finalTotal = total + tax

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (requiresPrescription && !prescriptionUrl) {
      alert('Please provide a prescription for prescription-only medicines')
      setLoading(false)
      return
    }

    if (!shippingAddress || !phone) {
      alert('Please fill in all required fields')
      setLoading(false)
      return
    }

    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions')
      setLoading(false)
      return
    }

    const newOrderNumber = `MH${Date.now().toString().slice(-8)}`
    setOrderNumber(newOrderNumber)

    setTimeout(() => {
      clearCart()
      setOrderCompleted(true)
      setLoading(false)
    }, 1500)
  }

  if (orderCompleted) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center py-16">
              <div className="mb-6 inline-block">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <CheckCircle2 className="h-10 w-10 text-accent-foreground" />
                </div>
              </div>
              <h1 className="text-5xl font-serif font-bold text-foreground mb-2">Order Confirmed</h1>
              <p className="text-xl text-muted-foreground mb-12">
                Thank you for your purchase! Your order has been successfully placed.
              </p>

              <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50 rounded-3xl p-8 mb-8 space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground">Order Number</p>
                  <p className="text-3xl font-bold text-foreground font-mono">{orderNumber}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-background rounded-xl border border-border/50">
                    <Package className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Items Ordered</p>
                    <p className="text-2xl font-bold text-foreground">{cart.length}</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-xl border border-border/50">
                    <Truck className="w-6 h-6 text-accent mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                    <p className="text-2xl font-bold text-foreground">3-5 Days</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-xl border border-border/50">
                    <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-2xl font-bold text-foreground">₹{finalTotal.toFixed(0)}</p>
                  </div>
                </div>

                <div className="text-left bg-card rounded-xl p-6 border border-border/50">
                  <p className="text-sm font-semibold text-foreground mb-4">Delivery Address</p>
                  <p className="text-muted-foreground">{shippingAddress}</p>
                  <p className="text-muted-foreground mt-2">Contact: {phone}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/orders" className="flex-1 sm:flex-none">
                  <Button size="lg" className="w-full bg-gradient-to-r from-primary to-accent">
                    Track Order
                  </Button>
                </Link>
                <Link href="/medicines" className="flex-1 sm:flex-none">
                  <Button size="lg" variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/cart" className="text-primary hover:text-primary/80 flex items-center gap-2 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Cart
          </Link>

          <div className="mb-8">
            <h1 className="text-5xl font-serif font-bold text-foreground mb-2">Checkout</h1>
            <p className="text-lg text-muted-foreground">Complete your order securely</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleCheckout} className="space-y-6">
                {/* Shipping Section */}
                <div className="bg-card rounded-2xl border border-border/50 p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Shipping Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address" className="text-sm font-semibold mb-2 block">
                        Shipping Address *
                      </Label>
                      <Input
                        id="address"
                        type="text"
                        placeholder="123 Main Street, City, State 12345"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="rounded-lg border-border/50 text-base h-12"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-semibold mb-2 block">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="rounded-lg border-border/50 text-base h-12"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Prescription Section */}
                {requiresPrescription && (
                  <div className="bg-gradient-to-br from-accent/10 to-primary/5 rounded-2xl border border-accent/30 p-8">
                    <div className="flex gap-4 items-start mb-6">
                      <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">Prescription Required</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your order contains prescription-only medicines
                        </p>
                      </div>
                    </div>
                    
                    <Label htmlFor="prescription" className="text-sm font-semibold mb-2 block">
                      Upload Prescription *
                    </Label>
                    <Input
                      id="prescription"
                      type="text"
                      placeholder="Prescription document URL or reference"
                      value={prescriptionUrl}
                      onChange={(e) => setPrescriptionUrl(e.target.value)}
                      className="rounded-lg border-border/50 text-base h-12"
                      required={requiresPrescription}
                    />
                  </div>
                )}

                {/* Payment & Terms */}
                <div className="bg-card rounded-2xl border border-border/50 p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6 pb-6 border-b border-border">
                    {cart.map(item => {
                      const medicine = mockMedicines.find(m => m.id === item.medicineId)
                      if (!medicine) return null
                      return (
                        <div key={item.medicineId} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{medicine.name} × {item.quantity}</span>
                          <span className="font-semibold text-foreground">₹{(medicine.price * item.quantity).toFixed(0)}</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold text-foreground">₹{total.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span className="font-semibold text-foreground">₹{tax.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-semibold text-accent">FREE</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6 flex justify-between items-center mb-6">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      ₹{finalTotal.toFixed(0)}
                    </span>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start gap-3 mb-6">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 rounded border-border/50 w-5 h-5 cursor-pointer"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      I agree to the Terms of Service and Privacy Policy. By checking this box, I confirm that my prescription (if required) is valid and complete.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg text-lg h-14 font-semibold"
                  >
                    {loading ? 'Processing...' : `Complete Order · ₹${finalTotal.toFixed(0)}`}
                  </Button>
                </div>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border/50 p-8">
                <h3 className="text-lg font-bold text-foreground mb-6">Order Details</h3>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-border/50">
                  {cart.map(item => {
                    const medicine = mockMedicines.find(m => m.id === item.medicineId)
                    if (!medicine) return null
                    return (
                      <div key={item.medicineId} className="text-sm">
                        <p className="font-semibold text-foreground mb-1">{medicine.name}</p>
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-primary font-bold">₹{(medicine.price * item.quantity).toFixed(0)}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">₹{total.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium text-foreground">₹{tax.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-accent">Free</span>
                  </div>
                </div>

                <div className="border-t border-border/50 mt-6 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      ₹{finalTotal.toFixed(0)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-background rounded-lg border border-border/50 text-xs text-muted-foreground space-y-2">
                  <p className="flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Secure checkout</p>
                  <p className="flex items-center gap-2"><Truck className="w-4 h-4 text-accent" /> Free delivery</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Money-back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
