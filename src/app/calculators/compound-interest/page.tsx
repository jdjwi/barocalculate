import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { CompoundInterestCalculator } from "./CompoundInterestCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const info = getCalculator("compound-interest")!;

export const metadata: Metadata = {
  title: info.title,
  description: info.description,
};

export default function CompoundInterestPage() {
  return (
    <CalculatorLayout
      calculator={info}
      formula={`복리 공식: A = P × (1 + r/n)^(n×t)

A = 최종 금액
P = 원금
r = 연이율 (소수)
n = 연간 복리 횟수 (12 = 월복리)
t = 기간 (년)

총 이자 = A - P
실질 수익률 = (A / P - 1) × 100%`}
      source="기본 금융 수학 공식"
      faq={[
        {
          q: "단리와 복리의 차이는?",
          a: "단리는 원금에만 이자가 붙지만, 복리는 이자에도 이자가 붙습니다. 기간이 길수록 복리 효과가 커집니다. 예를 들어 1,000만원을 연 5% 복리로 30년 투자하면 약 4,322만원이 되지만, 단리로는 2,500만원에 불과합니다.",
        },
        {
          q: "적금도 복리인가요?",
          a: "대부분의 한국 은행 적금은 단리입니다. 복리 적금도 일부 있지만, 실제 금리 차이는 크지 않습니다. 장기 투자(펀드, ETF 등)에서 복리 효과가 더 크게 나타납니다.",
        },
      ]}
    >
      <CompoundInterestCalculator />
    </CalculatorLayout>
  );
}
