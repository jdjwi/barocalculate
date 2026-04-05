import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { KimbapConverterCalculator } from "./KimbapConverterCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("kimbap-converter")!;
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ a?: string }> }): Promise<Metadata> {
  const p = await searchParams; const q = p.a ? `?a=${p.a}` : "";
  return { title: info.title, description: info.description, openGraph: { title: info.title, description: info.description, images: [`/calculators/kimbap-converter/opengraph-image${q}`] } };
}
export default function Page() { return <CalculatorLayout calculator={info}><KimbapConverterCalculator /></CalculatorLayout>; }
