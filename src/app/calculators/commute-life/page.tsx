import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { CommuteLifeCalculator } from "./CommuteLifeCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("commute-life")!;
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ ow?: string; yw?: string; yl?: string }> }): Promise<Metadata> {
  const p = await searchParams; const qs = new URLSearchParams(); if (p.ow) qs.set("ow", p.ow); if (p.yw) qs.set("yw", p.yw); if (p.yl) qs.set("yl", p.yl); const q = qs.toString();
  return { title: info.title, description: info.description, openGraph: { title: info.title, description: info.description, images: [`/calculators/commute-life/opengraph-image${q ? `?${q}` : ""}`] } };
}
export default function Page() { return <CalculatorLayout calculator={info}><CommuteLifeCalculator /></CalculatorLayout>; }
