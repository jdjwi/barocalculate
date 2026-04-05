import { ImageResponse } from "next/og";
import { OGLayout } from "@/lib/og-template";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OGImage({ searchParams }: { searchParams: Promise<{ t?: string; f?: string }> }) {
  const p = await searchParams;
  const yearly = (parseInt(p.t || "3") * parseInt(p.f || "4000") * 52);
  return new ImageResponse(<OGLayout title="배달비만 모았으면" value={`연 ${Math.round(yearly / 10000)}만원`} sub="나도 계산해보기" />, { ...size });
}
