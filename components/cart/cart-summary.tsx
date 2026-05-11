"use client"

import { useState } from "react"
import { useCartStore } from "@/lib/store/cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, Truck, Calculator } from "lucide-react"
import Link from "next/link"

export function CartSummary() {
  const { getTotal, getItemCount } = useCartStore()
  const [cep, setCep] = useState("")
  const [freight, setFreight] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const subtotal = getTotal()
  const total = subtotal + (freight || 0)

  const calculateFreight = async () => {
    if (cep.length < 8) return
    
    setLoading(true)
    // Simulando cálculo de frete
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Frete simulado baseado no CEP
    const cepNumber = parseInt(cep.replace("-", ""))
    const baseFreight = cepNumber % 100 + 30
    setFreight(baseFreight)
    setLoading(false)
  }

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 5) return numbers
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Resumo do Pedido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Freight Calculator */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Calcular Frete
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="00000-000"
              value={cep}
              onChange={(e) => setCep(formatCEP(e.target.value))}
              maxLength={9}
            />
            <Button
              variant="outline"
              onClick={calculateFreight}
              disabled={cep.length < 8 || loading}
            >
              {loading ? "..." : "Calcular"}
            </Button>
          </div>
          {freight !== null && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              <Truck className="h-4 w-4" />
              <span>Frete: R$ {freight.toFixed(2).replace(".", ",")}</span>
              <span className="ml-auto">Prazo: 1-2 dias úteis</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal ({getItemCount()} itens)</span>
            <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
          </div>
          {freight !== null && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Frete</span>
              <span>R$ {freight.toFixed(2).replace(".", ",")}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">R$ {total.toFixed(2).replace(".", ",")}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <Link href="/checkout" className="block">
          <Button 
            className="w-full" 
            size="lg"
            disabled={getItemCount() === 0}
          >
            Finalizar Pedido
          </Button>
        </Link>

        <p className="text-xs text-center text-muted-foreground">
          Ao finalizar, você será redirecionado para o checkout seguro.
        </p>
      </CardContent>
    </Card>
  )
}
