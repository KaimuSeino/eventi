import { IconBadge } from "@/components/IconBadge";
import { Preview } from "@/components/Preview";
import { Button } from "@/components/ui/button";
import { Grip, LayoutDashboard, ListChecks } from "lucide-react";
import Image from "next/image";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { ComfirmModalTitle } from "./confrim-mobal-title"

const detail = `<h2><strong>自己紹介</strong></h2><p><br></p><p>こんにちは！Eventi株式会社です。挑戦する学生を応援するプラットフォームEventiを運営しています。</p><p>インターン・イベントに参加し、学びを得たことが可視化され自己分析ができるようになったり、可視化された学びを就活でそのまま使用でき、あなたの学びや考えに共感した企業からオファーをもらうことができます。</p><p>Eventiは主に、学生向け起業家育成イベント・ワークショップを開催しています。</p><p><br></p><p>ホームページはこちら</p><p><a href="https://www.eventi.jp" rel="noopener noreferrer" target="_blank">https://www.eventi.jp</a></p><p><br></p><h2><strong>このプロジェクトで実現したいこと</strong></h2><p><br></p><p>挑戦したい学生の背中を押し、起業までの道のりを示したいと思っています！</p><p>あなたの実現したい未来をかなえるため全力でサポートします！</p><p><br></p><h2><strong>プロジェクトの立ち上げ背景</strong></h2><p><br></p><p>今、日本は世界と比べて起業をする若者が少ないのが現状です。</p><p>世界では、数多くのスタートアップが価値を創出しイノベーションを起こしてきました。しかし、日本ではそのようなイノベーションが起きておらず、経済が低迷し、世界から遅れを取っています。</p><p>そのため、日本の若者に未来の日本を担う人材になり、世界と勝負できる人材を育てたいという思いがあります！</p><p><br></p><h2><strong>スケジュール</strong></h2><p><br></p><h3><em>Day１：2024年5月6日（月）13:00~17:00</em></h3><p>①テーマ｜ビジネスアイデアの創出</p><p>②テーマ｜市場分析とターゲットの特定</p><p>目標｜アイデアのブレインストーミングと市場への適応性検証</p><p><br></p><h3><em>Day２：2024年5月7日（火）14:00~18:00</em></h3><p>テーマ｜ビジネスモデルの開発</p><p>目標｜ビジネスモデルキャンバスを用いたビジネスプランの構築</p><p><br></p><h3><em>Day３：2024年5月8日（水）14:00~18:00</em></h3><p>テーマ｜財務計画と資金調達</p><p>目標｜財務計画の策定と資金調達戦略の立案</p><p><br></p><h3><em>Day４：2024年5月14日（火）13:00~17:00</em></h3><p>テーマ｜プレゼンテーションスキルとピッチ練習</p><p>目標｜効果的なプレゼンテーションの作成とピッチの練習</p><p><br></p><h3><em>Day５：2024年5月21日（火）10:00~14:00</em></h3><p>テーマ｜最終ピッチセッション</p><p>目標｜投資家を前にしたビジネスプランの発表</p><p><br></p><h2><strong>開催地</strong></h2><p><br></p><p>便利なコワーキングスペース</p><p><br></p><h2><strong>料金</strong></h2><p><br></p><p>無料</p><p><br></p><h2><strong>定員</strong></h2><p><br></p><p>40名</p><p><br></p><h2><strong>募集対象</strong></h2><p><br></p><p>全国の若手起業家および起業に興味がある若者（20歳〜35歳）</p><p><br></p><h2><strong>最後に</strong></h2><p><br></p><p>みなさんの挑戦をお待ちしております！</p>`

const HostExamplePage01 = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={LayoutDashboard} />
          <h2 className="text-xl">
            イベントの編集
          </h2>
        </div>
        <div className="mt-4 border bg-slate-100 rounded-md p-4">
          <div className="font-medium flex items-center justify-between">
            イベントタイトル
            <ComfirmModalTitle>
              <Button variant="ghost">
                <FaRegCircleQuestion />
              </Button>
            </ComfirmModalTitle>
          </div>
          <p className="text-sm mt-2">
            次世代起業家育成キャンプ：革新的アイデアを現実に
          </p>
        </div>
        <div className="mt-4 border bg-slate-100 rounded-md p-4">
          <div className="font-medium flex items-center justify-between">
            概要文
          </div>
          <p className="text-sm mt-2">
            このプログラムは、創造力豊かな若手起業家を対象に、実践的なビジネススキルと起業精神を養うことを目的としています。参加者はチームを組み、実際の市場ニーズに基づくイノベーティブなビジネスプランを策定し、専門家のフィードバックを得ながらアイデアを磨き上げます。
          </p>
        </div>
        <div className="mt-4 border bg-slate-100 rounded-md p-4">
          <div className="font-medium flex items-center justify-between">
            画像
          </div>
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src="/donuts.png"
            />
          </div>
        </div>
        <div className="mt-4 border bg-slate-100 rounded-md p-4">
          <div className="font-medium flex items-center justify-between">
            カテゴリー
          </div>
          <p className="text-sm mt-2">
            起業
          </p>
        </div>
        <div className="mt-4 border bg-slate-100 rounded-md p-4">
          <div className="font-medium flex items-center justify-between">
            日付
          </div>
          <p className="text-sm mt-2">
            2024年3月25日 〜 2024年5月2日
          </p>
        </div>
        <div className="relative mt-4 border bg-slate-100 rounded-md p-4">
          <div className="font-medium flex items-center justify-between">
            アンケート
          </div>
          <div className="text-sm mt-2">
            <div className="flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm">
              <div className="px-2 py-3 border-r border-r-slate-200 rounded-l-md transition">
                <Grip className="h-5 w-5" />
              </div>
              １：満足度はどのくらいですか？
            </div>
            <div className="flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm">
              <div className="px-2 py-3 border-r border-r-slate-200 rounded-l-md transition">
                <Grip className="h-5 w-5" />
              </div>
              <Image
                height={20}
                width={20}
                alt="logo"
                src="/logo.png"
              />
              ２：
              <span>
                このプログラムで最も印象に残った学びは何ですか？学んだ内容について教えてください。
              </span>
            </div>
            <div className="flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm">
              <div className="px-2 py-3 border-r border-r-slate-200 rounded-l-md transition">
                <Grip className="h-5 w-5" />
              </div>
              <Image
                height={20}
                width={20}
                alt="logo"
                src="/logo.png"
              />
              ３：
              <span>
                このプログラムを通じて自分自身についての新たな発見を教えてください。
              </span>
            </div>
            <div className="flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm">
              <div className="px-2 py-3 border-r border-r-slate-200 rounded-l-md transition">
                <Grip className="h-5 w-5" />
              </div>
              ４：
              <span>
                イベントのどの部分が最も有益だったと感じますか？また、改善が必要だと感じた部分はありますか？
              </span>
            </div>
            <div className="flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm">
              <div className="px-2 py-3 border-r border-r-slate-200 rounded-l-md transition">
                <Grip className="h-5 w-5" />
              </div>
              <Image
                height={20}
                width={20}
                alt="logo"
                src="/logo.png"
              />
              ５：
              <span>
                このイベントが将来のキャリアにどのように役立つと考えていますか？
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={ListChecks} />
            <h2 className="text-xl">
              イベント詳細
            </h2>
          </div>
          <div className="mt-4 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
              詳細
            </div>
            <div className="text-sm mt-2">
              <Preview
                value={detail}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostExamplePage01;