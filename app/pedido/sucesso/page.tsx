"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Package, Truck, CreditCard, Clock, MapPin, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"

export default function OrderSuccessPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Gerar número de pedido aleatório
    const num = Math.floor(Math.random() * 900000) + 100000
    setOrderNumber(`FRP-${num}`)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-primary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4"
          >
            Pedido Realizado com Sucesso!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg mb-2"
          >
            Obrigado por escolher a Ferpa Chopp!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-secondary/20 rounded-lg p-4 inline-block mb-8"
          >
            <p className="text-sm text-muted-foreground">Número do Pedido</p>
            <p className="text-2xl font-bold text-secondary">{orderNumber}</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Próximos Passos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">1. Confirmação</h3>
                  <p className="text-sm text-muted-foreground">
                    Você receberá um e-mail e WhatsApp com a confirmação do seu pedido
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">2. Preparação</h3>
                  <p className="text-sm text-muted-foreground">
                    Nossa equipe irá preparar seu pedido com todo cuidado
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">3. Entrega</h3>
                  <p className="text-sm text-muted-foreground">
                    Entregaremos no endereço informado na data agendada
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Precisa de Ajuda?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Telefone</h3>
                    <p className="text-muted-foreground">(51) 3XXX-XXXX</p>
                    <p className="text-sm text-muted-foreground">Seg a Sex: 8h às 18h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                    <p className="text-muted-foreground">(51) 9XXXX-XXXX</p>
                    <p className="text-sm text-muted-foreground">Atendimento 24h</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-8" />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cliente">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Package className="w-4 h-4 mr-2" />
                Acompanhar Pedido
              </Button>
            </Link>
            <Link href="/produtos">
              <Button size="lg" className="w-full sm:w-auto">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
