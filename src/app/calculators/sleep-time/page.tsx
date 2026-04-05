import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { SleepTimeCalculator } from "./SleepTimeCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("sleep-time")!;
export const metadata: Metadata = { title: info.title, description: info.description };
export default function Page() {
  return <CalculatorLayout calculator={info}><SleepTimeCalculator /></CalculatorLayout>;
}
