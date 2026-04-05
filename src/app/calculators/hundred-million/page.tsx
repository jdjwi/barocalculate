import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { HundredMillionCalculator } from "./HundredMillionCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("hundred-million")!;
export const metadata: Metadata = { title: info.title, description: info.description };
export default function Page() {
  return <CalculatorLayout calculator={info}><HundredMillionCalculator /></CalculatorLayout>;
}
