'use client';
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CourseList } from "../components/courses-list";


export const CoursesView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.course.getCourses.queryOptions())

  return (
    <div className="">

    <CourseList courses={data.courses} activeCourse={data.progress?.activeCourseId} />
    </div>
  )
}
