import { prisma } from "@/lib/prisma"
import { pathToUrl } from "@/utils/pathToUrl"
import Image from "next/image"
import Link from "next/link"
import ListButtons from "./ListButtons"

interface Props {
  params: {
    line: string
    fragrance: string
  }
}

export default async function Fragrance({ params }: Props) {
  const fragrance = await prisma.fragrance.findFirst({
    where: {
      line: { slug: params.line },
      slug: params.fragrance,
    },
    include: { designer: true, line: true, wantedBy: true, ownedBy: true },
  })

  if (!fragrance) throw Error("Fragrance not found")

  const { designer, line, wantedBy, ownedBy } = fragrance

  return (
    <>
      <h1 className="mb-4 text-center text-3xl">{fragrance.name}</h1>

      <div className="m-4 flex gap-4">
        <div className="flex w-full justify-center rounded bg-slate-300">
          <Image
            src={pathToUrl(`${designer.slug}/${line.slug}/${fragrance.slug}`)}
            alt="Image"
            width={400}
            height={400}
            priority
          />
        </div>

        <div className="w-full rounded bg-slate-300 text-center text-lg">
          <p>
            Designer:{" "}
            <Link href={`/${designer.slug}`} className="underline">
              {designer.name}
            </Link>
          </p>

          <p>
            Line:{" "}
            <Link href={`/${designer.slug}/${line.slug}`} className="underline">
              {line.name}
            </Link>
          </p>

          <ListButtons
            fragrance={fragrance}
            wantedBy={wantedBy}
            ownedBy={ownedBy}
          />
        </div>
      </div>
    </>
  )
}
