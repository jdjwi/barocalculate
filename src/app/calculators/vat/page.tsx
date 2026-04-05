import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { VatCalculator } from "./VatCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const info = getCalculator("vat")!;

export const metadata: Metadata = { title: info.title, description: info.description };

export default function VatPage() {
  return (
    <CalculatorLayout
      calculator={info}
      formula={`부가가치세 = 공급가액 × 10%
합계금액 = 공급가액 + 부가가치세

역산 (합계금액에서 공급가액 구하기):
  공급가액 = 합계금액 / 1.1
  부가가치세 = 합계금액 - 공급가액`}
      source="부가가치세법 제30조"
      faq={[
        {
          q: "부가가치세 신고는 언제 하나요?",
          a: "일반과세자는 1월(7-12월분)과 7월(1-6월분), 간이과세자는 1월(1-12월분)에 신고합니다.",
        },
      ]}
    >
      <VatCalculator />
    </CalculatorLayout>
  );
}
