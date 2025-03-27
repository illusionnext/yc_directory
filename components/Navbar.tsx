import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";
import Form from "next/form";
import { Button } from "@/components/ui/button";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 shadow-md font-[family-name:var(--font-inter)]">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" width={144} height={30} alt="logo" />
        </Link>

        <section className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href="/startup/create" className=" font-bold text-lg">
                Create Startup
              </Link>
              <Form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button variant="destructive" type="submit">
                  Sign Out
                </Button>
              </Form>
              <Link href={`/user/${session?.user?.name}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <Form
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/" });
              }}
            >
              <Button variant="ghost" type="submit">
                Sign in
              </Button>
            </Form>
          )}
        </section>
      </nav>
    </header>
  );
};
export default Navbar;
