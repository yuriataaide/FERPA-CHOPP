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
      name,
      email,
      phone,
      password,
    } = body

    if (
      !name ||
      !email ||
      !phone ||
      !password
    ) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
        },
        {
          status: 400,
        }
      )
    }

    const existing = await sql`
      SELECT id
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `

    if (existing.length > 0) {
      return NextResponse.json(
        {
          error:
            "Email já cadastrado",
        },
        {
          status: 400,
        }
      )
    }


    const passwordHash =
      await bcrypt.hash(
        password,
        10
      )


    const result = await sql`
      INSERT INTO users (
        name,
        email,
        phone,
        password_hash
      )
      VALUES (
        ${name},
        ${email},
        ${phone},
        ${passwordHash}
      )
      RETURNING
        id,
        name,
        email,
        phone
    `

    const user = result[0]

    return NextResponse.json({
      success: true,

      user: {
        ...user,
        addresses: [],
      },
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          "Erro ao criar conta",
      },
      {
        status: 500,
      }
    )
  }
}