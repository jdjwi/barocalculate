"use client";
import { useState, useMemo } from "react";
import { formatWon, toNumber } from "@/lib/format";
import { NumberInput } from "@/components/NumberInput";
import { ShareButton } from "@/components/ShareButton";

export function MeetingCostCalculator() {
  const [people, setPeople] = useState("6");
  const [minutes, setMinutes] = useState("60");
  const [avgSalary, setAvgSalary] = useState("4000");

  const result = useMemo(() => {
    const p = toNumber(people);
    const m = toNumber(minutes);
    const s = toNumber(avgSalary) * 10000;
    if (p <= 0 || m <= 0 || s <= 0) return null;
    const hourlyRate = s / 12 / 160;
    const totalCost = hourlyRate * (m / 60) * p;
    const perMinute = totalCost / m;
    return { totalCost, perMinute, hourlyRate };
  }, [people, minutes, avgSalary]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <NumberInput label="참석자 수" value={people} onChange={setPeople} suffix="명" placeholder="6" />
        <NumberInput label="회의 시간" value={minutes} onChange={setMinutes} suffix="분" placeholder="60" />
        <NumberInput label="평균 연봉" value={avgSalary} onChange={setAvgSalary} suffix="만원" placeholder="4000" />
      </div>
      {result && (
        <div className="border-t pt-6 space-y-4">
          <div>
            <p className="text-2xl font-bold num">{formatWon(Math.round(result.totalCost))}</p>
            <p className="mt-1 text-sm text-muted-foreground">이 회의의 비용입니다</p>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">1분당</span>
            <span className="num font-medium">{formatWon(Math.round(result.perMinute))}</span>
          </div>
          <ShareButton text={`이 회의 ${formatWon(Math.round(result.totalCost))}짜리. 1분당 ${formatWon(Math.round(result.perMinute))}.`} />
        </div>
      )}
    </div>
  );
}
