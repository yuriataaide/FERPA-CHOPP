"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Product } from "@/lib/types"
import { useCartStore } from "@/lib/store/cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package, Check, Minus, Plus } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [rentalDays, setRentalDays] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem(product, quantity, product.isRental ? rentalDays : undefined)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const price = product.isRental 
    ? product.rentalPrice! * rentalDays 
    : product.price

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative aspect-square bg-muted overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
            <Package className="w-16 h-16 text-muted-foreground/30" />
          </div>
          {!product.available && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="secondary" className="text-sm">Indisponível</Badge>
            </div>
          )}
          {product.isRental && (
            <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
              Locação
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4 flex flex-col flex-1">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {product.brand}
            </p>
            <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {product.volume}
            </p>
            {product.description && (
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {product.description}
              </p>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">
                R$ {price.toFixed(2).replace(".", ",")}
              </span>
              {product.isRental && (
                <span className="text-sm text-muted-foreground">
                  / {rentalDays} {rentalDays === 1 ? "dia" : "dias"}
                </span>
              )}
            </div>
            
            {product.isRental && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Dias:</span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                    disabled={rentalDays <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-medium">{rentalDays}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setRentalDays(rentalDays + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              
              <Button
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.available || added}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Adicionado
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.isRental ? "Alugar" : "Adicionar"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
