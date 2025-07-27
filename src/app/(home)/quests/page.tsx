


import { Wrapper } from "@/modules/home/ui/components/Wrapper";
import { QuestView, QuestViewSkeleton } from "@/modules/quests/ui/views/quests-view";
import { caller, getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { Suspense } from "react";



const page = async () => {
  const progress = await caller.lesson.getProgress()

  //   console.log("progress exit ? ", progress)
  
  if (!progress) {
    redirect('/course')
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.lesson.getProgress.queryOptions());


  return (
    <Wrapper>
      <HydrationBoundary state={dehydrate(queryClient)} >
        <Suspense fallback={<QuestViewSkeleton />} >
          <QuestView />
        </Suspense>
      </HydrationBoundary>

    </Wrapper>
  )
}
export default page;



