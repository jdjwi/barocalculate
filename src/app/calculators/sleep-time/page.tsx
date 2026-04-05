import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { SleepTimeCalculator } from "./SleepTimeCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("sleep-time")!;
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ age?: string; sleep?: string }> }): Promise<Metadata> {
  const p = await searchParams; const qs = new URLSearchParams(); if (p.age) qs.set("age", p.age); if (p.sleep) qs.set("sleep", p.sleep); const q = qs.toString();
  return { title: info.title, description: info.description, openGraph: { title: info.title, description: info.description, images: [`/calculators/sleep-time/opengraph-image${q ? `?${q}` : ""}`] } };
}
export default function Page() { return <CalculatorLayout calculator={info}><SleepTimeCalculator /></CalculatorLayout>; }
