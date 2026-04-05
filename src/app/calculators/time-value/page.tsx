import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { TimeValueCalculator } from "./TimeValueCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("time-value")!;
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ s?: string }> }): Promise<Metadata> {
  const p = await searchParams; const q = p.s ? `?s=${p.s}` : "";
  return { title: info.title, description: info.description, openGraph: { title: info.title, description: info.description, images: [`/calculators/time-value/opengraph-image${q}`] } };
}
export default function Page() { return <CalculatorLayout calculator={info}><TimeValueCalculator /></CalculatorLayout>; }
