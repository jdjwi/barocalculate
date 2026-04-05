"use client";
import { Suspense, useState, useMemo } from "react";
import { formatNumber } from "@/lib/format";
import { ShareButton } from "@/components/ShareButton";

const FOODS = [
  { name: "치킨 1마리", cal: 1900 },
  { name: "짜장면", cal: 660 },
  { name: "삼겹살 1인분", cal: 580 },
  { name: "떡볶이", cal: 480 },
  { name: "카페라떼", cal: 220 },
  { name: "소주 1병", cal: 540 },
  { name: "컵라면", cal: 500 },
  { name: "편의점 도시락", cal: 700 },
];

const EXERCISES = [
  { name: "달리기", calPerMin: 12 },
  { name: "걷기", calPerMin: 4.5 },
  { name: "자전거", calPerMin: 8 },
  { name: "수영", calPerMin: 10 },
  { name: "계단 오르기", calPerMin: 9 },
];

function Calculator() {
  const [selected, setSelected] = useState(0);
  const food = FOODS[selected];

  const result = useMemo(() => {
    return EXERCISES.map((ex) => ({ ...ex, minutes: Math.round(food.cal / ex.calPerMin) }));
  }, [food]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-[13px] text-muted-foreground mb-1.5">뭘 먹었나요?</label>
        <div className="space-y-px rounded-lg border overflow-hidden">
          {FOODS.map((f, i) => (
            <button key={f.name} onClick={() => setSelected(i)}
              className={`w-full flex justify-between px-3 py-2.5 text-sm transition-colors ${selected === i ? "bg-foreground text-background font-medium" : "bg-card text-muted-foreground hover:bg-secondary/50"}`}>
              <span>{f.name}</span>
              <span className="num">{formatNumber(f.cal)}kcal</span>
            </button>
          ))}
        </div>
      </div>
      <div className="border-t pt-6 space-y-4">
        <p className="text-lg font-semibold">{food.name} ({formatNumber(food.cal)}kcal)을 태우려면</p>
        <div className="space-y-2">
          {result.map((r) => (
            <div key={r.name} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{r.name}</span>
              <span className="num font-medium">{r.minutes}분</span>
            </div>
          ))}
        </div>
        <ShareButton text={`${food.name} 먹으면 달리기 ${result[0].minutes}분 뛰어야 된대... 먹을까 말까 😭`} cta="친구한테 보내기" />
      </div>
    </div>
  );
}

export function BurnCaloriesCalculator() {
  return <Suspense><Calculator /></Suspense>;
}
