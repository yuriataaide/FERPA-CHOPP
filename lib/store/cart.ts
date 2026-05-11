"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { CartItem, Product } from "@/lib/types"

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, rentalDays?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateRentalDays: (productId: string, days: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1, rentalDays) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          )
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }
          
          return {
            items: [...state.items, { product, quantity, rentalDays }],
          }
        })
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }))
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }))
      },
      
      updateRentalDays: (productId, days) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, rentalDays: days } : item
          ),
        }))
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        return get().items.reduce((total, item) => {
          if (item.product.isRental && item.product.rentalPrice) {
            return total + item.product.rentalPrice * (item.rentalDays || 1) * item.quantity
          }
          return total + item.product.price * item.quantity
        }, 0)
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: "ferpa-cart",
    }
  )
)
