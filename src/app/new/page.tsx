import { getUrl } from "@/utils/getUrl"
import { redirect } from "next/navigation"

export default function New() {
  const handleNew = async (formData: FormData) => {
    "use server"

    const [json, status] = await fetch(getUrl() + "/api/new", {
      method: "POST",
      body: formData,
    }).then(async (res) => [await res.json(), res.status])

    switch (status) {
      case 200:
        redirect(json.path)
      case 403:
        console.log("BAD PATH")
    }
  }

  return (
    <>
      <form action={handleNew}>
        <p>Designer</p>
        <input name="designer" className="input" />

        <p>Line</p>
        <input name="line" className="input" />

        <p>Fragrance</p>
        <input name="fragrance" className="input" />

        <p>Image</p>
        <input type="file" accept="image/webp" name="image" className="input" />

        <button className="button">Submit</button>
      </form>
    </>
  )
}
