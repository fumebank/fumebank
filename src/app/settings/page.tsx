"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"
import Notif from "./Notif"
import Profile from "./Profile"

export default function Settings() {
  const [setting, setSetting] = useState("profile")

  const { status, data } = useSession()

  if (status === "unauthenticated") {
    redirect("/api/auth/signin")
  }

  return (
    <>
      <h1>Settings</h1>

      <div className="m-4 flex gap-4">
        <div className="flex w-1/5 flex-col gap-2 bg-slate-300 p-4">
          <button
            onClick={() => setSetting("profile")}
            className="rounded bg-slate-400 p-2"
          >
            Profile
          </button>
          <button
            onClick={() => setSetting("notif")}
            className="rounded bg-slate-400 p-2"
          >
            Notif
          </button>
        </div>

        <div className="w-full bg-slate-300 p-2">
          {setting === "profile" && <Profile data={data!} />}
          {setting === "notif" && <Notif />}
        </div>
      </div>
    </>
  )
}
