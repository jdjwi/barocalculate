import { ImageResponse } from "next/og";
import { OGLayout } from "@/lib/og-template";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OGImage({ searchParams }: { searchParams: Promise<{ c?: string; m?: string; r?: string }> }) {
  const p = await searchParams;
  const c = parseInt(p.c || "5000000"); const m = parseInt(p.m || "1000000"); const r = parseInt(p.r || "3") / 100 / 12;
  let balance = c; let months = 0;
  while (balance < 100000000 && months < 1200) { balance = balance * (1 + r) + m; months++; }
  const years = Math.floor(months / 12); const rem = months % 12;
  const text = `${years > 0 ? `${years}년 ` : ""}${rem > 0 ? `${rem}개월` : ""}`;
  return new ImageResponse(<OGLayout title="1억 모으기까지" value={text} sub="나도 계산해보기" />, { ...size });
}
