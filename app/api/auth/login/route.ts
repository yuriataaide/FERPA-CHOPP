import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json()

    const {
      email,
      password,
    } = body

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
        },
        {
          status: 400,
        }
      )
    }

    const users = await sql`
      SELECT *
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `

    if (users.length === 0) {
      return NextResponse.json(
        {
          error:
            "Usuário não encontrado",
        },
        {
          status: 401,
        }
      )
    }

    const user = users[0]

    const validPassword =
      await bcrypt.compare(
        password,
        user.password_hash
      )

    if (!validPassword) {
      return NextResponse.json(
        {
          error: "Senha inválida",
        },
        {
          status: 401,
        }
      )
    }

    return NextResponse.json({
      success: true,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        addresses: [],
      },
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Erro interno",
      },
      {
        status: 500,
      }
    )
  }
}