'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, LogOut, LogIn } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-primary p-2">
            <span className="text-sm font-bold text-primary-foreground">🏥</span>
          </div>
          <span className="text-xl font-bold text-foreground">MediHub</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          {user && (
            <>
              <Link href="/medicines" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Shop
              </Link>
              {user.role === 'doctor' && (
                <Link href="/prescriptions" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Prescriptions
                </Link>
              )}
              {user.role === 'pharmacist' && (
                <>
                  <Link href="/pharmacist/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/pharmacist/orders" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    Orders
                  </Link>
                  <Link href="/pharmacist/inventory" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    Inventory
                  </Link>
                </>
              )}
            </>
          )}
        </nav>

        {/* Right side - Cart and Auth */}
        <div className="flex items-center gap-4">
          {user && (
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 rounded-full bg-destructive px-2 py-0.5 text-xs font-bold text-destructive-foreground">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="default" size="sm" className="gap-2">
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
