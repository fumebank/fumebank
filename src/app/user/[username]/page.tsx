import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { pathToUrl } from "@/utils/pathToUrl"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"

interface Props {
  params: {
    username: string
  }
}

export default async function Name({ params: { username } }: Props) {
  const session = await getServerSession(authOptions)

  const user = await prisma.user.findFirst({
    where: { username: { equals: username, mode: "insensitive" } },
    include: { wants: true, owns: true },
  })

  if (!user) throw Error("User not found")

  return (
    <>
      <h1>{user.username}</h1>

      <div className="relative h-56 w-56">
        <Image
          src={pathToUrl("profiles/" + user.image)}
          alt="Profile Picture"
          fill
          className="rounded-full object-cover"
        />
      </div>

      <p>
        {session?.user.username.toLowerCase() === username.toLowerCase() && (
          <Link href={"/settings"} className="button">
            Edit Profile
          </Link>
        )}
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
