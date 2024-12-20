import {Geist, Geist_Mono} from "next/font/google"
import "./globals.css"
import PageLoader from "@/components/page-loader"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col content-center items-center`}>
    <PageLoader/>
    {children}
    </body>
    </html>
  )
}
