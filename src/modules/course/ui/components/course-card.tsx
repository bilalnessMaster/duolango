
'use client'
import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  title: string;
  imageSrc: string;
  activeCourse: boolean;
  id: string;
}


export const CourseCard = ({ id, imageSrc, activeCourse, title }: Props) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [disable, setDisable] = useState(false)
  const trpc = useTRPC()
  const { mutate: setCourse } = useMutation(trpc.course.setCourse.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries()
      setTimeout(()=>router.push("/learn") , 2000)
    }
  }))
  const handeCourse = (id: string) => {
    setDisable(true)
    setCourse({
      courseId: id
    })
    setDisable(false)
  }
  return (
    <div
      className=''
    >
      <button disabled={disable} onClick={() => handeCourse(id)} className=' cursor-pointer relative p-9 shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] space-y-2 peer-checked:shadow-sky-500 shadow-neutral-200 border-2 rounded-xl h-full  brorder-neutral-100 peer-checked:border-sky-400 flex flex-col  items-center justify-center'>
        <Image src={imageSrc} className='object-cover rounded-lg' width={120} height={120} alt={imageSrc} />
        <p className='font-sans font-medium text-lg '>{title}</p>
        {
          activeCourse && (
            <span className='absolute rounded top-3 right-3 size-7 bg-green-400 text-white inline-flex items-center justify-center ' >
              <Check className='size-5 ' />
            </span>
          )
        }

      </button>
    </div>
  )
}

