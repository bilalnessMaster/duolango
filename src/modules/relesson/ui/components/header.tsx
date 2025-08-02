'use client'
import { Hearts } from "./heart"
import { LessonProgress } from "./lesson-progress"
import { Quite } from "./quit"
import { useLesson } from "../../hook/use-question"
import { RunOutHearts } from "./run-out-hearts"


export const Header = () => {
  const { progress, user } = useLesson()
  return (
    <div className="gap-x-6 max-w-(--breakpoint-lg) mx-auto w-full font-sans py-5 flex justify-between items-center ">
      <Quite />
      <LessonProgress question={progress?.lastQuestionAnswered ?? 1} />
      <Hearts hearts={user?.isSubscribed ? "∞" : progress &&  progress?.hearts > 0 ? progress?.hearts :  0} />
      <RunOutHearts hearts={progress &&  progress?.hearts > 0 ? progress?.hearts :  0} isSubcribed={!!user?.isSubscribed} />
    </div>
  )
}
