export type Category = 
  | "chopp"
  | "cervejas"
  | "refrigerantes"
  | "agua"
  | "energeticos"
  | "destilados"
  | "sucos"
  | "gelo"
  | "descartaveis"
  | "choppeiras"
  | "cilindros"
  | "equipamentos"

export interface Product {
  id: string
  name: string
  brand: string
  category: Category
  volume: string
  price: number
  image: string
  available: boolean
  isRental?: boolean
  rentalPrice?: number
  description?: string
}

export interface CartItem {
  product: Product
  quantity: number
  rentalDays?: number
}

export interface OrderAddress {
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

export interface Order {
  id: string
  items: CartItem[]
  address: OrderAddress
  eventDate: string
  eventTime: string
  observations?: string
  freight: number
  total: number
  status: OrderStatus
  createdAt: string
  userId: string
}

export type OrderStatus = 
  | "em_analise"
  | "aprovado"
  | "em_separacao"
  | "saiu_para_entrega"
  | "em_locacao"
  | "finalizado"
  | "cancelado"

export interface User {
  id: string
  name: string
  email: string
  phone: string
  addresses: OrderAddress[]
}

export const categoryLabels: Record<Category, string> = {
  chopp: "Chopp",
  cervejas: "Cervejas",
  refrigerantes: "Refrigerantes",
  agua: "Água Mineral",
  energeticos: "Energéticos",
  destilados: "Destilados",
  sucos: "Sucos",
  gelo: "Gelo",
  descartaveis: "Copos e Descartáveis",
  choppeiras: "Choppeiras",
  cilindros: "Cilindros de Gás",
  equipamentos: "Equipamentos para Eventos"
}

export const orderStatusLabels: Record<OrderStatus, string> = {
  em_analise: "Em Análise",
  aprovado: "Aprovado",
  em_separacao: "Em Separação",
  saiu_para_entrega: "Saiu para Entrega",
  em_locacao: "Em Locação",
  finalizado: "Finalizado",
  cancelado: "Cancelado"
}
