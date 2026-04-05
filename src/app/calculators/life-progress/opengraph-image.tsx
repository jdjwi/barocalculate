import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  searchParams,
}: {
  searchParams: Promise<{ birth?: string }>;
}) {
  const params = await searchParams;
  const birth = params.birth || "1995-01-01";
  const birthDate = new Date(birth);
  const today = new Date();
  const ageInDays = (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24);
  const percent = Math.min(100, (ageInDays / (80 * 365.25)) * 100);
  const remainingSummers = Math.floor(Math.max(0, 80 - ageInDays / 365.25));

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
          내 인생
        </p>
        <p style={{ fontSize: 96, fontWeight: 700, color: "#111827", letterSpacing: "-2px" }}>
          {percent.toFixed(1)}%
        </p>
        <div
          style={{
            display: "flex",
            width: "80%",
            height: 16,
            borderRadius: 8,
            backgroundColor: "#f3f4f6",
            marginTop: 24,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${percent}%`,
              height: "100%",
              backgroundColor: "#111827",
              borderRadius: 8,
            }}
          />
        </div>
        <p style={{ fontSize: 24, color: "#6b7280", marginTop: 24 }}>
          남은 여름 {remainingSummers}번
        </p>
        <p style={{ fontSize: 18, color: "#d1d5db", marginTop: 40 }}>
          바로계산
        </p>
      </div>
    ),
    { ...size }
  );
}
