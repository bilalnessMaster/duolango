'use client'
import { Progress } from "@/components/ui/progress"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import Image from "next/image"




export const QuestView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.lesson.getProgress.queryOptions());
  //  console.log("progress in quest : ", progress)
  return (
    <div className="font-sans py-5 space-y-4">
      <div className="min-h-48  bg-[#9069cd] rounded-xl px-4 flex justify-between items-center text-white">
        <div>
          <h1 className="font-semibold  text-[25px]">Welcome!</h1>
          <p className="text-lg max-w-sm">Complete quests to earn rewards! Quests refresh every day.</p>
        </div>
        <div>
          <Image src={"logos/quests_bird.svg"} width={200} height={200} alt="bird di" />
        </div>
      </div>
      <div className=" ">
        <h1 className="text-[24px] font-semibold ">Daily Quests</h1>
      </div>
      <Quest xp={data.progress?.points} number={10} title="Earn 10 XP today" />
      <Quest xp={data.progress?.lessons ?? 0} number={5} title="Finish 5 lesson today" />
    </div>
  )
}



const Quest = ({ xp, title, number }: { xp?: number, title: string, number?: number }) => {
  return (
    <div className="px-3 py-5 flex  gap-x-3 border-2 border-neutral-100 rounded-lg items-center justify-center">
      <div className="w-full flex  gap-x-3 ">
        <Image src={"/logos/points.svg"} width={50} className="rounded" height={30} alt={"your quest"} />
        <div className="space-y-2  w-full">
          <h1 className="text-[17px] font-semibold tracking-wide">
            {title}
          </h1>
          <div className="relative h-4 items-center flex">
            <span className="absolute left-1/2 z-30  font-semibold -translate-x-1/2 text-amber-600">
              {
                `${xp} / ${number} `
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
            <Progress value={(xp ?? 0) * 10} className="h-4 rounded-full w-full  " />
          </div>
        </div>
      </div>
    </div>
  )
}



export const QuestViewSkeleton = () => {
  return (
    <div className="font-sans py-5 space-y-4 animate-pulse ">
      <div className="min-h-48 bg-neutral-100 text-neutral-100 rounded-xl px-4 flex justify-between items-center ">
        <div>
          <h1 className="font-semibold  text-[25px]">Welcome!</h1>
          <p className="text-lg max-w-sm">Complete quests to earn rewards! Quests refresh every day.</p>
        </div>
        <div>
        </div>
      </div>
      <div className="px-3 py-5 flex text  gap-x-3 border-2 border-neutral-100 rounded-lg items-center justify-center">
        <div className="w-full flex  gap-x-3 ">
          <div className="space-y-2  w-full">
            <h1 className="text-[17px] font-semibold tracking-wide">

            </h1>
            <div className="relative h-4 items-center flex">
              <span className="absolute left-1/2 z-30  font-semibold -translate-x-1/2 text-amber-600">
              </span>
              <Progress value={0} className="h-4 rounded-full w-full  " />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

