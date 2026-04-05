import { ImageResponse } from "next/og";
import { OGLayout } from "@/lib/og-template";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OGImage({ searchParams }: { searchParams: Promise<{ a?: string }> }) {
  const p = await searchParams;
  const count = Math.floor(parseInt(p.a || "1550000") / 1500);
  return new ImageResponse(<OGLayout title="삼각김밥 환산" value={`${count.toLocaleString()}개`} sub="나도 환산해보기" />, { ...size });
}
