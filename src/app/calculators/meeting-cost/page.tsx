import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { MeetingCostCalculator } from "./MeetingCostCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("meeting-cost")!;
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ p?: string; m?: string; s?: string }> }): Promise<Metadata> {
  const pa = await searchParams; const qs = new URLSearchParams(); if (pa.p) qs.set("p", pa.p); if (pa.m) qs.set("m", pa.m); if (pa.s) qs.set("s", pa.s); const q = qs.toString();
  return { title: info.title, description: info.description, openGraph: { title: info.title, description: info.description, images: [`/calculators/meeting-cost/opengraph-image${q ? `?${q}` : ""}`] } };
}
export default function Page() { return <CalculatorLayout calculator={info}><MeetingCostCalculator /></CalculatorLayout>; }
