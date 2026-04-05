"use client";
import { Suspense, useMemo, useCallback } from "react";
import { formatNumber } from "@/lib/format";
import { NumberInput } from "@/components/NumberInput";
import { ShareButton } from "@/components/ShareButton";
import { SharedResultBanner } from "@/components/SharedResultBanner";
import { useShareableState } from "@/hooks/useShareableState";
import { useRouter, usePathname } from "next/navigation";

function Calculator() {
  const [age, setAge] = useShareableState("age", "30");
  const [sleepHours, setSleepHours] = useShareableState("sleep", "7");
  const router = useRouter();
  const pathname = usePathname();
  const handleTryOwn = useCallback(() => { router.replace(pathname, { scroll: false }); setAge("30"); setSleepHours("7"); }, [router, pathname, setAge, setSleepHours]);

  const result = useMemo(() => {
    const a = parseInt(age); const h = parseFloat(sleepHours);
    if (!a || !h || a <= 0 || h <= 0) return null;
    const totalSleepHours = a * 365.25 * h;
    const totalSleepYears = totalSleepHours / (365.25 * 24);
    const percentOfLife = (h / 24) * 100;
    return { totalSleepYears, percentOfLife };
  }, [age, sleepHours]);

  return (
    <div className="space-y-6">
      <SharedResultBanner onTryOwn={handleTryOwn} />
      <div className="grid grid-cols-2 gap-4">
        <NumberInput label="현재 나이" value={age} onChange={setAge} suffix="세" placeholder="30" />
        <NumberInput label="하루 평균 수면" value={sleepHours} onChange={setSleepHours} suffix="시간" placeholder="7" />
      </div>
      {result && (
        <div className="border-t pt-6 space-y-4">
          <div>
            <p className="text-lg font-semibold">인생의 {formatNumber(result.percentOfLife, 0)}%를 자면서 보냈습니다.</p>
            <p className="mt-1 text-sm text-muted-foreground">약 {formatNumber(result.totalSleepYears, 1)}년</p>
          </div>
          <ShareButton text={`나 지금까지 ${formatNumber(result.totalSleepYears, 1)}년을 자면서 보냈대 ㅋㅋㅋ 너는?`} cta="친구한테 보내기" />
        </div>
      )}
    </div>
  );
}

export function SleepTimeCalculator() {
  return <Suspense><Calculator /></Suspense>;
}
