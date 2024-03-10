"use client";

import Container from "../_components/container";
import Fadein from "../_components/fadein";
import Title from "../_components/title";

const ServicesPage = () => {
  return (
    <Container>
      <div className="flex flex-col gap-6 p-8">
        <Fadein>
          <Title title={"インターン・イベントまとめサイトです"} />
        </Fadein>
        <Fadein>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <p className="max-w-2xl">
              参加実績を可視化：
              あなたがこれまで参加した「インターン・イベント」の情報が全て履歴に残ります。
              これまでの活動を可視化したプロフィールが作成できます。
            </p>
            <p className="max-w-2xl">
              社会に出るための第一歩に：
              プロフィールを見た企業や主催者があなたにオファーを送る。
              一歩を踏み出しやすく、チャレンジができるようになります。
            </p>
          </div>
        </Fadein>
        {/* <Fadein>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <p className="max-w-2xl">
              参加実績を可視化：
              あなたがこれまで参加した「インターン・イベント」の情報が全て履歴に残ります。
              これまでの活動を可視化したプロフィールが作成できます。
            </p>
            <p className="max-w-2xl">
              社会に出るための第一歩に：
              プロフィールを見た企業や主催者があなたにオファーを送る。
              一歩を踏み出しやすく、チャレンジができるようになります。
            </p>
          </div>
        </Fadein> */}
      </div>
    </Container>
  );
}

export default ServicesPage;