import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { BmrCalculator } from "./BmrCalculator";
import { CalculatorLayout } from "@/components/CalculatorLayout";

const info = getCalculator("bmr")!;

export const metadata: Metadata = {
  title: info.title,
  description: info.description,
};

export default function BmrPage() {
  return (
    <CalculatorLayout
      calculator={info}
      formula={`Mifflin-St Jeor 공식 (가장 정확한 BMR 공식):

남성: BMR = (10 × 체중kg) + (6.25 × 키cm) - (5 × 나이) + 5
여성: BMR = (10 × 체중kg) + (6.25 × 키cm) - (5 × 나이) - 161

일일 권장 칼로리 (TDEE) = BMR × 활동 계수
  비활동적 (사무직): × 1.2
  약간 활동적 (주 1-3회 운동): × 1.375
  활동적 (주 3-5회 운동): × 1.55
  매우 활동적 (주 6-7회 운동): × 1.725`}
      source="Mifflin MD, St Jeor ST, et al. (1990). American Journal of Clinical Nutrition"
      faq={[
        {
          q: "기초대사량(BMR)이 뭔가요?",
          a: "기초대사량은 아무것도 하지 않고 가만히 있을 때 몸이 생존을 위해 소비하는 최소 에너지입니다. 심장 박동, 호흡, 체온 유지 등에 사용됩니다. 전체 에너지 소비의 60-75%를 차지합니다.",
        },
        {
          q: "다이어트할 때 기초대사량 이하로 먹으면 안 되나요?",
          a: "기초대사량 이하로 섭취하면 몸이 에너지 절약 모드에 들어가 근육이 분해되고, 요요 현상이 올 수 있습니다. 건강한 다이어트는 TDEE에서 300-500kcal 정도 줄이는 것을 권장합니다.",
        },
      ]}
    >
      <BmrCalculator />
    </CalculatorLayout>
  );
}
