"use client";
import { useState, useMemo } from "react";
import { formatWon, formatNumber, toNumber } from "@/lib/format";
import { NumberInput } from "@/components/NumberInput";
import { ShareButton } from "@/components/ShareButton";

const THINGS_TO_BUY = [
  { name: "제주도 왕복 항공권", price: 150000 },
  { name: "에어팟 프로", price: 359000 },
  { name: "아이패드", price: 599000 },
  { name: "맥북 에어", price: 1590000 },
  { name: "유럽 여행", price: 3000000 },
  { name: "중고차", price: 15000000 },
];

export function DeliverySavingsCalculator() {
  const [timesPerWeek, setTimesPerWeek] = useState("3");
  const [deliveryFee, setDeliveryFee] = useState("4000");

  const result = useMemo(() => {
    const times = toNumber(timesPerWeek);
    const fee = toNumber(deliveryFee);
    if (times <= 0 || fee <= 0) return null;

    const weekly = times * fee;
    const monthly = weekly * 4.35;
    const yearly = weekly * 52;
    const fiveYear = yearly * 5;
    const canBuy = THINGS_TO_BUY.filter((t) => t.price <= yearly)
      .sort((a, b) => b.price - a.price);

    return { weekly, monthly, yearly, fiveYear, canBuy };
  }, [timesPerWeek, deliveryFee]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <NumberInput label="주에 몇 번 시켜먹나요" value={timesPerWeek} onChange={setTimesPerWeek} suffix="번" placeholder="3" />
        <NumberInput label="평균 배달비" value={deliveryFee} onChange={setDeliveryFee} suffix="원" placeholder="4000" />
      </div>
      {result && (
        <div className="border-t pt-6 space-y-4">
          <div>
            <p className="text-lg font-semibold">
              1년 배달비로 {formatWon(Math.round(result.yearly))} 쓰고 있습니다.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              5년이면 {formatWon(Math.round(result.fiveYear))}
            </p>
          </div>
          {result.canBuy.length > 0 && (
            <div className="space-y-2">
              <p className="text-[13px] text-muted-foreground">1년 배달비로 살 수 있는 것들</p>
              {result.canBuy.map((item) => (
                <div key={item.name} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="num font-medium">{formatNumber(Math.floor(result.yearly / item.price))}개</span>
                </div>
              ))}
            </div>
          )}
          <ShareButton text={`1년 배달비 ${formatWon(Math.round(result.yearly))}. 5년이면 ${formatWon(Math.round(result.fiveYear))}.`} />
        </div>
      )}
    </div>
  );
}
