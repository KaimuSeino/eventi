import { IconBadge } from "@/components/IconBadge";
import { Preview } from "@/components/Preview";
import { Grip, LayoutDashboard, ListChecks } from "lucide-react";
import Image from "next/image";

const detail = `<h2><strong>自己紹介</strong></h2><p><br></p><p>ご本人や企業・団体を紹介しましょう。プロジェクトの信頼性が高まります。</p><p><br></p><p><br></p><h2><strong>このプロジェクトで実現したいこと</strong></h2><p><br></p><p>プロジェクトの内容や目的を、具体的に書きましょう。</p><p><br></p><p><br></p><h2><strong>プロジェクトの立ち上げ背景</strong></h2><p><br></p><p>立ち上げに至った経緯や思い、これまでの活動などを書きましょう。</p><p><br></p><p><br></p><h2><strong>スケジュール</strong></h2><p><br></p><p>プロジェクトの日程を説明しましょう。</p><p><br></p><p><br></p><h2><strong>開催地</strong></h2><p><br></p><p>開催地を詳しく説明しましょう。</p><p><br></p><p><br></p><h2><strong>料金</strong></h2><p><br></p><p>料金がある場合は記入してください。</p><p><br></p><p><br></p><h2><strong>定員</strong></h2><p><br></p><p>何人までですか？</p><p><br></p><p><br></p><h2><strong>募集対象</strong></h2><p><br></p><p>募集対象について教えてください。</p><p><br></p><p><br></p><h2><strong>最後に</strong></h2><p><br></p><p>プロジェクトを統括しましょう。メッセージ性のある文章にしましょう。</p>`

const HostExamplePage03 = () => {
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
          </div>
          <p className="text-sm mt-2">
            起業イベント
          </p>
        </div>
        <div className="mt-4 border bg-slate-100 rounded-md p-4">
          <div className="font-medium flex items-center justify-between">
            概要文
          </div>
          <p className="text-sm mt-2">
            起業イベントの概要を入力
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
                このプログラムで最も良かったと感じた点は何ですか？具体的な経験や学びについて教えてください。
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

export default HostExamplePage03;