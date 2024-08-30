import { ReactNode } from "react";

function Expandable({ children }: { children: ReactNode }) {
  return (
    <details className="rounded border border-gray-400 p-3">
      {children}
    </details>
  );
}

function Summary({ children }: { children: ReactNode }) {
  return <summary className="cursor-pointer font-bold">{children}</summary>;
}

Expandable.Summary = Summary;

export default Expandable;
