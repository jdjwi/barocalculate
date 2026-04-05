import { ImageResponse } from "next/og";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OGImage({ searchParams }: { searchParams: Promise<{ a?: string }> }) {
  const p = await searchParams;
  const count = Math.floor(parseInt(p.a || "1550000") / 1500);
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: "60px" }}>
      <p style={{ fontSize: 28, color: "#6b7280", marginBottom: 12 }}>삼각김밥 환산</p>
      <p style={{ fontSize: 80, fontWeight: 700, color: "#111827" }}>{count.toLocaleString()}개</p>
      <p style={{ fontSize: 18, color: "#d1d5db", marginTop: 40 }}>바로계산</p>
    </div>, { ...size }
  );
}
