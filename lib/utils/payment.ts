export type PaymentMethod = "pix" | "credit_card" | "boleto" | "on_delivery"

export interface PaymentInfo {
  method: PaymentMethod
  label: string
  description: string
  discount?: number // Percentual de desconto
  fee?: number // Taxa adicional
  icon: string
}

export const paymentMethods: PaymentInfo[] = [
  {
    method: "pix",
    label: "PIX",
    description: "Pagamento instantâneo com 5% de desconto",
    discount: 5,
    icon: "pix",
  },
  {
    method: "credit_card",
    label: "Cartão de Crédito",
    description: "Em até 3x sem juros",
    icon: "credit-card",
  },
  {
    method: "boleto",
    label: "Boleto Bancário",
    description: "Vencimento em 3 dias úteis",
    icon: "barcode",
  },
  {
    method: "on_delivery",
    label: "Pagamento na Entrega",
    description: "Dinheiro, PIX ou cartão",
    fee: 5,
    icon: "truck",
  },
]

export function calculatePaymentTotal(
  subtotal: number,
  freight: number,
  method: PaymentMethod
): {
  subtotal: number
  freight: number
  discount: number
  fee: number
  total: number
} {
  const paymentInfo = paymentMethods.find((p) => p.method === method)

  let discount = 0
  let fee = 0

  if (paymentInfo?.discount) {
    discount = (subtotal * paymentInfo.discount) / 100
  }

  if (paymentInfo?.fee) {
    fee = (subtotal * paymentInfo.fee) / 100
  }

  const total = subtotal + freight - discount + fee

  return {
    subtotal,
    freight,
    discount,
    fee,
    total,
  }
}

// Gera código PIX fictício para demonstração
export function generatePixCode(orderId: string, amount: number): string {
  const pixData = {
    key: "contato@ferpachopp.com.br",
    name: "FERPA CHOPP DISTRIBUIDORA",
    city: "PORTO ALEGRE",
    amount: amount.toFixed(2),
    txid: orderId.replace(/-/g, "").substring(0, 25),
  }

  // Simula um código PIX (EMV format simplificado)
  const pixCode = `00020126580014BR.GOV.BCB.PIX0136${pixData.key}5204000053039865404${pixData.amount}5802BR5925${pixData.name}6013${pixData.city}62070503***6304`

  return pixCode
}

// Gera código de barras fictício para boleto
export function generateBoletoCode(orderId: string): string {
  const random = Math.random().toString().slice(2, 12)
  return `23793.38128 60000.000003 ${random} 1 ${Date.now().toString().slice(-10)}`
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}
