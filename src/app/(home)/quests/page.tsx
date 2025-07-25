import { Wrapper } from "@/modules/home/ui/components/Wrapper";
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

  const queyClient = getQueryClient()
  void queyClient.prefetchQuery(trpc.quizz.getCurrentCourse.queryOptions());
  return (
    <Wrapper>
      <HydrationBoundary state={dehydrate(queyClient)} >
        <Suspense >
          <h1>
            leaderboard
          </h1>
        </Suspense>
      </HydrationBoundary>

    </Wrapper>
  )
}
export default page;




