import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { DeliverySavingsCalculator } from "./DeliverySavingsCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("delivery-savings")!;
export const metadata: Metadata = { title: info.title, description: info.description };
export default function Page() {
  return <CalculatorLayout calculator={info}><DeliverySavingsCalculator /></CalculatorLayout>;
}
