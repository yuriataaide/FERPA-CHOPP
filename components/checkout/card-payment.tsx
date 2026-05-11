"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Lock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CardPaymentProps {
  amount: number
  onSubmit: (cardData: CardData) => void
  isProcessing?: boolean
}

interface CardData {
  number: string
  name: string
  expiry: string
  cvv: string
  installments: number
}

export function CardPayment({ amount, onSubmit, isProcessing }: CardPaymentProps) {
  const [cardData, setCardData] = useState<CardData>({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    installments: 1,
  })
  const [errors, setErrors] = useState<Partial<CardData>>({})

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    const groups = numbers.match(/.{1,4}/g)
    return groups ? groups.join(" ").substring(0, 19) : ""
  }

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length >= 2) {
      return `${numbers.substring(0, 2)}/${numbers.substring(2, 4)}`
    }
    return numbers
  }

  const handleChange = (field: keyof CardData, value: string | number) => {
    let formattedValue = value

    if (field === "number" && typeof value === "string") {
      formattedValue = formatCardNumber(value)
    } else if (field === "expiry" && typeof value === "string") {
      formattedValue = formatExpiry(value)
    } else if (field === "cvv" && typeof value === "string") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4)
    }

    setCardData((prev) => ({ ...prev, [field]: formattedValue }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = (): boolean => {
    const newErrors: Partial<CardData> = {}

    if (cardData.number.replace(/\s/g, "").length < 16) {
      newErrors.number = "Número do cartão inválido"
    }
    if (cardData.name.length < 3) {
      newErrors.name = "Nome inválido"
    }
    if (cardData.expiry.length < 5) {
      newErrors.expiry = "Data inválida"
    }
    if (cardData.cvv.length < 3) {
      newErrors.cvv = "CVV inválido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(cardData)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getInstallmentOptions = () => {
    const options = []
    const maxInstallments = 12
    const minInstallmentValue = 50

    for (let i = 1; i <= maxInstallments; i++) {
      const installmentValue = amount / i
      if (installmentValue >= minInstallmentValue || i === 1) {
        const hasInterest = i > 3
        const interestRate = hasInterest ? 0.0199 : 0 // 1.99% a.m. após 3x
        const totalWithInterest = hasInterest
          ? amount * Math.pow(1 + interestRate, i)
          : amount
        const installmentWithInterest = totalWithInterest / i

        options.push({
          value: i,
          label: hasInterest
            ? `${i}x de ${formatCurrency(installmentWithInterest)} (com juros)`
            : `${i}x de ${formatCurrency(installmentValue)} sem juros`,
        })
      }
    }

    return options
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          Pagamento com Cartão
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Número do Cartão */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Número do Cartão</Label>
            <div className="relative">
              <Input
                id="cardNumber"
                placeholder="0000 0000 0000 0000"
                value={cardData.number}
                onChange={(e) => handleChange("number", e.target.value)}
                className={errors.number ? "border-destructive" : ""}
                maxLength={19}
              />
              <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
            {errors.number && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.number}
              </p>
            )}
          </div>

          {/* Nome no Cartão */}
          <div className="space-y-2">
            <Label htmlFor="cardName">Nome no Cartão</Label>
            <Input
              id="cardName"
              placeholder="Como está impresso no cartão"
              value={cardData.name}
              onChange={(e) => handleChange("name", e.target.value.toUpperCase())}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Validade e CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Validade</Label>
              <Input
                id="expiry"
                placeholder="MM/AA"
                value={cardData.expiry}
                onChange={(e) => handleChange("expiry", e.target.value)}
                className={errors.expiry ? "border-destructive" : ""}
                maxLength={5}
              />
              {errors.expiry && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.expiry}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="000"
                value={cardData.cvv}
                onChange={(e) => handleChange("cvv", e.target.value)}
                className={errors.cvv ? "border-destructive" : ""}
                maxLength={4}
                type="password"
              />
              {errors.cvv && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.cvv}
                </p>
              )}
            </div>
          </div>

          {/* Parcelas */}
          <div className="space-y-2">
            <Label htmlFor="installments">Parcelas</Label>
            <Select
              value={cardData.installments.toString()}
              onValueChange={(value) => handleChange("installments", parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {getInstallmentOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Valor Total */}
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">Valor Total</p>
            <p className="text-2xl font-bold text-primary">{formatCurrency(amount)}</p>
          </div>

          {/* Botão de Pagamento */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
              />
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Pagar {formatCurrency(amount)}
              </>
            )}
          </Button>

          {/* Segurança */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="w-3 h-3" />
            <span>Pagamento 100% seguro com criptografia SSL</span>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
