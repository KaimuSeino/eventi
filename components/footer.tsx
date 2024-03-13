import Container from "./container";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { TbMinusVertical } from "react-icons/tb";
import Link from "next/link";

const Footer = () => {
  const footerList = [
    { _id: 111, title: "お問い合わせ", link: "#", icon: true },
    { _id: 112, title: "特定商品取引法", link: "#", icon: true },
    { _id: 113, title: "プライバシーポリシー", link: "#" },
  ]

  return (
    <div className="w-full bg-slate-100 mt-10">
      <Container>
        <div className="text-sm flex flex-col md:flex-row md:items-center gap-2 justify-between mb-2">
          <p className="mb-2 text-slate-500">&copy; 2024 Eventi.Owner</p>
          <ul className="flex items-center gap-2 mb-2">
            {footerList.map((item) => (
              <Link href={item.link} key={item._id}>
                <li className="flex items-center gap-2 text-slate-500 hover:text-yellow-500 duration-300 cursor-pointer">
                  {item.title}
                  {item.icon && <TbMinusVertical />}
                </li>
              </Link>
            ))}
          </ul>
          <div className="flex items-center gap-4 text-slate-800">
            <a href="" target="_blank" className="text-4xl hover:text-yellow-500 cursor-pointer duration-300"><FaSquareXTwitter /></a>
            <a href="" target="_blank" className="text-4xl hover:text-yellow-500 cursor-pointer duration-300"><FaInstagramSquare /></a>
            <a href="" target="_blank" className="text-4xl hover:text-yellow-500 cursor-pointer duration-300"><FaYoutube /></a>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;