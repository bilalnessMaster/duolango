import { LessonView } from "@/modules/lessons/ui/views/lesson-veiw";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";




const page = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.lesson.getLesson.queryOptions());
  void queryClient.prefetchQuery(trpc.lesson.getProgress.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <Suspense fallback={<LessonSkeleton />} >
        <LessonView />
      </Suspense>
    </HydrationBoundary>
  )
}


export default page;



const LessonSkeleton = () => {
  return (
    <div className="h-screen flex items-center flex-col justify-center font-sans font-semibold  text-shadow-blue-950">
    <LoaderCircle className="size-8 stroke-green-400 animate-spin" />
    <p>Please wait </p>
    </div>
  )
}
