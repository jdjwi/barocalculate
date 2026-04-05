"use client";
import { useState, useMemo } from "react";
import { formatNumber, toNumber } from "@/lib/format";
import { NumberInput } from "@/components/NumberInput";
import { ShareButton } from "@/components/ShareButton";

const KIMBAP_PRICE = 1500;

const PRESETS = [
  { label: "아이폰 16", price: 1550000 },
  { label: "치킨 1마리", price: 22000 },
  { label: "서울 전세 평균", price: 400000000 },
  { label: "테슬라 모델3", price: 55000000 },
  { label: "내 월급", price: 0 },
];

export function KimbapConverterCalculator() {
  const [amount, setAmount] = useState("1550000");

  const result = useMemo(() => {
    const a = toNumber(amount);
    if (a <= 0) return null;
    const count = a / KIMBAP_PRICE;
    const stacked = count * 0.07; // 삼각김밥 높이 약 7cm
    const weight = count * 0.1; // 약 100g
    return { count, stackedMeters: stacked, weightKg: weight };
  }, [amount]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => p.price > 0 && setAmount(String(p.price))}
            className={`rounded-md border px-3 py-1.5 text-[13px] transition-colors ${
              toNumber(amount) === p.price
                ? "border-foreground bg-foreground text-background"
                : "border-input text-muted-foreground hover:border-foreground/30"
            } ${p.price === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <NumberInput label="금액" value={amount} onChange={setAmount} suffix="원" placeholder="1550000" />

      {result && (
        <div className="border-t pt-6 space-y-4">
          <div>
            <p className="text-2xl font-bold num">삼각김밥 {formatNumber(Math.floor(result.count))}개</p>
            <p className="mt-1 text-sm text-muted-foreground">
              개당 {formatNumber(KIMBAP_PRICE)}원 기준
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-[13px] text-muted-foreground">쌓으면</p>
            {[
              { label: "높이", value: `${formatNumber(result.stackedMeters, 1)}m` },
              { label: "무게", value: `${formatNumber(result.weightKg, 1)}kg` },
            ].map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="num font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          <ShareButton text={`삼각김밥 ${formatNumber(Math.floor(result.count))}개. 쌓으면 ${formatNumber(result.stackedMeters, 1)}m.`} />
        </div>
      )}
    </div>
  );
}
