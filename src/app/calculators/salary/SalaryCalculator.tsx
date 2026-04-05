"use client";

import { useState, useMemo } from "react";
import { NumberInput } from "@/components/NumberInput";
import { ResultCard } from "@/components/ResultCard";
import { formatWon, formatNumber, toNumber } from "@/lib/format";
import {
  INSURANCE_RATES_2026,
  PENSION_LIMITS_2026,
  INCOME_TAX_BRACKETS_2026,
  LOCAL_TAX_RATE,
  getEmploymentDeduction,
  PERSONAL_DEDUCTION,
} from "@/data/rates";

function calcIncomeTax(taxableIncome: number): number {
  for (const bracket of INCOME_TAX_BRACKETS_2026) {
    if (taxableIncome <= bracket.max) {
      return taxableIncome * bracket.rate - bracket.deduction;
    }
  }
  const last = INCOME_TAX_BRACKETS_2026[INCOME_TAX_BRACKETS_2026.length - 1];
  return taxableIncome * last.rate - last.deduction;
}

export function SalaryCalculator() {
  const [annualSalary, setAnnualSalary] = useState("40000000");
  const [nonTaxable, setNonTaxable] = useState("200000");
  const [dependents, setDependents] = useState("1");

  const result = useMemo(() => {
    const annual = toNumber(annualSalary);
    const nonTax = toNumber(nonTaxable);
    const deps = Math.max(1, toNumber(dependents));
    if (annual <= 0) return null;

    const monthlyGross = annual / 12;
    const monthlyTaxable = monthlyGross - nonTax;

    // 4대보험 (월 기준)
    const pensionBase = Math.min(Math.max(monthlyTaxable, PENSION_LIMITS_2026.min), PENSION_LIMITS_2026.max);
    const pension = Math.round(pensionBase * INSURANCE_RATES_2026.nationalPension);
    const health = Math.round(monthlyTaxable * INSURANCE_RATES_2026.healthInsurance);
    const longTermCare = Math.round(health * INSURANCE_RATES_2026.longTermCare);
    const employment = Math.round(monthlyTaxable * INSURANCE_RATES_2026.employmentInsurance);
    const totalInsurance = pension + health + longTermCare + employment;

    // 소득세 (연 기준으로 계산 후 월 환산)
    const annualTaxable = monthlyTaxable * 12;
    const employmentDeduction = getEmploymentDeduction(annualTaxable);
    const personalDeduction = PERSONAL_DEDUCTION * deps;
    const taxBase = Math.max(0, annualTaxable - employmentDeduction - personalDeduction);
    const annualIncomeTax = Math.max(0, calcIncomeTax(taxBase));
    const monthlyIncomeTax = Math.round(annualIncomeTax / 12);
    const monthlyLocalTax = Math.round(monthlyIncomeTax * LOCAL_TAX_RATE);

    const totalDeductions = totalInsurance + monthlyIncomeTax + monthlyLocalTax;
    const takeHome = monthlyGross - totalDeductions;
    const deductionRate = (totalDeductions / monthlyGross) * 100;

    return {
      monthlyGross,
      takeHome,
      totalDeductions,
      deductionRate,
      pension,
      health,
      longTermCare,
      employment,
      totalInsurance,
      monthlyIncomeTax,
      monthlyLocalTax,
    };
  }, [annualSalary, nonTaxable, dependents]);

  return (
    <div className="space-y-6">
      <NumberInput
        label="연봉"
        value={annualSalary}
        onChange={setAnnualSalary}
        suffix="원"
        placeholder="40000000"
      />

      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label="비과세액 (월)"
          value={nonTaxable}
          onChange={setNonTaxable}
          suffix="원"
          placeholder="200000"
        />
        <NumberInput
          label="부양가족 수 (본인 포함)"
          value={dependents}
          onChange={setDependents}
          suffix="명"
          placeholder="1"
        />
      </div>

      {result && (
        <>
          {/* 판정 */}
          <div className="border-t pt-6">
            <p className="text-lg font-semibold">
              월 실수령액은 {formatWon(result.takeHome)}입니다.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              월급 {formatWon(result.monthlyGross)}에서 {formatNumber(result.deductionRate, 1)}%가 공제됩니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <ResultCard label="월 실수령액" value={formatWon(result.takeHome)} size="large" />
            <ResultCard label="월 공제 합계" value={formatWon(result.totalDeductions)} size="large" />
          </div>

          {/* 공제 내역 */}
          <div className="space-y-2">
            <p className="text-[13px] text-muted-foreground">공제 내역</p>
            {[
              { label: "국민연금", value: result.pension },
              { label: "건강보험", value: result.health },
              { label: "장기요양보험", value: result.longTermCare },
              { label: "고용보험", value: result.employment },
              { label: "소득세", value: result.monthlyIncomeTax },
              { label: "지방소득세", value: result.monthlyLocalTax },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="num font-medium">−{formatWon(item.value)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between text-sm font-semibold border-t pt-2">
              <span>합계</span>
              <span className="num">−{formatWon(result.totalDeductions)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
