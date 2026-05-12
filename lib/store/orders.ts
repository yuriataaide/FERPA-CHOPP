"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Order, OrderStatus } from "@/lib/types"

// Mock orders for demo
const mockOrders: Order[] = [
  {
    id: "PED-001",

    items: [
      {
        product: "chopp-pilsen-50l",
        productName: "Chopp Pilsen",
        quantity: 2,
        price: 420,
      },
      {
        product: "choppeira-eletrica-1via",
        productName: "Choppeira Elétrica 1 Via",
        quantity: 1,
        price: 300,
        rentalDays: 2,
      }
    ],

    total: 1185,

    status: "em_separacao",

    paymentMethod: "pix",
    paymentStatus: "paid",

    deliveryAddress: {
      cep: "90000-000",
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 101",
      neighborhood: "Centro",
      city: "Porto Alegre",
      state: "RS"
    },

    eventDate: "2025-02-15",
    eventTime: "18:00",

    observations: "Festa de aniversário",

    customerName: "João Silva",
    customerEmail: "joao@example.com",
    customerPhone: "(51) 99999-9999",

    createdAt: "2025-01-28T10:30:00Z"
  }
]

interface OrdersStore {
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "createdAt">) => void
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  getOrdersByUser: (userId: string) => Order[]
  getOrderById: (orderId: string) => Order | undefined
}

export const useOrderStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: mockOrders,

      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `PED-${String(Date.now()).slice(-6)}`,
          createdAt: new Date().toISOString()
        }
        set((state) => ({
          orders: [newOrder, ...state.orders]
        }))
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          )
        }))
      },

      getOrdersByUser: (email) => {
        return get().orders.filter((order) => 
          order.customerEmail === email
        )
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId)
      }
    }),
    {
      name: "ferpa-orders"
    }
  )
)
