import { ImageResponse } from "next/og";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OGImage({ searchParams }: { searchParams: Promise<{ p?: string; m?: string; s?: string }> }) {
  const params = await searchParams;
  const people = parseInt(params.p || "6"); const mins = parseInt(params.m || "60"); const sal = parseInt(params.s || "4000") * 10000;
  const cost = Math.round((sal / 12 / 160) * (mins / 60) * people);
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: "60px" }}>
      <p style={{ fontSize: 28, color: "#6b7280", marginBottom: 12 }}>이 회의 얼마짜리?</p>
      <p style={{ fontSize: 80, fontWeight: 700, color: "#111827" }}>{Math.round(cost / 10000)}만원</p>
      <p style={{ fontSize: 24, color: "#6b7280", marginTop: 16 }}>{people}명 × {mins}분</p>
      <p style={{ fontSize: 18, color: "#d1d5db", marginTop: 40 }}>바로계산</p>
    </div>, { ...size }
  );
}
