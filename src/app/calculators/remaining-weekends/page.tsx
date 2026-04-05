import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { RemainingWeekendsCalculator } from "./RemainingWeekendsCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("remaining-weekends")!;
export const metadata: Metadata = { title: info.title, description: info.description };
export default function Page() {
  return <CalculatorLayout calculator={info}><RemainingWeekendsCalculator /></CalculatorLayout>;
}
