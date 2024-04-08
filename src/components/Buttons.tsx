"use client"

import { pathToUrl } from "@/utils/pathToUrl"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export default function Buttons() {
  const { data, status } = useSession()

  return (
    <div className="ml-auto mr-4">
      {status === "authenticated" ? (
        <div className="flex">
          <button onClick={() => signOut()} className="button">
            Sign Out
          </button>

          <Link
            href={"/user/" + data.user.username.toLowerCase()}
            className="relative ml-4 block h-12 w-12"
          >
            <Image
              src={pathToUrl("profiles/" + data.user.image)}
              alt="Profile Picture"
              fill
              className="rounded-full object-cover"
            />
          </Link>
        </div>
      ) : (
        <button onClick={() => signIn()} className="button">
          Sign In
        </button>
      )}
    </div>
  )
}
