import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { TimeWithParentsCalculator } from "./TimeWithParentsCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const info = getCalculator("time-with-parents")!;

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ age?: string; freq?: string; hours?: string }> }): Promise<Metadata> {
  const p = await searchParams;
  const qs = new URLSearchParams();
  if (p.age) qs.set("age", p.age);
  if (p.freq) qs.set("freq", p.freq);
  if (p.hours) qs.set("hours", p.hours);
  const q = qs.toString();
  return {
    title: info.title,
    description: info.description,
    openGraph: {
      title: info.title,
      description: info.description,
      images: [`/calculators/time-with-parents/opengraph-image${q ? `?${q}` : ""}`],
    },
  };
}

export default function Page() {
  return <CalculatorLayout calculator={info}><TimeWithParentsCalculator /></CalculatorLayout>;
}
