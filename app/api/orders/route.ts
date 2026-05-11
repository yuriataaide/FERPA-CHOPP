import { neon } from "@neondatabase/serverless"
import { NextRequest, NextResponse } from "next/server"

const sql = neon(process.env.DATABASE_URL!)


interface OrderItem {
  productId: string
  name: string
  quantity: number
  price: number
}

interface OrderData {
  items: OrderItem[]

  customer: {
    name: string
    email: string
    phone: string
    cpfCnpj: string
  }

  delivery: {
    address: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    date: string
    time: string
  }

  payment: {
    method: "pix" | "credit" | "debit" | "boleto" | "cash"
    installments?: number
  }

  subtotal: number
  freight: number
  discount: number
  total: number
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderData = await request.json()

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Carrinho vazio" },
        { status: 400 }
      )
    }

    if (!body.customer.email || !body.customer.phone) {
      return NextResponse.json(
        { error: "Dados do cliente incompletos" },
        { status: 400 }
      )
    }

    const orderId =
      `FRP-${Date.now()
        .toString(36)
        .toUpperCase()}-${Math.random()
          .toString(36)
          .substring(2, 6)
          .toUpperCase()}`

    const status =
      body.payment.method === "pix"
        ? "awaiting_payment"
        : "pending"

    await sql`
      INSERT INTO orders (
        id,

        customer_name,
        customer_email,
        customer_phone,
        customer_cpf_cnpj,

        delivery_address,
        delivery_number,
        delivery_complement,
        delivery_neighborhood,
        delivery_city,
        delivery_state,
        delivery_zip_code,
        delivery_date,
        delivery_time,

        payment_method,
        payment_installments,

        subtotal,
        freight,
        discount,
        total,

        status
      )
      VALUES (
        ${orderId},

        ${body.customer.name},
        ${body.customer.email},
        ${body.customer.phone},
        ${body.customer.cpfCnpj},

        ${body.delivery.address},
        ${body.delivery.number},
        ${body.delivery.complement || null},
        ${body.delivery.neighborhood},
        ${body.delivery.city},
        ${body.delivery.state},
        ${body.delivery.zipCode},
        ${body.delivery.date},
        ${body.delivery.time},

        ${body.payment.method},
        ${body.payment.installments || null},

        ${body.subtotal},
        ${body.freight},
        ${body.discount},
        ${body.total},

        ${status}
      )
    `

    for (const item of body.items) {
      await sql`
        INSERT INTO order_items (
          order_id,
          product_id,
          name,
          quantity,
          price
        )
        VALUES (
          ${orderId},
          ${item.productId},
          ${item.name},
          ${item.quantity},
          ${item.price}
        )
      `
    }

    console.log(`[Ferpa Chopp] Pedido criado: ${orderId}`)

    return NextResponse.json({
      success: true,
      orderId,
      message: "Pedido criado com sucesso",

      paymentInfo:
        body.payment.method === "pix"
          ? {
            pixCode:
              `00020126580014br.gov.bcb.pix0136${orderId}`,

            expiresAt: new Date(
              Date.now() + 30 * 60 * 1000
            ).toISOString(),
          }
          : null,
    })
  } catch (error) {
    console.error(
      "[Ferpa Chopp] Erro ao criar pedido:",
      error
    )

    return NextResponse.json(
      { error: "Erro interno ao processar pedido" },
      { status: 500 }
    )
  }
}


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const orderId = searchParams.get("id")
    const email = searchParams.get("email")

    if (orderId) {
      const orders = await sql`
        SELECT *
        FROM orders
        WHERE id = ${orderId}
        LIMIT 1
      `

      if (orders.length === 0) {
        return NextResponse.json(
          { error: "Pedido não encontrado" },
          { status: 404 }
        )
      }

      const order = orders[0]

      const items = await sql`
        SELECT
          product_id,
          name,
          quantity,
          price
        FROM order_items
        WHERE order_id = ${orderId}
      `

      return NextResponse.json({
        ...order,
        items,
      })
    }

    if (email) {
      const orders = await sql`
        SELECT *
        FROM orders
        WHERE customer_email = ${email}
        ORDER BY created_at DESC
      `

      return NextResponse.json(orders)
    }

    const orders = await sql`
      SELECT *
      FROM orders
      ORDER BY created_at DESC
    `

    return NextResponse.json(orders)
  } catch (error) {
    console.error(
      "[Ferpa Chopp] Erro ao buscar pedidos:",
      error
    )

    return NextResponse.json(
      { error: "Erro interno ao buscar pedidos" },
      { status: 500 }
    )
  }
}