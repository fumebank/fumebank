import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { id, username } = Object.fromEntries(await req.formData()) as any

  const user = await prisma.user.findFirst({
    where: {
      username: { equals: username, mode: "insensitive" },
    },
  })

  const bad = ["default"]

  if (user || bad.includes(username.toLowerCase())) {
    return NextResponse.json({}, { status: 409 })
  }

  await prisma.user.update({
    where: { id },
    data: { username },
  })

  return NextResponse.json({}, { status: 200 })
}
