import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { KimbapConverterCalculator } from "./KimbapConverterCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("kimbap-converter")!;
export const metadata: Metadata = { title: info.title, description: info.description };
export default function Page() {
  return <CalculatorLayout calculator={info}><KimbapConverterCalculator /></CalculatorLayout>;
}
