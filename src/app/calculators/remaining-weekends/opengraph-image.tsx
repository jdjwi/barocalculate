import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  searchParams,
}: {
  searchParams: Promise<{ age?: string; retire?: string }>;
}) {
  const params = await searchParams;
  const age = parseInt(params.age || "30");
  const retire = parseInt(params.retire || "65");
  const weekends = Math.max(0, (retire - age) * 52);
  const used = age * 52;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "60px",
        }}
      >
        <p style={{ fontSize: 28, color: "#6b7280", marginBottom: 12 }}>
          은퇴까지 남은 주말
        </p>
        <p style={{ fontSize: 96, fontWeight: 700, color: "#111827", letterSpacing: "-2px" }}>
          {weekends.toLocaleString()}번
        </p>
        <p style={{ fontSize: 24, color: "#6b7280", marginTop: 16 }}>
          이미 {used.toLocaleString()}번 씀
        </p>
        <p style={{ fontSize: 18, color: "#d1d5db", marginTop: 40 }}>
          바로계산
        </p>
      </div>
    ),
    { ...size }
  );
}
