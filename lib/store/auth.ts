"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"


export interface OrderAddress {
  id?: number

  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

export interface User {
  id: string

  name: string
  email: string
  phone: string

  addresses: OrderAddress[]
}

interface AuthStore {
  user: User | null

  isAuthenticated: boolean

  loading: boolean

  login: (
    email: string,
    password: string
  ) => Promise<boolean>

  register: (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<boolean>

  logout: () => void

  updateUser: (
    data: Partial<User>
  ) => void

  addAddress: (
    address: OrderAddress
  ) => Promise<void>

  removeAddress: (
    id: number
  ) => Promise<void>
}


export const useAuthStore =
  create<AuthStore>()(
    persist(
      (set, get) => ({
        user: null,

        isAuthenticated: false,

        loading: false,

        login: async (
          email,
          password
        ) => {
          try {
            set({ loading: true })

            const response =
              await fetch(
                "/api/auth/login",
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  body: JSON.stringify({
                    email,
                    password,
                  }),
                }
              )

            const data =
              await response.json()

            if (!response.ok) {
              console.error(
                data.error
              )

              set({
                loading: false,
              })

              return false
            }

            set({
              user: data.user,

              isAuthenticated: true,

              loading: false,
            })

            return true
          } catch (error) {
            console.error(error)

            set({
              loading: false,
            })

            return false
          }
        },

        register: async (
          name,
          email,
          phone,
          password
        ) => {
          try {
            set({ loading: true })

            const response =
              await fetch(
                "/api/auth/register",
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  body: JSON.stringify({
                    name,
                    email,
                    phone,
                    password,
                  }),
                }
              )

            const data =
              await response.json()

            if (!response.ok) {
              console.error(
                data.error
              )

              set({
                loading: false,
              })

              return false
            }

            set({
              user: {
                ...data.user,
                addresses: [],
              },

              isAuthenticated: true,

              loading: false,
            })

            return true
          } catch (error) {
            console.error(error)

            set({
              loading: false,
            })

            return false
          }
        },

        logout: () => {
          set({
            user: null,

            isAuthenticated: false,
          })
        },

        updateUser: (
          data
        ) => {
          const { user } = get()

          if (!user) return

          set({
            user: {
              ...user,
              ...data,
            },
          })
        },

        addAddress: async (
          address
        ) => {
          try {
            const { user } = get()

            if (!user) return

            const response =
              await fetch(
                "/api/user/address",
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  body: JSON.stringify({
                    userId: user.id,
                    ...address,
                  }),
                }
              )

            const data =
              await response.json()

            if (!response.ok) {
              console.error(
                data.error
              )

              return
            }

            set({
              user: {
                ...user,

                addresses: [
                  ...user.addresses,
                  data.address,
                ],
              },
            })
          } catch (error) {
            console.error(error)
          }
        },

        removeAddress: async (
          id
        ) => {
          try {
            const { user } = get()

            if (!user) return

            await fetch(
              `/api/user/address?id=${id}`,
              {
                method: "DELETE",
              }
            )

            set({
              user: {
                ...user,

                addresses:
                  user.addresses.filter(
                    (
                      address
                    ) =>
                      address.id !== id
                  ),
              },
            })
          } catch (error) {
            console.error(error)
          }
        },
      }),

      {
        name: "ferpa-auth",
      }
    )
  )