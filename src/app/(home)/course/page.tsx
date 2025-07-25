import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { CoursesView } from "@/modules/course/ui/views/courses-view";


const page = () => {
  const queyClient = getQueryClient()
  void queyClient.prefetchQuery(trpc.course.getCourses.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queyClient)} >
      <Suspense >
        <CoursesView />
      </Suspense>
    </HydrationBoundary>
  )
}
export default page;
