'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, LogOut, LogIn, Droplet } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo - Ultra Premium */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <Droplet className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">MediHub</span>
            <span className="text-xs text-muted-foreground font-medium">Premium Care</span>
          </div>
        </Link>

        {/* Navigation - Ultra Premium */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold text-foreground/70 hover:text-primary transition-all duration-300 relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
          </Link>
          {user && (
            <>
              <Link href="/medicines" className="text-sm font-semibold text-foreground/70 hover:text-primary transition-all duration-300 relative group">
                Shop
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
              {user.role === 'doctor' && (
                <Link href="/prescriptions" className="text-sm font-semibold text-foreground/70 hover:text-primary transition-all duration-300 relative group">
                  Prescriptions
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
                </Link>
              )}
              {user.role === 'pharmacist' && (
                <>
                  <Link href="/pharmacist/dashboard" className="text-sm font-semibold text-foreground/70 hover:text-primary transition-all duration-300 relative group">
                    Dashboard
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link href="/pharmacist/orders" className="text-sm font-semibold text-foreground/70 hover:text-primary transition-all duration-300 relative group">
                    Orders
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link href="/pharmacist/inventory" className="text-sm font-semibold text-foreground/70 hover:text-primary transition-all duration-300 relative group">
                    Inventory
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </>
              )}
            </>
          )}
        </nav>

        {/* Right side - Cart and Auth */}
        <div className="flex items-center gap-4">
          {user && (
            <Link href="/cart" className="relative group">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-all duration-300">
                <ShoppingCart className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 rounded-full bg-gradient-to-r from-primary to-accent px-2 py-0.5 text-xs font-bold text-primary-foreground shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-border/40">
              <div className="flex flex-col items-end">
                <p className="text-sm font-semibold text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize font-medium">{user.role}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                title="Logout"
                className="hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button className="bg-gradient-to-r from-primary to-accent hover:shadow-lg shadow-primary/25 text-primary-foreground transition-all duration-300 gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
