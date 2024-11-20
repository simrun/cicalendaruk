import { ReactNode } from "react";

function MaxWidthContainer({ children }: { children: ReactNode }) {
  return <div className="m-auto max-w-prose px-2 py-1">{children}</div>;
}

export default MaxWidthContainer;
