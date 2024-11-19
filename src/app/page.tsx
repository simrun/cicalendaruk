import Link from "next/link";

import NavBar from "@/components/NavBar";

export default function Page() {
  return (
    <div className="m-auto max-w-prose">
      <NavBar />
      <div className="prose">
        <ul>
          <li className="list-['🌉']">
            <Link href={"/bristol"}>Bristol</Link>
          </li>
          <li className="list-['🚇']">
            <Link href={"/london"}>London</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
