import { LessonView } from "@/modules/lessons/ui/views/lesson-veiw";
import { ReLessonView } from "@/modules/relesson/ui/views/re-lesson-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";
interface Props {
  params: Promise<{ unitId: string; lessonId: string }>

}



const page = async ({ params }: Props) => {
  const { lessonId, unitId } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.relesson.getLesson.queryOptions({
    lessonId,
    unitId
  }));
  void queryClient.prefetchQuery(trpc.relesson.getProgress.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <Suspense fallback={<LessonSkeleton />} >
        <ReLessonView unitId={unitId} lessonId={lessonId}/>
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
