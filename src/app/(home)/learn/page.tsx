import { Wrapper } from "@/modules/home/ui/components/Wrapper";
import { CourseView } from "@/modules/quizz/ui/view/course-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";



const page = () => {
  const queyClient = getQueryClient()
  void queyClient.prefetchQuery(trpc.quizz.getCurrentCourse.queryOptions());
  return (
    <Wrapper>
      <HydrationBoundary state={dehydrate(queyClient)} >
        <Suspense >
          <CourseView/>
        </Suspense>
      </HydrationBoundary>

    </Wrapper>
  )
}
export default page;
