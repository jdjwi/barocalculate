// 2026년 기준 — 매년 1월 업데이트 필요

/** 4대보험 요율 (근로자 부담분) */
export const INSURANCE_RATES_2026 = {
  nationalPension: 0.045, // 국민연금 4.5%
  healthInsurance: 0.0354, // 건강보험 3.54%
  longTermCare: 0.1295, // 장기요양보험 (건강보험료의 12.95%)
  employmentInsurance: 0.009, // 고용보험 0.9%
} as const;

/** 국민연금 상한/하한 (월 기준소득월액) */
export const PENSION_LIMITS_2026 = {
  min: 390_000, // 하한
  max: 6_170_000, // 상한
} as const;

/** 건강보험 상한 (월 보수월액) */
export const HEALTH_LIMITS_2026 = {
  max: 119_625_106, // 상한 (연)
} as const;

/** 근로소득세 간이세액표 기반 소득세율 (2026년) */
export const INCOME_TAX_BRACKETS_2026 = [
  { min: 0, max: 14_000_000, rate: 0.06, deduction: 0 },
  { min: 14_000_000, max: 50_000_000, rate: 0.15, deduction: 1_260_000 },
  { min: 50_000_000, max: 88_000_000, rate: 0.24, deduction: 5_760_000 },
  { min: 88_000_000, max: 150_000_000, rate: 0.35, deduction: 15_440_000 },
  { min: 150_000_000, max: 300_000_000, rate: 0.38, deduction: 19_940_000 },
  { min: 300_000_000, max: 500_000_000, rate: 0.40, deduction: 25_940_000 },
  { min: 500_000_000, max: 1_000_000_000, rate: 0.42, deduction: 35_940_000 },
  { min: 1_000_000_000, max: Infinity, rate: 0.45, deduction: 65_940_000 },
] as const;

/** 지방소득세: 소득세의 10% */
export const LOCAL_TAX_RATE = 0.1;

/** 최저시급 */
export const MIN_WAGE_2026 = 10_030; // 원

/** 주휴수당 기준: 주 15시간 이상 근무 */
export const WEEKLY_HOURS_THRESHOLD = 15;

/** 부가가치세율 */
export const VAT_RATE = 0.1; // 10%

/** 근로소득공제 */
export function getEmploymentDeduction(totalPay: number): number {
  if (totalPay <= 5_000_000) return totalPay * 0.7;
  if (totalPay <= 15_000_000) return 3_500_000 + (totalPay - 5_000_000) * 0.4;
  if (totalPay <= 45_000_000) return 7_500_000 + (totalPay - 15_000_000) * 0.15;
  if (totalPay <= 100_000_000) return 12_000_000 + (totalPay - 45_000_000) * 0.05;
  return 14_750_000 + (totalPay - 100_000_000) * 0.02;
}

/** 인적공제 기본공제 */
export const PERSONAL_DEDUCTION = 1_500_000; // 본인 150만원
