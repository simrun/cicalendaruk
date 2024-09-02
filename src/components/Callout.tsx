import { ReactNode } from "react";

function Callout({
  children,
  type,
}: {
  children: ReactNode;
  type: "note" | "tip";
}) {
  const borders =
    type === "note"
      ? "border-blue-500 bg-blue-50"
      : "border-green-500 bg-green-50";

  return (
    <div className={`rounded border border-l-4 ${borders} p-4`}>
      {type === "note" ? "ℹ️" : "💡"} {children}
    </div>
  );
}

export default Callout;
