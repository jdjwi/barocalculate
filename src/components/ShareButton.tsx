"use client";

import { useState, useCallback } from "react";

interface Props {
  text: string;
  url?: string;
}

export function ShareButton({ text, url }: Props) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = `${text}\n${shareUrl}`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareText]);

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "바로계산", text, url: shareUrl });
      } catch {
        // user cancelled
      }
    } else {
      handleCopy();
    }
  }, [text, shareUrl, handleCopy]);

  return (
    <div className="flex gap-2">
      <button
        onClick={handleNativeShare}
        className="flex-1 rounded-lg border border-foreground bg-foreground py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90 active:bg-foreground/80"
      >
        {copied ? "복사됨!" : "결과 공유하기"}
      </button>
    </div>
  );
}
