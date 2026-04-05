"use client";
import { useState, useMemo } from "react";
import { formatWon, formatNumber, toNumber } from "@/lib/format";
import { NumberInput } from "@/components/NumberInput";
import { ShareButton } from "@/components/ShareButton";

const ACTIVITIES = [
  { name: "넷플릭스 1시간", minutes: 60 },
  { name: "유튜브 30분", minutes: 30 },
  { name: "점심시간 1시간", minutes: 60 },
  { name: "출근길 30분", minutes: 30 },
  { name: "회의 1시간", minutes: 60 },
  { name: "SNS 스크롤 15분", minutes: 15 },
  { name: "낮잠 20분", minutes: 20 },
];

export function TimeValueCalculator() {
  const [salary, setSalary] = useState("3500");

  const result = useMemo(() => {
    const s = toNumber(salary) * 10000;
    if (s <= 0) return null;
    const hourly = s / 12 / 160;
    const perMinute = hourly / 60;
    const activities = ACTIVITIES.map((a) => ({
      ...a,
      cost: Math.round(perMinute * a.minutes),
    }));
    return { hourly, perMinute, activities };
  }, [salary]);

  return (
    <div className="space-y-6">
      <NumberInput label="월급 (세전)" value={salary} onChange={setSalary} suffix="만원" placeholder="3500" />
      {result && (
        <div className="border-t pt-6 space-y-4">
          <div>
            <p className="text-lg font-semibold">
              당신의 1시간은 {formatWon(Math.round(result.hourly))}입니다.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              1분 = {formatWon(Math.round(result.perMinute))}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-[13px] text-muted-foreground">활동별 내 노동 가치</p>
            {result.activities.map((a) => (
              <div key={a.name} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{a.name}</span>
                <span className="num font-medium">내 노동 {formatWon(a.cost)}어치</span>
              </div>
            ))}
          </div>
          <ShareButton text={`내 1시간은 ${formatWon(Math.round(result.hourly))}어치.`} />
        </div>
      )}
    </div>
  );
}
