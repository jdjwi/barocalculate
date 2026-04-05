"use client";
import { Suspense, useMemo, useCallback } from "react";
import { formatNumber } from "@/lib/format";
import { NumberInput } from "@/components/NumberInput";
import { ShareButton } from "@/components/ShareButton";
import { SharedResultBanner } from "@/components/SharedResultBanner";
import { useShareableState } from "@/hooks/useShareableState";
import { useRouter, usePathname } from "next/navigation";

function Calculator() {
  const [oneWay, setOneWay] = useShareableState("ow", "40");
  const [yearsWorked, setYearsWorked] = useShareableState("yw", "5");
  const [yearsLeft, setYearsLeft] = useShareableState("yl", "30");
  const router = useRouter();
  const pathname = usePathname();
  const handleTryOwn = useCallback(() => { router.replace(pathname, { scroll: false }); setOneWay("40"); setYearsWorked("5"); setYearsLeft("30"); }, [router, pathname, setOneWay, setYearsWorked, setYearsLeft]);

  const result = useMemo(() => {
    const ow = parseInt(oneWay); const yw = parseInt(yearsWorked); const yl = parseInt(yearsLeft);
    if (!ow || !yw || !yl) return null;
    const yearlyHours = (ow * 2 * 250) / 60;
    const totalHours = yearlyHours * (yw + yl);
    const totalDays = Math.round(totalHours / 24);
    const dramas = Math.floor(totalHours / 16);
    return { totalHours, totalDays, dramas };
  }, [oneWay, yearsWorked, yearsLeft]);

  return (
    <div className="space-y-6">
      <SharedResultBanner onTryOwn={handleTryOwn} />
      <NumberInput label="편도 출퇴근 시간" value={oneWay} onChange={setOneWay} suffix="분" placeholder="40" />
      <div className="grid grid-cols-2 gap-4">
        <NumberInput label="지금까지 직장생활" value={yearsWorked} onChange={setYearsWorked} suffix="년" placeholder="5" />
        <NumberInput label="앞으로 남은 직장생활" value={yearsLeft} onChange={setYearsLeft} suffix="년" placeholder="30" />
      </div>
      {result && (
        <div className="border-t pt-6 space-y-4">
          <div>
            <p className="text-lg font-semibold">출퇴근에 인생 {formatNumber(result.totalDays)}일을 씁니다.</p>
            <p className="mt-1 text-sm text-muted-foreground">드라마 {formatNumber(result.dramas)}편 분량</p>
          </div>
          <ShareButton text={`출퇴근에 인생 ${formatNumber(result.totalDays)}일 쓴대... 드라마 ${formatNumber(result.dramas)}편이래 ㄷㄷ`} cta="친구한테 보내기" />
        </div>
      )}
    </div>
  );
}

export function CommuteLifeCalculator() {
  return <Suspense><Calculator /></Suspense>;
}
