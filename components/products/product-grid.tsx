"use client"

import { useState, useMemo } from "react"
import { Product, Category } from "@/lib/types"
import { ProductCard } from "./product-card"
import { ProductFilters } from "./product-filters"
import { motion, AnimatePresence } from "framer-motion"
import { Package } from "lucide-react"

interface ProductGridProps {
  products: Product[]
  initialCategory?: Category | "all"
}

export function ProductGrid({ products, initialCategory = "all" }: ProductGridProps) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(initialCategory)
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [showRentalsOnly, setShowRentalsOnly] = useState(false)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase()
        const matchesSearch =
          product.name.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false
      }

      // Availability filter
      if (showAvailableOnly && !product.available) {
        return false
      }

      // Rentals only filter
      if (showRentalsOnly && !product.isRental) {
        return false
      }

      return true
    })
  }, [products, search, selectedCategory, showAvailableOnly, showRentalsOnly])

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters - Desktop */}
      <aside className="lg:w-72 lg:shrink-0">
        <div className="lg:sticky lg:top-24">
          <ProductFilters
            search={search}
            onSearchChange={setSearch}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            showAvailableOnly={showAvailableOnly}
            onAvailableOnlyChange={setShowAvailableOnly}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            showRentalsOnly={showRentalsOnly}
            onRentalsOnlyChange={setShowRentalsOnly}
          />
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <Package className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou buscar por outro termo.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
