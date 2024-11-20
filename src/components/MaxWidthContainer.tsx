import { ReactNode } from "react";

export default function MaxWidthContainer({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="m-auto max-w-prose px-1">{children}</div>;
}
