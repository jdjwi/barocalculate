import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { LifeProgressCalculator } from "./LifeProgressCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const info = getCalculator("life-progress")!;

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ birth?: string }> }): Promise<Metadata> {
  const params = await searchParams;
  const qs = params.birth ? `?birth=${params.birth}` : "";
  return {
    title: info.title,
    description: info.description,
    openGraph: {
      title: info.title,
      description: info.description,
      images: [`/calculators/life-progress/opengraph-image${qs}`],
    },
  };
}

export default function Page() {
  return <CalculatorLayout calculator={info}><LifeProgressCalculator /></CalculatorLayout>;
}
