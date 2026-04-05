"use client";

import { useState, useCallback } from "react";

interface Props {
  text: string;
  cta?: string;
}

export function ShareButton({ text, cta = "결과 공유하기" }: Props) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = useCallback(async () => {
    // 모바일: 네이티브 공유 시트 (인스타 스토리, 카톡 등 선택 가능)
    if (navigator.share) {
      try {
        await navigator.share({ title: "바로계산", text, url: shareUrl });
        return;
      } catch { /* cancelled */ }
    }

    // 데스크톱: 클립보드 복사
    const shareText = `${text}\n\n나도 해보기 → ${shareUrl}`;
    try {
      await navigator.clipboard.writeText(shareText);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = shareText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text, shareUrl]);

  return (
    <button
      onClick={handleShare}
      className="w-full rounded-lg border border-foreground bg-foreground py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90 active:bg-foreground/80"
    >
      {copied ? "링크 복사됨!" : cta}
    </button>
  );
}
