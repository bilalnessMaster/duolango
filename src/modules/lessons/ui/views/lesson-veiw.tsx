'use client'
import { useSuspenseQuery } from "@tanstack/react-query"
import { Header } from "../components/header"
import { useTRPC } from "@/trpc/client"
import { useEffect } from "react"
import { useLesson } from "../../hook/use-question"
import { Card } from "../components/Card"
import { Footer } from "../components/footer"
import { Lesson, Option, Progress, Question } from "@/generated/prisma"




export const LessonView = () => {
  const { setLesson } = useLesson()
  const trpc = useTRPC()
  const { data: currentLesson, isPending } = useSuspenseQuery(trpc.lesson.getLesson.queryOptions());
  const { data: progress } = useSuspenseQuery(trpc.lesson.getProgress.queryOptions())

  useEffect(() => {
    setLesson(currentLesson.lesson as Lesson & { question: (Question & { options: Option[] })[] } , progress as Progress )
  }, [currentLesson, progress])

  if (isPending) return <div>Loading...</div>

  return (
    <div className="h-screen flex flex-col w-full items-center wustify-between">
      <Header />
      <Card />
      <Footer />
    </div>
  )
}
