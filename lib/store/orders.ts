"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Order, OrderStatus } from "@/lib/types"

// Mock orders for demo
const mockOrders: Order[] = [
  {
    id: "PED-001",
    userId: "1",
    items: [
      {
        product: {
          id: "chopp-pilsen-50l",
          name: "Chopp Pilsen",
          brand: "Ecobier",
          category: "chopp",
          volume: "50L",
          price: 420.00,
          image: "/images/products/chopp-pilsen.jpg",
          available: true
        },
        quantity: 2
      },
      {
        product: {
          id: "choppeira-eletrica-1via",
          name: "Choppeira Elétrica 1 Via",
          brand: "Memo",
          category: "choppeiras",
          volume: "Para barris de 30L e 50L",
          price: 0,
          rentalPrice: 150.00,
          image: "/images/products/choppeira-eletrica.jpg",
          available: true,
          isRental: true
        },
        quantity: 1,
        rentalDays: 2
      }
    ],
    address: {
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
    observations: "Festa de aniversário, por favor entregar com antecedência.",
    freight: 45.00,
    total: 1185.00,
    status: "em_separacao",
    createdAt: "2025-01-28T10:30:00Z"
  },
  {
    id: "PED-002",
    userId: "1",
    items: [
      {
        product: {
          id: "cerveja-heineken-long",
          name: "Heineken Long Neck",
          brand: "Heineken",
          category: "cervejas",
          volume: "330ml",
          price: 6.90,
          image: "/images/products/heineken.jpg",
          available: true
        },
        quantity: 24
      }
    ],
    address: {
      cep: "90000-000",
      street: "Rua das Flores",
      number: "123",
      neighborhood: "Centro",
      city: "Porto Alegre",
      state: "RS"
    },
    eventDate: "2025-01-20",
    eventTime: "20:00",
    freight: 30.00,
    total: 195.60,
    status: "finalizado",
    createdAt: "2025-01-15T14:00:00Z"
  }
]

interface OrdersStore {
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "createdAt">) => void
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  getOrdersByUser: (userId: string) => Order[]
  getOrderById: (orderId: string) => Order | undefined
}

export const useOrdersStore = create<OrdersStore>()(
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

      getOrdersByUser: (userId) => {
        return get().orders.filter((order) => order.userId === userId)
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
