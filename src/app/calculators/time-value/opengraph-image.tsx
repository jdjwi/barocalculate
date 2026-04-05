import { ImageResponse } from "next/og";
import { OGLayout } from "@/lib/og-template";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OGImage({ searchParams }: { searchParams: Promise<{ s?: string }> }) {
  const p = await searchParams;
  const hourly = Math.round((parseInt(p.s || "3500") * 10000) / 12 / 160);
  return new ImageResponse(<OGLayout title="내 1시간의 가치" value={`${hourly.toLocaleString()}원`} sub="나도 계산해보기" />, { ...size });
}
