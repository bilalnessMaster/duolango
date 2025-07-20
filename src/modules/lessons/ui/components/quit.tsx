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
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { X } from "lucide-react"
import Image from 'next/image'
import Link from "next/link"
import { useState } from "react"



export const Quite = () => {
  const [keep ,setKeep] = useState(false)
  const trpc = useTRPC()
  const  {data} = useQuery(trpc.lesson.getLesson.queryOptions());
  console.log("this is the current lesson",data)
  return (
    <Dialog open={keep} onOpenChange={(open)=>setKeep(open)}>
      <DialogTrigger>
        <X className="size-7" />
      </DialogTrigger>
      <DialogContent className="font-sans  w-full">
        <DialogHeader className="flex items-center justify-center mb-4">
          <DialogTitle >
            <Image src={'/logos/mascot_sad.svg'} width={40} height={40} alt="check svg" />
          </DialogTitle>
          <DialogDescription className="text-lg font-medium text-neutral-500">
            Are you want to quite learning
          </DialogDescription>
        </DialogHeader>
        <div className="max-w-lg space-y-3 flex mx-auto flex-col ">
          <Button
            variant={'duolango'}
            size={'xl'}
            className="border-sky-400 bg-sky-400 w-full text-white shadow-sky-500"
            onClick={()=>setKeep(false)}
          >
            keep learning
          </Button>
          <Link href={'/learn'} className="w-full">
            <Button
              variant={'duolango'}
              size={'xl'}
              className="border-none w-full bg-white text-red-400 shadow-none"
            >
              keep learning
            </Button>

          </Link>
        </div>
      </DialogContent>

    </Dialog>

  )
}
