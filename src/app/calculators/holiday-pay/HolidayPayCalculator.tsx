"use client";

import { useState, useMemo } from "react";
import { NumberInput } from "@/components/NumberInput";
import { ResultCard } from "@/components/ResultCard";
import { formatWon, toNumber } from "@/lib/format";
import { MIN_WAGE_2026 } from "@/data/rates";

export function HolidayPayCalculator() {
  const [wage, setWage] = useState(String(MIN_WAGE_2026));
  const [hours, setHours] = useState("40");

  const result = useMemo(() => {
    const w = toNumber(wage);
    const h = toNumber(hours);
    if (w <= 0 || h <= 0) return null;

    const eligible = h >= 15;
    if (!eligible) return { eligible: false as const };

    const holidayHours = h >= 40 ? 8 : (h / 40) * 8;
    const holidayPay = w * holidayHours;
    const effectiveWage = w + holidayPay / h;
    const weeklyPay = w * h + holidayPay;
    const monthlyEstimate = weeklyPay * (365 / 7 / 12);

    return {
      eligible: true as const,
      holidayHours,
      holidayPay,
      effectiveWage,
      weeklyPay,
      monthlyEstimate,
    };
  }, [wage, hours]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <NumberInput label="시급" value={wage} onChange={setWage} suffix="원" placeholder={String(MIN_WAGE_2026)} />
        <NumberInput label="주 근무시간" value={hours} onChange={setHours} suffix="시간" placeholder="40" />
      </div>

      {result && (
        result.eligible ? (
          <>
            <div className="border-t pt-6">
              <p className="text-lg font-semibold">
                주휴수당은 주 {formatWon(result.holidayPay)}입니다.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                실질 시급 {formatWon(Math.round(result.effectiveWage))} · 주휴시간 {result.holidayHours}시간
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <ResultCard label="주급 (주휴 포함)" value={formatWon(result.weeklyPay)} />
              <ResultCard label="월급 추정" value={formatWon(Math.round(result.monthlyEstimate))} sub="4.35주 기준" />
            </div>
          </>
        ) : (
          <div className="border-t pt-6">
            <p className="text-lg font-semibold text-destructive">
              주 15시간 미만이라 주휴수당 대상이 아닙니다.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              주 15시간 이상 근무해야 주휴수당이 발생합니다.
            </p>
          </div>
        )
      )}
    </div>
  );
}
