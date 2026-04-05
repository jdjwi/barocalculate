"use client";
import { Suspense, useMemo, useCallback } from "react";
import { formatNumber, toNumber } from "@/lib/format";
import { NumberInput } from "@/components/NumberInput";
import { ShareButton } from "@/components/ShareButton";
import { SharedResultBanner } from "@/components/SharedResultBanner";
import { useShareableState } from "@/hooks/useShareableState";
import { useRouter, usePathname } from "next/navigation";

const KIMBAP_PRICE = 1500;
const PRESETS = [
  { label: "아이폰 16", price: 1550000 },
  { label: "치킨 1마리", price: 22000 },
  { label: "테슬라", price: 55000000 },
  { label: "서울 전세", price: 400000000 },
];

function Calculator() {
  const [amount, setAmount] = useShareableState("a", "1550000");
  const router = useRouter();
  const pathname = usePathname();
  const handleTryOwn = useCallback(() => { router.replace(pathname, { scroll: false }); setAmount("1550000"); }, [router, pathname, setAmount]);

  const result = useMemo(() => {
    const a = toNumber(amount);
    if (a <= 0) return null;
    const count = a / KIMBAP_PRICE;
    const stacked = count * 0.07;
    return { count, stackedMeters: stacked };
  }, [amount]);

  return (
    <div className="space-y-6">
      <SharedResultBanner onTryOwn={handleTryOwn} />
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button key={p.label} onClick={() => setAmount(String(p.price))}
            className={`rounded-md border px-3 py-1.5 text-[13px] transition-colors ${toNumber(amount) === p.price ? "border-foreground bg-foreground text-background" : "border-input text-muted-foreground hover:border-foreground/30"}`}>
            {p.label}
          </button>
        ))}
      </div>
      <NumberInput label="금액" value={amount} onChange={setAmount} suffix="원" placeholder="1550000" />
      {result && (
        <div className="border-t pt-6 space-y-4">
          <div>
            <p className="text-2xl font-bold num">삼각김밥 {formatNumber(Math.floor(result.count))}개</p>
            <p className="mt-1 text-sm text-muted-foreground">쌓으면 {formatNumber(result.stackedMeters, 1)}m</p>
          </div>
          <ShareButton text={`이거 삼각김밥 ${formatNumber(Math.floor(result.count))}개래 ㅋㅋㅋ 쌓으면 ${formatNumber(result.stackedMeters, 1)}m`} cta="친구한테 보내기" />
        </div>
      )}
    </div>
  );
}

export function KimbapConverterCalculator() {
  return <Suspense><Calculator /></Suspense>;
}
