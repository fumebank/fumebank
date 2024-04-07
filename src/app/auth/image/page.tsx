import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getUrl } from "@/utils/getUrl"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Image() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  const handleSubmit = async (formData: FormData) => {
    "use server"

    const x = await prisma.user.findUnique({
      where: { name: session.user?.name! },
    })

    formData.append("id", x!.id)

    const status = await fetch(getUrl() + "/api/auth/image", {
      method: "POST",
      body: formData,
    }).then((res) => res.status)

    switch (status) {
      case 200:
        redirect("/user/" + session.user?.name)
    }
  }

  return (
    <>
      <form action={handleSubmit}>
        <p>Image</p>
        <input type="file" name="image" className="input" />

        <button className="button">Submit</button>
      </form>
    </>
  )
}
