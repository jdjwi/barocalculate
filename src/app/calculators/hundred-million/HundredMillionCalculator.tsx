"use client";
import { useState, useMemo } from "react";
import { formatWon, formatNumber, toNumber } from "@/lib/format";
import { NumberInput } from "@/components/NumberInput";
import { ShareButton } from "@/components/ShareButton";

const TARGET = 100_000_000;

export function HundredMillionCalculator() {
  const [current, setCurrent] = useState("5000000");
  const [monthly, setMonthly] = useState("1000000");
  const [rate, setRate] = useState("3");

  const result = useMemo(() => {
    const c = toNumber(current);
    const m = toNumber(monthly);
    const r = toNumber(rate) / 100 / 12;
    if (m <= 0) return null;

    let balance = c;
    let months = 0;
    const maxMonths = 12 * 100;

    while (balance < TARGET && months < maxMonths) {
      balance = balance * (1 + r) + m;
      months++;
    }

    if (months >= maxMonths) return null;

    const years = Math.floor(months / 12);
    const remainMonths = months % 12;
    const totalSaved = c + m * months;
    const interestEarned = balance - totalSaved;

    return { months, years, remainMonths, totalSaved, interestEarned, finalBalance: balance };
  }, [current, monthly, rate]);

  return (
    <div className="space-y-6">
      <NumberInput label="현재 저축액" value={current} onChange={setCurrent} suffix="원" placeholder="5000000" />
      <NumberInput label="월 저축 금액" value={monthly} onChange={setMonthly} suffix="원" placeholder="1000000" />
      <NumberInput label="예상 연이율" value={rate} onChange={setRate} suffix="%" placeholder="3" />

      {result && (
        <div className="border-t pt-6 space-y-4">
          <div>
            <p className="text-2xl font-bold num">
              {result.years > 0 && `${result.years}년 `}{result.remainMonths > 0 && `${result.remainMonths}개월`}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              1억까지 남은 시간
            </p>
          </div>

          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-foreground transition-all duration-700"
              style={{ width: `${Math.min(100, (toNumber(current) / TARGET) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[12px] text-muted-foreground">
            <span>현재 {formatWon(toNumber(current))}</span>
            <span>목표 1억</span>
          </div>

          <div className="space-y-2">
            {[
              { label: "총 저축할 금액", value: formatWon(Math.round(result.totalSaved)) },
              { label: "이자 수익", value: formatWon(Math.round(result.interestEarned)) },
            ].map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="num font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          <ShareButton text={`1억 모으기까지 ${result.years > 0 ? `${result.years}년 ` : ""}${result.remainMonths > 0 ? `${result.remainMonths}개월` : ""} 남았습니다.`} />
        </div>
      )}
    </div>
  );
}
