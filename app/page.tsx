"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();

  return (
    <div className="font-[family-name:var(--font-geist-sans)] p-12">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image src={"/images/logo-black.png"} alt={"AggieSeek"} width={400} height={200} />
      </main>

      <div className="mt-6 space-y-2">
        { session?.user
          ? <>
            <h2>Welcome, { session.user.name }</h2>
            <div className={"flex gap-x-4"}>
              <Link className={"hover:font-bold"} href={"/dashboard"}>Dashboard</Link>
              <div className={"inline-flex hover:cursor-pointer hover:font-bold"} onClick={ () => signOut() }>Sign Out</div>
            </div>
          </>
          : <div className={"inline-block hover:cursor-pointer hover:font-bold"} onClick={ () => signIn('google') }>Sign In</div> }
      </div>
    </div>
  );
}
