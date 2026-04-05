/** 숫자를 한국식 천 단위 구분으로 포맷 */
export function formatNumber(n: number, decimals = 0): string {
  return n.toLocaleString("ko-KR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** 숫자를 원화로 포맷 */
export function formatWon(n: number): string {
  return `${formatNumber(Math.round(n))}원`;
}

/** 숫자를 퍼센트로 포맷 */
export function formatPercent(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`;
}

/** 입력값을 숫자로 ���전하게 변환 */
export function toNumber(value: string, fallback = 0): number {
  const n = parseFloat(value.replace(/,/g, ""));
  return isNaN(n) ? fallback : n;
}
