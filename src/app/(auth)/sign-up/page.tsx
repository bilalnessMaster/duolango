import { SignUpView  } from "@/modules/auth/ui/views/SignUpView";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";
const page = async () => {

  const session = await caller.auth.session();
  if(session){
    redirect("/learn")
  }

  return (
    <SignUpView />
  )
}

export default page;
