'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-context';
import { mockMedicines, mockOrders } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/header';
import { AlertCircle, CheckCircle2, Clock, Truck } from 'lucide-react';

export default function PharmacistOrders() {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-600" />;
      case 'delivered':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      default:
        return null;
    }
  };

  const handleApproveOrder = (orderId: string) => {
    alert(`Order ${orderId} approved! In a production app, this would update the database.`);
  };

  const handleRejectOrder = (orderId: string) => {
    alert(`Order ${orderId} rejected! In a production app, this would update the database.`);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Order Management</h1>
            <p className="text-muted-foreground">Review and process customer orders</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map(status => (
              <button
                key={status}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
              >
                {status}
              </button>
            ))}
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {orders.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No orders to display.</p>
              </Card>
            ) : (
              orders.map(order => (
                <Card key={order.id} className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(order.status)}
                      <div>
                        <h3 className="font-semibold text-foreground">Order #{order.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">${order.totalAmount.toFixed(2)}</p>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2 mb-4 pb-4 border-b border-border">
                    {order.items.map(item => {
                      const medicine = mockMedicines.find(m => m.id === item.medicineId);
                      return (
                        <div key={item.medicineId} className="flex justify-between text-sm">
                          <span className="text-foreground">
                            {medicine?.name} <span className="text-muted-foreground">x{item.quantity}</span>
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
                    {order.requiresPrescription && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Prescription</p>
                        <p className="text-sm text-foreground">
                          {order.prescriptionUrl || 'Pending verification'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {order.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleApproveOrder(order.id)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Approve Order
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleRejectOrder(order.id)}
                      >
                        Reject Order
                      </Button>
                    </div>
                  )}

                  {order.status === 'processing' && (
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => alert(`Order ${order.id} marked as shipped!`)}
                    >
                      <Truck className="h-4 w-4 mr-2" />
                      Mark as Shipped
                    </Button>
                  )}

                  {order.status === 'shipped' && (
                    <Button
                      size="sm"
                      className="w-full"
                      variant="outline"
                      onClick={() => alert(`Order ${order.id} marked as delivered!`)}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mark as Delivered
                    </Button>
                  )}
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
