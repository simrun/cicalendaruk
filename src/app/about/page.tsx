import type { Metadata } from "next";
import Link from "next/link";

import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "CI Calendar UK | About",
  description: "About CI Calendar UK",
};

export default function Page() {
  return (
    <>
      <NavBar />

      <p className="mt-3">Made with ❤️ by Sim and John.</p>

      <p className="mt-3">
        Source code on{" "}
        <Link
          className="underline"
          href="https://github.com/simrun/cicalendaruk"
        >
          Github
        </Link>
        .
      </p>
    </>
  );
}
