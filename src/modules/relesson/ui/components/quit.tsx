'use client'
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import Image from 'next/image'
import Link from "next/link"
import { useState } from "react"



export const Quite = () => {
  const [keep, setKeep] = useState(false)
  return (
    <Dialog open={keep} onOpenChange={(open) => setKeep(open)}>
      <DialogTrigger>
        <X className="size-7" />
      </DialogTrigger>
      <DialogContent className="font-sans  w-full">
        <DialogHeader className="flex items-center justify-center mb-4">
          <DialogTitle >
            <Image src={'/logos/mascot_sad.svg'} width={90} height={90} alt="check svg" />
          </DialogTitle>
          <DialogDescription className="text-lg font-medium text-neutral-500">
            Wait, don’t go! You’ll lose your progress if you quit now
          </DialogDescription>
        </DialogHeader>
        <div className="max-w-xs space-y-3 flex mx-auto flex-col w-full ">
          <Button
            variant={'duolango'}
            size={'xl'}
            className="border-sky-400 bg-sky-400 w-full text-white shadow-sky-500"
            onClick={() => setKeep(false)}
          >
            keep learning
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
