'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC();
  const { data: session } = useQuery(trpc.auth.session.queryOptions());
  console.log("session :", session)
  return (
    <div className="flex w-full flex-col mx-auto text-neutral-900 gap-y-3 max-w-md p-4 mt-3 items-center justify-center">
      <pre>
        <code>
          {JSON.stringify(session, null, 2)}
        </code>
      </pre>
    </div>
  );
}
