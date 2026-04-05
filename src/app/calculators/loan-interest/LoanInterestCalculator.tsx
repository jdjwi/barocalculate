"use client";

import { useState, useMemo } from "react";
import { NumberInput } from "@/components/NumberInput";
import { ResultCard } from "@/components/ResultCard";
import { formatWon, formatNumber, toNumber } from "@/lib/format";

export function LoanInterestCalculator() {
  const [principal, setPrincipal] = useState("300000000");
  const [rate, setRate] = useState("3.5");
  const [years, setYears] = useState("30");
  const [method, setMethod] = useState<"equal" | "principal">("equal");

  const result = useMemo(() => {
    const p = toNumber(principal);
    const r = toNumber(rate) / 100 / 12;
    const n = toNumber(years) * 12;
    if (p <= 0 || r <= 0 || n <= 0) return null;

    if (method === "equal") {
      const monthly = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = monthly * n;
      const totalInterest = totalPayment - p;

      return { monthly, totalPayment, totalInterest, firstMonth: monthly, lastMonth: monthly };
    } else {
      const monthlyPrincipal = p / n;
      const firstInterest = p * r;
      const firstMonth = monthlyPrincipal + firstInterest;
      const lastMonth = monthlyPrincipal + monthlyPrincipal * r;

      let totalInterest = 0;
      for (let i = 0; i < n; i++) {
        totalInterest += (p - monthlyPrincipal * i) * r;
      }
      const totalPayment = p + totalInterest;

      return { monthly: monthlyPrincipal, totalPayment, totalInterest, firstMonth, lastMonth };
    }
  }, [principal, rate, years, method]);

  return (
    <div className="space-y-6">
      <NumberInput label="대출 금액" value={principal} onChange={setPrincipal} suffix="원" placeholder="300000000" />

      <div className="grid grid-cols-2 gap-4">
        <NumberInput label="연이율" value={rate} onChange={setRate} suffix="%" placeholder="3.5" />
        <NumberInput label="상환 기간" value={years} onChange={setYears} suffix="년" placeholder="30" />
      </div>

      <div className="flex gap-2">
        {([
          { key: "equal", label: "원리금균등" },
          { key: "principal", label: "원금균등" },
        ] as const).map((m) => (
          <button
            key={m.key}
            onClick={() => setMethod(m.key)}
            className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors ${
              method === m.key
                ? "border-foreground bg-foreground text-background"
                : "border-input text-muted-foreground hover:border-foreground/30"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {result && (
        <>
          <div className="border-t pt-6">
            <p className="text-lg font-semibold">
              {method === "equal"
                ? `매달 ${formatWon(Math.round(result.monthly))}씩 상환합니다.`
                : `첫 달 ${formatWon(Math.round(result.firstMonth))}에서 점차 줄어듭니다.`}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              총 이자 {formatWon(Math.round(result.totalInterest))} · {toNumber(years)}년간 총 {formatWon(Math.round(result.totalPayment))} 상환
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-[13px] text-muted-foreground">상환 요약</p>
            {[
              { label: "대출 원금", value: formatWon(toNumber(principal)) },
              { label: "총 이자", value: formatWon(Math.round(result.totalInterest)) },
              { label: "총 상환액", value: formatWon(Math.round(result.totalPayment)) },
              ...(method === "equal"
                ? [{ label: "월 상환액", value: formatWon(Math.round(result.monthly)) }]
                : [
                    { label: "첫 달 상환액", value: formatWon(Math.round(result.firstMonth)) },
                    { label: "마지막 달 상환액", value: formatWon(Math.round(result.lastMonth)) },
                  ]),
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="num font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
