'use client'
import { useTRPC } from "@/trpc/client";
import { Unit as UnitType } from "@/generated/prisma";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Unit } from "./Unit";
import { Lesson, LessonProgress } from "@/generated/prisma";


export const CourseList = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.quizz.getCurrentCourse.queryOptions())

  //   console.log(" data => ", data)

  return (
    <div className="">
      {
        data.course?.units.map((unit, index) => (
          <Unit  order={index+1} key={unit.id} unitId={unit.id} title={unit.title} lessons={unit.lessons} />
        ))

      }

    </div>

  )
}
