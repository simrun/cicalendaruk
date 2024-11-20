import Link from "next/link";

import MaxWidthContainer from "@/components/MaxWidthContainer";
import NavBar from "@/components/NavBar";

export default function Page() {
  return (
    <MaxWidthContainer>
      <NavBar />

      <div className="prose">
        <p className="mb-0">Select a region:</p>

        <ul className="mt-0">
          <li className="list-['🌉']">
            <Link href={"/bristol"}>Bristol</Link>
          </li>
          <li className="list-['🚇']">
            <Link href={"/london"}>London</Link>
          </li>
        </ul>
      </div>
    </MaxWidthContainer>
  );
}
