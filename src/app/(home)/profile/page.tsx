import { Wrapper } from "@/modules/home/ui/components/Wrapper";
import { ProfileView } from "@/modules/profile/ui/views/profile-view";
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
 
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.profile.getProfile.queryOptions());
  return (
    <Wrapper>
      <HydrationBoundary state={dehydrate(queryClient)} >
        <Suspense >
         <ProfileView /> 
        </Suspense>
      </HydrationBoundary>

    </Wrapper>
  )
}
export default page;
