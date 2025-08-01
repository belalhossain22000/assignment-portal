import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { UserProvider } from "@/lib/user-context"
import { Layout } from "@/components/layout"
import Providers from "@/lib copy/Providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Assignment Portal",
  description: "Student assignment submission and review portal",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.className}>
      <Providers >
          <UserProvider>
            <Layout>{children}</Layout>
          </UserProvider>
      </Providers>
        </body>
    </html>
  )
}
