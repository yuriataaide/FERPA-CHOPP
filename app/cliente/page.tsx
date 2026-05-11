"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useAuthStore } from "@/lib/store/auth"
import { useOrdersStore } from "@/lib/store/orders"
import { orderStatusLabels } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Package, 
  MapPin, 
  LogOut,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  AlertCircle
} from "lucide-react"

const statusIcons: Record<string, React.ReactNode> = {
  em_analise: <Clock className="h-4 w-4" />,
  aprovado: <CheckCircle className="h-4 w-4" />,
  em_separacao: <Package className="h-4 w-4" />,
  saiu_para_entrega: <Truck className="h-4 w-4" />,
  em_locacao: <AlertCircle className="h-4 w-4" />,
  finalizado: <CheckCircle className="h-4 w-4" />,
  cancelado: <XCircle className="h-4 w-4" />
}

const statusColors: Record<string, string> = {
  em_analise: "bg-yellow-100 text-yellow-800",
  aprovado: "bg-blue-100 text-blue-800",
  em_separacao: "bg-orange-100 text-orange-800",
  saiu_para_entrega: "bg-purple-100 text-purple-800",
  em_locacao: "bg-cyan-100 text-cyan-800",
  finalizado: "bg-green-100 text-green-800",
  cancelado: "bg-red-100 text-red-800"
}

export default function CustomerDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { getOrdersByUser } = useOrdersStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/cliente/login")
    }
  }, [mounted, isAuthenticated, router])

  if (!mounted || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const orders = getOrdersByUser(user.id)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 md:pt-24">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Olá, {user.name.split(" ")[0]}!
              </h1>
              <p className="text-muted-foreground">
                Gerencie seus pedidos e dados
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{orders.length}</p>
                    <p className="text-sm text-muted-foreground">Pedidos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {orders.filter(o => !["finalizado", "cancelado"].includes(o.status)).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Em andamento</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {orders.filter(o => o.status === "finalizado").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Finalizados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="orders" className="w-full">
            <TabsList>
              <TabsTrigger value="orders">Meus Pedidos</TabsTrigger>
              <TabsTrigger value="profile">Meus Dados</TabsTrigger>
              <TabsTrigger value="addresses">Endereços</TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-6">
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <CardTitle className="text-lg">Pedido #{order.id}</CardTitle>
                            <CardDescription>
                              Realizado em {formatDate(order.createdAt)}
                            </CardDescription>
                          </div>
                          <Badge className={`w-fit ${statusColors[order.status]}`}>
                            {statusIcons[order.status]}
                            <span className="ml-1">{orderStatusLabels[order.status]}</span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {item.quantity}x {item.product.name}
                                {item.product.isRental && ` (${item.rentalDays} dias)`}
                              </span>
                              <span>
                                R$ {(
                                  (item.product.isRental 
                                    ? item.product.rentalPrice! * (item.rentalDays || 1) 
                                    : item.product.price) * item.quantity
                                ).toFixed(2).replace(".", ",")}
                              </span>
                            </div>
                          ))}
                          <Separator />
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Frete</span>
                            <span>R$ {order.freight.toFixed(2).replace(".", ",")}</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span className="text-primary">
                              R$ {order.total.toFixed(2).replace(".", ",")}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>
                              {order.address.street}, {order.address.number}
                              {order.address.complement && ` - ${order.address.complement}`}
                              <br />
                              {order.address.neighborhood}, {order.address.city} - {order.address.state}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                            <Clock className="h-4 w-4 shrink-0" />
                            <span>
                              Evento: {formatDate(order.eventDate)} às {order.eventTime}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Package className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhum pedido ainda</h3>
                    <p className="text-muted-foreground mb-4">
                      Você ainda não realizou nenhum pedido.
                    </p>
                    <Button onClick={() => router.push("/produtos")}>
                      Ver Produtos
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Meus Dados
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Nome</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">E-mail</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Endereços Salvos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user.addresses.length > 0 ? (
                    <div className="space-y-4">
                      {user.addresses.map((address, index) => (
                        <div key={index} className="p-4 bg-muted/50 rounded-lg">
                          <p className="font-medium">
                            {address.street}, {address.number}
                            {address.complement && ` - ${address.complement}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {address.neighborhood}, {address.city} - {address.state}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            CEP: {address.cep}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MapPin className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                      <p className="text-muted-foreground">
                        Nenhum endereço salvo ainda.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
