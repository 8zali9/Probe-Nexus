import './globals.css'
import { Inter } from 'next/font/google'
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Probe Nexus',
  description: 'Probing Google',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <ToastContainer />
        <main>{children}</main>
      </body>
    </html>
  )
}
