'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation , useQuery} from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC();
  const {data : session } = useQuery(trpc.auth.session.queryOptions());
  const {mutate, isPending} = useMutation(trpc.auth.signIn.mutationOptions({
    onSuccess : (data) =>{
      console.log("onSuccess :", data)
    }, 
    onError: (error) =>{
      console.log("onError:",  error)
    }, 

  }))
  console.log("session :",  session)
  return (
    <div className="flex w-full flex-col gap-y-3  h-screen items-center justify-center">
      <Button disabled={isPending} onClick={()=> mutate({ email : "bilal@gmail.com" , password : "bilaenrewer"})}variant="duolango" className="bg-green-400 border-green-400 shadow-green-500 text-white" size={"xl"} >keep learning</Button>
      <Input className="border-2 font-sans text-2xl font-medium h-12 outline-none" placeholder="Email" />
    </div>
  );
}
