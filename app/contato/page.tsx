"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Send,
  CheckCircle
} from "lucide-react"

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 md:pt-24">
        {/* Hero */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Entre em Contato
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Estamos prontos para atender você. Fale conosco e solicite um orçamento.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    Informações de Contato
                  </h2>
                  <div className="space-y-6">
                    <Card>
                      <CardContent className="flex items-start gap-4 p-6">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Endereço</h3>
                          <p className="text-muted-foreground">
                            Rua Osmani Veras - Olaria<br />
                            Terra de Areia - RS, 95535-000
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="flex items-start gap-4 p-6">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Telefone</h3>
                          <p className="text-muted-foreground">(54) 99974-6974</p>
                          <p className="text-muted-foreground">(51) 98239-0300</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="flex items-start gap-4 p-6">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">E-mail</h3>
                          <p className="text-muted-foreground">contato@ferpachopp.com.br</p>
                          <p className="text-muted-foreground">vendas@ferpachopp.com.br</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="flex items-start gap-4 p-6">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Horário de Atendimento</h3>
                          <p className="text-muted-foreground">Segunda a Sexta: 8h às 18h</p>
                          <p className="text-muted-foreground">Sábado e Domingo: Fechado</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
                      <MessageCircle className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-900">WhatsApp</h3>
                      <p className="text-green-700 text-sm">Atendimento rápido pelo WhatsApp</p>
                    </div>
                    <Button className="bg-green-500 hover:bg-green-600">
                      Conversar
                    </Button>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card>
                  <CardContent className="p-6 md:p-8">
                    {sent ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Mensagem Enviada!</h3>
                        <p className="text-muted-foreground mb-6">
                          Recebemos sua mensagem e entraremos em contato em breve.
                        </p>
                        <Button onClick={() => setSent(false)}>
                          Enviar Nova Mensagem
                        </Button>
                      </div>
                    ) : (
                      <>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                          Envie uma Mensagem
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Nome *</Label>
                              <Input id="name" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Telefone *</Label>
                              <Input id="phone" type="tel" required />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">E-mail *</Label>
                            <Input id="email" type="email" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="subject">Assunto</Label>
                            <Input id="subject" placeholder="Ex: Orçamento para evento" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message">Mensagem *</Label>
                            <Textarea 
                              id="message" 
                              rows={5} 
                              placeholder="Descreva o que você precisa..."
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                              "Enviando..."
                            ) : (
                              <>
                                <Send className="h-4 w-4 mr-2" />
                                Enviar Mensagem
                              </>
                            )}
                          </Button>
                        </form>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="h-80 bg-muted flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">Mapa Google Maps</p>
            <p className="text-sm text-muted-foreground">Integração disponível com API</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
