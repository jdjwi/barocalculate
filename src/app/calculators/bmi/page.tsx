import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { BmiCalculator } from "./BmiCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const info = getCalculator("bmi")!;

export const metadata: Metadata = {
  title: info.title,
  description: info.description,
};

export default function BmiPage() {
  return (
    <CalculatorLayout
      calculator={info}
      formula={`BMI = 체중(kg) ÷ 키(m)²

대한비만학회 기준 (아시아 기준):
  저체중: BMI < 18.5
  정상: 18.5 ≤ BMI < 23
  과체중: 23 ≤ BMI < 25
  비만 1단계: 25 ≤ BMI < 30
  비만 2단계: 30 ≤ BMI < 35
  비만 3단계 (고도비만): BMI ≥ 35`}
      source="대한비만학회 비만 진료��침 2022"
      faq={[
        {
          q: "BMI가 정확한 건강 지표인가요?",
          a: "BMI는 간단한 스크리닝 도구이지, 정확한 건강 지표는 아닙니다. 근육량이 많은 운동선수는 BMI가 높게 나올 수 있고, 체지방률, 허리둘레 등을 함께 고려해야 합니다.",
        },
        {
          q: "한국 기준이 세계 기준과 다른가요?",
          a: "네. WHO 기준은 BMI 25 이상을 과체중으로 보지만, 대한비만학회(아시아 기준)는 23 이상을 과체중으로 봅니다. 아시아인은 같은 BMI에서도 체지방률이 더 높은 경향이 있기 때문입니다.",
        },
      ]}
    >
      <BmiCalculator />
    </CalculatorLayout>
  );
}
