"use client";

import { useState, useCallback } from "react";

interface Props {
  text: string;
  cta?: string;
}

export function ShareButton({ text, cta = "결과 공유하기" }: Props) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${text}\n\n나도 해보기 → ${shareUrl}`;

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "바로계산", text, url: shareUrl });
        return;
      } catch {
        // cancelled or failed, fall through to copy
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text, shareUrl, shareText]);

  return (
    <button
      onClick={handleShare}
      className="w-full rounded-lg border border-foreground bg-foreground py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90 active:bg-foreground/80"
    >
      {copied ? "링크 복사됨!" : cta}
    </button>
  );
}
