import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { SalaryCalculator } from "./SalaryCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const info = getCalculator("salary")!;

export const metadata: Metadata = {
  title: info.title,
  description: info.description,
};

export default function SalaryPage() {
  return (
    <CalculatorLayout
      calculator={info}
      formula={`월 실수령액 = 월 급여 - 4대보험(근로자 부담분) - 소득세 - 지방소득세

4대보험 근로자 부담분 (2026년):
  국민연금: 4.5% (월 기준소득월액 상한 617만원)
  건강보험: 3.54%
  장기요양보험: 건강보험료의 12.95%
  고용보험: 0.9%

소득세: 근로소득 간이세액표 기준
지방소득세: 소득세의 10%

비과세액(식대 등)은 과세 대상에서 제외됩니다.`}
      source="국세청 근로소득 간이세액표, 4대보험 요율표 (2026년)"
      faq={[
        {
          q: "비과세액은 뭔가요?",
          a: "식대(월 20만원 한도), 자가운전보조금(월 20만원), 출산·보육수당(월 20만원) 등이 비과세 항목입니다. 비과세액은 4대보험과 소득세 계산에서 제외되어 실수령액이 늘어납니다.",
        },
        {
          q: "실제 급여와 차이가 나는 이유는?",
          a: "이 계산기는 간이세액표 기반 추정치입니다. 실제 급여는 회사의 비과세 항목, 연말정산 결과, 추가 공제 등에 따라 달라질 수 있습니다.",
        },
      ]}
    >
      <SalaryCalculator />
    </CalculatorLayout>
  );
}
