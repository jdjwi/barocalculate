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
  const [retireAge, setRetireAge] = useShareableState("retire", "65");
  const router = useRouter();
  const pathname = usePathname();

  const handleTryOwn = useCallback(() => {
    router.replace(pathname, { scroll: false });
    setAge("30");
    setRetireAge("65");
  }, [router, pathname, setAge, setRetireAge]);

  const result = useMemo(() => {
    const a = parseInt(age);
    const r = parseInt(retireAge);
    if (!a || !r || a >= r) return null;
    const weekends = (r - a) * 52;
    const alreadyUsed = a * 52;
    const percentUsed = (alreadyUsed / (r * 52)) * 100;
    return { weekends, alreadyUsed, percentUsed };
  }, [age, retireAge]);

  return (
    <div className="space-y-6">
      <SharedResultBanner onTryOwn={handleTryOwn} />
      <div className="grid grid-cols-2 gap-4">
        <NumberInput label="현재 나이" value={age} onChange={setAge} suffix="세" placeholder="30" />
        <NumberInput label="은퇴 예정 나이" value={retireAge} onChange={setRetireAge} suffix="세" placeholder="65" />
      </div>
      {result && (
        <div className="border-t pt-6 space-y-4">
          <div>
            <p className="text-2xl font-bold num">{formatNumber(result.weekends)}번</p>
            <p className="mt-1 text-sm text-muted-foreground">은퇴까지 남은 주말</p>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div className="h-full rounded-full bg-foreground transition-all duration-700" style={{ width: `${result.percentUsed}%` }} />
          </div>
          <div className="flex justify-between text-[12px] text-muted-foreground">
            <span>이미 {formatNumber(result.alreadyUsed)}번 씀</span>
            <span>{formatNumber(result.weekends)}번 남음</span>
          </div>
          <ShareButton
            text={`은퇴까지 남은 주말이 ${formatNumber(result.weekends)}번뿐이래... 너는 몇 번 남았어?`}
            cta="친구한테 보내기"
            storyData={{ title: "은퇴까지 남은 주말", value: `${formatNumber(result.weekends)}번`, sub: `이미 ${formatNumber(result.alreadyUsed)}번 씀` }}
          />
        </div>
      )}
    </div>
  );
}

export function RemainingWeekendsCalculator() {
  return <Suspense><Calculator /></Suspense>;
}
