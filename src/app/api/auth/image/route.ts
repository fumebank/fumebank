import { prisma } from "@/lib/prisma"
import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { id, image } = Object.fromEntries(await req.formData()) as any

  const blob = await put(`${id}.${image.type.split("/")[1]}`, image, {
    access: "public",
    addRandomSuffix: false,
  })

  await prisma.user.update({
    where: { id },
    data: { image: blob.url },
  })

  return NextResponse.json({}, { status: 200 })
}
