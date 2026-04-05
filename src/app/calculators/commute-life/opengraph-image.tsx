import { ImageResponse } from "next/og";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OGImage({ searchParams }: { searchParams: Promise<{ ow?: string; yw?: string; yl?: string }> }) {
  const p = await searchParams;
  const totalDays = Math.round(((parseInt(p.ow || "40") * 2 * 250) / 60) * (parseInt(p.yw || "5") + parseInt(p.yl || "30")) / 24);
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: "60px" }}>
      <p style={{ fontSize: 28, color: "#6b7280", marginBottom: 12 }}>출퇴근에 쓰는 인생</p>
      <p style={{ fontSize: 80, fontWeight: 700, color: "#111827" }}>{totalDays}일</p>
      <p style={{ fontSize: 18, color: "#d1d5db", marginTop: 40 }}>바로계산</p>
    </div>, { ...size }
  );
}
