import { ImageResponse } from "next/og";
import { OGLayout } from "@/lib/og-template";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OGImage({ searchParams }: { searchParams: Promise<{ ow?: string; yw?: string; yl?: string }> }) {
  const p = await searchParams;
  const ow = parseInt(p.ow || "40"); const yw = parseInt(p.yw || "5"); const yl = parseInt(p.yl || "30");
  const totalDays = Math.round(((ow * 2 * 250) / 60) * (yw + yl) / 24);
  return new ImageResponse(<OGLayout title="출퇴근에 쓰는 인생" value={`${totalDays}일`} sub="나도 계산해보기" />, { ...size });
}
