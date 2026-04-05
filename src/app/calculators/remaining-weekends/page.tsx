import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { RemainingWeekendsCalculator } from "./RemainingWeekendsCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const info = getCalculator("remaining-weekends")!;

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ age?: string; retire?: string }> }): Promise<Metadata> {
  const p = await searchParams;
  const qs = new URLSearchParams();
  if (p.age) qs.set("age", p.age);
  if (p.retire) qs.set("retire", p.retire);
  const q = qs.toString();
  return {
    title: info.title,
    description: info.description,
    openGraph: {
      title: info.title,
      description: info.description,
      images: [`/calculators/remaining-weekends/opengraph-image${q ? `?${q}` : ""}`],
    },
  };
}

export default function Page() {
  return <CalculatorLayout calculator={info}><RemainingWeekendsCalculator /></CalculatorLayout>;
}
