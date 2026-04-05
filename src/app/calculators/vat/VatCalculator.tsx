"use client";

import { useState, useMemo } from "react";
import { NumberInput } from "@/components/NumberInput";
import { ResultCard } from "@/components/ResultCard";
import { formatWon, toNumber } from "@/lib/format";

export function VatCalculator() {
  const [mode, setMode] = useState<"forward" | "reverse">("forward");
  const [amount, setAmount] = useState("1000000");

  const result = useMemo(() => {
    const a = toNumber(amount);
    if (a <= 0) return null;

    if (mode === "forward") {
      const vat = Math.round(a * 0.1);
      return { supply: a, vat, total: a + vat };
    } else {
      const supply = Math.round(a / 1.1);
      const vat = a - supply;
      return { supply, vat, total: a };
    }
  }, [amount, mode]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {([
          { key: "forward", label: "공급가액 → 합계" },
          { key: "reverse", label: "합계 → 공급가액" },
        ] as const).map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors ${
              mode === m.key
                ? "border-foreground bg-foreground text-background"
                : "border-input text-muted-foreground hover:border-foreground/30"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <NumberInput
        label={mode === "forward" ? "공급가액" : "합계금액 (VAT 포함)"}
        value={amount}
        onChange={setAmount}
        suffix="원"
        placeholder="1000000"
      />

      {result && (
        <>
          <div className="border-t pt-6">
            <p className="text-lg font-semibold">
              부가세는 {formatWon(result.vat)}입니다.
            </p>
          </div>

          <div className="space-y-2">
            {[
              { label: "공급가액", value: result.supply },
              { label: "부가가치세 (10%)", value: result.vat },
              { label: "합계금액", value: result.total },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="num font-medium">{formatWon(item.value)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
