"use client";
import { Suspense, useMemo, useCallback } from "react";
import { formatWon, formatNumber, toNumber } from "@/lib/format";
import { NumberInput } from "@/components/NumberInput";
import { ShareButton } from "@/components/ShareButton";
import { SharedResultBanner } from "@/components/SharedResultBanner";
import { useShareableState } from "@/hooks/useShareableState";
import { useRouter, usePathname } from "next/navigation";

const THINGS_TO_BUY = [
  { name: "제주도 왕복 항공권", price: 150000 },
  { name: "에어팟 프로", price: 359000 },
  { name: "아이패드", price: 599000 },
  { name: "맥북 에어", price: 1590000 },
  { name: "유럽 여행", price: 3000000 },
];

function Calculator() {
  const [timesPerWeek, setTimesPerWeek] = useShareableState("t", "3");
  const [deliveryFee, setDeliveryFee] = useShareableState("f", "4000");
  const router = useRouter();
  const pathname = usePathname();
  const handleTryOwn = useCallback(() => { router.replace(pathname, { scroll: false }); setTimesPerWeek("3"); setDeliveryFee("4000"); }, [router, pathname, setTimesPerWeek, setDeliveryFee]);

  const result = useMemo(() => {
    const times = toNumber(timesPerWeek);
    const fee = toNumber(deliveryFee);
    if (times <= 0 || fee <= 0) return null;
    const yearly = times * fee * 52;
    const fiveYear = yearly * 5;
    const canBuy = THINGS_TO_BUY.filter((t) => t.price <= yearly).sort((a, b) => b.price - a.price);
    return { yearly, fiveYear, canBuy };
  }, [timesPerWeek, deliveryFee]);

  return (
    <div className="space-y-6">
      <SharedResultBanner onTryOwn={handleTryOwn} />
      <div className="grid grid-cols-2 gap-4">
        <NumberInput label="주에 몇 번 시켜먹나요" value={timesPerWeek} onChange={setTimesPerWeek} suffix="번" placeholder="3" />
        <NumberInput label="평균 배달비" value={deliveryFee} onChange={setDeliveryFee} suffix="원" placeholder="4000" />
      </div>
      {result && (
        <div className="border-t pt-6 space-y-4">
          <div>
            <p className="text-lg font-semibold">1년 배달비로 {formatWon(Math.round(result.yearly))} 쓰고 있습니다.</p>
            <p className="mt-1 text-sm text-muted-foreground">5년이면 {formatWon(Math.round(result.fiveYear))}</p>
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
          <ShareButton text={`배달비만 모았으면 1년에 ${formatWon(Math.round(result.yearly))}... 너는 얼마나 쓰고 있어?`} cta="친구한테 보내기" storyData={{ title: "배달비만 모았으면", value: `연 ${formatNumber(Math.round(result.yearly / 10000))}만원`, sub: "날리는 중" }} />
        </div>
      )}
    </div>
  );
}

export function DeliverySavingsCalculator() {
  return <Suspense><Calculator /></Suspense>;
}
