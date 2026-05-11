"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartItem } from "@/components/cart/cart-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { useCartStore } from "@/lib/store/cart"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { items, clearCart } = useCartStore()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 md:pt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Carrinho
              </h1>
              <p className="text-muted-foreground">
                {items.length} {items.length === 1 ? "item" : "itens"} no carrinho
              </p>
            </div>
            {items.length > 0 && (
              <Button variant="outline" onClick={clearCart}>
                Limpar Carrinho
              </Button>
            )}
          </div>

          {items.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-xl border border-border p-6">
                  {items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
                
                <div className="mt-6">
                  <Link href="/produtos">
                    <Button variant="ghost">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continuar Comprando
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <CartSummary />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <ShoppingCart className="w-20 h-20 mx-auto text-muted-foreground/30 mb-6" />
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">
                Seu carrinho está vazio
              </h2>
              <p className="text-muted-foreground mb-8">
                Adicione produtos ao carrinho para continuar.
              </p>
              <Link href="/produtos">
                <Button size="lg">
                  Ver Produtos
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
