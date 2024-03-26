import Nav from "@/components/Nav"
import Provider from "@/components/Provider"
import "@/styles/globals.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <html lang="en">
        <body>
          <Nav />
          <main>{children}</main>

          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </Provider>
  )
}
