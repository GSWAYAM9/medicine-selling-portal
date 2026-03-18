'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-context';
import { mockMedicines } from '@/lib/mock-data';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Plus, Edit2, Trash2, Package } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth();
  const { orders } = useCart();
  const [medicines, setMedicines] = useState(mockMedicines);
  const [editingId, setEditingId] = useState<string | null>(null);

  if (!isAuthenticated || (user?.role !== 'pharmacist' && user?.role !== 'admin')) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-12 px-4">
          <div className="mx-auto max-w-2xl text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-6">Only pharmacists and admins can access the management panel.</p>
            <Link href="/medicines">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const stats = {
    totalOrders: orders.length,
    processingOrders: orders.filter(o => o.status === 'processing').length,
    totalMedicines: medicines.length,
    lowStockMedicines: medicines.filter(m => m.stock < 20).length,
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">Inventory & Order Management</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-1">{stats.totalOrders}</div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">{stats.processingOrders}</div>
              <p className="text-sm text-muted-foreground">Processing</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-1">{stats.totalMedicines}</div>
              <p className="text-sm text-muted-foreground">Medicines</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">{stats.lowStockMedicines}</div>
              <p className="text-sm text-muted-foreground">Low Stock</p>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-4 mt-6">
              {orders.length === 0 ? (
                <Card className="p-8 text-center">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No orders yet</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <Card key={order.id} className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">Order #{order.id}</h3>
                          <p className="text-sm text-muted-foreground">User ID: {order.userId}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          order.status === 'processing' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Items</p>
                          <p className="text-foreground font-medium">{order.items.length} medicines</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total</p>
                          <p className="text-foreground font-medium">${order.totalAmount.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Address</p>
                          <p className="text-foreground text-xs">{order.shippingAddress}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="text-foreground font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Inventory Tab */}
            <TabsContent value="inventory" className="space-y-6 mt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Medicine Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Category</th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground">Price</th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground">Stock</th>
                      <th className="text-center py-3 px-4 font-semibold text-foreground">Rx</th>
                      <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.map(medicine => (
                      <tr key={medicine.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 text-foreground">{medicine.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{medicine.category}</td>
                        <td className="py-3 px-4 text-right text-foreground">${medicine.price.toFixed(2)}</td>
                        <td className={`py-3 px-4 text-right font-medium ${medicine.stock < 20 ? 'text-red-600' : 'text-foreground'}`}>
                          {medicine.stock}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {medicine.requiresPrescription && <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded">Yes</span>}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button className="text-primary hover:underline text-xs">
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button className="text-destructive hover:underline text-xs">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Low Stock Alert */}
              {stats.lowStockMedicines > 0 && (
                <Card className="p-4 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-900 dark:text-yellow-100">Low Stock Alert</p>
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        {stats.lowStockMedicines} medicine{stats.lowStockMedicines !== 1 ? 's' : ''} have stock below 20 units
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
