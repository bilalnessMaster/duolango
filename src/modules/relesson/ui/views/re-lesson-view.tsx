'use client'
import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { useEffect } from "react"
import { Lesson, Option, Progress, Question, User } from "@/generated/prisma"
import { useLesson } from "../../hook/use-question"
import { Header } from "../components/header"
import { Card } from "../components/Card"
import { Footer } from "../components/footer"
interface Props {
  lessonId: string;
  unitId: string;
}



export const ReLessonView = ({ lessonId, unitId }: Props) => {
  const trpc = useTRPC()
  const { data: currentLesson, isPending } = useSuspenseQuery(trpc.relesson.getLesson.queryOptions({
    lessonId,
    unitId
  }));
  console.log('the cuurnte lesson',currentLesson)
  const { data } = useSuspenseQuery(trpc.relesson.getProgress.queryOptions())

  const { setLesson, refresh } = useLesson()
  useEffect(() => {
    refresh()
    setLesson(
      currentLesson.lesson as Lesson & { question: (Question & { options: Option[] })[] },
      data.progress as Progress,
      data.user as User
    )
  }, [currentLesson, data.progress])

  if (isPending) return <div>Loading...</div>

  return (
    <div className="h-screen flex flex-col w-full items-center wustify-between">
      <Header />
      <Card />
      <Footer />

    </div>
  )
}
