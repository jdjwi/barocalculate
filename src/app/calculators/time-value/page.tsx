import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { TimeValueCalculator } from "./TimeValueCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("time-value")!;
export const metadata: Metadata = { title: info.title, description: info.description };
export default function Page() {
  return <CalculatorLayout calculator={info}><TimeValueCalculator /></CalculatorLayout>;
}
