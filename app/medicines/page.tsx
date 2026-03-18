'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-context';
import { mockMedicines, getMedicineCategories } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/header';
import { ShoppingCart, Search, AlertCircle } from 'lucide-react';

export default function MedicinesPage() {
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const categories = useMemo(() => {
    return ['All Categories', ...getMedicineCategories()];
  }, []);

  const filteredMedicines = useMemo(() => {
    return mockMedicines.filter(medicine => {
      const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           medicine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || medicine.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (medicineId: string, price: number) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }
    addToCart(medicineId, 1, price);
    setAddedItems(prev => new Set(prev).add(medicineId));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(medicineId);
        return newSet;
      });
    }, 2000);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-12 px-4">
          <div className="mx-auto max-w-2xl text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Login Required</h1>
            <p className="text-muted-foreground mb-6">Please login to view and purchase medicines.</p>
            <Link href="/login">
              <Button size="lg">Go to Login</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Our Medicines</h1>
            <p className="text-muted-foreground">Browse our wide selection of quality medicines</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by medicine name or manufacturer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-muted'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredMedicines.length} medicine{filteredMedicines.length !== 1 ? 's' : ''}
          </p>

          {/* Medicines Grid */}
          {filteredMedicines.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredMedicines.map(medicine => (
                <Card key={medicine.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4 flex-1 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-semibold text-foreground line-clamp-2">{medicine.name}</h3>
                      {medicine.requiresPrescription && (
                        <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded whitespace-nowrap">
                          Rx
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{medicine.manufacturer}</p>
                      <p className="text-xs text-muted-foreground">{medicine.dosage}</p>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{medicine.description}</p>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-bold text-primary">${medicine.price.toFixed(2)}</span>
                      <span className="text-xs text-muted-foreground">
                        {medicine.stock > 0 ? `${medicine.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(medicine.id, medicine.price)}
                    disabled={medicine.stock === 0}
                    className={`w-full py-2 px-4 rounded-b-md font-medium transition-colors flex items-center justify-center gap-2 ${
                      addedItems.has(medicine.id)
                        ? 'bg-green-600 text-white'
                        : medicine.stock > 0
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {addedItems.has(medicine.id) ? 'Added!' : 'Add to Cart'}
                  </button>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No medicines found matching your search.</p>
              <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('All Categories'); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
