'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useCart } from '@/lib/cart-context'
import { mockMedicines } from '@/lib/mock-data'
import Link from 'next/link'
import { ArrowLeft, Star, Shield, TrendingUp, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function MedicineDetail() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const { addToCart } = useCart()
  const medicineId = searchParams.get('id')
  
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const medicine = mockMedicines.find(m => m.id === medicineId)

  if (!medicine) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Medicine not found</h1>
          <Link href="/medicines">
            <Button>Back to Medicines</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(medicine, quantity)
    router.push('/cart')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/medicines" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Medicines</span>
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Medicine Image & Visual */}
          <div className="space-y-6">
            <div className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background rounded-3xl p-12 border border-border/50 min-h-96 flex items-center justify-center">
              <div className="absolute top-6 right-6 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold">
                In Stock ({medicine.stock})
              </div>
              <div className="text-center">
                <div className="text-7xl mb-6">💊</div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{medicine.name}</h1>
                <p className="text-muted-foreground">{medicine.manufacturer}</p>
              </div>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4 p-6 bg-card rounded-2xl border border-border/50">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(medicine.rating) ? 'fill-accent text-accent' : 'text-muted'}`}
                  />
                ))}
              </div>
              <div>
                <p className="font-semibold text-foreground">{medicine.rating}/5.0</p>
                <p className="text-sm text-muted-foreground">Based on 200+ reviews</p>
              </div>
            </div>
          </div>

          {/* Medicine Details */}
          <div className="space-y-8">
            {/* Price & Purchase */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-3xl border border-border/50">
              <div className="mb-8">
                <p className="text-muted-foreground text-sm mb-2">Price</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-bold text-foreground">₹{medicine.price}</span>
                  <span className="text-xl text-muted-foreground line-through">₹{(medicine.price * 1.2).toFixed(0)}</span>
                </div>
                <p className="text-sm text-accent mt-2">Save 20% today</p>
              </div>

              {medicine.requiresPrescription && (
                <div className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                  <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Prescription Required
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">Quantity</label>
                  <div className="flex items-center border border-border rounded-lg w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-muted transition-colors"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 border-x border-border font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="px-4 py-2 hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:shadow-lg text-lg h-14"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-6"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-accent text-accent' : ''}`} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Information */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">About this medicine</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-xl border border-border/50">
                  <p className="text-sm text-muted-foreground mb-1">Category</p>
                  <p className="font-semibold text-foreground">{medicine.category}</p>
                </div>

                <div className="p-4 bg-card rounded-xl border border-border/50">
                  <p className="text-sm text-muted-foreground mb-1">Manufacturer</p>
                  <p className="font-semibold text-foreground">{medicine.manufacturer}</p>
                </div>

                <div className="p-4 bg-card rounded-xl border border-border/50">
                  <p className="text-sm text-muted-foreground mb-1">Description</p>
                  <p className="font-semibold text-foreground">{medicine.description}</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Why choose this?</h3>
              <div className="grid gap-3">
                {[
                  { icon: '✓', text: 'Verified by licensed pharmacists' },
                  { icon: '🚚', text: 'Same-day delivery available' },
                  { icon: '💰', text: '20% savings on bulk orders' },
                  { icon: '🔒', text: 'Secure packaging and privacy' }
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border/50">
                    <span className="text-xl">{benefit.icon}</span>
                    <span className="text-foreground">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="text-3xl font-bold text-foreground mb-8">Similar Medicines</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mockMedicines
              .filter(m => m.id !== medicineId && m.category === medicine.category)
              .slice(0, 3)
              .map(med => (
                <Link key={med.id} href={`/medicines/detail?id=${med.id}`}>
                  <div className="p-6 bg-card rounded-2xl border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer group">
                    <div className="text-4xl mb-3">💊</div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{med.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{med.manufacturer}</p>
                    <p className="text-2xl font-bold text-primary">₹{med.price}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </main>
    </div>
  )
}
