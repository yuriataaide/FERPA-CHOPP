// Configuração de fretes por região
export interface FreightZone {
  id: string
  name: string
  cities: string[]
  price: number
  estimatedDays: number
  minOrder: number // Pedido mínimo para frete grátis
}

export const freightZones: FreightZone[] = [
  {
    id: "porto-alegre",
    name: "Porto Alegre",
    cities: ["porto alegre"],
    price: 15.0,
    estimatedDays: 1,
    minOrder: 200,
  },
  {
    id: "grande-poa",
    name: "Grande Porto Alegre",
    cities: [
      "canoas",
      "novo hamburgo",
      "são leopoldo",
      "cachoeirinha",
      "gravataí",
      "viamão",
      "alvorada",
      "esteio",
      "sapucaia do sul",
      "guaíba",
      "eldorado do sul",
    ],
    price: 25.0,
    estimatedDays: 1,
    minOrder: 300,
  },
  {
    id: "serra-gaucha",
    name: "Serra Gaúcha",
    cities: [
      "caxias do sul",
      "bento gonçalves",
      "garibaldi",
      "farroupilha",
      "flores da cunha",
      "carlos barbosa",
    ],
    price: 45.0,
    estimatedDays: 2,
    minOrder: 400,
  },
  {
    id: "litoral",
    name: "Litoral Norte",
    cities: [
      "tramandaí",
      "imbé",
      "capão da canoa",
      "xangri-lá",
      "osório",
      "torres",
    ],
    price: 55.0,
    estimatedDays: 2,
    minOrder: 450,
  },
  {
    id: "interior",
    name: "Interior RS",
    cities: [],
    price: 75.0,
    estimatedDays: 3,
    minOrder: 500,
  },
]

export function calculateFreight(
  city: string,
  orderTotal: number
): {
  zone: FreightZone
  freightPrice: number
  isFreeFreight: boolean
  estimatedDays: number
} {
  const normalizedCity = city.toLowerCase().trim()

  // Encontra a zona de frete
  let zone = freightZones.find((z) => z.cities.includes(normalizedCity))

  // Se não encontrar, usa a zona "Interior"
  if (!zone) {
    zone = freightZones.find((z) => z.id === "interior")!
  }

  const isFreeFreight = orderTotal >= zone.minOrder
  const freightPrice = isFreeFreight ? 0 : zone.price

  return {
    zone,
    freightPrice,
    isFreeFreight,
    estimatedDays: zone.estimatedDays,
  }
}

export function formatDeliveryEstimate(days: number): string {
  if (days === 1) {
    return "Entrega em até 24 horas"
  }
  return `Entrega em até ${days} dias úteis`
}
