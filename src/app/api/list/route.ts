import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { username, id, list, modifier } = await req.json()

  await prisma.user.update({
    where: {
      name: username,
    },
    data: {
      [list]: {
        [modifier]: [{ id }],
      },
    },
  })

  return NextResponse.json({}, { status: 200 })
}
