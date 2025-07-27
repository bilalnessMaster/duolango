'use client'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import Image from "next/image"




export const ShopView = () => {
  const trpc = useTRPC();
  // const { data: progress } = useSuspenseQuery(trpc.lesson.getProgress.queryOptions());
  return (
    <div className="font-sans py-5 space-y-4">
      <div className="min-h-48 relative flex-row-reverse bg-gradient-to-b from-[#0d4450] to-[#3e2173] rounded-xl px-4 flex  gap-x-7 justify-end items-center text-white">
        <div>

          <p className="text-[25px] font-sans font-semibold max-w-md">Start a 2 week free trial to enjoy exclusive Super benefits</p>
        </div>
        <div>
          <Image src={"logos/bird_shop.svg"} width={100} height={100} alt="bird di" />
        </div>
        <div className="absolute top-3 right-3">
          <Image src={"logos/super.svg"} width={100} height={100} alt="bird di" />
        </div>
      </div>
      <div className="py-5 ">
        <h1 className="text-[24px] font-semibold ">Hearts</h1>
      </div>
 <CheckoutButton onClick={()=>{}} title="Refill Hearts" href="logos/fill.svg" description="Get full hearts so you can worry less about making mistakes in a lesson" buttonTitle="FULL" disabled={false}/> 
 <CheckoutButton onClick={()=>{}} title="Unlimited Hearts
" href="logos/unlimited.svg" description="Never run out of hearts with Super" buttonTitle="Unlimited" disabled={false}/> 


 </div>
  )
}


const CheckoutButton = ({ title, description, onClick, href, buttonTitle, disabled }: { title: string, description: string, href: string, buttonTitle: string, onClick: () => void, disabled: boolean }) => {

  return (
    <div className="flex  gap-x-4 items-center justify-between p-3 border-t-2 border-neutral-100">
      <div className="w-fit ">
        <Image src={href} width={100} height={100} alt="bird di" />
      </div>
      <div className="flex-1">
        <h1 className="text-lg font-bold">{title}</h1>
        <p className="text-base max-w-sm text-neutral-400">{description}</p>
      </div>
      <div>
        <Button type="button" disabled={disabled} variant={'duolango'} size={'xl'} onClick={onClick}>
          {buttonTitle}
        </Button>
      </div>
    </div>
  )
}
