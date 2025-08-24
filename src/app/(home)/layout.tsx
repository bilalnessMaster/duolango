import { SideNavBar } from "@/modules/home/ui/components/side-navbar";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;

}


const layout = async ({ children }: Props) => {
  const session = await caller.auth.session();
  if (!session) {
    redirect("/sign-in")
  }
  return (
    <div className="flex h-screen -full">
      <div>
        <SideNavBar />
      </div>
      <div className="w-full   overflow-y-auto">
        <div className="w-full  max-w-(--breakpoint-lg) mx-auto flex items-start justify-center px-2">
          {children}
        </div>
        <Toaster />
      </div>
    </div>
  )
}


export default layout;
