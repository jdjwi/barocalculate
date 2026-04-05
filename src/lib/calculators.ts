export interface CalculatorInfo {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: "viral" | "finance" | "health" | "life" | "tax";
}

export const CATEGORIES = {
  viral: "인기",
  finance: "금융",
  health: "건강",
  life: "생활",
  tax: "세금",
} as const;

export const calculators: CalculatorInfo[] = [
  // === 바이럴 (재미/공유) ===
  {
    slug: "life-progress",
    title: "내 인생 몇 % 왔을까",
    shortTitle: "인생 진행률",
    description: "생년월일을 입력하면 인생 진행률과 남은 것들을 알려드립니다.",
    category: "viral",
  },
  {
    slug: "time-with-parents",
    title: "부모님과 남은 시간 알아보기",
    shortTitle: "부모님과 남은 시간",
    description: "부모님을 얼마나 더 만날 수 있는지, 숫자로 보여드립니다.",
    category: "viral",
  },
  {
    slug: "remaining-weekends",
    title: "은퇴까지 남은 주말",
    shortTitle: "남은 주말",
    description: "남은 주말이 생각보다 적습니다.",
    category: "viral",
  },
  {
    slug: "delivery-savings",
    title: "배달비만 모았으면 뭘 살 수 있었을까",
    shortTitle: "배달비 모았으면",
    description: "배달 습관을 돈으로 환산하면 놀랍습니다.",
    category: "viral",
  },
  {
    slug: "meeting-cost",
    title: "이 회의 얼마짜리인지 알아보기",
    shortTitle: "회의 비용",
    description: "참석자 수와 시간을 넣으면 이 회의의 진짜 비용을 알려드립니다.",
    category: "viral",
  },
  {
    slug: "time-value",
    title: "내 시간은 얼마짜리인지 알아보기",
    shortTitle: "내 시간의 가치",
    description: "월급을 시간으로 환산하면 넷플릭스 1시간이 내 노동 몇 분인지 알 수 있습니다.",
    category: "viral",
  },
  {
    slug: "sleep-time",
    title: "잠에 인생 얼마나 쓰고 있을까",
    shortTitle: "잠에 쓴 시간",
    description: "지금까지 잠에 쓴 시간을 계산합니다. 생각보다 많습니다.",
    category: "viral",
  },
  {
    slug: "commute-life",
    title: "출퇴근에 인생 얼마나 쓰나",
    shortTitle: "출퇴근에 쓴 인생",
    description: "출퇴근 시간이 인생에서 얼마를 차지하는지 알려드립니다.",
    category: "viral",
  },
  {
    slug: "kimbap-converter",
    title: "삼각김밥으로 환산하기",
    shortTitle: "삼각김밥 환산기",
    description: "아무 금액이나 넣으면 삼각김밥 몇 개인지 알려드립니다.",
    category: "viral",
  },
  {
    slug: "burn-calories",
    title: "이 음식 태우려면 얼마나 뛰어야 할까",
    shortTitle: "음식 칼로리 소모",
    description: "먹은 음식의 칼로리를 운동으로 환산합니다.",
    category: "viral",
  },
  {
    slug: "sleep-debt",
    title: "내 수면 빚 알아보기",
    shortTitle: "수면 빚",
    description: "이번 주 얼마나 잠이 부족한지 계산합니다.",
    category: "viral",
  },
  {
    slug: "hundred-million",
    title: "1억 모으려면 얼마나 걸릴까",
    shortTitle: "1억 모으기",
    description: "현재 저축 속도로 1억까지 얼마나 걸리는지 알려드립니다.",
    category: "viral",
  },
  // === 실용 ===
  {
    slug: "salary",
    title: "내 연봉의 실수령액 알아보기",
    shortTitle: "연봉 실수령액",
    description: "연봉을 입력하면 4대보험과 세금을 떼고 실제로 받는 월급을 알려드립니다.",
    category: "finance",
  },
  {
    slug: "loan-interest",
    title: "내 대출 이자가 얼마인지 알아보기",
    shortTitle: "대출 이자",
    description: "대출 금액, 금리, 기간을 입력하면 월 상환액과 총 이자를 알려드립니다.",
    category: "finance",
  },
  {
    slug: "compound-interest",
    title: "내 돈이 얼마나 불어나는지 알아보기",
    shortTitle: "복리 수익",
    description: "원금을 넣으면 이자로 얼마를 벌 수 있는지 알려드립니다.",
    category: "finance",
  },
  {
    slug: "severance",
    title: "내 퇴직금이 얼마인지 알아보기",
    shortTitle: "퇴직금",
    description: "재직기간과 급여를 입력하면 받을 수 있는 퇴직금을 알려드립니다.",
    category: "finance",
  },
  {
    slug: "vat",
    title: "부가세가 얼마인지 알아보기",
    shortTitle: "부가가치세",
    description: "공급가액 또는 합계금액에서 부가세를 계산합니다.",
    category: "tax",
  },
  {
    slug: "holiday-pay",
    title: "내 주휴수당 알아보기",
    shortTitle: "주휴수당",
    description: "시급과 근무시간을 입력하면 주휴수당과 실질 시급을 알려드립니다.",
    category: "tax",
  },
  {
    slug: "bmi",
    title: "내 체중이 정상인지 알아보기",
    shortTitle: "체중 정상 범위",
    description: "키와 몸무게를 입력하면 정상인지 판정해드립니다.",
    category: "health",
  },
  {
    slug: "bmr",
    title: "하루에 몇 칼로리 먹어야 하는지 알아보기",
    shortTitle: "하루 권장 칼로리",
    description: "내 몸에 맞는 하루 칼로리 섭취량을 알려드립니다.",
    category: "health",
  },
  {
    slug: "area",
    title: "우리 집 몇 평인지 알아보기",
    shortTitle: "평수 변환",
    description: "제곱미터를 평으로, 평을 제곱미터로 바꿔드립니다.",
    category: "life",
  },
  {
    slug: "age",
    title: "내 만 나이 알아보기",
    shortTitle: "만 나이",
    description: "생년월일을 입력하면 법적 만 나이를 알려드립니다.",
    category: "life",
  },
];

export function getCalculator(slug: string): CalculatorInfo | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function getViralCalculators() {
  return calculators.filter((c) => c.category === "viral");
}

export function getPracticalCalculators() {
  return calculators.filter((c) => c.category !== "viral");
}
