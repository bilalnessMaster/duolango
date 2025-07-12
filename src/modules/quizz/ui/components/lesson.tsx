import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  index?: number,
  href: string;
  order?: number;
  state?: 'not_started' | "in_progress" | 'compeleted';
  currentLesson?: boolean;
  position?: string;
}

export const Lesson = ({ currentLesson, href, state, index }: Props) => {

  const position = () => {
    if (index && index % 2 === 0) {
      if (index == 6) {
        return "left-16"
      } else if (index == 4) {
        return "right-16"
      }
      return "left-16"
    }
  }

  return (
    <>
      {
        state === "compeleted" ?
          (
            <LinkState href={href} currentLesson={currentLesson} position={position()} state={state} />
          )
          : currentLesson ?
            (
              <LinkState href={href} currentLesson={currentLesson} position={position()} state={state} />
            ) : (
              <button disabled>
                <span className={cn(
                  "size-20 shadow-[0px_10px_0px_0px_rgba(0,0,0,1)]  relative rounded-full font-sans font-semibold inline-flex items-center justify-center bg-neutral-50 rotate-x-39  shadow-neutral-200 border border-neutral-200text-2xl ",
                  position()
                )}>
                  <Image src={'/logos/star.svg'} width={40} height={40} alt="check svg" />
                </span>
              </button>
            )
      }
    </>

  )
}
const LinkState = ({ href, currentLesson, state, position }: Props) => {

  const stateStyle = () => {
    switch (state) {
      case "in_progress":
        return "bg-[#58CC02] shadow-[#46A302] border border-[#46A302]"
      case "compeleted":
        return "bg-[#FFC800] shadow-[#E6A100] border border-[#E6A100]"
      case "not_started":
        return "text-neutral-500 shadow-neutral-200 border border-neutral-100"
      default:
        return "text-neutral-500 shadow-neutral-200 border border-neutral-200"
    }

  }


  return (
    <Link href={href}>
      <span className={cn(
        "size-20  shadow-[0px_10px_0px_0px_rgba(0,0,0,1)] shadow-neutral-300 relative rounded-full font-sans font-semibold inline-flex items-center justify-center bg-neutral-50 rotate-x-39 text-2xl text-white",
        stateStyle(),
        position,
        {
          "bg-[#58CC02] shadow-[#46A302] border border-[#46A302] ": currentLesson,
          "hover:shadow-[0px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-2 transition-all": currentLesson || state === 'compeleted'
        },
      )}>
        {
          currentLesson && (
            <div className="-top-10 uppercase text-[#58CC02]  text-[17px] animate-bounce bg-white absolute border-2 border-neutral-100 px-4 py-2 rounded-lg">
              start

              <div className="absolute rotate-180  -bottom-[5px] w-0 h-0 border-l-[20px] border-r-[20px] border-l-transparent border-r-transparent border-b-neutral-100  left-1/2 -translate-x-1/2 border-t-0 border-b-[5px]" />
            </div>
          )
        }
        {
          state === 'compeleted' ? (

            <Image src={'/logos/completed.svg'} width={40} height={40} alt="check svg" />
          ) : (

            <Image src={'/logos/whiteStar.svg'} width={40} height={40} alt="check svg" />
          )
        }

      </span>

    </Link>

  )
}
