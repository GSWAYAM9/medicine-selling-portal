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
  const { cart, clearCart, getCartTotal } = useCart()
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
      alert('Please agree to terms and conditions')
      setLoading(false)
      return
    }

    await new Promise(resolve => setTimeout(resolve, 1500))

    const orderNumber = `ORD-${Date.now()}`
    setOrderNumber(orderNumber)
    setOrderCompleted(true)
    clearCart()
    setLoading(false)
  }

  if (orderCompleted) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center py-12 space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-foreground">Order Placed Successfully!</h1>
              <p className="text-lg text-muted-foreground">Thank you for your purchase</p>
              
              <div className="bg-card border border-border/50 rounded-xl p-6 space-y-4 my-8">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="text-2xl font-bold text-primary font-mono">{orderNumber}</p>
                </div>
                <div className="flex justify-between pt-4 border-t border-border/50">
                  <span className="text-foreground">Subtotal</span>
                  <span className="font-semibold">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Tax (8%)</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-border/50">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-muted-foreground">Your order will be delivered to:</p>
                <p className="text-foreground font-semibold">{shippingAddress}</p>
                <p className="text-foreground">{phone}</p>
              </div>

              <div className="flex gap-4 justify-center pt-8">
                <Link href="/medicines">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
                <Link href="/orders">
                  <Button className="bg-gradient-to-r from-primary to-accent">View Orders</Button>
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
          <Link href="/cart" className="text-primary hover:text-primary/80 flex items-center gap-2 mb-12 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Cart
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card border border-border/50 rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Shipping Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Full Name</Label>
                    <Input
                      value={user?.name || ''}
                      disabled
                      className="bg-muted border-border/50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-foreground font-semibold mb-2 block">Shipping Address</Label>
                    <Input
                      id="address"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Enter your shipping address"
                      className="rounded-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-foreground font-semibold mb-2 block">Phone Number</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {requiresPrescription && (
                <div className="bg-card border border-accent/50 rounded-2xl p-8 space-y-4">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" />
                    Prescription Required
                  </h2>
                  <p className="text-muted-foreground">Some items in your cart require a prescription. Please upload a valid prescription.</p>
                  <Input
                    type="file"
                    value={prescriptionUrl}
                    onChange={(e) => setPrescriptionUrl(e.target.value)}
                    accept="image/*,application/pdf"
                    className="rounded-lg"
                  />
                </div>
              )}

              <div className="bg-card border border-border/50 rounded-2xl p-8 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-muted-foreground">
                    I agree to the terms and conditions and privacy policy
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-border/50 rounded-2xl p-6 sticky top-24 space-y-6">
                <h3 className="text-xl font-bold text-foreground">Order Summary</h3>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {cart.map(item => {
                    const medicine = mockMedicines.find(m => m.id === item.medicineId)
                    if (!medicine) return null
                    return (
                      <div key={item.medicineId} className="flex justify-between items-start pb-3 border-b border-border/50">
                        <div>
                          <p className="font-semibold text-foreground line-clamp-2">{medicine.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-primary">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="space-y-3 border-t border-border/50 pt-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="font-semibold">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-border/50 pt-3">
                    <span>Total</span>
                    <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </Button>

                <div className="space-y-2 pt-4">
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <Truck className="w-4 h-4 flex-shrink-0" />
                    <span>Free shipping on orders over ₹500</span>
                  </div>
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 flex-shrink-0" />
                    <span>Secure checkout with encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
