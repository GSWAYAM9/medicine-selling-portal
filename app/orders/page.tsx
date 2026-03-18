'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-context';
import { mockMedicines } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/header';
import { Package, AlertCircle, CheckCircle2, Truck } from 'lucide-react';

const statusConfig = {
  pending: { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-950' },
  processing: { icon: Package, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950' },
  shipped: { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950' },
  delivered: { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-950' },
  cancelled: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950' },
};

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const { getOrdersForUser } = useCart();

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-12 px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-muted-foreground mb-6">Please login to view your orders.</p>
            <Link href="/login">
              <Button size="lg">Go to Login</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const orders = getOrdersForUser(user!.id);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">My Orders</h1>

          {orders.length === 0 ? (
            <Card className="p-8 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
              <Link href="/medicines">
                <Button>Start Shopping</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map(order => {
                const statusInfo = statusConfig[order.status];
                const StatusIcon = statusInfo.icon;

                return (
                  <Card key={order.id} className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Order #{order.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.bg}`}>
                        <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                        <span className={`text-sm font-medium ${statusInfo.color}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2 mb-4 pb-4 border-b border-border">
                      {order.items.map(item => {
                        const medicine = mockMedicines.find(m => m.id === item.medicineId);
                        if (!medicine) return null;
                        return (
                          <div key={item.medicineId} className="flex justify-between text-sm">
                            <span className="text-foreground">
                              {medicine.name} <span className="text-muted-foreground">x{item.quantity}</span>
                            </span>
                            <span className="text-foreground font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Shipping Address</p>
                        <p className="text-sm text-foreground">{order.shippingAddress}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
                        <p className="text-lg font-bold text-primary">${order.totalAmount.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Prescription info if applicable */}
                    {order.requiresPrescription && order.prescriptionUrl && (
                      <div className="mb-4 p-3 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Prescription</p>
                        <p className="text-sm text-foreground">{order.prescriptionUrl}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        Track Delivery
                      </Button>
                      {order.status === 'delivered' && (
                        <Button variant="outline" size="sm" className="text-xs">
                          Reorder
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
