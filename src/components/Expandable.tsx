import { ReactNode } from "react";

function Summary({ children }: { children: ReactNode }) {
  return <summary className="cursor-pointer font-bold">{children}</summary>;
}

function Expandable({ children }: { children: ReactNode }) {
  return (
    <details className="group rounded border border-gray-400 p-3">
      {children}
    </details>
  );
}

Expandable.Summary = Summary;

export default Expandable;
