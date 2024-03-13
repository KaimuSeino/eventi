"use client";

import { Button } from "@/components/ui/button";
import Container from "../../../components/container";
import Image from "next/image";
import { motion } from "framer-motion";
import Fadein from "../../../components/fadein";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="bg-[#EF9A1B] w-full rounded-3xl rounded-tl-none relative px-4">
      <Container>
        <div className="text-white grid md:grid-cols-2 gap-20 place-items-center">
          {/* left */}
          <div className="flex flex-col gap-6">
            <Fadein>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold ">
                あなたの成長が
                <br />
                就活につながる
              </h1>
            </Fadein>
            <Fadein>
              <p>
                自己成長であなたの就職市場価値を高めませんか？「インターン・イベント」があなたの就活の概念を劇的に変えます！
                <br />
                「インターン・イベント」に参加することで、自身の成長や行動力が可視化され、就職活動に生きる！
                <br />
                エントリーシート・履歴書作成不要！プロフィール記載で企業からオファーが届く！
              </p>
            </Fadein>
            <Fadein>
              <div className="w-full md:w-[50%] p-2 xl:p-4 bg-white rounded-3xl flex items-center justify-center">
                <Link href={"/search"} className="w-full">
                  <Button
                    className="w-full h-12 bg-[#EF9A1B] text-white text-xl font-semibold rounded-2xl"
                  >
                    ベータ版を試す
                  </Button>
                </Link>
              </div>
            </Fadein>
          </div>

          {/* right */}
          <div className="w-full relative flex justify-center items-center gap-6">
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
            >
              <Image
                src="/event-intern.png"
                alt="/bannerImage1"
                width={210}
                height={500}
                className="rounded-3xl object-cover shadow-4xl"
              />
            </motion.div>
            <div className="flex flex-col gap-7">
              <motion.div
                initial={{ y: 300 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="/eventi-resume.png"
                  alt="/bannerImage1"
                  width={210}
                  height={500}
                  className="rounded-3xl object-cover shadow-4xl"
                />
              </motion.div>
              <motion.div
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/my-profile.png"
                  alt="/bannerImage1"
                  width={210}
                  height={500}
                  className="rounded-3xl object-cover shadow-4xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Banner;