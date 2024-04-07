"use client"

import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function Username() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")

  const router = useRouter()
  const { data, status } = useSession()

  if (status === "unauthenticated") {
    redirect("/")
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const status = await fetch("/api/auth/check", {
      method: "POST",
      body: JSON.stringify({ username }),
    }).then((res) => res.status)

    switch (status) {
      case 200:
        await fetch("/api/auth/username", {
          method: "POST",
          body: JSON.stringify({ username, current: data!.user!.name }),
        })

        router.push("/")
      case 409:
        setError("Username unavailable")
    }
  }

  return (
    <>
      <h1>Change Username</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          pattern="[a-zA-Z.]+"
          className="input"
        />

        <button>Change</button>
      </form>

      <p>{error}</p>
    </>
  )
}
