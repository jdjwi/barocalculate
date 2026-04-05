import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { LoanInterestCalculator } from "./LoanInterestCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const info = getCalculator("loan-interest")!;

export const metadata: Metadata = { title: info.title, description: info.description };

export default function LoanInterestPage() {
  return (
    <CalculatorLayout
      calculator={info}
      formula={`원리금균등상환:
  월 상환액 = 대출원금 × [r(1+r)^n / ((1+r)^n - 1)]
  (r = 월이율, n = 총 상환 개월수)

원금균등상환:
  월 원금 = 대출원금 / n
  월 이자 = 잔여원금 × r
  월 상환액 = 월 원금 + 월 이자 (매월 감소)`}
      source="기본 금융 수학 공식"
      faq={[
        {
          q: "원리금균등과 원금균등의 차이는?",
          a: "원리금균등은 매달 같은 금액을 상환합니다. 초기에 이자 비중이 크고 점차 원금 비중이 커집니다. 원금균등은 매달 같은 원금을 상환하고 이자는 줄어들어, 초기 부담은 크지만 총 이자가 적습니다.",
        },
        {
          q: "어떤 상환 방식이 유리한가요?",
          a: "총 이자 부담은 원금균등이 적습니다. 하지만 초기 상환 부담이 크므로, 소득이 일정하다면 원리금균등이 관리하기 편합니다.",
        },
      ]}
    >
      <LoanInterestCalculator />
    </CalculatorLayout>
  );
}
