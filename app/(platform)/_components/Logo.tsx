import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image
        height={20}
        width={170}
        alt="logo"
        src="/Eventi.png"
      />
    </div>
  );
}

export default Logo;