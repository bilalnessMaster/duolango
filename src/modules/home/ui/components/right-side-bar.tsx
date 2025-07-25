'use client'
import { useTRPC } from "@/trpc/client"
import { Quest } from "./right-sibar-components/quest"
import { Rank } from "./right-sibar-components/rank"
import { Static } from "./right-sibar-components/static"
import { Subscrib } from "./right-sibar-components/subscribe"
import { useSuspenseQuery } from "@tanstack/react-query"



export const RightSideBar = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.statics.getStatics.queryOptions())

  console.log(" data => ", data)

  return (
    <div className="sticky top-6 w-full space-y-3 ">
      <Static hearts={data.progress?.hearts} imageSrc={data?.progress?.course?.imageSrc}  streaks={data.progress?.hearts} />
      <Subscrib isSubcribed={data.user?.isSubscribed || false} />
      <Rank position={1} xp={data.progress?.points} />
      <Quest xp={data.progress?.points} />
    </div>
  )
}


export const RightSideBarSkeleton = () => {
  return (
    <div className="sticky top-6 w-full space-y-3 ">
      <div className="border-2 border-neutral-100/10 bg-neutral-50 animate-pulse rounded-xl h-14 w-full" />
      <div className="border-2 border-neutral-100/10 bg-neutral-50 animate-pulse rounded-xl h-55 w-full" />
      <div className="border-2 border-neutral-100/10 bg-neutral-50 animate-pulse rounded-xl h-45 w-full" />
      <div className="border-2 border-neutral-100/10 bg-neutral-50 animate-pulse rounded-xl h-30 w-full" />
    </div>
  )
}  
