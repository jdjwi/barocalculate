import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { SeveranceCalculator } from "./SeveranceCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const info = getCalculator("severance")!;

export const metadata: Metadata = { title: info.title, description: info.description };

export default function SeverancePage() {
  return (
    <CalculatorLayout
      calculator={info}
      formula={`퇴직금 = 1일 평균임금 × 30일 × (재직일수 / 365)

1일 평균임금 = 최근 3개월 총 급여 / 최근 3개월 총 일수(약 90일)

조건: 1년 이상 근무한 근로자에게 지급 (주 15시간 이상 근무)`}
      source="근로기준법 제34조 (퇴직급여제도)"
      faq={[
        {
          q: "1년 미만 근무하면 퇴직금을 못 받나요?",
          a: "네. 1년 이상 계속 근무한 근로자에게만 퇴직금이 발생합니다. 11개월 29일 근무하면 퇴직금이 없습니다.",
        },
        {
          q: "퇴직금에 세금이 붙나요?",
          a: "네. 퇴직소득세가 부과되지만, 근속연수가 길수록 공제가 커져 세금 부담이 줄어듭니다. 이 계산기는 세전 퇴직금을 계산합니다.",
        },
      ]}
    >
      <SeveranceCalculator />
    </CalculatorLayout>
  );
}
