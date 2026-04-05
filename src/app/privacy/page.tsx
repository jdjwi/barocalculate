import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-xl font-semibold tracking-tight">개인정보처리방침</h1>
      <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-medium text-foreground">1. 수집하는 개인정보</h2>
          <p>
            바로계산은 별도의 회원가입 없이 이용 가능하며, 사용자의 개인정보를 직접 수집하지 않습니다.
            계산기에 입력하는 값(키, 몸무게, 연봉 등)은 사용자의 브라우저에서만 처리되며 서버로 전송되지 않습니다.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-foreground">2. 쿠키 및 분석 도구</h2>
          <p>
            본 사이트는 서비스 개선을 위해 Google Analytics(GA4)를 사용할 수 있습니다.
            GA4는 쿠키를 통해 익명화된 방문 데이터(페이지 조회수, 방문 시간 등)를 수집합니다.
            수집된 데이터는 개인을 식별할 수 없는 형태로 처리됩니다.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-foreground">3. 광고</h2>
          <p>
            본 사이트는 Google AdSense를 통해 광고를 게재할 수 있습니다.
            Google AdSense는 쿠키를 사용하여 사용자의 관심사에 기반한 광고를 표시합니다.
            광고 개인화를 원하지 않으시면 Google 광고 설정에서 변경할 수 있습니다.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-foreground">4. 면책조항</h2>
          <p>
            본 사이트의 계산 결과는 참고용이며, 법적·재무적 의사결정의 근거로 사용할 수 없습니다.
            정확한 금액은 관할 기관 또는 전문가에게 확인하시기 바랍니다.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-foreground">5. 문의</h2>
          <p>
            개인정보 관련 문의사항이 있으시면 아래로 연락해주세요.
          </p>
          <p className="mt-1">이메일: contact@barogyesan.com</p>
        </section>
        <p className="text-xs text-muted-foreground/60 pt-4 border-t">
          시행일: 2026년 4월 5일
        </p>
      </div>
    </div>
  );
}
