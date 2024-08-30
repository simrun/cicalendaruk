import { ReactNode } from "react";

export default function Expandable({
  summary,
  children,
}: {
  summary: ReactNode;
  children: ReactNode;
}) {
  return (
    <details className="group rounded border border-gray-400 p-3">
      <summary className="cursor-pointer font-bold">{summary}</summary>
      {children}
    </details>
  );
}
