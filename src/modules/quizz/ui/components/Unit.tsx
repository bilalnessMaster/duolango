'use client'
import { LessonProgress, Lesson as typeLesson } from "@/generated/prisma";
import { Lesson } from "./lesson";
import { useEffect, useRef } from "react";
import { useInView } from 'motion/react'
import { useUnitStore } from "../../store/use-unit-store";
interface Props {
  lessons: (typeLesson & { progress: LessonProgress })[];
  unitId: string;
  order: number;
  title: string;

}

export const Unit = ({ unitId, title, lessons, order }: Props) => {

  const unitRef = useRef<HTMLDivElement | null>(null)
  const { updateDisplay } = useUnitStore();
  const inView = useInView(unitRef, { margin : "50% 0px -50% 0px"})

  useEffect(() => {

    if (inView) updateDisplay({ title, unit: order })

  }, [inView])

  return (
    <div className="max-w-xl mx-auto" ref={unitRef}>
      <div className="relative w-full mt-4 h-2 flex items-center justify-center">
        <div className="h-0.5 w-full bg-neutral-200" />
        <p className=" bg-white px-1 text-black/45 inline-flex items-center justify-center font-semibold left-1/2 -translate-x-1/2 absolute " >{title}</p>
      </div>
      <div className="flex flex-col py-12 items-center gap-12">
        {
          lessons.map((lesson, index) => {
            const previousIndex = (index - 1) === -1 ? 0 : index - 1
            const active = lesson.progress?.state === 'in_progress' ||
              !lesson.progress && index == 0 ||
              !lesson.progress?.completed && lessons[previousIndex]?.progress?.completed
            return (
              <Lesson
                key={lesson.id}
                index={index + 1}
                state={lesson?.progress?.state}
                order={lesson.order}
                href={lesson?.progress?.completed ? `lesson/unit/${unitId}/lesson/${lesson.id}` : "/lesson"}
                currentLesson={active}

              />
            )
          })
        }
      </div>
    </div>
  )
}
