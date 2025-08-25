import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"




export const Hero = () => {

  return (
    <div className="w-full h-200 items-center  justify-center flex">
      <div className="flex items-center justify-center gap-x-4">
        <div >
          <Image src={"/logos/duolingologo.svg"} alt="duolingo logo" width={400} height={400} />
        </div>
        <div className="flex flex-col max-w-sm  gap-y-2">
          <Link href={"/sign-up"}>
            <Button
              variant={'duolango'}
              size={'xl'}
              className="bg-green-400 text-white border-green-400 shadow-green-500 w-full">
              get started
            </Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button 
            className="text-blue-400"
            variant={'duolango'} size={'xl'}>
              I already have an account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
