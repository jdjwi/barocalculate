"use client";
import { Suspense, useMemo, useCallback } from "react";
import { formatWon, formatNumber, toNumber } from "@/lib/format";
import { NumberInput } from "@/components/NumberInput";
import { ShareButton } from "@/components/ShareButton";
import { SharedResultBanner } from "@/components/SharedResultBanner";
import { useShareableState } from "@/hooks/useShareableState";
import { useRouter, usePathname } from "next/navigation";

const TARGET = 100_000_000;

function Calculator() {
  const [current, setCurrent] = useShareableState("c", "5000000");
  const [monthly, setMonthly] = useShareableState("m", "1000000");
  const [rate, setRate] = useShareableState("r", "3");
  const router = useRouter();
  const pathname = usePathname();
  const handleTryOwn = useCallback(() => { router.replace(pathname, { scroll: false }); setCurrent("5000000"); setMonthly("1000000"); setRate("3"); }, [router, pathname, setCurrent, setMonthly, setRate]);

  const result = useMemo(() => {
    const c = toNumber(current); const m = toNumber(monthly); const r = toNumber(rate) / 100 / 12;
    if (m <= 0) return null;
    let balance = c; let months = 0;
    while (balance < TARGET && months < 1200) { balance = balance * (1 + r) + m; months++; }
    if (months >= 1200) return null;
    const years = Math.floor(months / 12);
    const remainMonths = months % 12;
    return { months, years, remainMonths };
  }, [current, monthly, rate]);

  return (
    <div className="space-y-6">
      <SharedResultBanner onTryOwn={handleTryOwn} />
      <NumberInput label="현재 저축액" value={current} onChange={setCurrent} suffix="원" placeholder="5000000" />
      <NumberInput label="월 저축 금액" value={monthly} onChange={setMonthly} suffix="원" placeholder="1000000" />
      <NumberInput label="예상 연이율" value={rate} onChange={setRate} suffix="%" placeholder="3" />
      {result && (
        <div className="border-t pt-6 space-y-4">
          <div>
            <p className="text-2xl font-bold num">
              {result.years > 0 && `${result.years}년 `}{result.remainMonths > 0 && `${result.remainMonths}개월`}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">1억까지 남은 시간</p>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div className="h-full rounded-full bg-foreground transition-all duration-700"
              style={{ width: `${Math.min(100, (toNumber(current) / TARGET) * 100)}%` }} />
          </div>
          <div className="flex justify-between text-[12px] text-muted-foreground">
            <span>현재 {formatWon(toNumber(current))}</span>
            <span>목표 1억</span>
          </div>
          <ShareButton
            text={`1억 모으기까지 ${result.years > 0 ? `${result.years}년 ` : ""}${result.remainMonths > 0 ? `${result.remainMonths}개월` : ""} 남았대... 너는 얼마나 걸려?`}
            cta="친구한테 보내기"
          />
        </div>
      )}
    </div>
  );
}

export function HundredMillionCalculator() {
  return <Suspense><Calculator /></Suspense>;
}
