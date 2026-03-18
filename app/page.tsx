'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { ArrowRight, Shield, Zap, Package, Droplet, Heart, Lock, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      if (user.role === 'customer') {
        router.push('/medicines')
      } else if (user.role === 'doctor') {
        router.push('/prescriptions')
      } else if (user.role === 'pharmacist') {
        router.push('/pharmacist/dashboard')
      }
    }
  }, [user, router])

  if (user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <Droplet className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">MediHub</span>
          </div>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-primary to-accent hover:shadow-lg shadow-primary/25 text-primary-foreground transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold leading-tight">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Premium</span>
                  <br />
                  Medicine
                  <br />
                  Portal
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Access 52+ verified pharmaceutical products with prescription management and fast delivery across India.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground w-full sm:w-auto">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-8">
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-primary">52+</p>
                  <p className="text-sm text-muted-foreground">Premium Medicines</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-primary">7</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl border border-border/50 p-12 min-h-96 flex items-center justify-center">
                <div className="text-9xl opacity-50">💊</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 py-20 border-t border-border/50">
            <div className="space-y-4 p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Verified Products</h3>
              <p className="text-muted-foreground">All medicines sourced from certified manufacturers</p>
            </div>

            <div className="space-y-4 p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Fast Delivery</h3>
              <p className="text-muted-foreground">Quick and reliable shipping across all regions</p>
            </div>

            <div className="space-y-4 p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Secure Checkout</h3>
              <p className="text-muted-foreground">Your data is protected with encryption</p>
            </div>
          </div>

          <div className="py-20 text-center space-y-8">
            <h2 className="text-4xl font-serif font-bold text-foreground">
              Start Shopping Today
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse our extensive catalog of premium medicines with real-time pricing and availability.
            </p>
            <Link href="/login">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
