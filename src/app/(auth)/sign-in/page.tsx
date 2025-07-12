import { SignInView } from "@/modules/auth/ui/views/SignInView";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

const page = async () => {

  const session = await caller.auth.session();
  if(session){
    redirect("/learn")
  }

  return (
    <SignInView />
  )
}
export default page;
