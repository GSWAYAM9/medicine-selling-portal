'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-context';
import { mockMedicines, mockOrders } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/header';
import { AlertCircle, Package, TrendingUp, Users } from 'lucide-react';

export default function PharmacistDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { orders } = useCart();

  if (!isAuthenticated || user?.role !== 'pharmacist') {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-12 px-4">
          <div className="mx-auto max-w-2xl text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-6">Only pharmacists can access this page.</p>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Calculate statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const lowStockMedicines = mockMedicines.filter(m => m.stock < 20).length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">Pharmacist Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                  <p className="text-3xl font-bold text-foreground">{totalOrders}</p>
                </div>
                <Package className="h-10 w-10 text-primary/20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending Orders</p>
                  <p className="text-3xl font-bold text-foreground">{pendingOrders}</p>
                </div>
                <AlertCircle className="h-10 w-10 text-yellow-600/20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Low Stock Items</p>
                  <p className="text-3xl font-bold text-foreground">{lowStockMedicines}</p>
                </div>
                <TrendingUp className="h-10 w-10 text-orange-600/20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-foreground">${totalRevenue.toFixed(2)}</p>
                </div>
                <TrendingUp className="h-10 w-10 text-green-600/20" />
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link href="/pharmacist/orders">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <Package className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Manage Orders</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Review, approve, and process customer orders
                </p>
                <Button variant="ghost" className="gap-2">
                  Go to Orders →
                </Button>
              </Card>
            </Link>

            <Link href="/pharmacist/inventory">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <TrendingUp className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Inventory Management</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Track stock levels and manage inventory
                </p>
                <Button variant="ghost" className="gap-2">
                  Go to Inventory →
                </Button>
              </Card>
            </Link>
          </div>

          {/* Recent Orders */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h2>
            {orders.length === 0 ? (
              <p className="text-muted-foreground">No orders yet.</p>
            ) : (
              <div className="space-y-3">
                {orders.slice(0, 5).map(order => (
                  <div key={order.id} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-foreground">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} item(s) • ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
