import type { Metadata } from "next";

import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "CI Calendar UK | About",
  description: "About CI Calendar UK",
};

export default function Page() {
  return (
    <>
      <NavBar />

      <p className="mt-3">Made with ❤ by Sim and John. More to come...</p>
    </>
  );
}
