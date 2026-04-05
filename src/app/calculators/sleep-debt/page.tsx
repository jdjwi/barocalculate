import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { SleepDebtCalculator } from "./SleepDebtCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("sleep-debt")!;
export const metadata: Metadata = { title: info.title, description: info.description };
export default function Page() {
  return <CalculatorLayout calculator={info}><SleepDebtCalculator /></CalculatorLayout>;
}
