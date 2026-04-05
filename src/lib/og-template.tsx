/** 공통 OG 이미지 레이아웃 */
export function OGLayout({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: "60px" }}>
      <p style={{ fontSize: 28, color: "#6b7280", marginBottom: 12 }}>{title}</p>
      <p style={{ fontSize: 80, fontWeight: 700, color: "#111827", letterSpacing: "-2px" }}>{value}</p>
      {sub && <p style={{ fontSize: 24, color: "#6b7280", marginTop: 16 }}>{sub}</p>}
      <p style={{ fontSize: 18, color: "#d1d5db", marginTop: 40 }}>바로계산</p>
    </div>
  );
}
