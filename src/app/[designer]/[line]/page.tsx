import { prisma } from "@/lib/prisma"
import { pathToUrl } from "@/utils/pathToUrl"
import Image from "next/image"
import Link from "next/link"

interface Props {
  params: {
    line: string
  }
}

export default async function Line({ params }: Props) {
  const line = await prisma.line.findUnique({
    where: { slug: params.line },
    include: { designer: true, fragrances: true },
  })

  if (!line) throw Error("Line not found")

  const { designer } = line

  return (
    <>
      <h1 className="mb-4 text-center text-3xl">{line.name}</h1>

      <div className="m-4 flex gap-4">
        {line.fragrances.map(({ name, slug }) => (
          <Link
            href={line.slug + "/" + slug}
            key={slug}
            className="rounded bg-slate-300"
          >
            <Image
              src={pathToUrl(`${designer.slug}/${line.slug}/${slug}`)}
              alt="Fragrance Image"
              width={200}
              height={200}
            />

            <p className="m-2 text-center text-lg">{name}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
