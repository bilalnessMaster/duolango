'use client'
import { useSuspenseQuery } from "@tanstack/react-query"
import { Hearts } from "./heart"
import { LessonProgress } from "./lesson-progress"
import { Quite } from "./quit"
import { useTRPC } from "@/trpc/client"
import { useLesson } from "../../hook/use-question"
import { RunOutHearts } from "./run-out-hearts"




export const Header = () => {
  const { progress } = useLesson()
  return (
    <div className="gap-x-6 max-w-(--breakpoint-lg) mx-auto w-full font-sans py-5 flex justify-between items-center ">
      <Quite />
      <LessonProgress question={progress?.lastQuestionAnswered ?? 1} />
      <Hearts hearts={progress?.hearts ?? 0} />
      <RunOutHearts hearts={progress?.hearts ?? 0} />
    </div>
  )
}
