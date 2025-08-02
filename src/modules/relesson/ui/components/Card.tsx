'use client'
import { useLesson } from "../../hook/use-question"
import { Option } from "./option";
import { Question } from "./question";



export const Card = () => {
  const { question } = useLesson();
  return (
    <div className="max-w-(--breakpoint-lg) flex-1 space-y-12 mx-auto w-full font-sans mt-16">
      <Question question={question?.question} />
      <div className="grid md:grid-cols-2 gap-3 md:gap-x-5 lg:gap-10 lg:grid-cols-3">
      {
        question?.options.map((option) =>(
          <Option key={option.id} {...option} />
        ))
      }
      </div>
    </div>
  )
}
