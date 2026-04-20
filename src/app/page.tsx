import Link from "next/link";

import MaxWidthContainer from "@/components/MaxWidthContainer";
import NavBar from "@/components/NavBar";

export default function Page() {
  return (
    <MaxWidthContainer>
      <NavBar />
      <div className="prose">
        <p className="mt-1">Weekly calendar of contact improvisation events.</p>

        <p className="mb-0">Select a region:</p>
        <ul className="mt-0">
          <li className="list-['🌊']">
            <Link href={"/brighton"}>Brighton</Link>
          </li>
          <li className="list-['🌉']">
            <Link href={"/bristol"}>Bristol</Link>
          </li>
          <li className="list-['🚇']">
            <Link href={"/london"}>London</Link>
          </li>
          <li className="list-['↙️']">
            <Link href={"/southwest"}>The South West</Link>
          </li>
        </ul>

        <div className="mt-10 text-sm prose-p:m-1">
          <p>Made with 🤍 by Sim and John.</p>
          <p>
            Source code on{" "}
            <Link href="https://github.com/simrun/cicalendaruk" target="_blank">
              Github
            </Link>
            .
          </p>
        </div>
      </div>
    </MaxWidthContainer>
  );
}
