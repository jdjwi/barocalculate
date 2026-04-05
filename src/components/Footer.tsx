import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="mx-auto max-w-2xl px-5 py-6 text-[11px] leading-relaxed text-muted-foreground">
        <p>
          계산 결과는 참고용이며 정확한 금액은 관할 기관에 확인하세요.
        </p>
        <div className="mt-3 flex gap-3">
          <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
            개인정보처리방침
          </Link>
          <span>© 2026 바로계산</span>
        </div>
      </div>
    </footer>
  );
}
