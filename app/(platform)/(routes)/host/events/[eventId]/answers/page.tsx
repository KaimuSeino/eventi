import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getEventByEventId } from "@/data/event";
import { getSurveyAndAnswerByEventId, getSurveyByEventId } from "@/data/survey";
import { getJoinUserByEventId } from "@/data/user";
import { getUserAnswerByEventId } from "@/data/userAnswer";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FaUser } from "react-icons/fa";

const AnsersPage = async ({
  params
}: {
  params: { eventId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/search")
  }

  const event = await getEventByEventId(params.eventId);
  const surveys = await getSurveyAndAnswerByEventId(params.eventId);
  const users = await getJoinUserByEventId(params.eventId);

  const userAnswers = await getUserAnswerByEventId(params.eventId);

  return (
    <div className="p-4">
      <p>{event?.title}</p>
      <p className="text-xl font-semibold">アンケート回答</p>
      {userAnswers?.find((ans) => ans.isCompleted === true) ? (
        <div>
          {users?.map((user, index) => (
            <div
              className="py-4"
              key={index}
            >
              <div className="flex flex-row justify-start items-center">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback className="bg-yellow-500">
                    <FaUser className="text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="pl-2">
                  <p className="font-semibold">
                    {user?.lastName || "未入力"}  {user?.firstName || "未入力"}
                  </p>
                  <p>
                    {user?.email || "未入力"}
                  </p>
                </div>
              </div>
              <div className="p-2">
                {/* ここにアンケート結果表示？？ */}
                {surveys?.map((survey, index) => {
                  const question = survey.question
                  const userAnswer = survey.userAnswer.find((ans) => ans.userId === user?.userId)
                  return (
                    <div key={index}>
                      <div className="font-semibold">
                        {question}
                      </div>
                      <p className="px-2 bg-slate-200 rounded-sm">
                        {userAnswer?.textAnswer ? (
                          userAnswer.textAnswer
                        ) : (
                          <>{survey.selectQuestions.find((q) => userAnswer?.selectAnswer === q.position)?.position}:
                            {survey.selectQuestions.find((q) => userAnswer?.selectAnswer === q.position)?.question}
                          </>
                        )}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full pt-20">
          回答がありません
        </div>
      )}
    </div>
  );
}

export default AnsersPage;