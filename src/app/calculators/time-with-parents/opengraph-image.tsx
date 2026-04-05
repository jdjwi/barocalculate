import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  searchParams,
}: {
  searchParams: Promise<{ age?: string; freq?: string; hours?: string }>;
}) {
  const params = await searchParams;
  const parentAge = parseInt(params.age || "60");
  const freq = parseInt(params.freq || "12");
  const hours = parseInt(params.hours || "5");
  const remainingYears = Math.max(0, 85 - parentAge);
  const totalMeetings = remainingYears * freq;
  const totalDays = Math.round((totalMeetings * hours) / 24);

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
          부모님과 남은 시간
        </p>
        <p style={{ fontSize: 96, fontWeight: 700, color: "#111827", letterSpacing: "-2px" }}>
          {totalDays}일
        </p>
        <p style={{ fontSize: 24, color: "#6b7280", marginTop: 16 }}>
          {totalMeetings}번의 만남
        </p>
        <p style={{ fontSize: 18, color: "#d1d5db", marginTop: 40 }}>
          바로계산
        </p>
      </div>
    ),
    { ...size }
  );
}
