'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { ArrowRight, Shield, Truck, Lock, Star, Sparkles, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

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
      {/* Premium Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-background/85 backdrop-blur-2xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">MediHub</span>
          </div>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-2xl shadow-lg shadow-primary/30 text-primary-foreground transition-all duration-300 font-semibold">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center py-24">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                  <p className="text-sm font-semibold text-primary">✨ Premium Healthcare Excellence</p>
                </div>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-bold leading-tight">
                  <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">Elevate</span>
                  <br className="hidden sm:block" />
                  <span className="text-foreground">Your</span>
                  <br />
                  <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Health</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl font-light">
                  Experience premium pharmaceutical care with 52+ verified medicines, expert prescription management, and luxury delivery across India.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:shadow-2xl shadow-lg text-primary-foreground w-full sm:w-auto font-semibold group">
                    Explore Collection <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold hover:bg-primary/5 border-primary/30">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Premium Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/30">
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-primary">52+</p>
                  <p className="text-sm text-muted-foreground font-medium">Premium Medicines</p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-secondary">7</p>
                  <p className="text-sm text-muted-foreground font-medium">Expert Categories</p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground font-medium">Support Ready</p>
                </div>
              </div>
            </div>

            {/* Premium Hero Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 rounded-3xl border border-border/30"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/medicine-hero.jpg"
                  alt="Premium medicine collection"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Premium Features Section */}
          <div className="py-24 border-t border-border/30">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-5xl sm:text-6xl font-serif font-bold text-foreground">
                Why Choose <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">MediHub</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                Luxury healthcare experience designed for your wellbeing
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative space-y-6 p-8 rounded-2xl bg-card border border-border/30 group-hover:border-primary/30 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Verified Excellence</h3>
                    <p className="text-muted-foreground leading-relaxed">Sourced exclusively from certified pharmaceutical manufacturers with rigorous quality standards</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    ISO Certified Partners
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative space-y-6 p-8 rounded-2xl bg-card border border-border/30 group-hover:border-secondary/30 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Truck className="w-7 h-7 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Express Delivery</h3>
                    <p className="text-muted-foreground leading-relaxed">Premium packaging and express shipping ensuring your medicines arrive in perfect condition</p>
                  </div>
                  <div className="flex items-center gap-2 text-secondary text-sm font-semibold">
                    <Star className="w-4 h-4" />
                    48-Hour Delivery
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative space-y-6 p-8 rounded-2xl bg-card border border-border/30 group-hover:border-primary/30 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Lock className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Secure & Private</h3>
                    <p className="text-muted-foreground leading-relaxed">Enterprise-grade encryption protecting your health data with complete privacy assurance</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    HIPAA Compliant
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="py-24 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-card to-card/50 border border-border/30 rounded-3xl p-12 sm:p-16 text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl font-serif font-bold text-foreground">
                  Start Your Premium Journey
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                  Join thousands enjoying MediHub's premium healthcare experience
                </p>
              </div>
              <Link href="/login">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-2xl shadow-lg px-8">
                  Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
