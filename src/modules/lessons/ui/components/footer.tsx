import { Button } from "@/components/ui/button"
import { useLesson } from "../../hook/use-question"
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";



export const Footer = () => {
  const { nextQuestion, checked, isCorrect, Loading, checkOption } = useLesson();
  console.log("response is ", Loading)
  return (
    <footer className={cn("border-t-2 border-neutral-100 w-full",
      {
        "bg-red-400/25 ": !checked && !isCorrect,
        "bg-green-400/25 ": !checked && isCorrect,
      })}>
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-end items-center p-16">
        {
          !checked ? (
            <Button
              variant={"duolango"}
              onClick={nextQuestion}
              className="border-green-400 bg-green-400  text-white shadow-green-500 "
              size='xl'>
              CONTINUE
            </Button>
          ) : (
            <Button
              disabled={Loading}
              variant={"duolango"}
              onClick={checkOption}
              className="border-green-400 bg-green-400  text-white shadow-green-500 "
              size='xl'>
              {Loading ? <LoaderCircle /> : "check"}
            </Button>
          )
        }
      </div>
    </footer>
  )
}
