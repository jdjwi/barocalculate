"use client";
import { Suspense, useMemo, useCallback } from "react";
import { formatNumber } from "@/lib/format";
import { NumberInput } from "@/components/NumberInput";
import { ShareButton } from "@/components/ShareButton";
import { SharedResultBanner } from "@/components/SharedResultBanner";
import { useShareableState } from "@/hooks/useShareableState";
import { useRouter, usePathname } from "next/navigation";

function Calculator() {
  const [parentAge, setParentAge] = useShareableState("age", "60");
  const [meetFreq, setMeetFreq] = useShareableState("freq", "12");
  const [hoursPerMeet, setHoursPerMeet] = useShareableState("hours", "5");
  const router = useRouter();
  const pathname = usePathname();
  const parentLifespan = 85;

  const handleTryOwn = useCallback(() => {
    router.replace(pathname, { scroll: false });
    setParentAge("60");
    setMeetFreq("12");
    setHoursPerMeet("5");
  }, [router, pathname, setParentAge, setMeetFreq, setHoursPerMeet]);

  const result = useMemo(() => {
    const age = parseInt(parentAge);
    const freq = parseInt(meetFreq);
    const hours = parseInt(hoursPerMeet);
    if (!age || !freq || !hours || age >= parentLifespan) return null;
    const remainingYears = parentLifespan - age;
    const totalMeetings = remainingYears * freq;
    const totalHours = totalMeetings * hours;
    const totalDays = Math.round(totalHours / 24);
    return { totalMeetings, totalHours, totalDays };
  }, [parentAge, meetFreq, hoursPerMeet]);

  return (
    <div className="space-y-6">
      <SharedResultBanner onTryOwn={handleTryOwn} />
      <NumberInput label="부모님 현재 나이" value={parentAge} onChange={setParentAge} suffix="세" placeholder="60" />
      <div className="grid grid-cols-2 gap-4">
        <NumberInput label="1년에 몇 번 만나나요" value={meetFreq} onChange={setMeetFreq} suffix="번" placeholder="12" />
        <NumberInput label="만날 때 평균 시간" value={hoursPerMeet} onChange={setHoursPerMeet} suffix="시간" placeholder="5" />
      </div>
      {result && (
        <div className="border-t pt-6 space-y-4">
          <div>
            <p className="text-lg font-semibold">
              부모님과 앞으로 만날 수 있는 시간은 약 {formatNumber(result.totalDays)}일입니다.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatNumber(result.totalMeetings)}번의 만남 · 총 {formatNumber(result.totalHours)}시간
            </p>
          </div>
          <div className="space-y-3">
            {[
              { label: "남은 만남 횟수", value: `${formatNumber(result.totalMeetings)}번` },
              { label: "함께할 수 있는 총 시간", value: `${formatNumber(result.totalHours)}시간` },
              { label: "일수로 환산하면", value: `${formatNumber(result.totalDays)}일` },
            ].map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="num font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          <ShareButton
            text={`부모님과 앞으로 만날 수 있는 날이 ${formatNumber(result.totalDays)}일뿐이래... 너도 계산해봐`}
            cta="친구한테 보내기"
          />
        </div>
      )}
    </div>
  );
}

export function TimeWithParentsCalculator() {
  return <Suspense><Calculator /></Suspense>;
}
