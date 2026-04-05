import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-12 max-w-2xl items-center justify-between px-5">
        <Link href="/" className="text-[15px] font-semibold tracking-tight text-foreground">
          바로계산
        </Link>
        <span className="text-[11px] text-muted-foreground">2026년 기준</span>
      </div>
    </header>
  );
}
