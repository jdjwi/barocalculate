import { ImageResponse } from "next/og";
import { OGLayout } from "@/lib/og-template";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OGImage() {
  return new ImageResponse(<OGLayout title="내 수면 빚" value="이번 주 얼마나 부족할까?" sub="계산해보기" />, { ...size });
}
