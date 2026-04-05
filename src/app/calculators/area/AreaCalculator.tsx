"use client";

import { useState, useMemo } from "react";
import { NumberInput } from "@/components/NumberInput";
import { formatNumber, toNumber } from "@/lib/format";

const PYEONG_TO_SQM = 3.3058;

const SIZE_CONTEXT = [
  { max: 10, label: "원룸 크기" },
  { max: 18, label: "투룸 또는 소형 아파트" },
  { max: 26, label: "3인 가족에 적합한 크기" },
  { max: 35, label: "4인 가족에 적합한 중대형" },
  { max: 50, label: "대형 아파트" },
  { max: Infinity, label: "초대형 주거 공간" },
];

function getSizeContext(pyeong: number) {
  return SIZE_CONTEXT.find((s) => pyeong <= s.max)?.label ?? "";
}

const PRESETS = [
  { label: "원룸", pyeong: 7 },
  { label: "투룸", pyeong: 15 },
  { label: "25평", pyeong: 25 },
  { label: "34평", pyeong: 34 },
];

export function AreaCalculator() {
  const [pyeong, setPyeong] = useState("25");
  const [sqm, setSqm] = useState(formatNumber(25 * PYEONG_TO_SQM, 2));
  const [lastEdited, setLastEdited] = useState<"pyeong" | "sqm">("pyeong");

  function handlePyeong(v: string) {
    setPyeong(v);
    setLastEdited("pyeong");
    const n = toNumber(v);
    setSqm(n > 0 ? formatNumber(n * PYEONG_TO_SQM, 2) : "");
  }

  function handleSqm(v: string) {
    setSqm(v);
    setLastEdited("sqm");
    const n = toNumber(v);
    setPyeong(n > 0 ? formatNumber(n / PYEONG_TO_SQM, 2) : "");
  }

  function handlePreset(value: number) {
    setPyeong(String(value));
    setSqm(formatNumber(value * PYEONG_TO_SQM, 2));
    setLastEdited("pyeong");
  }

  const currentPyeong = toNumber(pyeong);
  const context = currentPyeong > 0 ? getSizeContext(currentPyeong) : "";

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.pyeong}
            onClick={() => handlePreset(p.pyeong)}
            className={`rounded-md border px-3 py-1.5 text-[13px] transition-colors ${
              toNumber(pyeong) === p.pyeong && lastEdited === "pyeong"
                ? "border-foreground bg-foreground text-background"
                : "border-input text-muted-foreground hover:border-foreground/30"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <NumberInput label="평" value={pyeong} onChange={handlePyeong} suffix="평" placeholder="25" />
        <NumberInput label="제곱미터" value={sqm} onChange={handleSqm} suffix="㎡" placeholder="82.6" />
      </div>

      {context && (
        <div className="border-t pt-6">
          <p className="text-lg font-semibold">
            {formatNumber(currentPyeong, currentPyeong % 1 === 0 ? 0 : 2)}평은 {context}입니다.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatNumber(toNumber(sqm), 2)}㎡ · 1평 = 3.3058㎡
          </p>
        </div>
      )}
    </div>
  );
}
