'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { mockMedicines } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/header';
import { AlertCircle, AlertTriangle, Pencil } from 'lucide-react';
import { useState } from 'react';

export default function InventoryPage() {
  const { user, isAuthenticated } = useAuth();
  const [medicines, setMedicines] = useState(mockMedicines);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredMedicines = medicines.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockCount = medicines.filter(m => m.stock < 20).length;
  const outOfStockCount = medicines.filter(m => m.stock === 0).length;

  const handleUpdateStock = (medicineId: string) => {
    setMedicines(medicines.map(m =>
      m.id === medicineId ? { ...m, stock: editStock } : m
    ));
    setEditingId(null);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
            <p className="text-muted-foreground">Monitor and manage medicine stock levels</p>
          </div>

          {/* Stock Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-4 border-l-4 border-l-yellow-600">
              <p className="text-xs text-muted-foreground mb-1">Low Stock Items</p>
              <p className="text-2xl font-bold text-foreground">{lowStockCount}</p>
              <p className="text-xs text-muted-foreground mt-1">Items below 20 units</p>
            </Card>

            <Card className="p-4 border-l-4 border-l-red-600">
              <p className="text-xs text-muted-foreground mb-1">Out of Stock</p>
              <p className="text-2xl font-bold text-foreground">{outOfStockCount}</p>
              <p className="text-xs text-muted-foreground mt-1">Items with 0 units</p>
            </Card>

            <Card className="p-4 border-l-4 border-l-green-600">
              <p className="text-xs text-muted-foreground mb-1">Total Medicines</p>
              <p className="text-2xl font-bold text-foreground">{medicines.length}</p>
              <p className="text-xs text-muted-foreground mt-1">In catalog</p>
            </Card>
          </div>

          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>

          {/* Inventory Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Medicine Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Stock</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredMedicines.map(medicine => (
                    <tr key={medicine.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-foreground">{medicine.name}</p>
                          <p className="text-xs text-muted-foreground">{medicine.dosage}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{medicine.category}</td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">${medicine.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {editingId === medicine.id ? (
                            <div className="flex gap-2">
                              <Input
                                type="number"
                                value={editStock}
                                onChange={(e) => setEditStock(parseInt(e.target.value) || 0)}
                                className="w-20"
                                min="0"
                              />
                              <Button
                                size="sm"
                                onClick={() => handleUpdateStock(medicine.id)}
                              >
                                Save
                              </Button>
                            </div>
                          ) : (
                            <>
                              <span className={`text-sm font-medium ${
                                medicine.stock === 0 ? 'text-red-600' :
                                medicine.stock < 20 ? 'text-yellow-600' :
                                'text-green-600'
                              }`}>
                                {medicine.stock}
                              </span>
                              {medicine.stock === 0 && (
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                              )}
                              {medicine.stock < 20 && medicine.stock > 0 && (
                                <AlertCircle className="h-4 w-4 text-yellow-600" />
                              )}
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {editingId === medicine.id ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingId(medicine.id);
                              setEditStock(medicine.stock);
                            }}
                            className="gap-2"
                          >
                            <Pencil className="h-4 w-4" />
                            Update
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
