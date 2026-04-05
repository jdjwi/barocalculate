"use client";
import { useState, useMemo } from "react";
import { formatNumber } from "@/lib/format";
import { NumberInput } from "@/components/NumberInput";
import { ShareButton } from "@/components/ShareButton";

export function SleepTimeCalculator() {
  const [age, setAge] = useState("30");
  const [sleepHours, setSleepHours] = useState("7");

  const result = useMemo(() => {
    const a = parseInt(age);
    const h = parseFloat(sleepHours);
    if (!a || !h || a <= 0 || h <= 0) return null;
    const totalSleepHours = a * 365.25 * h;
    const totalSleepDays = totalSleepHours / 24;
    const totalSleepYears = totalSleepDays / 365.25;
    const percentOfLife = (h / 24) * 100;
    const booksCouldRead = Math.floor(totalSleepHours / 5);
    const moviesCouldWatch = Math.floor(totalSleepHours / 2);
    return { totalSleepYears, totalSleepDays: Math.round(totalSleepDays), percentOfLife, booksCouldRead, moviesCouldWatch };
  }, [age, sleepHours]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <NumberInput label="현재 나이" value={age} onChange={setAge} suffix="세" placeholder="30" />
        <NumberInput label="하루 평균 수면" value={sleepHours} onChange={setSleepHours} suffix="시간" placeholder="7" />
      </div>
      {result && (
        <div className="border-t pt-6 space-y-4">
          <div>
            <p className="text-lg font-semibold">
              지금까지 인생의 {formatNumber(result.percentOfLife, 0)}%를 자면서 보냈습니다.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              약 {formatNumber(result.totalSleepYears, 1)}년 · {formatNumber(result.totalSleepDays)}일
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-[13px] text-muted-foreground">그 시간에 할 수 있었던 것들</p>
            {[
              { label: "책 읽기 (권당 5시간)", value: `${formatNumber(result.booksCouldRead)}권` },
              { label: "영화 보기 (편당 2시간)", value: `${formatNumber(result.moviesCouldWatch)}편` },
            ].map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="num font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          <ShareButton text={`인생의 ${formatNumber(result.percentOfLife, 0)}%를 자면서 보냈습니다. 약 ${formatNumber(result.totalSleepYears, 1)}년.`} />
        </div>
      )}
    </div>
  );
}
