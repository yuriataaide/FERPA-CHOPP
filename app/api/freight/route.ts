import { neon } from "@neondatabase/serverless"
import { NextRequest, NextResponse } from "next/server"

const sql = neon(process.env.DATABASE_URL!)

function normalizeCity(city: string): string {
  return city
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .trim()
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const city = searchParams.get("city")
    const subtotal = parseFloat(searchParams.get("subtotal") || "0")

    
    if (!city) {
      const freights = await sql`
        SELECT
          id,
          city,
          slug,
          price,
          delivery_days,
          free_above
        FROM freight
        ORDER BY city ASC
      `

      return NextResponse.json(freights)
    }

    
    const normalizedCity = normalizeCity(city)

    const result = await sql`
      SELECT
        id,
        city,
        slug,
        price,
        delivery_days,
        free_above
      FROM freight
      WHERE slug = ${normalizedCity}
      LIMIT 1
    `

    if (result.length === 0) {
      return NextResponse.json({
        available: false,
        message: "Consulte nosso atendimento para entregas nesta cidade",
      })
    }

    const freight = result[0]

    const isFreeShipping =
      freight.free_above &&
      subtotal >= Number(freight.free_above)

    const finalPrice = isFreeShipping
      ? 0
      : Number(freight.price)

    return NextResponse.json({
      available: true,
      city: freight.city,
      price: finalPrice,
      originalPrice: Number(freight.price),
      deliveryDays: freight.delivery_days,
      freeAbove: freight.free_above,
      isFreeShipping,
      message: isFreeShipping
        ? "Frete grátis!"
        : freight.free_above
          ? `Frete grátis acima de R$ ${Number(
            freight.free_above
          ).toFixed(2)}`
          : null,
    })
  } catch (error) {
    console.error("[Ferpa Chopp] Erro ao buscar frete:", error)

    return NextResponse.json(
      { error: "Erro ao buscar frete" },
      { status: 500 }
    )
  }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      city,
      price,
      deliveryDays,
      freeAbove,
    } = body

    if (
      !city ||
      price === undefined ||
      !deliveryDays
    ) {
      return NextResponse.json(
        { error: "Dados incompletos" },
        { status: 400 }
      )
    }

    const slug = normalizeCity(city)

    const existing = await sql`
      SELECT id
      FROM freight
      WHERE slug = ${slug}
      LIMIT 1
    `

    if (existing.length > 0) {
      // UPDATE
      await sql`
        UPDATE freight
        SET
          city = ${city},
          price = ${price},
          delivery_days = ${deliveryDays},
          free_above = ${freeAbove}
        WHERE slug = ${slug}
      `
    } else {
      // INSERT
      await sql`
        INSERT INTO freight (
          city,
          slug,
          price,
          delivery_days,
          free_above
        )
        VALUES (
          ${city},
          ${slug},
          ${price},
          ${deliveryDays},
          ${freeAbove}
        )
      `
    }

    return NextResponse.json({
      success: true,
      message: "Frete salvo com sucesso",
    })
  } catch (error) {
    console.error("[Ferpa Chopp] Erro ao salvar frete:", error)

    return NextResponse.json(
      { error: "Erro ao salvar frete" },
      { status: 500 }
    )
  }
}


export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const city = searchParams.get("city")

    if (!city) {
      return NextResponse.json(
        { error: "Cidade obrigatória" },
        { status: 400 }
      )
    }

    const slug = normalizeCity(city)

    await sql`
      DELETE FROM freight
      WHERE slug = ${slug}
    `

    return NextResponse.json({
      success: true,
      message: "Frete removido com sucesso",
    })
  } catch (error) {
    console.error("[Ferpa Chopp] Erro ao remover frete:", error)

    return NextResponse.json(
      { error: "Erro ao remover frete" },
      { status: 500 }
    )
  }
}