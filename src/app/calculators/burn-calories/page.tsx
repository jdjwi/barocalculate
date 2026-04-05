import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { BurnCaloriesCalculator } from "./BurnCaloriesCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("burn-calories")!;
export const metadata: Metadata = { title: info.title, description: info.description };
export default function Page() {
  return <CalculatorLayout calculator={info}><BurnCaloriesCalculator /></CalculatorLayout>;
}
