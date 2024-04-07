import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import Image from "next/image"

interface Props {
  params: {
    name: string
  }
}

export default async function Name({ params }: Props) {
  const session = await getServerSession(authOptions)

  const user = await prisma.user.findFirst({
    where: {
      name: {
        equals: params.name,
        mode: "insensitive",
      },
    },
    include: { wants: true, owns: true },
  })

  if (!user) throw Error("User not found")

  return (
    <>
      <h1>{user.name}</h1>

      <Image
        src={user.image}
        alt="Profile Picture"
        width={50}
        height={50}
        className="rounded-full"
      />

      <p>ID: {user.id}</p>

      <p>
        {session?.user?.name?.toLowerCase() === params.name ? "You" : "NOT YOU"}
      </p>

      <p>Wants</p>
      <div className="flex bg-green-200">
        {user.wants.map((fragrance) => (
          <div key={fragrance.slug}>
            <p className="m-2">{fragrance.name}</p>
          </div>
        ))}
      </div>

      <p>Owns</p>
      <div className="flex w-min bg-blue-200">
        {user.owns.map((fragrance) => (
          <div key={fragrance.slug}>
            <p className="m-2">{fragrance.name}</p>
          </div>
        ))}
      </div>
    </>
  )
}
