"use client";

import { useState, useCallback } from "react";

interface Props {
  text: string;
  cta?: string;
  storyData?: {
    title: string;
    value: string;
    sub?: string;
  };
}

function generateImage(data: { title: string; value: string; sub?: string }): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d")!;

    // 다크 배경
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, 1080, 1920);

    // 중앙 카드
    ctx.fillStyle = "#ffffff";
    roundRect(ctx, 80, 560, 920, 800, 32);

    // 제목
    ctx.fillStyle = "#6b7280";
    ctx.font = "400 36px -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(data.title, 540, 680);

    // 결과값
    ctx.fillStyle = "#111827";
    ctx.font = "700 96px -apple-system, sans-serif";
    ctx.fillText(data.value, 540, 880, 800);

    // 부제
    if (data.sub) {
      ctx.fillStyle = "#9ca3af";
      ctx.font = "400 32px -apple-system, sans-serif";
      ctx.fillText(data.sub, 540, 980);
    }

    // CTA 버튼
    ctx.fillStyle = "#111827";
    roundRect(ctx, 300, 1220, 480, 70, 12);
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 28px -apple-system, sans-serif";
    ctx.fillText("나도 해보기 →", 540, 1264);

    // 하단 브랜딩
    ctx.fillStyle = "#4b5563";
    ctx.font = "400 28px -apple-system, sans-serif";
    ctx.fillText("barogyesan.com", 540, 1780);

    canvas.toBlob((blob) => {
      resolve(new File([blob!], "barogyesan.png", { type: "image/png" }));
    }, "image/png");
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

export function ShareButton({ text, cta = "결과 공유하기", storyData }: Props) {
  const [state, setState] = useState<"idle" | "loading" | "copied">("idle");

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = useCallback(async () => {
    setState("loading");

    // 모바일 + storyData 있으면: 이미지 생성 → 이미지+텍스트 함께 공유
    if (storyData && navigator.share && navigator.canShare) {
      try {
        const file = await generateImage(storyData);
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            text: `${text}\n\n나도 해보기 →`,
            url: shareUrl,
            files: [file],
          });
          setState("idle");
          return;
        }
      } catch {
        // 사용자 취소 or 미지원 → 폴백
      }
    }

    // 폴백 1: 네이티브 공유 (텍스트만)
    if (navigator.share) {
      try {
        await navigator.share({ title: "바로계산", text, url: shareUrl });
        setState("idle");
        return;
      } catch { /* cancelled */ }
    }

    // 폴백 2: 클립보드 복사
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
    setState("copied");
    setTimeout(() => setState("idle"), 2000);
  }, [text, shareUrl, storyData]);

  return (
    <button
      onClick={handleShare}
      disabled={state === "loading"}
      className="w-full rounded-lg border border-foreground bg-foreground py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90 active:bg-foreground/80 disabled:opacity-70"
    >
      {state === "copied" ? "링크 복사됨!" : state === "loading" ? "준비 중..." : cta}
    </button>
  );
}
