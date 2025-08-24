'use client'
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth-client';
import { useTRPC } from '@/trpc/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const updateSchema = z.object({
  name: z.string().min(3),
})


export const ProfileView = () => {

  const trpc = useTRPC()
  const [value, setValue] = useState('')
  const router = useRouter()
  const { data: profile } = useSuspenseQuery(trpc.profile.getProfile.queryOptions());

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: profile.user.name as string
    }
  })

  const { mutate: updateName } = useMutation(trpc.profile.updateName.mutationOptions({
    onSuccess: (data) => {
      console.log("onSuccess :", data)
    },
    onError: (error) => {
      console.log("onError:", error)
    },
  }));

  const handleSubmit = (data: z.infer<typeof updateSchema>) => {
    console.log(data)
    updateName({
      name: data.name
    })
  }

  return (
    <div className="font-sans py-5 space-y-4">
      <div className="min-h-64  bg-neutral-100 rounded-xl px-4 flex justify-between items-center text-white">
      </div>
      <div className=" border-b-2 border-neutral-100 pb-5 flex items-center justify-between">
        <div>
          <form action="" onSubmit={form.handleSubmit(handleSubmit)}>
            <input type="text" {...form.register("name")} className="font-sans text-2xl font-semibold text-neutral-700" defaultValue={profile.user.name as string} />
          </form>
          <p className="text-neutral-500">joind at {profile.user.createdAt?.toString().split("T")[0]}</p>
        </div>
        <div>
          <Image
            src={profile.progress?.course.imageSrc || '/logos/es.svg'}
            width={35}
            className="rounded"
            height={35}
            alt={'active course'}
          />
        </div>
      </div>

      <div className="  space-y-2">
        <div>
          <h1 className="font-sans text-2xl font-semibold text-neutral-700">Statistics</h1>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <Stats href='/logos/points.svg' description='Total XP' value={profile.progress?.points} />
          <Stats href='/logos/completed.svg' description='Lessons completed' value={profile.progress?.lessons} />
        </div>
        <div className='flex justify-end py-4'>
          <Button
            onClick={() => signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/sign-in"); // redirect to login page
                },
              }
            })}
            variant={'duolango'}>Log out</Button>
        </div>
      </div>
    </div>
  )
}



const Stats = ({ href, description, value }: { href: string, description: string, value?: number }) => {

  return (
    <div className='border-2 border-neutral-100 flex  rounded-2xl py-2 px-2'>
      <div className='flex items-center'>
        <Image
          src={href}
          width={35}
          className="rounded"
          height={35}
          alt={href}
        />
      </div>
      <div>
        <h1 className="font-sans text-lg font-semibold text-neutral-700">{value}</h1>
        <p className="text-xs text-neutral-500">{description}</p>
      </div>
    </div>
  )
}
