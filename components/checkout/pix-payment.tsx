"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Copy, CheckCircle, Clock, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PixPaymentProps {
  amount: number
  orderId: string
  onPaymentConfirmed?: () => void
}

export function PixPayment({ amount, orderId, onPaymentConfirmed }: PixPaymentProps) {
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutos
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "confirmed">("pending")

  // Código PIX simulado
  const pixCode = `00020126580014br.gov.bcb.pix0136${orderId}520400005303986540${amount.toFixed(2)}5802BR5925FERPA CHOPP DISTRIBUIDORA6009SAO PAULO62070503***6304`

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Simular confirmação de pagamento após 5 segundos (em produção, seria um webhook)
  useEffect(() => {
    const confirmTimer = setTimeout(() => {
      // Em produção, isso viria de um webhook do provedor de pagamento
      // setPaymentStatus("confirmed")
      // onPaymentConfirmed?.()
    }, 60000)

    return () => clearTimeout(confirmTimer)
  }, [onPaymentConfirmed])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error("Erro ao copiar:", err)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  if (paymentStatus === "confirmed") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-green-600 mb-2">
          Pagamento Confirmado!
        </h3>
        <p className="text-muted-foreground">
          Seu pagamento foi processado com sucesso.
        </p>
      </motion.div>
    )
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2">
          <QrCode className="w-5 h-5 text-primary" />
          Pagamento via PIX
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timer */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm">
            Código expira em: <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
          </span>
        </div>

        {/* QR Code Placeholder */}
        <div className="flex justify-center">
          <div className="w-48 h-48 bg-white border-2 border-muted rounded-lg flex items-center justify-center p-4">
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 rounded flex items-center justify-center">
              <QrCode className="w-24 h-24 text-primary/40" />
            </div>
          </div>
        </div>

        {/* Valor */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Valor a pagar</p>
          <p className="text-3xl font-bold text-primary">{formatCurrency(amount)}</p>
        </div>

        {/* PIX Copia e Cola */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-center">PIX Copia e Cola</p>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs font-mono break-all text-muted-foreground line-clamp-3">
              {pixCode}
            </p>
          </div>
          <Button
            onClick={handleCopy}
            variant="outline"
            className="w-full"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                Código Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copiar Código PIX
              </>
            )}
          </Button>
        </div>

        {/* Instruções */}
        <div className="bg-primary/5 rounded-lg p-4 space-y-2">
          <p className="text-sm font-semibold">Como pagar:</p>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Abra o app do seu banco</li>
            <li>Escolha pagar via PIX</li>
            <li>Escaneie o QR Code ou cole o código</li>
            <li>Confirme o pagamento</li>
          </ol>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-2 py-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Aguardando pagamento...</span>
        </div>
      </CardContent>
    </Card>
  )
}
