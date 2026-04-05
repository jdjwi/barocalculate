import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { DeliverySavingsCalculator } from "./DeliverySavingsCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("delivery-savings")!;
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ t?: string; f?: string }> }): Promise<Metadata> {
  const p = await searchParams; const qs = new URLSearchParams(); if (p.t) qs.set("t", p.t); if (p.f) qs.set("f", p.f); const q = qs.toString();
  return { title: info.title, description: info.description, openGraph: { title: info.title, description: info.description, images: [`/calculators/delivery-savings/opengraph-image${q ? `?${q}` : ""}`] } };
}
export default function Page() { return <CalculatorLayout calculator={info}><DeliverySavingsCalculator /></CalculatorLayout>; }
