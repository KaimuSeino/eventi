import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User } from "@clerk/nextjs/server";

interface UserNameAndEmailProps {
  image: string;
  email: string;
  firstName: string;
  katakanaFirstName: string;
  lastName: string;
  katakanaLastName: string;
}

const UserNameAndEmail = ({
  image,
  email,
  firstName,
  katakanaFirstName,
  lastName,
  katakanaLastName,
}: UserNameAndEmailProps) => {
  return (
    <>
      <div className="flex flex-col justify-center">
        <Avatar>
          <AvatarImage src={image} />
        </Avatar>
      </div>
      <div className="flex flex-col justify-center items-center my-2 gap-x-2">
        {/* 名前などの基本情報 */}
        <div>
          <span className="font-bold text-xl">
            {!lastName ? "未入力" : lastName} {!firstName ? "未入力" : firstName}
          </span>
        </div>
        <div>
          <span className="text-sm">
            {katakanaLastName} {katakanaFirstName}
          </span>
        </div>
      </div>
      <div className="my-2">
        メールアドレス：
        <span>
          {!email ? "未入力" : email}
        </span>
      </div>
    </>

  );
}

export default UserNameAndEmail;