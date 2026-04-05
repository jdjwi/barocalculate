"use client";
import { Suspense, useMemo, useCallback } from "react";
import { formatWon, toNumber } from "@/lib/format";
import { NumberInput } from "@/components/NumberInput";
import { ShareButton } from "@/components/ShareButton";
import { SharedResultBanner } from "@/components/SharedResultBanner";
import { useShareableState } from "@/hooks/useShareableState";
import { useRouter, usePathname } from "next/navigation";

const ACTIVITIES = [
  { name: "넷플릭스 1시간", minutes: 60 },
  { name: "유튜브 30분", minutes: 30 },
  { name: "점심시간 1시간", minutes: 60 },
  { name: "SNS 스크롤 15분", minutes: 15 },
  { name: "낮잠 20분", minutes: 20 },
];

function Calculator() {
  const [salary, setSalary] = useShareableState("s", "3500");
  const router = useRouter();
  const pathname = usePathname();
  const handleTryOwn = useCallback(() => { router.replace(pathname, { scroll: false }); setSalary("3500"); }, [router, pathname, setSalary]);

  const result = useMemo(() => {
    const s = toNumber(salary) * 10000;
    if (s <= 0) return null;
    const hourly = s / 12 / 160;
    const perMinute = hourly / 60;
    const activities = ACTIVITIES.map((a) => ({ ...a, cost: Math.round(perMinute * a.minutes) }));
    return { hourly, activities };
  }, [salary]);

  return (
    <div className="space-y-6">
      <SharedResultBanner onTryOwn={handleTryOwn} />
      <NumberInput label="월급 (세전)" value={salary} onChange={setSalary} suffix="만원" placeholder="3500" />
      {result && (
        <div className="border-t pt-6 space-y-4">
          <div>
            <p className="text-lg font-semibold">당신의 1시간은 {formatWon(Math.round(result.hourly))}입니다.</p>
          </div>
          <div className="space-y-2">
            <p className="text-[13px] text-muted-foreground">활동별 내 노동 가치</p>
            {result.activities.map((a) => (
              <div key={a.name} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{a.name}</span>
                <span className="num font-medium">내 노동 {formatWon(a.cost)}어치</span>
              </div>
            ))}
          </div>
          <ShareButton text={`내 1시간이 ${formatWon(Math.round(result.hourly))}어치래... 넷플 1시간이 이 돈이라니 😇 너는?`} cta="친구한테 보내기" />
        </div>
      )}
    </div>
  );
}

export function TimeValueCalculator() {
  return <Suspense><Calculator /></Suspense>;
}
