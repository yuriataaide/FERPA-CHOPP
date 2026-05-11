"use client"

import { Category, categoryLabels } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, SlidersHorizontal, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface ProductFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  selectedCategory: Category | "all"
  onCategoryChange: (category: Category | "all") => void
  showAvailableOnly: boolean
  onAvailableOnlyChange: (value: boolean) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  showRentalsOnly: boolean
  onRentalsOnlyChange: (value: boolean) => void
}

const categories: (Category | "all")[] = [
  "all",
  "chopp",
  "cervejas",
  "refrigerantes",
  "agua",
  "energeticos",
  "destilados",
  "sucos",
  "gelo",
  "descartaveis",
  "choppeiras",
  "cilindros",
  "equipamentos",
]

export function ProductFilters({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  showAvailableOnly,
  onAvailableOnlyChange,
  showRentalsOnly,
  onRentalsOnlyChange,
}: ProductFiltersProps) {
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <Label className="text-sm font-semibold mb-3 block">Categorias</Label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(cat)}
              className="text-xs"
            >
              {cat === "all" ? "Todas" : categoryLabels[cat]}
            </Button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Filtros</Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="available"
            checked={showAvailableOnly}
            onCheckedChange={(checked) => onAvailableOnlyChange(checked as boolean)}
          />
          <label
            htmlFor="available"
            className="text-sm text-muted-foreground cursor-pointer"
          >
            Apenas disponíveis
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rentals"
            checked={showRentalsOnly}
            onCheckedChange={(checked) => onRentalsOnlyChange(checked as boolean)}
          />
          <label
            htmlFor="rentals"
            className="text-sm text-muted-foreground cursor-pointer"
          >
            Apenas locação
          </label>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Search and Mobile Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        
        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <FilterContent />
      </div>
    </div>
  )
}
