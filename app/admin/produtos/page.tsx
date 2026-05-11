"use client"

import { useState } from "react"
import { products } from "@/lib/data/products"
import { categoryLabels, Category } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Search, 
  Package, 
  Plus,
  Pencil,
  ToggleLeft,
  ToggleRight
} from "lucide-react"

export default function AdminProductsPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = Object.keys(categoryLabels) as Category[]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Produtos</h1>
          <p className="text-muted-foreground">Gerencie o catálogo de produtos</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas categorias</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{categoryLabels[cat]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredProducts.length} {filteredProducts.length === 1 ? "produto" : "produtos"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Produto</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden sm:table-cell">Categoria</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Preço</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border last:border-0">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <Package className="h-5 w-5 text-muted-foreground/50" />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.brand} • {product.volume}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell">
                      <Badge variant="secondary">
                        {categoryLabels[product.category]}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      {product.isRental ? (
                        <span className="text-sm">
                          R$ {product.rentalPrice?.toFixed(2).replace(".", ",")}/dia
                        </span>
                      ) : (
                        <span className="font-medium">
                          R$ {product.price.toFixed(2).replace(".", ",")}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      {product.available ? (
                        <span className="inline-flex items-center gap-1 text-sm text-green-600">
                          <ToggleRight className="h-4 w-4" />
                          Disponível
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-sm text-red-600">
                          <ToggleLeft className="h-4 w-4" />
                          Indisponível
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">Nenhum produto encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
