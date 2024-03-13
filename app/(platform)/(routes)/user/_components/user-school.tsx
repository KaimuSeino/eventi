import { User } from "@prisma/client";

interface UserSchoolProps {
  school: string;
  faculty: string;
  grade: string;
}

const UserSchool = ({
  school,
  faculty,
  grade,
}: UserSchoolProps) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-start my-2 gap-x-2">
        {/* 名前などの基本情報 */}
        <div>
          大学名：
          <span className="font-bold">
            {!school ? "未入力" : school}
          </span>
        </div>
        <div>
          学部：
          <span className="font-bold">
            {!faculty ? "未入力" : faculty}
          </span>
        </div>
        <div>
          学年：
          <span className="font-bold">
            {!grade ? "未入力" : grade}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserSchool;