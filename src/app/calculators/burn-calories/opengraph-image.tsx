import { ImageResponse } from "next/og";
import { OGLayout } from "@/lib/og-template";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OGImage() {
  return new ImageResponse(<OGLayout title="이 음식 태우려면" value="달리기 몇 분?" sub="먹기 전에 계산해보기" />, { ...size });
}
