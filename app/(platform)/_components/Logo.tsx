import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image
        height={40}
        width={40}
        alt="logo"
        src="/logo.png"
      />
    </div>
  );
}

export default Logo;