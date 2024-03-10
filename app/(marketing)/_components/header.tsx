"use client";

import Image from "next/image";
import Link from "next/link";
import { headerListItems } from "./contents/header-list-item";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";
import { motion } from "framer-motion";

const Header = () => {
  const [active, setActive] = useState<string>();
  const pathname = usePathname();

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setActive(pathname)
  }, [pathname])


  return (
    <div className="w-full h-20 border-b-[2px] border-gray-200 bg-white md:px-14 p-2">
      <div className="h-full max-w-screen-2xl mx-auto flex items-center justify-between">
        {/* ロゴ */}
        <Link href={"/"} className="relative group overflow-hidden">
          <Image
            src="/Eventi.png"
            width={150}
            height={50}
            alt="logo"
          />
          {/* <span className="absolute bottom-0 w-full h-[2px] inline-block bg-yellow-300 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-200"></span> */}
        </Link>
        {/* header List items */}
        <div className="hidden lg:inline-flex items-center gap-8 text-sm font-semibold tracking-wider">
          <ul className="flex gap-8">
            {
              headerListItems.map((item) => (
                <Link key={item._id} href={item.link}>
                  <li
                    key={item._id}
                    className={`${active === item.link && "text-yellow-500"} "text-black hover:text-yellow-500 cursor-pointer duration-300 group relative`}
                  >
                    {item.title}
                    <span className={`${active === item.link && "scale-100"} absolute w-full scale-0 group-hover:scale-100 inline-block h-[2px] -bottom-[1px] left-0 bg-yellow-500 duration-300`}></span>
                  </li>
                </Link>
              ))
            }
          </ul>
          <button className="w-36 h-10 bg-slate-900 text-white rounded-md hover:bg-slate-600 duration-300">
            近日公開
          </button>
        </div>
        {/* smollLogo */}
        <div
          className="w-7 h-5 group lg:hidden flex flex-col justify-between cursor-pointer overflow-hidden"
          onClick={() => setShowMenu(true)}
        >
          <span className="w-full h-[3px] bg-gray-500 group-hover:bg-yellow-500 inline-flex -translate-x-1 group-hover:translate-x-0 transition-transform duration-500"></span>
          <span className="w-full h-[3px] bg-gray-500 group-hover:bg-yellow-500 inline-flex -translate-x-3 group-hover:translate-x-0 transition-transform duration-500"></span>
          <span className="w-full h-[3px] bg-gray-500 group-hover:bg-yellow-500 inline-flex -translate-x-2 group-hover:translate-x-0 transition-transform duration-500"></span>
        </div>

        {/* small screen menu */}
        {
          showMenu && (
            <div className="w-full h-screen lg:hidden fixed top-0 left-0 bg-yellow-800 bg-opacity-90 z-50">
              <motion.div
                className="w-[70%] h-full bg-yellow-800 p-4 relative"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="absolute right-2 top-8 text-3xl text-black hover:text-slate-700 cursor-pointer duration-300"
                  onClick={() => setShowMenu(false)}
                >
                  <IoCloseSharp />
                </span>
                <Link href={"/homepagetest"} onClick={() => setShowMenu(false)}>
                  <p className="mb-4">
                    <Image
                      src="/Eventi.png"
                      width={140}
                      height={50}
                      alt="logo"
                    />
                  </p>
                </Link>
                <ul className="flex flex-col text-gray-300 text-sm gap-3 font-semibold">
                  {headerListItems.map((item) => (
                    <Link key={item._id} href={item.link}>
                      <li
                        className="hover:text-white cursor-pointer duration-300"
                        onClick={() => setShowMenu(false)}
                      >
                        {item.title}
                      </li>
                    </Link>
                  ))}
                </ul>
              </motion.div>
            </div>
          )
        }

      </div>
    </div>
  );
}

export default Header;