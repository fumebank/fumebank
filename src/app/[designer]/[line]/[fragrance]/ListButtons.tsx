"use client"

import { Fragrance, User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Params {
  fragrance: Fragrance
  wantedBy: User[]
  ownedBy: User[]
}

export default function ListButtons({ fragrance, wantedBy, ownedBy }: Params) {
  const [wantClicked, setWantClicked] = useState(false)
  const [ownClicked, setOwnClicked] = useState(false)

  const { status, data } = useSession()
  const router = useRouter()

  useEffect(() => {
    setWantClicked(wantedBy.some((user) => user.name === data?.user?.name))
    setOwnClicked(ownedBy.some((user) => user.name === data?.user?.name))
  }, [data])

  const handleAction = async (e: any) => {
    if (status !== "authenticated") {
      router.push("/api/auth/signin")
      return
    }

    const list = e.target.name
    let modifier

    if (list === "wants") {
      modifier = wantClicked
      setWantClicked(!modifier)
    } else {
      modifier = ownClicked
      setOwnClicked(!modifier)
    }

    await fetch("/api/list", {
      method: "POST",
      body: JSON.stringify({
        username: data.user?.name,
        id: fragrance.id,
        list,
        modifier: modifier ? "disconnect" : "connect",
      }),
    })
  }

  return (
    <div className="flex justify-center gap-4">
      <button
        name="wants"
        onClick={handleAction}
        className={"button " + (wantClicked ? "bg-blue-500" : "")}
      >
        Want
      </button>

      <button
        name="owns"
        onClick={handleAction}
        className={"button " + (ownClicked ? "bg-green-500" : "")}
      >
        Own
      </button>
    </div>
  )
}
