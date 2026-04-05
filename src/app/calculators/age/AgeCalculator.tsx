"use client";

import { useState, useMemo } from "react";
import { ResultCard } from "@/components/ResultCard";

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("1995-01-01");

  const result = useMemo(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    if (age < 0) return null;

    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil(
      (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalDays = Math.floor(
      (today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
    );
    const koreanAge = today.getFullYear() - birth.getFullYear() + 1;
    const birthYear = birth.getFullYear();

    return { age, daysUntilBirthday, totalDays, koreanAge, birthYear };
  }, [birthDate]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-[13px] text-muted-foreground mb-1.5">
          생년월일
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
        />
      </div>

      {result && (
        <>
          <div className="border-t pt-6">
            <p className="text-lg font-semibold">
              만 {result.age}세입니다.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {result.birthYear}년생 · 한국 나이 {result.koreanAge}세 (참고용)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <ResultCard
              label="다음 생일까지"
              value={`${result.daysUntilBirthday}일`}
            />
            <ResultCard
              label="태어난 지"
              value={`${result.totalDays.toLocaleString("ko-KR")}일`}
            />
          </div>
        </>
      )}
    </div>
  );
}
