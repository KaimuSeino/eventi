import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <header className="p-4 border-b h-full flex items-center bg-white shadow-sm">
        <nav className="md:container w-full flex justify-between items-center">
          <div className="flex gap-x-2 text-4xl font-bold">
            <Image
              width={40}
              height={40}
              alt="/logo.png"
              src="/logo.png"
            />
            Eventi
          </div>
          <div className="space-x-4 font-bold">
            <Link href="/sign-in">
              ログイン
            </Link>
            <Link href="/sign-up">
              新規登録
            </Link>
          </div>
        </nav>
      </header>
      <main>
        <div className="relative min-h-screen">
          {/* <video autoPlay loop muted className="absolute z-10 w-auto min-w-full min-h-full max-w-none" style={{ zIndex: -1, opacity: 0.7 }}>
            <source src="/flowers.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
          <div className="container mx-auto md:flex md:justify-around items-center py-60 md:py-30" style={{ position: 'relative', zIndex: 1 }}>
            <div className="flex flex-col text-center md:text-left">
              <h1 className="text-5xl sm:text-7xl">イベント＋ガクチカ</h1>
              <p className="mb-10 text-xl">
                〜イベントでガクチカを作成しあなたを強くする〜
              </p>
              <a href="/search" className="px-6 py-3 bg-yellow-600 rounded-md hover:bg-yellow-800 text-white w-max cursor-pointer transition-all duration-300 self-center md:self-start">
                さあ始めよう
              </a>
            </div>
            <div>
              <img src="/logo.png" alt="" width={300} height={300} className="mx-auto mt-24 md:mt-0 animate-spin-reverse" />
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="bg-slate-300 w-full h-full">
          <div className="p-10 text-slate-800">
            &copy;Eventi 2024
          </div>
        </div>
      </footer>
    </div>
  )
}