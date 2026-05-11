import { Product } from "@/lib/types"

export const products: Product[] = [
  // Chopp
  {
    id: "chopp-pilsen-30l",
    name: "Chopp Pilsen",
    brand: "Ecobier",
    category: "chopp",
    volume: "30L",
    price: 280.00,
    image: "/images/products/chopp-pilsen.jpg",
    available: true,
    description: "Chopp Pilsen tradicional, leve e refrescante"
  },
  {
    id: "chopp-pilsen-50l",
    name: "Chopp Pilsen",
    brand: "Ecobier",
    category: "chopp",
    volume: "50L",
    price: 420.00,
    image: "/images/products/chopp-pilsen.jpg",
    available: true,
    description: "Chopp Pilsen tradicional, leve e refrescante"
  },
  {
    id: "chopp-black-30l",
    name: "Chopp Black",
    brand: "Ecobier",
    category: "chopp",
    volume: "30L",
    price: 320.00,
    image: "/images/products/chopp-black.jpg",
    available: true,
    description: "Chopp escuro com notas de café e chocolate"
  },
  {
    id: "chopp-weiss-30l",
    name: "Chopp Weiss",
    brand: "Ecobier",
    category: "chopp",
    volume: "30L",
    price: 340.00,
    image: "/images/products/chopp-weiss.jpg",
    available: true,
    description: "Chopp de trigo com aroma frutado"
  },
  
  // Cervejas
  {
    id: "cerveja-pilsen-600ml",
    name: "Cerveja Pilsen",
    brand: "Brahma",
    category: "cervejas",
    volume: "600ml",
    price: 8.90,
    image: "/images/products/cerveja-pilsen.jpg",
    available: true
  },
  {
    id: "cerveja-original-600ml",
    name: "Cerveja Original",
    brand: "Antarctica",
    category: "cervejas",
    volume: "600ml",
    price: 9.50,
    image: "/images/products/cerveja-original.jpg",
    available: true
  },
  {
    id: "cerveja-heineken-long",
    name: "Heineken Long Neck",
    brand: "Heineken",
    category: "cervejas",
    volume: "330ml",
    price: 6.90,
    image: "/images/products/heineken.jpg",
    available: true
  },
  {
    id: "cerveja-stella-long",
    name: "Stella Artois Long Neck",
    brand: "Stella Artois",
    category: "cervejas",
    volume: "330ml",
    price: 7.50,
    image: "/images/products/stella.jpg",
    available: true
  },
  
  // Refrigerantes
  {
    id: "coca-cola-2l",
    name: "Coca-Cola",
    brand: "Coca-Cola",
    category: "refrigerantes",
    volume: "2L",
    price: 10.90,
    image: "/images/products/coca-cola.jpg",
    available: true
  },
  {
    id: "guarana-2l",
    name: "Guaraná Antarctica",
    brand: "Antarctica",
    category: "refrigerantes",
    volume: "2L",
    price: 8.90,
    image: "/images/products/guarana.jpg",
    available: true
  },
  {
    id: "fanta-laranja-2l",
    name: "Fanta Laranja",
    brand: "Coca-Cola",
    category: "refrigerantes",
    volume: "2L",
    price: 8.90,
    image: "/images/products/fanta.jpg",
    available: true
  },
  
  // Água Mineral
  {
    id: "agua-mineral-500ml",
    name: "Água Mineral sem Gás",
    brand: "Crystal",
    category: "agua",
    volume: "500ml",
    price: 2.50,
    image: "/images/products/agua-mineral.jpg",
    available: true
  },
  {
    id: "agua-mineral-1500ml",
    name: "Água Mineral sem Gás",
    brand: "Crystal",
    category: "agua",
    volume: "1.5L",
    price: 4.50,
    image: "/images/products/agua-mineral.jpg",
    available: true
  },
  {
    id: "agua-gas-500ml",
    name: "Água com Gás",
    brand: "São Lourenço",
    category: "agua",
    volume: "500ml",
    price: 3.90,
    image: "/images/products/agua-gas.jpg",
    available: true
  },
  
  // Energéticos
  {
    id: "red-bull-250ml",
    name: "Red Bull Energy Drink",
    brand: "Red Bull",
    category: "energeticos",
    volume: "250ml",
    price: 12.90,
    image: "/images/products/redbull.jpg",
    available: true
  },
  {
    id: "monster-473ml",
    name: "Monster Energy",
    brand: "Monster",
    category: "energeticos",
    volume: "473ml",
    price: 9.90,
    image: "/images/products/monster.jpg",
    available: true
  },
  
  // Destilados
  {
    id: "vodka-absolut-1l",
    name: "Vodka Absolut",
    brand: "Absolut",
    category: "destilados",
    volume: "1L",
    price: 89.90,
    image: "/images/products/absolut.jpg",
    available: true
  },
  {
    id: "whisky-johnnie-red-1l",
    name: "Whisky Red Label",
    brand: "Johnnie Walker",
    category: "destilados",
    volume: "1L",
    price: 119.90,
    image: "/images/products/johnnie-red.jpg",
    available: true
  },
  {
    id: "cachaca-51-1l",
    name: "Cachaça 51",
    brand: "51",
    category: "destilados",
    volume: "1L",
    price: 15.90,
    image: "/images/products/cachaca-51.jpg",
    available: true
  },
  
  // Sucos
  {
    id: "suco-laranja-1l",
    name: "Suco de Laranja Integral",
    brand: "Del Valle",
    category: "sucos",
    volume: "1L",
    price: 9.90,
    image: "/images/products/suco-laranja.jpg",
    available: true
  },
  {
    id: "suco-uva-1l",
    name: "Suco de Uva Integral",
    brand: "Aurora",
    category: "sucos",
    volume: "1L",
    price: 12.90,
    image: "/images/products/suco-uva.jpg",
    available: true
  },
  
  // Gelo
  {
    id: "gelo-5kg",
    name: "Gelo em Cubos",
    brand: "Ice Premium",
    category: "gelo",
    volume: "5kg",
    price: 15.00,
    image: "/images/products/gelo.jpg",
    available: true
  },
  {
    id: "gelo-10kg",
    name: "Gelo em Cubos",
    brand: "Ice Premium",
    category: "gelo",
    volume: "10kg",
    price: 25.00,
    image: "/images/products/gelo.jpg",
    available: true
  },
  
  // Descartáveis
  {
    id: "copo-plastico-300ml-100un",
    name: "Copo Plástico Transparente",
    brand: "Copobras",
    category: "descartaveis",
    volume: "300ml - 100un",
    price: 18.90,
    image: "/images/products/copos-plastico.jpg",
    available: true
  },
  {
    id: "copo-cerveja-400ml-50un",
    name: "Copo para Cerveja",
    brand: "Copobras",
    category: "descartaveis",
    volume: "400ml - 50un",
    price: 24.90,
    image: "/images/products/copos-cerveja.jpg",
    available: true
  },
  
  // Choppeiras (Locação)
  {
    id: "choppeira-eletrica-1via",
    name: "Choppeira Elétrica 1 Via",
    brand: "Memo",
    category: "choppeiras",
    volume: "Para barris de 30L e 50L",
    price: 0,
    rentalPrice: 150.00,
    image: "/images/products/choppeira-eletrica.jpg",
    available: true,
    isRental: true,
    description: "Choppeira elétrica profissional com sistema de refrigeração"
  },
  {
    id: "choppeira-eletrica-2vias",
    name: "Choppeira Elétrica 2 Vias",
    brand: "Memo",
    category: "choppeiras",
    volume: "Para 2 barris simultâneos",
    price: 0,
    rentalPrice: 250.00,
    image: "/images/products/choppeira-2vias.jpg",
    available: true,
    isRental: true,
    description: "Serve dois tipos de chopp ao mesmo tempo"
  },
  {
    id: "choppeira-gelo",
    name: "Choppeira a Gelo",
    brand: "Memo",
    category: "choppeiras",
    volume: "Para barris de 30L",
    price: 0,
    rentalPrice: 80.00,
    image: "/images/products/choppeira-gelo.jpg",
    available: true,
    isRental: true,
    description: "Sistema tradicional com gelo, ideal para eventos externos"
  },
  
  // Cilindros
  {
    id: "cilindro-co2-4kg",
    name: "Cilindro CO₂",
    brand: "White Martins",
    category: "cilindros",
    volume: "4kg",
    price: 0,
    rentalPrice: 60.00,
    image: "/images/products/cilindro-co2.jpg",
    available: true,
    isRental: true,
    description: "Cilindro de gás carbônico para choppeiras"
  },
  {
    id: "cilindro-co2-6kg",
    name: "Cilindro CO₂",
    brand: "White Martins",
    category: "cilindros",
    volume: "6kg",
    price: 0,
    rentalPrice: 80.00,
    image: "/images/products/cilindro-co2.jpg",
    available: true,
    isRental: true,
    description: "Cilindro de gás carbônico para choppeiras - maior capacidade"
  },
  
  // Equipamentos para Eventos
  {
    id: "kit-completo-100pessoas",
    name: "Kit Completo para Evento",
    brand: "Ferpa Chopp",
    category: "equipamentos",
    volume: "Até 100 pessoas",
    price: 0,
    rentalPrice: 450.00,
    image: "/images/products/kit-evento.jpg",
    available: true,
    isRental: true,
    description: "Inclui choppeira, cilindro, barril 50L e copos"
  },
  {
    id: "kit-completo-200pessoas",
    name: "Kit Completo para Evento",
    brand: "Ferpa Chopp",
    category: "equipamentos",
    volume: "Até 200 pessoas",
    price: 0,
    rentalPrice: 750.00,
    image: "/images/products/kit-evento.jpg",
    available: true,
    isRental: true,
    description: "Inclui choppeira 2 vias, cilindro 6kg, 2 barris 50L e copos"
  }
]

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.brand.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  )
}

export function getRentalProducts(): Product[] {
  return products.filter(p => p.isRental)
}

export function getSaleProducts(): Product[] {
  return products.filter(p => !p.isRental)
}
