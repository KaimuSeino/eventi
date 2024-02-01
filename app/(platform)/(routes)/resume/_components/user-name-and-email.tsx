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
      <div className="flex my-2 gap-x-2">
        {/* 名前などの基本情報 */}
        <div>
          姓：
          <span className="font-bold">
            {!lastName ? "未入力" : lastName}
            ({!katakanaLastName ? "未入力" : katakanaLastName})
          </span>
        </div>
        <div>
          名：
          <span className="font-bold">
            {!firstName ? "未入力" : firstName}
            ({!katakanaFirstName ? "未入力" : katakanaFirstName})
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