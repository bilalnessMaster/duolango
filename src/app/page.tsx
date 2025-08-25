import { Header } from "@/components/landing-page/header";
import { Hero } from "@/components/landing-page/hero";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await caller.auth.session();
  if (session) {
    redirect("/learn")
  }
  return (
    <div className="max-w-(--breakpoint-xl)  mx-auto   text-neutral-900 gap-y-3  p-4 mt-3 ">
      <Header />
      <Hero />
    </div>
  );
}
