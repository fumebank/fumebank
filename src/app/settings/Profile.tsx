import { getUrl } from "@/utils/getUrl"
import { Session } from "next-auth"
import { FormEvent, useState } from "react"

export default function Profile({ data }: { data: Session }) {
  const [message, setMessage] = useState("")

  const handleSubmitImage = async (e: FormEvent) => {
    e.preventDefault()

    setMessage("")

    const formData = new FormData(document.querySelectorAll("form")[1])
    formData.append("id", data.user.id)

    const status = await fetch(getUrl() + "/api/auth/image", {
      method: "POST",
      body: formData,
    }).then((res) => res.status)

    switch (status) {
      case 200:
        setMessage("Image updated")
    }
  }

  const handleSubmitUsername = async (e: FormEvent) => {
    e.preventDefault()

    setMessage("")

    const formData = new FormData(document.querySelectorAll("form")[0])
    formData.append("id", data.user.id)

    const status = await fetch("/api/auth/username", {
      method: "POST",
      body: formData,
    }).then((res) => res.status)

    switch (status) {
      case 200:
        setMessage("Username updated")
        break
      case 409:
        setMessage("Username unavailable")
    }
  }

  return (
    <>
      <p>Username</p>
      <form onSubmit={handleSubmitUsername}>
        <input pattern="[a-zA-Z.]+" name="username" className="input" />
        <button className="button">Change</button>
      </form>

      <p>Image</p>
      <form onSubmit={handleSubmitImage}>
        <input type="file" accept="image/*" name="image" className="input" />
        <button className="button">Submit</button>
      </form>

      <p className="">{message}</p>
    </>
  )
}
