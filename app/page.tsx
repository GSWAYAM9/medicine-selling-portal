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
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-medium">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-primary to-accent hover:shadow-lg shadow-primary/25 transition-all">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-accent/20 to-primary/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-secondary/60 border border-accent/30 rounded-full">
                <span className="text-sm font-semibold text-primary">Premium Healthcare Experience</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight">
                  Your Health,<br />
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Elevated</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Access premium pharmaceutical solutions, connect with licensed healthcare professionals, and manage your wellbeing with unmatched sophistication.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/login">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:shadow-xl shadow-primary/30 text-lg h-14 px-8">
                    Explore Now <ArrowRight className="ml-3 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-2">
                    Learn More
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Bank-level Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Fast Delivery</span>
                </div>
              </div>
            </div>

            <div className="relative h-96 lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border border-border/50"></div>
              <div className="relative bg-gradient-to-br from-card via-secondary/20 to-card rounded-3xl p-12 border border-border/80 backdrop-blur-sm overflow-hidden">
                <div className="absolute top-6 right-6 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                
                <div className="space-y-8">
                  {[
                    { icon: '💊', label: '52+ Medicines', value: 'In Stock' },
                    { icon: '👨‍⚕️', label: '500+ Doctors', value: 'Available' },
                    { icon: '🚚', label: 'Same-Day', value: 'Delivery' }
                  ].map((stat, i) => (
                    <div key={i} className="group flex items-center gap-4 p-4 bg-background/60 backdrop-blur rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300">
                      <div className="text-3xl group-hover:scale-110 transition-transform">{stat.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-primary">{stat.label}</p>
                        <p className="text-xs text-muted-foreground">{stat.value}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">Why MediHub?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Premium healthcare experience designed for your peace of mind and wellbeing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Excellence',
                desc: 'Pharmaceuticals from certified manufacturers, verified by licensed experts.',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                desc: 'Same-day and next-day delivery options for urgent pharmaceutical needs.',
              },
              {
                icon: Heart,
                title: 'Expert Guidance',
                desc: 'Licensed doctors and pharmacists available for personalized consultation.',
              },
              {
                icon: Lock,
                title: 'Maximum Security',
                desc: 'Bank-level encryption protecting your personal and payment information.',
              },
              {
                icon: Package,
                title: 'Discreet & Safe',
                desc: 'Premium packaging ensuring privacy and product integrity on delivery.',
              },
              {
                icon: Droplet,
                title: 'Premium Selection',
                desc: 'Curated collection of prescription and OTC medications for all needs.',
              }
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className={`group relative p-8 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '52+', label: 'Medicines' },
              { number: '500+', label: 'Healthcare Pros' },
              { number: '99.9%', label: 'Uptime' },
              { number: '24/7', label: 'Support' }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary via-primary/90 to-accent rounded-3xl p-16 border border-primary/50 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-10"></div>
            
            <div className="relative text-center space-y-8">
              <h2 className="text-5xl lg:text-6xl font-serif font-bold text-primary-foreground leading-tight">
                Join Our Premium Community
              </h2>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
                Start your elevated healthcare journey today. Safe, secure, seamless—always.
              </p>
              <Link href="/login">
                <Button size="lg" variant="secondary" className="text-lg h-14 px-8 bg-white/95 hover:bg-white shadow-lg">
                  Create Account <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-card/50 backdrop-blur-sm border-t border-border px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg"></div>
                <span className="font-serif font-bold text-lg">MediHub</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">Premium healthcare solutions for modern living.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Security', 'Pricing'] },
              { title: 'Company', links: ['About Us', 'Blog', 'Careers'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'FAQs'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold text-foreground mb-4 text-sm">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2024 MediHub Premium. All rights reserved.</p>
            <div className="flex gap-6">
              {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                <a key={social} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
