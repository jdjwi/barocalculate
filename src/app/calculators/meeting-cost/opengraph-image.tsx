import { ImageResponse } from "next/og";
import { OGLayout } from "@/lib/og-template";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OGImage({ searchParams }: { searchParams: Promise<{ p?: string; m?: string; s?: string }> }) {
  const params = await searchParams;
  const people = parseInt(params.p || "6"); const mins = parseInt(params.m || "60"); const sal = parseInt(params.s || "4000") * 10000;
  const cost = Math.round((sal / 12 / 160) * (mins / 60) * people);
  return new ImageResponse(<OGLayout title="이 회의 얼마짜리?" value={`${Math.round(cost / 10000)}만원`} sub={`${people}명 × ${mins}분`} />, { ...size });
}
