"use client";
import { Suspense, useMemo } from "react";
import { formatNumber } from "@/lib/format";
import { useShareableState } from "@/hooks/useShareableState";
import { ShareButton } from "@/components/ShareButton";

function Calculator() {
  const [birthDate, setBirthDate] = useShareableState("birth", "1995-01-01");
  const lifespan = 80;

  const result = useMemo(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    const ageInDays = (today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24);
    if (ageInDays < 0) return null;
    const totalDays = lifespan * 365.25;
    const percent = Math.min(100, (ageInDays / totalDays) * 100);
    const remainingYears = Math.max(0, lifespan - ageInDays / 365.25);
    return {
      percent,
      remainingSummers: Math.floor(remainingYears),
      remainingWeekends: Math.floor(remainingYears * 52),
      remainingChristmas: Math.floor(remainingYears),
      ageInDays: Math.floor(ageInDays),
    };
  }, [birthDate]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-[13px] text-muted-foreground mb-1.5">생년월일</label>
        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-base font-medium focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring" />
      </div>
      {result && (
        <>
          <div className="border-t pt-6">
            <p className="text-2xl font-bold num">{formatNumber(result.percent, 1)}%</p>
            <p className="mt-1 text-sm text-muted-foreground">인생 진행률 (기대수명 {lifespan}세 기준)</p>
            <div className="mt-4 h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full bg-foreground transition-all duration-700" style={{ width: `${result.percent}%` }} />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[13px] text-muted-foreground">남은 것들</p>
            {[
              { label: "남은 여름", value: `${result.remainingSummers}번` },
              { label: "남은 주말", value: `${formatNumber(result.remainingWeekends)}번` },
              { label: "남은 크리스마스", value: `${result.remainingChristmas}번` },
              { label: "살아온 날", value: `${formatNumber(result.ageInDays)}일` },
            ].map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="num font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          <ShareButton text={`내 인생 ${formatNumber(result.percent, 1)}% 진행됨. 남은 여름 ${result.remainingSummers}번.`} />
        </>
      )}
    </div>
  );
}

export function LifeProgressCalculator() {
  return <Suspense><Calculator /></Suspense>;
}
