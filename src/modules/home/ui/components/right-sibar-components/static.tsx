import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  hearts?: number;
  streaks?: number;
  activeCourse?: string;
}

export const Static = ({ hearts = 0, streaks, activeCoures }: Props) => {


  return (

    <div className="flex items-center justify-between">
      <Item href={"/logos/es.svg"} />
      <Item href="/logos/streaks.svg" statis={streaks} />
      <Item href="/logos/heart.svg" statis={hearts} className="text-red-500" />
    </div>
  )

}




const Item = ({ href, className, statis }: { href: string, className?: string, statis?: string | number }) => {

  return (
    <div className={cn("w-fit  p-2 flex items-center gap-x-1  hover:bg-neutral-100 rounded-lg", className)}>
      <Image
        src={href}
        width={30}
        className="rounded"
        height={30}
        alt={href} />
      <h2 className="font-semibold">{statis}</h2>
    </div>
  )
}
