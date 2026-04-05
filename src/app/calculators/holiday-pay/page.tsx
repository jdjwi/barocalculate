import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { HolidayPayCalculator } from "./HolidayPayCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const info = getCalculator("holiday-pay")!;

export const metadata: Metadata = {
  title: info.title,
  description: info.description,
};

export default function HolidayPayPage() {
  return (
    <CalculatorLayout
      calculator={info}
      formula={`주휴수당 = 시급 × 주휴시간

주휴시간 = (주 소정근로시간 / 40) × 8
(단, 주 40시간 이상이면 주휴시간 = 8시간)

주휴수당 포함 실질시급 = 시급 + (주휴수당 / 주 소정근로시간)

조건: 주 15시간 이상 근무해야 주휴수당 발생`}
      source="근로기준법 제55조 (휴일)"
      faq={[
        {
          q: "주휴수당을 받을 수 있는 조건은?",
          a: "주 15시간 이상 근무하고, 소정근로일을 개근한 경우 주휴수당을 받을 수 있습니다. 아르바이트도 해당됩니다.",
        },
        {
          q: "주휴수당을 안 주면 어떻게 하나요?",
          a: "주휴수당은 법적 의무입니다. 지급하지 않으면 근로기준법 위반으로, 고용노동부에 신고할 수 있습니다.",
        },
      ]}
    >
      <HolidayPayCalculator />
    </CalculatorLayout>
  );
}
