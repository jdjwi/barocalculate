import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { AreaCalculator } from "./AreaCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const info = getCalculator("area")!;

export const metadata: Metadata = {
  title: info.title,
  description: info.description,
};

export default function AreaPage() {
  return (
    <CalculatorLayout
      calculator={info}
      formula={`1평 = 3.3058㎡ (정확히 400/121 ㎡)
1㎡ = 0.3025평

예시: 전용면적 84㎡ = 약 25.42평`}
      source="대한민국 도량형법, 부동산 거래 관행"
      faq={[
        {
          q: "전용면적과 공급면적의 차이는?",
          a: "전용면적은 실제로 사용할 수 있는 면적이고, 공급면적은 전용면적 + 주거 공용면적(계단, 복도 등)입니다. 아파트 광고에서 '84㎡'는 보통 전용면적을 의미합니다.",
        },
        {
          q: "왜 아직 '평'을 사용하나요?",
          a: "2007년부터 공식적으로 ㎡만 사용하도록 법이 바뀌었지만, 실생활에서는 여전히 '평'이 더 직관적이라 많이 사용됩니다. 대부분의 부동산 대화에서 평수를 기준으로 이야기합니다.",
        },
      ]}
    >
      <AreaCalculator />
    </CalculatorLayout>
  );
}
