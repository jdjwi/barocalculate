import { ImageResponse } from "next/og";
import { OGLayout } from "@/lib/og-template";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OGImage({ searchParams }: { searchParams: Promise<{ age?: string; sleep?: string }> }) {
  const p = await searchParams;
  const years = ((parseInt(p.age || "30") * 365.25 * parseInt(p.sleep || "7")) / (365.25 * 24)).toFixed(1);
  return new ImageResponse(<OGLayout title="잠에 쓴 인생" value={`${years}년`} sub="나도 계산해보기" />, { ...size });
}
