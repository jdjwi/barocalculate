"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

/**
 * URL 파라미터와 동기화되는 state.
 * 공유 링크를 열면 같은 입력값이 복원됨.
 */
export function useShareableState(
  key: string,
  defaultValue: string
): [string, (v: string) => void] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const paramValue = searchParams.get(key);
  const [value, setValue] = useState(paramValue ?? defaultValue);

  // URL에서 값 복원 (최초 로드 시)
  useEffect(() => {
    if (paramValue !== null && paramValue !== value) {
      setValue(paramValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateValue = useCallback(
    (newValue: string) => {
      setValue(newValue);

      // URL 파라미터 업데이트 (히스토리에 안 쌓이게 replace)
      const params = new URLSearchParams(searchParams.toString());
      if (newValue === defaultValue) {
        params.delete(key);
      } else {
        params.set(key, newValue);
      }
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [key, defaultValue, searchParams, router, pathname]
  );

  return [value, updateValue];
}
