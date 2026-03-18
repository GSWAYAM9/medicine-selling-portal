'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useCart } from '@/lib/cart-context'
import { mockMedicines } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/header'
import { ShoppingCart, Search, AlertCircle, Filter, Star } from 'lucide-react'

export default function MedicinesPage() {
  const { user, isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [sortBy, setSortBy] = useState('popular')
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())

  const categories = useMemo(() => {
    const cats = [...new Set(mockMedicines.map(m => m.category))]
    return ['All Categories', ...cats]
  }, [])

  const filteredMedicines = useMemo(() => {
    let result = mockMedicines.filter(medicine => {
      const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           medicine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All Categories' || medicine.category === selectedCategory
      const matchesPrice = medicine.price >= priceRange[0] && medicine.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    })

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [searchQuery, selectedCategory, priceRange, sortBy])

  const handleAddToCart = (medicine: any) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart')
      return
    }
    addToCart(medicine.id, 1, medicine.price)
    setAddedItems(prev => new Set(prev).add(medicine.id))
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(medicine.id)
        return newSet
      })
    }, 2000)
  }

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
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-serif font-bold text-foreground mb-3">Premium Medicines</h1>
            <p className="text-lg text-muted-foreground">Curated collection of {mockMedicines.length} verified pharmaceuticals</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Search
                  </label>
                  <Input
                    placeholder="Medicine name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Category
                  </label>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm ${
                          selectedCategory === category
                            ? 'bg-primary text-primary-foreground font-semibold'
                            : 'bg-card border border-border/50 text-foreground hover:border-primary/50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">Price Range</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 bg-card border border-border/50 rounded-lg text-sm text-foreground"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">
                  {filteredMedicines.length} medicines found
                </p>
              </div>

              {filteredMedicines.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMedicines.map(medicine => (
                    <div key={medicine.id} className="group relative bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full flex flex-col cursor-pointer">
                      {medicine.rating >= 4.5 && (
                        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-primary to-accent px-3 py-1 rounded-full">
                          <span className="text-xs font-bold text-primary-foreground">Premium</span>
                        </div>
                      )}

                      <div className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center min-h-48 group-hover:from-primary/10 group-hover:to-accent/10 transition-colors">
                        <div className="text-5xl group-hover:scale-110 transition-transform duration-300">💊</div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {medicine.name}
                        </h3>

                        <p className="text-xs text-muted-foreground mb-3">{medicine.manufacturer}</p>

                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < Math.floor(medicine.rating) ? 'fill-accent text-accent' : 'text-muted'}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{medicine.rating}</span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">
                          {medicine.description}
                        </p>

                        {medicine.requiresPrescription && (
                          <div className="mb-3 px-3 py-1 bg-accent/10 border border-accent/30 rounded-lg">
                            <p className="text-xs font-semibold text-accent">Prescription Required</p>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div>
                            <p className="text-sm text-muted-foreground">Price</p>
                            <p className="text-2xl font-bold text-primary">₹{medicine.price}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              handleAddToCart(medicine)
                            }}
                            className={`p-3 rounded-lg transition-all duration-300 ${
                              addedItems.has(medicine.id)
                                ? 'bg-accent text-accent-foreground'
                                : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                            }`}
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground mb-6">No medicines found matching your criteria.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('All Categories')
                      setPriceRange([0, 5000])
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
