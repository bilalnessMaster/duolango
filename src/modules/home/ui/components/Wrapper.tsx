import { getQueryClient, trpc } from "@/trpc/server";
import { RightSideBar, RightSideBarSkeleton } from "./right-side-bar";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}


export const Wrapper = async ({ children }: Props) => {
  const queyClient = getQueryClient();
  void queyClient.prefetchQuery(trpc.statics.getStatics.queryOptions());

  return (
    <div className="flex w-full  gap-x-2 font-sans ">
      <div className="flex-1 bg-green-100 pb-12321">
        {
          children
        }
      </div>
      <div className="max-w-[340] w-full relative hidden md:block">
          <Suspense fallback={ <RightSideBarSkeleton /> }>
            <RightSideBar />
          </Suspense>
      </div>
    </div>
  )
}
