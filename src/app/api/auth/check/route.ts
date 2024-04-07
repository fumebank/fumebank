import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { username } = await req.json()

  const user = await prisma.user.findFirst({
    where: {
      name: { equals: username, mode: "insensitive" },
    },
  })

  const bad = ["default"]

  if (user || bad.includes(username.toLowerCase())) {
    return NextResponse.json({}, { status: 409 })
  }

  return NextResponse.json({}, { status: 200 })
}
