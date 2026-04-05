"use client";

import { useState, useMemo } from "react";
import { NumberInput } from "@/components/NumberInput";
import { formatNumber, toNumber } from "@/lib/format";

const ACTIVITY_LEVELS = [
  { label: "거의 안 움직임", factor: 1.2 },
  { label: "주 1–3회 운동", factor: 1.375 },
  { label: "주 3–5회 운동", factor: 1.55 },
  { label: "주 6–7회 운동", factor: 1.725 },
];

export function BmrCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("65");
  const [activity, setActivity] = useState(0);

  const result = useMemo(() => {
    const a = toNumber(age);
    const h = toNumber(height);
    const w = toNumber(weight);
    if (a <= 0 || h <= 0 || w <= 0) return null;

    const bmr =
      gender === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = bmr * ACTIVITY_LEVELS[activity].factor;
    const bowls = Math.round(tdee / 300);

    return { bmr, tdee, diet: tdee - 500, bulk: tdee + 300, bowls };
  }, [gender, age, height, weight, activity]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(["male", "female"] as const).map((g) => (
          <button
            key={g}
            onClick={() => setGender(g)}
            className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors ${
              gender === g
                ? "border-foreground bg-foreground text-background"
                : "border-input text-muted-foreground hover:border-foreground/30"
            }`}
          >
            {g === "male" ? "남성" : "여성"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <NumberInput label="나이" value={age} onChange={setAge} suffix="세" placeholder="30" />
        <NumberInput label="키" value={height} onChange={setHeight} suffix="cm" placeholder="170" />
        <NumberInput label="몸무게" value={weight} onChange={setWeight} suffix="kg" placeholder="65" />
      </div>

      <div>
        <label className="block text-[13px] text-muted-foreground mb-1.5">활동량</label>
        <div className="space-y-px rounded-lg border overflow-hidden">
          {ACTIVITY_LEVELS.map((level, i) => (
            <button
              key={i}
              onClick={() => setActivity(i)}
              className={`w-full px-3 py-2.5 text-left text-sm transition-colors ${
                activity === i
                  ? "bg-foreground text-background font-medium"
                  : "bg-card text-muted-foreground hover:bg-secondary/50"
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <>
          {/* 판정 먼저 */}
          <div className="border-t pt-6">
            <p className="text-lg font-semibold">
              하루에 {formatNumber(result.tdee, 0)}kcal를 드세요.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              밥 약 {result.bowls}공기 분량 · 기초대사량 {formatNumber(result.bmr, 0)}kcal
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[13px] text-muted-foreground">목적별 권장 섭취량</p>
            {[
              { label: "감량하려면", value: result.diet },
              { label: "유지하려면", value: result.tdee },
              { label: "증량하려면", value: result.bulk },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="num font-medium">{formatNumber(item.value, 0)} kcal</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
