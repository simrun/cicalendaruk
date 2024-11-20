import Link from "next/link";

import NavBar from "@/components/NavBar";

export default function Page() {
  return (
    <div className="m-auto flex h-svh max-w-prose flex-col px-2">
      <NavBar />
      <div className="prose flex-grow">
        <p>Weekly calendar of contact improvisation events.</p>

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

      <footer className="prose">
        <p className="mb-2 text-center text-xs">
          Made with 🤍 by Sim and John. Source code on{" "}
          <Link href="https://github.com/simrun/cicalendaruk">Github</Link>.
        </p>
      </footer>
    </div>
  );
}
