import Link from "next/link";
import { getViralCalculators, getPracticalCalculators, CATEGORIES } from "@/lib/calculators";

export default function Home() {
  const viral = getViralCalculators();
  const practical = getPracticalCalculators();

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-xl font-semibold tracking-tight">바로계산</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        궁금한 거 바로 계산해보세요.
      </p>

      {/* 바이럴 계산기 */}
      <section className="mt-8">
        <div className="space-y-px rounded-lg border overflow-hidden">
          {viral.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className="flex items-center justify-between bg-card px-4 py-3.5 transition-colors hover:bg-secondary/50 active:bg-secondary"
            >
              <div>
                <span className="text-[15px] font-medium">{calc.shortTitle}</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground/40">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* 실용 계산기 */}
      <section className="mt-10">
        <p className="text-[13px] text-muted-foreground mb-3">실용 계산기</p>
        <div className="space-y-px rounded-lg border overflow-hidden">
          {practical.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className="flex items-center justify-between bg-card px-4 py-3.5 transition-colors hover:bg-secondary/50 active:bg-secondary"
            >
              <div>
                <span className="text-[15px] font-medium">{calc.shortTitle}</span>
                <span className="ml-2 text-[11px] text-muted-foreground">
                  {CATEGORIES[calc.category]}
                </span>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground/40">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
