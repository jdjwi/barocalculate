import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { LifeProgressCalculator } from "./LifeProgressCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("life-progress")!;
export const metadata: Metadata = { title: info.title, description: info.description };
export default function Page() {
  return <CalculatorLayout calculator={info}><LifeProgressCalculator /></CalculatorLayout>;
}
