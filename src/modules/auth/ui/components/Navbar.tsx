'use client'
import { Button } from "@/components/ui/button"
import { ArrowLeft, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"



export const Navbar = () => {
  const pathname = usePathname()
  return (
    <header className="p-6 h-14">
      <nav className="flex items-center justify-between">
        <Link href={'/'}>
        <X strokeWidth={3} className="size-6 text-sky-500"/>
        </Link>
        {
          pathname === '/sign-in' ? (
            <Link href="sign-up">
            <Button variant={"duolango"} className="border-sky-300 shadow-sky-300 text-sky-500">sign up</Button>
            </Link>
          ) : (
            <Link href="sign-in">
            <Button variant={"duolango"}  className="border-sky-300 shadow-sky-300 text-sky-500">sign in</Button>
            </Link>
          )
        }
      </nav>
    </header>
  )
}
