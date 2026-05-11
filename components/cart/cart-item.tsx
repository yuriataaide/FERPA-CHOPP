"use client"

import { CartItem as CartItemType } from "@/lib/types"
import { useCartStore } from "@/lib/store/cart"
import { Button } from "@/components/ui/button"
import { Package, Minus, Plus, Trash2 } from "lucide-react"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, updateRentalDays, removeItem } = useCartStore()
  const { product, quantity, rentalDays } = item

  const itemTotal = product.isRental
    ? product.rentalPrice! * (rentalDays || 1) * quantity
    : product.price * quantity

  return (
    <div className="flex gap-4 py-4 border-b border-border last:border-0">
      {/* Product Image */}
      <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center shrink-0">
        <Package className="w-8 h-8 text-muted-foreground/30" />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {product.brand}
            </p>
            <h3 className="font-semibold text-foreground truncate">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {product.volume}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
            onClick={() => removeItem(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          {/* Quantity */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Qtd:</span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => updateQuantity(product.id, quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => updateQuantity(product.id, quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Rental Days */}
          {product.isRental && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Dias:</span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateRentalDays(product.id, (rentalDays || 1) - 1)}
                  disabled={(rentalDays || 1) <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">{rentalDays || 1}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateRentalDays(product.id, (rentalDays || 1) + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Price */}
          <div className="ml-auto">
            <p className="font-semibold text-foreground">
              R$ {itemTotal.toFixed(2).replace(".", ",")}
            </p>
            {product.isRental && (
              <p className="text-xs text-muted-foreground">
                R$ {product.rentalPrice!.toFixed(2).replace(".", ",")}/dia
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
