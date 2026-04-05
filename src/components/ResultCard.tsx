import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string;
  sub?: string;
  size?: "default" | "large";
}

export function ResultCard({ label, value, sub, size = "default" }: Props) {
  return (
    <div className="space-y-0.5">
      <p className="text-[13px] text-muted-foreground">{label}</p>
      <p
        className={cn(
          "num font-semibold tracking-tight",
          size === "large" ? "text-3xl" : "text-xl"
        )}
      >
        {value}
      </p>
      {sub && <p className="text-[11px] text-muted-foreground/70">{sub}</p>}
    </div>
  );
}
