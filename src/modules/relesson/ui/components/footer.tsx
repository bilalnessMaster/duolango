'use client'
import { Button } from "@/components/ui/button"
import { useLesson } from "../../hook/use-question"
import { cn } from "@/lib/utils";
import { LoaderCircle} from "lucide-react";
import Link from "next/link";
import { useAudio } from "react-use";
import { useEffect } from "react";



export const Footer = () => {
  const { lessonIsCompleted, nextQuestion, checked, isCorrect, Loading, checkOption } = useLesson();

  const [audio, _, controls] = useAudio({
    src: !checked && !isCorrect ? "/audios/incorrect.wav" : "/audios/correct.wav",
  })

  useEffect(() => {
    if (!checked) {
      controls.play()
    }
  }, [checked])

  return (
    <footer className={cn("border-t-2 border-neutral-100 w-full",
      {
        "bg-red-400/25 ": !checked && !isCorrect,
        "bg-green-400/25 ": !checked && isCorrect,
      })}>

      {audio}
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-end items-center p-16">
        {
          lessonIsCompleted ? (
            <Link href="/lesson/result">
              <Button
                variant={"duolango"}
                onClick={nextQuestion}
                className="border-green-400 bg-green-400 min-w-[150px]  text-white shadow-green-500 "
                size='xl'>
                CONTINUE
              </Button>
            </Link>
          ) : (
            <ButtonFooter checked={checked} nextQuestion={nextQuestion} Loading={Loading} checkOption={checkOption} />
          )
        }
      </div>
    </footer>
  )
}




const ButtonFooter = ({ checked, nextQuestion, Loading, checkOption }: { checked: boolean, nextQuestion: () => void, Loading: boolean, checkOption: () => void }) => {
  return (
    <>
      {
        !checked ? (
          <Button
            variant={"duolango"}
            onClick={nextQuestion}
            className="border-green-400 min-w-[150px] bg-green-400  text-white shadow-green-500 "
            size='xl'>
            CONTINUE
          </Button>
        ) : (
          <Button
            disabled={Loading}
            variant={"duolango"}
            onClick={checkOption}
            className="border-green-400 min-w-[150px] bg-green-400  text-white shadow-green-500 "
            size='xl'>
            {Loading ? <LoaderCircle /> : "check"}
          </Button>
        )
      }

    </>
  )
}
