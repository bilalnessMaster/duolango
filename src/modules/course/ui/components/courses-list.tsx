'use client'
import { Course } from "@/generated/prisma";
import { CourseCard } from "./course-card";

interface Props {

  courses?: Course[]
  activeCourse?: string
}

export const CourseList = ({ courses, activeCourse }: Props) => {



  return (
    <div className="py-12 space-y-5">
      <div>
        <h1 className="font-sans font-semibold text-xl">
          Courses for English Speakers
        </h1>
      </div>
      <div className="grid md:grid-cols-2 gap-3 md:gap-x-5 lg:gap-7 lg:grid-cols-3">
        {
          courses?.map((course: Course, index: number) => (
            <CourseCard activeCourse={activeCourse === course.id} {...course} key={index} />
          ))
        }
      </div>
    </div>

  )
}
