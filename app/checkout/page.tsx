"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useCartStore } from "@/lib/store/cart"
import { useOrderStore } from "@/lib/store/orders"
import { useAuthStore } from "@/lib/store/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  MapPin, 
  Calendar, 
  CreditCard, 
  Package,
  Truck,
  CheckCircle,
  ArrowLeft,
  Copy,
  QrCode,
  Barcode,
  Percent,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { calculateFreight, formatDeliveryEstimate } from "@/lib/utils/freight"
import { 
  paymentMethods, 
  calculatePaymentTotal, 
  generatePixCode, 
  generateBoletoCode,
  formatCurrency,
  type PaymentMethod 
} from "@/lib/utils/payment"

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const { addOrder } = useOrderStore()
  const { user } = useAuthStore()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [pixCode, setPixCode] = useState("")
  const [boletoCode, setBoletoCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "RS",
    eventDate: "",
    eventTime: "",
    observations: "",
  })

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("pix")
  const [freightInfo, setFreightInfo] = useState({
    price: 0,
    isFreeFreight: false,
    estimatedDays: 1,
    zoneName: "",
  })

  useEffect(() => {
    setMounted(true)
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
      }))
    }
  }, [user])

  const subtotal = mounted ? getTotal() : 0
  const paymentCalc = calculatePaymentTotal(subtotal, freightInfo.price, selectedPayment)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 5) return numbers
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = formatCEP(e.target.value)
    setFormData(prev => ({ ...prev, cep }))
    
    if (cep.replace("-", "").length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`)
        const data = await response.json()
        if (!data.erro) {
          const newCity = data.localidade || ""
          setFormData(prev => ({
            ...prev,
            street: data.logradouro || "",
            neighborhood: data.bairro || "",
            city: newCity,
            state: data.uf || "RS",
          }))
          
          // Calcula o frete
          const freight = calculateFreight(newCity, subtotal)
          setFreightInfo({
            price: freight.freightPrice,
            isFreeFreight: freight.isFreeFreight,
            estimatedDays: freight.estimatedDays,
            zoneName: freight.zone.name,
          })
        }
      } catch (error) {
        console.log("[v0] Error fetching address:", error)
      }
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = formatPhone(e.target.value)
    setFormData(prev => ({ ...prev, phone }))
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async () => {
    setLoading(true)
    
    // Gera ID do pedido
    const newOrderId = `FP-${Date.now().toString(36).toUpperCase()}`
    setOrderId(newOrderId)
    
    // Gera códigos de pagamento
    if (selectedPayment === "pix") {
      setPixCode(generatePixCode(newOrderId, paymentCalc.total))
    } else if (selectedPayment === "boleto") {
      setBoletoCode(generateBoletoCode(newOrderId))
    }

    // Salva o pedido
    addOrder({
      items: items.map(item => ({
        product: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.isRental 
          ? item.product.rentalPrice! * (item.rentalDays || 1)
          : item.product.price,
        rentalDays: item.rentalDays,
      })),
      total: paymentCalc.total,
      status: "em_analise",
      paymentMethod: selectedPayment,
      paymentStatus: "pending",
      deliveryAddress: {
        street: formData.street,
        number: formData.number,
        complement: formData.complement,
        neighborhood: formData.neighborhood,
        city: formData.city,
        state: formData.state,
        cep: formData.cep,
      },
      eventDate: formData.eventDate,
      eventTime: formData.eventTime,
      observations: formData.observations,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
    })

    await new Promise(resolve => setTimeout(resolve, 1500))
    setOrderComplete(true)
    clearCart()
    setLoading(false)
  }

  if (!mounted) {
    return null
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pt-20 md:pt-24 flex items-center justify-center">
          <div className="text-center px-6">
            <Package className="w-20 h-20 mx-auto text-muted-foreground/30 mb-6" />
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">
              Nenhum item no carrinho
            </h2>
            <p className="text-muted-foreground mb-8">
              Adicione produtos antes de finalizar o pedido.
            </p>
            <Link href="/produtos">
              <Button size="lg">Ver Produtos</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pt-20 md:pt-24">
          <div className="container mx-auto px-6 py-12 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">
                Pedido Realizado!
              </h2>
              <p className="text-muted-foreground">
                Pedido <span className="font-mono font-semibold text-foreground">{orderId}</span>
              </p>
            </motion.div>

            {/* Payment Instructions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Instruções de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedPayment === "pix" && (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-6 text-center">
                      <QrCode className="w-32 h-32 mx-auto text-foreground/80 mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Escaneie o QR Code ou copie o código PIX
                      </p>
                      <div className="bg-background border rounded-lg p-3 flex items-center gap-2">
                        <code className="text-xs flex-1 break-all text-left">
                          {pixCode.substring(0, 50)}...
                        </code>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => copyToClipboard(pixCode)}
                        >
                          {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Percent className="h-4 w-4" />
                      <span>Desconto de 5% aplicado no PIX!</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      O pagamento via PIX é confirmado automaticamente em poucos segundos.
                    </p>
                  </div>
                )}

                {selectedPayment === "boleto" && (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-6">
                      <Barcode className="w-full h-16 mx-auto text-foreground/80 mb-4" />
                      <div className="bg-background border rounded-lg p-3 flex items-center gap-2">
                        <code className="text-sm flex-1 font-mono">
                          {boletoCode}
                        </code>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => copyToClipboard(boletoCode)}
                        >
                          {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-amber-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>Vencimento em 3 dias úteis</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      O boleto pode levar até 3 dias úteis para compensar após o pagamento.
                    </p>
                  </div>
                )}

                {selectedPayment === "credit_card" && (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-6 text-center">
                      <CreditCard className="w-16 h-16 mx-auto text-foreground/80 mb-4" />
                      <p className="font-medium mb-2">Em breve você receberá um link de pagamento</p>
                      <p className="text-sm text-muted-foreground">
                        Enviamos um e-mail para <span className="font-medium">{formData.email}</span> com o link seguro para pagamento.
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Parcelamento em até 3x sem juros.
                    </p>
                  </div>
                )}

                {selectedPayment === "on_delivery" && (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-6 text-center">
                      <Truck className="w-16 h-16 mx-auto text-foreground/80 mb-4" />
                      <p className="font-medium mb-2">Pague na entrega</p>
                      <p className="text-sm text-muted-foreground">
                        Aceito pagamento em dinheiro, PIX ou cartão.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-amber-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>Taxa de 5% para pagamento na entrega</span>
                    </div>
                  </div>
                )}

                <Separator className="my-6" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(paymentCalc.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    <span>{formatCurrency(paymentCalc.freight)}</span>
                  </div>
                  {paymentCalc.discount > 0 && (
                    <div className="flex justify-between text-sm text-primary">
                      <span>Desconto PIX</span>
                      <span>-{formatCurrency(paymentCalc.discount)}</span>
                    </div>
                  )}
                  {paymentCalc.fee > 0 && (
                    <div className="flex justify-between text-sm text-amber-600">
                      <span>Taxa</span>
                      <span>+{formatCurrency(paymentCalc.fee)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{formatCurrency(paymentCalc.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Link href="/cliente">
                <Button size="lg" className="w-full">
                  Ver Meus Pedidos
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full">
                  Voltar ao Início
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20 md:pt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="mb-8">
            <Link href="/carrinho">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Carrinho
              </Button>
            </Link>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-2">
              Checkout
            </h1>
            <p className="text-muted-foreground">
              Preencha os dados para finalizar seu pedido
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[
              { num: 1, label: "Dados" },
              { num: 2, label: "Entrega" },
              { num: 3, label: "Pagamento" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <button
                  onClick={() => s.num < step && setStep(s.num)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step >= s.num
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  } ${s.num < step ? "cursor-pointer hover:bg-primary/80" : ""}`}
                >
                  {step > s.num ? <CheckCircle className="h-5 w-5" /> : s.num}
                </button>
                <span className="ml-2 text-sm hidden sm:inline">{s.label}</span>
                {i < 2 && (
                  <div className={`w-8 sm:w-16 h-0.5 ml-4 transition-colors ${
                    step > s.num ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Data */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          Seus Dados
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nome Completo *</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Seu nome"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Telefone *</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handlePhoneChange}
                              placeholder="(00) 00000-0000"
                              maxLength={15}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mail *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="seu@email.com"
                          />
                        </div>
                        <Separator />
                        <h4 className="font-medium">Endereço de Entrega</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cep">CEP *</Label>
                            <Input
                              id="cep"
                              name="cep"
                              placeholder="00000-000"
                              value={formData.cep}
                              onChange={handleCEPChange}
                              maxLength={9}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-2 space-y-2">
                            <Label htmlFor="street">Rua *</Label>
                            <Input
                              id="street"
                              name="street"
                              value={formData.street}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="number">Numero *</Label>
                            <Input
                              id="number"
                              name="number"
                              value={formData.number}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="complement">Complemento</Label>
                            <Input
                              id="complement"
                              name="complement"
                              placeholder="Apto, bloco, etc."
                              value={formData.complement}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="neighborhood">Bairro *</Label>
                            <Input
                              id="neighborhood"
                              name="neighborhood"
                              value={formData.neighborhood}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">Cidade *</Label>
                            <Input
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">Estado *</Label>
                            <Input
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        {freightInfo.zoneName && (
                          <div className="bg-muted/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Truck className="h-4 w-4 text-primary" />
                              <span className="font-medium">{freightInfo.zoneName}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {formatDeliveryEstimate(freightInfo.estimatedDays)}
                              {freightInfo.isFreeFreight ? (
                                <span className="text-primary font-medium ml-2">
                                  - Frete Gratis!
                                </span>
                              ) : (
                                <span className="ml-2">
                                  - Frete: {formatCurrency(freightInfo.price)}
                                </span>
                              )}
                            </p>
                          </div>
                        )}

                        <Button 
                          onClick={() => setStep(2)} 
                          className="w-full sm:w-auto"
                          disabled={!formData.name || !formData.email || !formData.phone || !formData.city}
                        >
                          Continuar
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 2: Event Details */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Dados do Evento
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="eventDate">Data do Evento *</Label>
                            <Input
                              id="eventDate"
                              name="eventDate"
                              type="date"
                              value={formData.eventDate}
                              onChange={handleInputChange}
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="eventTime">Horario Desejado de Entrega *</Label>
                            <Input
                              id="eventTime"
                              name="eventTime"
                              type="time"
                              value={formData.eventTime}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="observations">Observacoes</Label>
                          <Textarea
                            id="observations"
                            name="observations"
                            placeholder="Informacoes adicionais sobre o evento ou entrega..."
                            value={formData.observations}
                            onChange={handleInputChange}
                            rows={4}
                          />
                        </div>
                        <div className="flex gap-3">
                          <Button variant="outline" onClick={() => setStep(1)}>
                            Voltar
                          </Button>
                          <Button 
                            onClick={() => setStep(3)}
                            disabled={!formData.eventDate || !formData.eventTime}
                          >
                            Continuar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          Forma de Pagamento
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <RadioGroup
                          value={selectedPayment}
                          onValueChange={(value) => setSelectedPayment(value as PaymentMethod)}
                          className="space-y-3"
                        >
                          {paymentMethods.map((method) => (
                            <div
                              key={method.method}
                              className={`relative flex items-start gap-4 rounded-lg border p-4 cursor-pointer transition-colors ${
                                selectedPayment === method.method
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                              onClick={() => setSelectedPayment(method.method)}
                            >
                              <RadioGroupItem value={method.method} id={method.method} className="mt-1" />
                              <div className="flex-1">
                                <Label htmlFor={method.method} className="font-medium cursor-pointer">
                                  {method.label}
                                  {method.discount && (
                                    <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                      {method.discount}% OFF
                                    </span>
                                  )}
                                  {method.fee && (
                                    <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                                      +{method.fee}% taxa
                                    </span>
                                  )}
                                </Label>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {method.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>

                        {/* Order Summary */}
                        <div className="border rounded-lg p-4 space-y-3">
                          <h4 className="font-semibold">Resumo do Pedido</h4>
                          {items.map(item => (
                            <div key={item.product.id} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {item.quantity}x {item.product.name}
                                {item.product.isRental && ` (${item.rentalDays || 1} dias)`}
                              </span>
                              <span>
                                {formatCurrency(
                                  (item.product.isRental 
                                    ? item.product.rentalPrice! * (item.rentalDays || 1) 
                                    : item.product.price) * item.quantity
                                )}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline" onClick={() => setStep(2)}>
                            Voltar
                          </Button>
                          <Button onClick={handleSubmit} disabled={loading} className="flex-1">
                            {loading ? "Processando..." : "Confirmar Pedido"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {items.slice(0, 3).map(item => (
                        <div key={item.product.id} className="flex gap-3 text-sm">
                          <div className="w-12 h-12 rounded bg-muted flex items-center justify-center shrink-0">
                            <Package className="w-5 h-5 text-muted-foreground/30" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium truncate">{item.product.name}</p>
                            <p className="text-muted-foreground">
                              Qtd: {item.quantity}
                              {item.product.isRental && ` - ${item.rentalDays || 1} dias`}
                            </p>
                          </div>
                        </div>
                      ))}
                      {items.length > 3 && (
                        <p className="text-sm text-muted-foreground">
                          + {items.length - 3} mais itens
                        </p>
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatCurrency(paymentCalc.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Truck className="h-3 w-3" /> Frete
                        </span>
                        <span>
                          {freightInfo.isFreeFreight ? (
                            <span className="text-primary">Gratis</span>
                          ) : (
                            formatCurrency(paymentCalc.freight)
                          )}
                        </span>
                      </div>
                      {paymentCalc.discount > 0 && (
                        <div className="flex justify-between text-sm text-primary">
                          <span>Desconto PIX</span>
                          <span>-{formatCurrency(paymentCalc.discount)}</span>
                        </div>
                      )}
                      {paymentCalc.fee > 0 && (
                        <div className="flex justify-between text-sm text-amber-600">
                          <span>Taxa</span>
                          <span>+{formatCurrency(paymentCalc.fee)}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-primary">{formatCurrency(paymentCalc.total)}</span>
                      </div>
                    </div>

                    {freightInfo.zoneName && (
                      <div className="text-xs text-muted-foreground bg-muted/50 rounded p-2">
                        <Truck className="h-3 w-3 inline mr-1" />
                        {formatDeliveryEstimate(freightInfo.estimatedDays)} para {freightInfo.zoneName}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
