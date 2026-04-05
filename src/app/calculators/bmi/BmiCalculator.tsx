"use client";

import { useState, useMemo } from "react";
import { NumberInput } from "@/components/NumberInput";
import { ResultCard } from "@/components/ResultCard";
import { formatNumber, toNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

const BMI_RANGES = [
  { label: "저체중", max: 18.5, color: "bg-sky-500", message: "저체중입니다. 균형 잡힌 식사가 필요합니다." },
  { label: "정상", max: 23, color: "bg-emerald-500", message: "정상 범위입니다. 현재 체중을 유지하세요." },
  { label: "과체중", max: 25, color: "bg-amber-500", message: "과체중입니다. 식단 조절을 권장합니다." },
  { label: "비만", max: 50, color: "bg-red-500", message: "비만입니다. 전문가 상담을 권장합니다." },
];

function getCategory(bmi: number) {
  for (const r of BMI_RANGES) {
    if (bmi < r.max) return r;
  }
  return BMI_RANGES[BMI_RANGES.length - 1];
}

export function BmiCalculator() {
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("65");

  const result = useMemo(() => {
    const h = toNumber(height);
    const w = toNumber(weight);
    if (h <= 0 || w <= 0) return null;

    const hm = h / 100;
    const bmi = w / (hm * hm);
    const category = getCategory(bmi);
    const normalMin = 18.5 * hm * hm;
    const normalMax = 23 * hm * hm;

    return { bmi, category, normalMin, normalMax };
  }, [height, weight]);

  const gaugePercent = result
    ? Math.min(100, Math.max(0, ((result.bmi - 14) / (36 - 14)) * 100))
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <NumberInput label="키" value={height} onChange={setHeight} suffix="cm" placeholder="170" max={250} />
        <NumberInput label="몸무게" value={weight} onChange={setWeight} suffix="kg" placeholder="65" max={300} />
      </div>

      {result && (
        <>
          {/* 판정 먼저 */}
          <div className="border-t pt-6">
            <p className="text-lg font-semibold">{result.category.message}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              BMI {formatNumber(result.bmi, 1)} · {result.category.label} · 대한비만학회 기준
            </p>
          </div>

          {/* 게이지 */}
          <div className="space-y-2">
            <div className="flex h-1.5 rounded-full overflow-hidden bg-secondary">
              {BMI_RANGES.map((r) => (
                <div key={r.label} className={cn("flex-1", r.color)} />
              ))}
            </div>
            <div className="relative h-3">
              <div
                className="absolute -translate-x-1/2 text-[10px] font-medium"
                style={{ left: `${gaugePercent}%` }}
              >
                ●
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <ResultCard
              label="정상 체중 범위"
              value={`${formatNumber(result.normalMin, 1)}–${formatNumber(result.normalMax, 1)}kg`}
            />
            <ResultCard
              label="정상 범위 중앙과의 차이"
              value={`${toNumber(weight) - (result.normalMin + result.normalMax) / 2 > 0 ? "+" : ""}${formatNumber(toNumber(weight) - (result.normalMin + result.normalMax) / 2, 1)}kg`}
            />
          </div>
        </>
      )}
    </div>
  );
}
