'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/header';
import { ShoppingBag, Users, TrendingUp, FastForward } from 'lucide-react';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Your Trusted Online Medicine Portal
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Access quality medicines with prescription support, fast delivery, and expert guidance.
            </p>
            {isAuthenticated ? (
              <div className="flex gap-4 justify-center">
                <Link href="/medicines">
                  <Button size="lg" className="gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Browse Medicines
                  </Button>
                </Link>
                {user?.role === 'customer' && (
                  <Link href="/orders">
                    <Button size="lg" variant="outline">
                      View Orders
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex gap-4 justify-center">
                <Link href="/login">
                  <Button size="lg">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Choose MediHub?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Wide Selection</h3>
                <p className="text-sm text-muted-foreground">
                  Browse thousands of medicines from trusted manufacturers
                </p>
              </Card>

              <Card className="p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  <FastForward className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Quick delivery with tracking and real-time updates
                </p>
              </Card>

              <Card className="p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Expert Support</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with pharmacists and doctors for guidance
                </p>
              </Card>

              <Card className="p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Competitive Prices</h3>
                <p className="text-sm text-muted-foreground">
                  Best prices and regular discounts on medicines
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Role-based info */}
        {isAuthenticated && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Your Dashboard</h2>
              
              {user?.role === 'customer' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <Link href="/medicines">
                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Shop Medicines</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Browse and purchase medicines with easy filtering and search
                      </p>
                      <Button variant="ghost" className="gap-2">
                        Go to Shop →
                      </Button>
                    </Card>
                  </Link>
                  
                  <Link href="/orders">
                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <h3 className="text-lg font-semibold text-foreground mb-2">View Orders</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Track your orders and view delivery status
                      </p>
                      <Button variant="ghost" className="gap-2">
                        View Orders →
                      </Button>
                    </Card>
                  </Link>
                </div>
              )}

              {user?.role === 'doctor' && (
                <div className="max-w-2xl mx-auto">
                  <Link href="/prescriptions">
                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Create Prescriptions</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Issue prescriptions for your patients
                      </p>
                      <Button variant="ghost" className="gap-2">
                        Go to Prescriptions →
                      </Button>
                    </Card>
                  </Link>
                </div>
              )}

              {user?.role === 'pharmacist' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <Link href="/pharmacist/dashboard">
                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Dashboard</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        View analytics and manage operations
                      </p>
                      <Button variant="ghost" className="gap-2">
                        Open Dashboard →
                      </Button>
                    </Card>
                  </Link>
                  
                  <Link href="/pharmacist/orders">
                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Manage Orders</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Review and process customer orders
                      </p>
                      <Button variant="ghost" className="gap-2">
                        Manage Orders →
                      </Button>
                    </Card>
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
