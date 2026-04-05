"use client";
import { Suspense, useState, useMemo } from "react";
import { formatNumber } from "@/lib/format";
import { ShareButton } from "@/components/ShareButton";

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];
const IDEAL = 8;

function Calculator() {
  const [hours, setHours] = useState(["6", "6", "6.5", "6", "5.5", "9", "9"]);

  function updateDay(index: number, value: string) {
    const next = [...hours];
    next[index] = value;
    setHours(next);
  }

  const result = useMemo(() => {
    const actual = hours.map((h) => parseFloat(h) || 0);
    const totalActual = actual.reduce((a, b) => a + b, 0);
    const debt = IDEAL * 7 - totalActual;
    const avgSleep = totalActual / 7;
    const weekendExtra = (actual[5] + actual[6]) - (IDEAL * 2);
    return { debt, avgSleep, weekendExtra };
  }, [hours]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-[13px] text-muted-foreground">이번 주 수면 시간</label>
        <div className="grid grid-cols-7 gap-1.5">
          {DAYS.map((day, i) => (
            <div key={day} className="text-center">
              <span className="block text-[11px] text-muted-foreground mb-1">{day}</span>
              <input type="text" inputMode="decimal" value={hours[i]} onChange={(e) => updateDay(i, e.target.value)}
                className="w-full rounded-md border border-input bg-background px-1 py-2 text-center text-sm font-medium num focus:outline-none focus:ring-2 focus:ring-ring/20" />
            </div>
          ))}
        </div>
      </div>
      <div className="border-t pt-6 space-y-4">
        {result.debt > 0 ? (
          <p className="text-lg font-semibold">이번 주 수면 빚: {formatNumber(result.debt, 1)}시간</p>
        ) : (
          <p className="text-lg font-semibold">이번 주 충분히 잤습니다!</p>
        )}
        <p className="text-sm text-muted-foreground">
          평균 {formatNumber(result.avgSleep, 1)}시간/일 · 권장 {IDEAL}시간 기준
        </p>
        {result.debt > 0 && result.weekendExtra > 0 && (
          <p className="text-sm text-muted-foreground">
            주말에 {formatNumber(result.weekendExtra, 1)}시간 더 잤지만, 수면 빚은 주말 몰아자기로 갚을 수 없습니다.
          </p>
        )}
        <ShareButton
          text={result.debt > 0 ? `이번 주 수면 빚 ${formatNumber(result.debt, 1)}시간이래... 평균 ${formatNumber(result.avgSleep, 1)}시간밖에 못 잤다 😴` : `이번 주 충분히 잤다! 평균 ${formatNumber(result.avgSleep, 1)}시간 😎`}
          cta="친구한테 보내기"
        />
      </div>
    </div>
  );
}

export function SleepDebtCalculator() {
  return <Suspense><Calculator /></Suspense>;
}
