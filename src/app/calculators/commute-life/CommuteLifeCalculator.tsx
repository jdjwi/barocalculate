"use client";
import { useState, useMemo } from "react";
import { formatNumber } from "@/lib/format";
import { NumberInput } from "@/components/NumberInput";
import { ShareButton } from "@/components/ShareButton";

export function CommuteLifeCalculator() {
  const [oneWay, setOneWay] = useState("40");
  const [yearsWorked, setYearsWorked] = useState("5");
  const [yearsLeft, setYearsLeft] = useState("30");

  const result = useMemo(() => {
    const ow = parseInt(oneWay);
    const yw = parseInt(yearsWorked);
    const yl = parseInt(yearsLeft);
    if (!ow || !yw || !yl) return null;
    const dailyMin = ow * 2;
    const yearlyHours = (dailyMin * 250) / 60;
    const pastHours = yearlyHours * yw;
    const futureHours = yearlyHours * yl;
    const totalHours = pastHours + futureHours;
    const totalDays = totalHours / 24;
    const totalMonths = totalDays / 30;
    const dramas = Math.floor(totalHours / 16);
    return { dailyMin, yearlyHours, pastHours, futureHours, totalHours, totalDays: Math.round(totalDays), totalMonths, dramas };
  }, [oneWay, yearsWorked, yearsLeft]);

  return (
    <div className="space-y-6">
      <NumberInput label="편도 출퇴근 시간" value={oneWay} onChange={setOneWay} suffix="분" placeholder="40" />
      <div className="grid grid-cols-2 gap-4">
        <NumberInput label="지금까지 직장생활" value={yearsWorked} onChange={setYearsWorked} suffix="년" placeholder="5" />
        <NumberInput label="앞으로 남은 직장생활" value={yearsLeft} onChange={setYearsLeft} suffix="년" placeholder="30" />
      </div>
      {result && (
        <div className="border-t pt-6 space-y-4">
          <div>
            <p className="text-lg font-semibold">
              직장생활 동안 출퇴근에 약 {formatNumber(result.totalDays)}일을 쓰게 됩니다.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              총 {formatNumber(Math.round(result.totalHours))}시간 · 16부작 드라마 {formatNumber(result.dramas)}편 분량
            </p>
          </div>
          <div className="space-y-2">
            {[
              { label: "하루 출퇴근", value: `${result.dailyMin}분` },
              { label: "연간 출퇴근", value: `${formatNumber(Math.round(result.yearlyHours))}시간` },
              { label: "지금까지 쓴 시간", value: `${formatNumber(Math.round(result.pastHours))}시간` },
              { label: "앞으로 쓸 시간", value: `${formatNumber(Math.round(result.futureHours))}시간` },
            ].map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="num font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          <ShareButton text={`출퇴근에 인생 ${formatNumber(result.totalDays)}일을 씁니다. 드라마 ${formatNumber(result.dramas)}편 분량.`} />
        </div>
      )}
    </div>
  );
}
