'use client'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form
} from "@/components/ui/form"
// import goolge from '/logos/google.svg'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import z from "zod"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query"
import { LoaderCircleIcon, LoaderIcon } from "lucide-react"
import { useState } from "react"

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "password must be atleast 6 characters long" }),
  age: z.coerce.number().min(12, { message: "you must be atleast 12 years old or above" }),
  name: z.string().min(3, { message: "name must be atleast 3 characters long" }),
})


export const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const trpc = useTRPC();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      age: 0,
      name: "",
      email: "",
      password: "",
    }
  })

  const { mutate: signUp, isPending } = useMutation(trpc.auth.signUp.mutationOptions({
    onSuccess: (data) => {
      console.log("onSuccess :", data)
    },
    onError: (error) => {
      console.log("onError:", error)
    },

  }))

  const handleSubmit = (data: z.infer<typeof signInSchema>) => {
    // console.log('this data from the sign in form :', data)
    signUp({
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password
    })
  }
  return (
    <div className="font-sans flex flex-col gap-y-4">
      <Form {...form}>
        <form className=" justify-center flex flex-col gap-y-2 w-full max-w-sm" onSubmit={form.handleSubmit(handleSubmit)}>
          {step != 1 ? (<>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input className="" {...field} name="name" placeholder="name"></Input>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input className="" {...field} name="email" placeholder="Email"></Input>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input type="password" {...field} name="password" placeholder="Password"></Input>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            /> </>) : (
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input className="" type="number" {...field} name="age" placeholder="Age"></Input>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          )
          }
          {
            step === 2 ? (
              <Button disabled={isPending} variant={'duolango'} size={"xl"} className="w-full rounded-2xl text-[15px] border-sky-300 shadow-sky-400 bg-sky-300 text-white disabled:text-muted-foreground  disabled:cursor-not-allowed ">
                {isPending ? <LoaderCircleIcon className="size-6 animate-spin" /> : "Sign up"}

              </Button>
            ) : (
              <Button onClick={(e) => { e.preventDefault(); setStep(2) }} type="button" size={"xl"} variant={'duolango'} className="
              w-full rounded-2xl text-[15px] border-sky-300 shadow-sky-400 bg-sky-300 text-white disabled:text-muted-foreground  disabled:cursor-not-allowed ">
                next
              </Button>
            )
          }


          <div className="relative w-full mt-4 h-2 flex items-center justify-center">
            <div className="h-0.5 w-full bg-neutral-200" />
            <span className="size-7 bg-white rounded-full inline-flex items-center justify-center font-semibold left-1/2 -translate-x-1/2 absolute " >OR</span>
          </div>

          <div className="max-w-sm flex items-center gap-x-2 mt-2">
            <Button variant={'duolango'} type="button" size={"xl"} className="flex-1 font-semibold rounded-2xl  text-[15px] ">
              <Image src="/logos/google.svg" alt="Logo" width={20} height={20} />
              Google
            </Button>
            <Button variant={'duolango'} type="button" size={"xl"} className="flex-1 font-semibold rounded-2xl  text-[15px] ">
              <Image src="/logos/facebook.svg" alt="Logo" width={20} height={20} />
              facebook
            </Button>
          </div>
        </form>

      </Form>
      <div className="text-base space-y-2">
        <p className="max-w-sm text-netural-300  text-center space-x-1 font-sans">
          <span>
            By signing in to Duolingo, you agree to our
          </span>
          <strong>
            Terms
          </strong>
          and{" "}
          <strong>
            Privacy
          </strong>
          <strong>
            Policy.
          </strong>
        </p>
        <p className="max-w-sm text-netural-300 text-center space-x-1 font-sans">
          <span>
            This site is protected by reCAPTCHA Enterprise and the Google
          </span>
          <strong>
            Terms
          </strong>
          and{" "}
          <strong>
            Privacy
          </strong>
          <strong>
            Policy.
          </strong>
        </p>
      </div>


    </div>
  )
}
