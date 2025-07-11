import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface Props {
  isSubcribed?: boolean
}


export const Subscrib = ({ isSubcribed }: Props) => {


  return (
    <div className="relative w-full  border-2 rounded-xl border-neutral-200/45 p-4 space-y-3">
      <Image
        src={"/logos/super.svg"}
        width={80}
        height={50}
        alt={"super logo name"} />
      <h1 className="font-semibold text-neutral-600 text-lg">Try Super for free</h1>
      <p className="max-w-[220px]  text-neutral-500">
        No ads, personalized practice, and unlimited Legendary!
      </p>
      {

        isSubcribed ? (
          <Button
            disabled={isSubcribed}
            variant={'duolango'}
            size={'xl'}
            className="border-indigo-500 bg-indigo-500 w-full shadow-indigo-600 text-white rounded-xl" >
            subcribed
          </Button>

        ) : (
          <Link href={'/shop'} >
            <Button
              disabled={isSubcribed}
              variant={'duolango'}
              size={'xl'}
              className="border-indigo-500 bg-indigo-500 w-full shadow-indigo-600 text-white rounded-xl" >
              Subscrib
            </Button>
          </Link>

        )
      }
      <div className="absolute top-6 right-4">
        <Image
          src={"/logos/duolango bird.svg"}
          width={100}
          height={50}
          alt={"super logo name"} />

      </div>
    </div>
  )
}
