'use client'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { ArrowLeft, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLesson } from '../../hook/use-question'
import { useAudio, useWindowSize } from 'react-use'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import Image from 'next/image'

export const ResultView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { width, height } = useWindowSize()
  const [audio, _, controls] = useAudio({
    src: "/audios/finish.mp3",
  })

  const { progress, lesson, rightAnswers } = useLesson();

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true)
      controls.play()
    }
  }, [isLoading])


  if (!isLoading) {
    return (
      <div className="h-screen flex items-center flex-col justify-center font-sans font-semibold  text-shadow-blue-950">
        {audio}
        <LoaderCircle className="size-8 stroke-green-400 animate-spin" />
        <p>Please wait </p>
      </div>
    )
  };
  const xp = progress?.points;
  const percentage = lesson?.question?.length ? Math.round((rightAnswers / lesson?.question?.length) * 100) : 0
  return (
    <div className="h-screen w-full items-center justify-center flex gap-y-3 relative flex-col">
      {audio}
      <Confetti
        width={width}
        height={height}
      />

      <Link href={'/learn'} className='absolute left-5 top-5'>
        <Button className='' variant={'duolango'} size={'xl'}>
          <ArrowLeft className='font-semibold size-6' />
        </Button>
      </Link>
      <Image src={'/logos/result.svg'} className='object-cover' width={120} height={120} alt={'the result'} />
      <div className='items-center justify-center flex gap-x-3 '>

        <Result className="text-amber-400 bg-amber-400" title='Total XP'>
          {xp}xp
        </Result>
        <Result className="text-green-400 bg-green-400" title="Amazing">
          {percentage} %
        </Result>
      </div>

    </div>
  )
}




const Result = ({ title, children, className }: { title: string, className: string, children: React.ReactNode }) => {
  return (
    <div className={cn("    py-0.5 p-0.5  rounded-xl font-semibold font-sans ", className)}>
      <div className='p-2  text-center text-white'>
        <h1>{title}</h1>
      </div>
      <div className=" bg-white size-32 flex items-center justify-center rounded-lg  uppercase">
        {children}
      </div>
    </div>
  )
}
