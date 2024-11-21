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

      <div className="flex flex-col mt-6 gap-y-2">
        <Link href={"/dashboard"}>Dashboard</Link>
        { session?.user
          ? <>
            <h2>Welcome, { session.user.name }</h2>
            <div onClick={ () => signOut() }>Sign Out</div>
          </>
          : <div onClick={ () => signIn('google') }>Sign In</div> }
      </div>
    </div>
  );
}
