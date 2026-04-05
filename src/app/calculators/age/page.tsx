import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { AgeCalculator } from "./AgeCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const info = getCalculator("age")!;

export const metadata: Metadata = {
  title: info.title,
  description: info.description,
};

export default function AgePage() {
  return (
    <CalculatorLayout
      calculator={info}
      formula={`만 나이 = 현재 날짜 기준, 생일이 지났으면 (올해 - 출생연도), 안 지났으면 (올해 - 출생연도 - 1)

2023년 6월 28일부터 대한민국은 만 나이 통일법이 시행되어, 법적·행정적으로 만 나이만 사용합니다.`}
      source="만 나이 통일법 (민법 제158조 개정, 2023.06.28 시행)"
      faq={[
        {
          q: "만 나이와 한국 나이의 차이는?",
          a: "한국 나이(세는 나이)는 태어나자마자 1살이고 매년 1월 1일에 한 살이 추가됩니다. 만 나이는 태어난 날을 0살로 시작하고 생일마다 한 살이 추가됩니다. 2023년부터 법적으로 만 나이만 사용합니다.",
        },
        {
          q: "만 나이 계산은 어디에 쓰이나요?",
          a: "주���등록, 선거권, 군 입대, 음주/흡연 가능 나이, 각종 계약서 등 모든 법적·행정적 상황에서 만 나이가 적용됩니다.",
        },
      ]}
    >
      <AgeCalculator />
    </CalculatorLayout>
  );
}
