"use client";

import Container from "../_components/container";
import Fadein from "../_components/fadein";
import Title from "../_components/title";

const AboutPage = () => {
  return (
    <Container>
      <div className="flex flex-col gap-6 p-8">
        <Fadein>
          <Title title={"Eventiのビジョン"} />
        </Fadein>
        <Fadein>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <p className="max-w-2xl">
              Eventiは全国各地の若者が、社会課題を解決するためにチャレンジするための環境を整えることをビジョンに活動しています。そのための起爆剤を作るために、「イベント・インターン」に活発に参加できるプラットフォームを提供しています。
              <br />
              私たちの使命は、全国の若者が挑戦で溢れ、未来に多くの希望を持てる社会の実現を目指すことです。私たちは次のことを約束します。
            </p>
          </div>
        </Fadein>
        <Fadein>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <p className="max-w-2xl">
              私たちは社会への貢献を大切にし、教育・環境・健康など、多くの分野で支援を行なっていきます。社会とより良くしてくための起爆剤となります。
              ビジョンの達成は、私たちの行動と製品に反映されています。私たちが提供する全てのソリューションは、持続可能性、革新、そして価値創造に焦点を当てています。
            </p>
          </div>
        </Fadein>
        <Fadein>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <p className="max-w-2xl">
              パートナーシップと共感：
              お客様、パートナー、社員、そしてコミュニティとの強力なパートナーシップを築きます。私たちは共感し、共に成長し、成功を共有します。
            </p>
            <p className="max-w-2xl">
              革新的なソリューションの提供：
              常に最新のテクノロジーと知識を活用し、お客様に最高品質の製品とサービスを提供します。私たちは革新を推進し、業界の基準を高めます。
            </p>
          </div>
        </Fadein>
      </div>
    </Container>
  );
}

export default AboutPage;