'use client'
import Image from 'next/image';
import { useAudio } from 'react-use'
import { useLesson } from '../../hook/use-question';
interface Props {
  audioSrc: string;
  imageSrc: string;
  order: number;
  isCorrect: boolean;
}


export const Option = ({ audioSrc, imageSrc, order, isCorrect }: Props) => {
  const { setIsCorrect } = useLesson()
  const [audio, _, controls] = useAudio({
    src: "/"+audioSrc || "",
  })

  return (
    <div
      onClick={() => {
        controls.play();
        setIsCorrect(isCorrect)
      }}
      className='min-h-[300px]'
    >
      {audio}
      <input type="radio" id={audioSrc} name='question' className='hidden peer' />
      <label htmlFor={audioSrc} className='shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] peer-checked:shadow-sky-500 shadow-neutral-100 border-2 rounded-xl h-full  brorder-neutral-100 peer-checked:border-sky-400 flex flex-col  items-center justify-center'>
        <Image src={"/"+imageSrc} className='object-cover' width={120} height={120} alt={imageSrc} />
      </label>
    </div>
  )
}
