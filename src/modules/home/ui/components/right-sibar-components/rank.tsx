import Image from "next/image"
import Link from "next/link"

interface Props {
  position: number
  rank?: string
  xp?: number
}


export const Rank = ({ position, rank , xp}: Props) => {


  return (
    <div className="relative w-full  border-2 rounded-xl text-neutral-600 border-neutral-200/45 p-4 space-y-3">
      <HeaderLink href='/leaderboard' title='Bronze League' linkTitle='view league' />
      <div className="flex  gap-x-3">
        <Image src={rank || "/logos/bronze.svg"} width={50} className="rounded" height={30} alt={"your rank"} />
        <div className="space-y-2 ">
          <h1 className="text-[17px] font-semibold">
            You're ranked {" "}
            <span className="text-green-300">#{position}</span>
          </h1>
          <p className="text-neutral-500">You've earned {xp} XP this week so far</p>
        </div>
      </div>
    </div>
  )
}



export const HeaderLink = ({ href, title, linkTitle }: { linkTitle: string, href: string, title: string }) => {
  return (
    <div className='w-full justify-between flex items-center tracking-wide '>
      <div className='font-semibold text-[19px] '>
        <h1>{title}</h1>
      </div>
      <Link href={href} className='text-[15px] font-semibold text-sky-500 uppercase'>{linkTitle}</Link>
    </div>
  )
}
