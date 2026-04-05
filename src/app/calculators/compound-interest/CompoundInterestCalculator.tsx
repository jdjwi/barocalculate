"use client";

import { useState, useMemo } from "react";
import { NumberInput } from "@/components/NumberInput";
import { ResultCard } from "@/components/ResultCard";
import { formatWon, formatNumber, toNumber } from "@/lib/format";

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("10000000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("10");
  const [compound, setCompound] = useState(12);

  const result = useMemo(() => {
    const p = toNumber(principal);
    const r = toNumber(rate) / 100;
    const t = toNumber(years);
    if (p <= 0 || r <= 0 || t <= 0) return null;

    const n = compound;
    const amount = p * Math.pow(1 + r / n, n * t);
    const interest = amount - p;
    const returnRate = (amount / p - 1) * 100;

    const yearlyData = [];
    for (let y = 0; y <= Math.min(t, 30); y++) {
      yearlyData.push({
        year: y,
        amount: p * Math.pow(1 + r / n, n * y),
      });
    }

    return { amount, interest, returnRate, yearlyData };
  }, [principal, rate, years, compound]);

  const maxAmount = result?.yearlyData[result.yearlyData.length - 1]?.amount ?? 1;

  return (
    <div className="space-y-6">
      <NumberInput label="원금" value={principal} onChange={setPrincipal} suffix="원" placeholder="10000000" />

      <div className="grid grid-cols-2 gap-4">
        <NumberInput label="연이율" value={rate} onChange={setRate} suffix="%" placeholder="5" />
        <NumberInput label="기간" value={years} onChange={setYears} suffix="년" placeholder="10" />
      </div>

      <div className="flex gap-2">
        {[
          { label: "월복리", value: 12 },
          { label: "분기", value: 4 },
          { label: "반기", value: 2 },
          { label: "연복리", value: 1 },
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() => setCompound(opt.value)}
            className={`rounded-md border px-3 py-1.5 text-[13px] transition-colors ${
              compound === opt.value
                ? "border-foreground bg-foreground text-background"
                : "border-input text-muted-foreground hover:border-foreground/30"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {result && (
        <>
          {/* 판정 먼저 */}
          <div className="border-t pt-6">
            <p className="text-lg font-semibold">
              {toNumber(years)}년간 이자로 {formatWon(result.interest)}을 벌게 됩니다.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              최종 금액 {formatWon(result.amount)} · 수익률 {formatNumber(result.returnRate, 1)}%
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <ResultCard label="총 이자" value={formatWon(result.interest)} />
            <ResultCard label="원금" value={formatWon(toNumber(principal))} />
          </div>

          {/* 성장 그래프 */}
          <div className="space-y-1">
            <p className="text-[13px] text-muted-foreground mb-2">연도별 자산</p>
            {result.yearlyData.map((d) => (
              <div key={d.year} className="flex items-center gap-2 text-[12px]">
                <span className="w-6 text-right text-muted-foreground num">{d.year}</span>
                <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-foreground transition-all duration-300"
                    style={{ width: `${(d.amount / maxAmount) * 100}%` }}
                  />
                </div>
                <span className="w-20 text-right text-muted-foreground num">
                  {formatNumber(Math.round(d.amount / 10000))}만
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
