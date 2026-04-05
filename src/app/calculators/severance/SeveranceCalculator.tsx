"use client";

import { useState, useMemo } from "react";
import { NumberInput } from "@/components/NumberInput";
import { ResultCard } from "@/components/ResultCard";
import { formatWon, toNumber } from "@/lib/format";

export function SeveranceCalculator() {
  const [startDate, setStartDate] = useState("2022-01-01");
  const [endDate, setEndDate] = useState("2026-04-05");
  const [monthlySalary, setMonthlySalary] = useState("3000000");

  const result = useMemo(() => {
    const salary = toNumber(monthlySalary);
    if (!startDate || !endDate || salary <= 0) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (totalDays < 365) return { eligible: false as const, totalDays };

    const years = totalDays / 365;
    const dailyWage = (salary * 3) / 90;
    const severance = dailyWage * 30 * years;

    return {
      eligible: true as const,
      totalDays,
      years,
      dailyWage,
      severance,
    };
  }, [startDate, endDate, monthlySalary]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] text-muted-foreground mb-1.5">입사일</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
          />
        </div>
        <div>
          <label className="block text-[13px] text-muted-foreground mb-1.5">퇴사일</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
          />
        </div>
      </div>

      <NumberInput
        label="최근 3개월 월평균 급여 (세전)"
        value={monthlySalary}
        onChange={setMonthlySalary}
        suffix="원"
        placeholder="3000000"
      />

      {result && (
        result.eligible ? (
          <>
            <div className="border-t pt-6">
              <p className="text-lg font-semibold">
                퇴직금은 약 {formatWon(Math.round(result.severance))}입니다.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                재직기간 {Math.floor(result.years)}년 {Math.round((result.years % 1) * 12)}개월 · 세전 기준
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <ResultCard label="1일 평균임금" value={formatWon(Math.round(result.dailyWage))} />
              <ResultCard label="총 재직일수" value={`${result.totalDays}일`} />
            </div>
          </>
        ) : (
          <div className="border-t pt-6">
            <p className="text-lg font-semibold text-destructive">
              재직기간이 1년 미만({result.totalDays}일)이라 퇴직금 대상이 아닙니다.
            </p>
          </div>
        )
      )}
    </div>
  );
}
