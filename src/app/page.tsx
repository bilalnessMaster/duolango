import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-y-3  h-screen items-center justify-center">
      <Button  variant="duolango" className="bg-green-400 border-green-400 shadow-green-500 text-white" size={"xl"} >keep learning</Button>
      <Input className="border-2 font-sans text-2xl font-medium h-12 outline-none" placeholder="Email" />
    </div>
  );
}
