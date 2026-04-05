import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { MeetingCostCalculator } from "./MeetingCostCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";
const info = getCalculator("meeting-cost")!;
export const metadata: Metadata = { title: info.title, description: info.description };
export default function Page() {
  return <CalculatorLayout calculator={info}><MeetingCostCalculator /></CalculatorLayout>;
}
