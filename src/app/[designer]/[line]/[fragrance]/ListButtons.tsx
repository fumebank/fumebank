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
  const [buttonStates, setButtonStates] = useState({
    wants: false,
    owns: false,
  })

  const { status, data } = useSession()
  const router = useRouter()

  useEffect(() => {
    const wants = wantedBy.some((user) => user.id === data?.user.id)
    const owns = ownedBy.some((user) => user.id === data?.user.id)

    setButtonStates({ wants, owns })
  }, [data, wantedBy, ownedBy])

  const handleAction = async ({ target: { name } }: any) => {
    if (status !== "authenticated") {
      router.push("/api/auth/signin")
      return
    }

    const newState = !buttonStates[name as keyof typeof buttonStates]
    setButtonStates((prev) => ({ ...prev, [name]: newState }))

    await fetch("/api/list", {
      method: "POST",
      body: JSON.stringify({
        userId: data.user.id,
        fragranceId: fragrance.id,
        list: name,
        modifier: newState ? "connect" : "disconnect",
      }),
    })
  }

  return (
    <div className="flex justify-center gap-4">
      <button
        name="wants"
        onClick={handleAction}
        className={`button ${buttonStates.wants ? "bg-blue-500" : ""}`}
      >
        Want
      </button>

      <button
        name="owns"
        onClick={handleAction}
        className={`button ${buttonStates.owns ? "bg-green-500" : ""}`}
      >
        Own
      </button>
    </div>
  )
}
