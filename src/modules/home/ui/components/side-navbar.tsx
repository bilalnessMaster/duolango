'use client'
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"



const links = [
  {
    href: "/learn",
    slug: "learn",
    icon: "/logos/home.svg"
  },
  {
    href: "/quests",
    slug: "quests",
    icon: "/logos/quests.svg"
  },
  {
    href: "/shop",
    slug: "shop",
    icon: "/logos/shop.svg"
  },
  {
    href: "/leaderboard",
    slug: "leaderboard",
    icon: "/logos/leaderboard.svg"
  },
]
export const SideNavBar = () => {


  return (
    <aside className="px-4 py-6  h-full flex gap-y-8 flex-col w-auto lg:w-[250px]  border-r-2 border-r-neutral-200/75">
      <Link href={"/learn"} >
        <div className="px-3 block lg:hidden">
          <Image src={'/logos/mascot.svg'} width={35} height={35} alt={"logo app"} />
        </div>
        <h1 className="font-sans px-3 font-bold text-2xl text-sky-500  hidden lg:block">DUALANGO</h1>
      </Link>
      <nav className="flex flex-col gap-y-2">
        {
          links.map(({ href, icon, slug }) => (
            <LinkItem key={slug} href={href} icon={icon} slug={slug} />
          ))
        }
      </nav>
    </aside>
  )
}



const LinkItem = ({ href, icon, slug }: { href: string, icon: string, slug: string }) => {
  const pathname = usePathname();
  const isActive = pathname.includes(slug)
  return (
    <Link href={href} >
      <div className={cn("flex gap-x-5 px-3 py-2 hover:bg-neutral-100 rounded-xl items-center  text-neutral-500", {
        "border-2 rounded-xl border-sky-400/45 bg-sky-100/85 text-sky-400  ": isActive
      })}>
        <Image src={icon} width={35} height={35} alt={slug} />
        <h2 className="hidden lg:block font-semibold font-sans text-base uppercase tracking-wide ">{slug}</h2>
      </div>
    </Link>

  )
}
