import Link from "next/link";
import { calculators, CATEGORIES, type CalculatorInfo } from "@/lib/calculators";

interface Props {
  calculator: CalculatorInfo;
  children: React.ReactNode;
  faq?: { q: string; a: string }[];
  formula?: string;
  source?: string;
}

export function CalculatorLayout({
  calculator,
  children,
  faq,
  formula,
  source,
}: Props) {
  const related = calculators
    .filter((c) => c.slug !== calculator.slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-2xl px-5 py-8">
      {/* 뒤로가기 + 제목 */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        목록
      </Link>

      <h1 className="mt-4 text-xl font-semibold tracking-tight">
        {calculator.title}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {calculator.description}
      </p>

      {/* 계산기 */}
      <div className="mt-6">
        {children}
      </div>

      {/* 계산 공식 */}
      {formula && (
        <details className="mt-10 group">
          <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors list-none flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform group-open:rotate-90">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            계산 공식
          </summary>
          <pre className="mt-3 whitespace-pre-line text-[13px] leading-relaxed text-muted-foreground">
            {formula}
          </pre>
          {source && (
            <p className="mt-2 text-[11px] text-muted-foreground/60">
              출처: {source}
            </p>
          )}
        </details>
      )}

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground">자주 묻는 질문</h2>
          {faq.map((item, i) => (
            <details key={i} className="group">
              <summary className="cursor-pointer text-[15px] font-medium hover:text-accent transition-colors list-none">
                {item.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground pl-0">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      )}

      {/* 관련 계산기 */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-sm font-medium text-muted-foreground mb-3">다른 계산기</h2>
        <div className="space-y-px rounded-lg border overflow-hidden">
          {related.map((c) => (
            <Link
              key={c.slug}
              href={`/calculators/${c.slug}`}
              className="flex items-center justify-between bg-card px-4 py-3 text-sm transition-colors hover:bg-secondary/50"
            >
              <span className="font-medium">{c.shortTitle}</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-muted-foreground/40">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
