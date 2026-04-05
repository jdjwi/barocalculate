import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { TimeWithParentsCalculator } from "./TimeWithParentsCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("time-with-parents")!;
export const metadata: Metadata = { title: info.title, description: info.description };
export default function Page() {
  return <CalculatorLayout calculator={info}><TimeWithParentsCalculator /></CalculatorLayout>;
}
