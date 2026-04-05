import { ImageResponse } from "next/og";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OGImage({ searchParams }: { searchParams: Promise<{ age?: string; sleep?: string }> }) {
  const p = await searchParams;
  const years = ((parseInt(p.age || "30") * 365.25 * parseInt(p.sleep || "7")) / (365.25 * 24)).toFixed(1);
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: "60px" }}>
      <p style={{ fontSize: 28, color: "#6b7280", marginBottom: 12 }}>잠에 쓴 인생</p>
      <p style={{ fontSize: 80, fontWeight: 700, color: "#111827" }}>{years}년</p>
      <p style={{ fontSize: 18, color: "#d1d5db", marginTop: 40 }}>바로계산</p>
    </div>, { ...size }
  );
}
