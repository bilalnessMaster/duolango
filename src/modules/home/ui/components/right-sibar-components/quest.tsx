import Image from "next/image"
import Link from "next/link"
import { HeaderLink } from "./rank"
import { Progress } from "@/components/ui/progress"

interface Props {
  xp?: number
}


export const Quest = ({ xp }: Props) => {


  return (
    <div className="relative w-full  border-2 rounded-xl text-neutral-600 border-neutral-200/45 p-4 py-6 space-y-3">
      <HeaderLink href='/quests' title='Daily quests' linkTitle='view  all' />
      <div className="flex  gap-x-3">
        <Image src={"/logos/points.svg"} width={50} className="rounded" height={30} alt={"your quest"} />
        <div className="space-y-2  w-full">
          <h1 className="text-[17px] font-semibold">
            Earn 10 XP
          </h1>
          <div className="relative h-4 items-center flex">
            <span className="absolute left-1/2 z-30  font-semibold -translate-x-1/2 text-amber-600">
              {
                xp && xp > 0 ? "10 / 10" : "0 / 10"
              }
            </span>
            <div className="z-30 bg-white p-[2px] absolute right-0">
              <Image
                src={"/logos/box.svg"}
                width={30}
                className=""
                height={30}
                alt={"your quest"} />
            </div>
            <Progress value={xp} className="h-4 rounded-full w-full  " />
          </div>
        </div>
      </div>
    </div>
  )
}


