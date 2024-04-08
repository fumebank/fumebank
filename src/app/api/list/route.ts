import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { userId, fragranceId, list, modifier } = await req.json()

  await prisma.user.update({
    where: { id: userId },
    data: { [list]: { [modifier]: [{ id: fragranceId }] } },
  })

  return NextResponse.json({}, { status: 200 })
}
