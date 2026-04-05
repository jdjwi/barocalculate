import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { CommuteLifeCalculator } from "./CommuteLifeCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("commute-life")!;
export const metadata: Metadata = { title: info.title, description: info.description };
export default function Page() {
  return <CalculatorLayout calculator={info}><CommuteLifeCalculator /></CalculatorLayout>;
}
