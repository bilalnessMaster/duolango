
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from 'next/image'
import Link from "next/link"
import { useState } from "react"



export const RunOutHearts = ({ hearts, isSubcribed }: { hearts: number | undefined, isSubcribed?: boolean }) => {

  const [isOpen, setIsOpen] = useState(true)
  return (
    <>
      {
        !isSubcribed && (
          <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogContent className="font-sans max-w-[200px]  ">
              <DialogHeader className="flex items-center justify-center mb-4">
                <DialogTitle >
                  <Image src={'/logos/mascot_sad.svg'} width={90} height={90} alt="check svg" />
                </DialogTitle>
                <DialogDescription className="text-lg font-medium text-neutral-500">
                  Complete the lesson and earn one heart
                </DialogDescription>
              </DialogHeader>
              <div className="w-full space-y-3 flex mx-auto max-w-xs flex-col ">
                <Button
                  variant={'duolango'}
                  onClick={() => setIsOpen(false)}
                  size={'xl'}
                  className="border-[#605eff] bg-[#605eff] w-full text-white shadow-[#4e39f7]"
                >
                  start
                </Button>
                <Link href={'/learn'} className="w-full">
                  <Button
                    variant={'duolango'}
                    size={'xl'}
                    className="border-none w-full bg-white text-red-400 shadow-none"
                  >
                    leave lesson
                  </Button>
                </Link>
              </div>
            </DialogContent>

          </Dialog>
        )
      }
    </>
  )
}
