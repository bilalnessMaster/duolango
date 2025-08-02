import { Progress } from "@/components/ui/progress"

interface Props {
  question: number;
}

export const LessonProgress = ({ question } : Props) => {

  return (
    <Progress value={question / 7 * 100} className="flex-1 h-4 " />
  )
}
