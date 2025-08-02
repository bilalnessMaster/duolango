import Image from "next/image";


interface Props {
  hearts: number | string;
}

export const Hearts = ({ hearts }: Props) => {
  return (
    <div className="items-center justify-center w-fit flex gap-x-3">
      <p className="font-medium text-lg text-red-500">{hearts}</p>
      <Image src={'/logos/heart.svg'} width={30} height={30} alt="check svg" />
    </div>
  )
}
