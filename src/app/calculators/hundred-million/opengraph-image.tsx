import { ImageResponse } from "next/og";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OGImage({ searchParams }: { searchParams: Promise<{ c?: string; m?: string; r?: string }> }) {
  const p = await searchParams;
  const c = parseInt(p.c || "5000000"); const m = parseInt(p.m || "1000000"); const r = parseInt(p.r || "3") / 100 / 12;
  let balance = c; let months = 0;
  while (balance < 100000000 && months < 1200) { balance = balance * (1 + r) + m; months++; }
  const years = Math.floor(months / 12); const rem = months % 12;
  const text = (years > 0 ? years + "년 " : "") + (rem > 0 ? rem + "개월" : "");
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: "60px" }}>
      <p style={{ fontSize: 28, color: "#6b7280", marginBottom: 12 }}>1억 모으기까지</p>
      <p style={{ fontSize: 80, fontWeight: 700, color: "#111827" }}>{text}</p>
      <p style={{ fontSize: 18, color: "#d1d5db", marginTop: 40 }}>바로계산</p>
    </div>, { ...size }
  );
}
