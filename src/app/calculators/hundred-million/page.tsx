import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { HundredMillionCalculator } from "./HundredMillionCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("hundred-million")!;
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ c?: string; m?: string; r?: string }> }): Promise<Metadata> {
  const p = await searchParams; const qs = new URLSearchParams(); if (p.c) qs.set("c", p.c); if (p.m) qs.set("m", p.m); if (p.r) qs.set("r", p.r); const q = qs.toString();
  return { title: info.title, description: info.description, openGraph: { title: info.title, description: info.description, images: [`/calculators/hundred-million/opengraph-image${q ? `?${q}` : ""}`] } };
}
export default function Page() { return <CalculatorLayout calculator={info}><HundredMillionCalculator /></CalculatorLayout>; }
