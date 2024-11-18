import type { Metadata } from "next";
import Link from "next/link";

import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "CI Calendar UK | About",
  description: "About CI Calendar UK",
};

export default function Page() {
  return (
    <div className="m-auto max-w-prose">
      <NavBar breadcrumb={[["About"]]} />

      <div className="prose py-3">
        <p>
          A calendar that aggregates CI events from all the London
          teachers/organisers.
        </p>

        <p>Made with ❤️ by Sim and John.</p>

        <p>
          Source code on{" "}
          <Link
            className="underline"
            href="https://github.com/simrun/cicalendaruk"
          >
            Github
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
