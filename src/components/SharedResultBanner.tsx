"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Banner({ onTryOwn }: { onTryOwn: () => void }) {
  const searchParams = useSearchParams();
  const hasParams = searchParams.toString().length > 0;

  if (!hasParams) return null;

  return (
    <div className="mb-4 flex items-center justify-between rounded-lg bg-secondary px-4 py-3">
      <span className="text-sm text-muted-foreground">친구의 결과를 보고 있어요</span>
      <button
        onClick={onTryOwn}
        className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background"
      >
        나도 해보기
      </button>
    </div>
  );
}

export function SharedResultBanner({ onTryOwn }: { onTryOwn: () => void }) {
  return (
    <Suspense>
      <Banner onTryOwn={onTryOwn} />
    </Suspense>
  );
}
