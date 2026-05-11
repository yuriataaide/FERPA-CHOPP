"use client"

import { useState } from "react"
import { useOrdersStore } from "@/lib/store/orders"
import { orderStatusLabels, OrderStatus } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Search, 
  Package, 
  MapPin, 
  Clock, 
  Eye,
  CheckCircle,
  XCircle
} from "lucide-react"

const statusColors: Record<string, string> = {
  em_analise: "bg-yellow-100 text-yellow-800",
  aprovado: "bg-blue-100 text-blue-800",
  em_separacao: "bg-orange-100 text-orange-800",
  saiu_para_entrega: "bg-purple-100 text-purple-800",
  em_locacao: "bg-cyan-100 text-cyan-800",
  finalizado: "bg-green-100 text-green-800",
  cancelado: "bg-red-100 text-red-800"
}

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useOrdersStore()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const order = selectedOrder ? orders.find(o => o.id === selectedOrder) : null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Pedidos</h1>
        <p className="text-muted-foreground">Gerencie todos os pedidos</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por número do pedido..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {Object.entries(orderStatusLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredOrders.length} {filteredOrders.length === 1 ? "pedido" : "pedidos"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div 
                  key={order.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">#{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className={statusColors[order.status]}>
                      {orderStatusLabels[order.status]}
                    </Badge>
                    <span className="font-semibold">
                      R$ {order.total.toFixed(2).replace(".", ",")}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedOrder(order.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">Nenhum pedido encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {order && (
            <>
              <DialogHeader>
                <DialogTitle>Pedido #{order.id}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Status */}
                <div className="flex items-center justify-between">
                  <Badge className={`${statusColors[order.status]} text-sm px-3 py-1`}>
                    {orderStatusLabels[order.status]}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </span>
                </div>

                {/* Items */}
                <div>
                  <h3 className="font-semibold mb-3">Itens do Pedido</h3>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm p-2 bg-muted/50 rounded">
                        <span>
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
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Endereço de Entrega
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {order.address.street}, {order.address.number}
                    {order.address.complement && ` - ${order.address.complement}`}
                    <br />
                    {order.address.neighborhood}, {order.address.city} - {order.address.state}
                    <br />
                    CEP: {order.address.cep}
                  </p>
                </div>

                {/* Event */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Dados do Evento
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Data: {new Date(order.eventDate).toLocaleDateString("pt-BR")}
                    <br />
                    Horário: {order.eventTime}
                    {order.observations && (
                      <>
                        <br />
                        <br />
                        <strong>Observações:</strong> {order.observations}
                      </>
                    )}
                  </p>
                </div>

                {/* Totals */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>R$ {(order.total - order.freight).toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Frete</span>
                    <span>R$ {order.freight.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>R$ {order.total.toFixed(2).replace(".", ",")}</span>
                  </div>
                </div>

                {/* Actions */}
                {!["finalizado", "cancelado"].includes(order.status) && (
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">Atualizar Status</h3>
                    <div className="flex flex-wrap gap-2">
                      {order.status === "em_analise" && (
                        <Button 
                          size="sm"
                          onClick={() => {
                            updateOrderStatus(order.id, "aprovado")
                            setSelectedOrder(null)
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Aprovar
                        </Button>
                      )}
                      {order.status === "aprovado" && (
                        <Button 
                          size="sm"
                          onClick={() => {
                            updateOrderStatus(order.id, "em_separacao")
                            setSelectedOrder(null)
                          }}
                        >
                          Iniciar Separação
                        </Button>
                      )}
                      {order.status === "em_separacao" && (
                        <Button 
                          size="sm"
                          onClick={() => {
                            updateOrderStatus(order.id, "saiu_para_entrega")
                            setSelectedOrder(null)
                          }}
                        >
                          Saiu para Entrega
                        </Button>
                      )}
                      {order.status === "saiu_para_entrega" && (
                        <Button 
                          size="sm"
                          onClick={() => {
                            updateOrderStatus(order.id, "finalizado")
                            setSelectedOrder(null)
                          }}
                        >
                          Finalizar
                        </Button>
                      )}
                      <Button 
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          updateOrderStatus(order.id, "cancelado")
                          setSelectedOrder(null)
                        }}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
