import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserBasicInfo from "./_components/user-basic-info-form";
import UserActiveInfo from "./_components/user-active-info";
import { getUserActions } from "@/actions/get-user-action";
import { db } from "@/lib/db";

const UserResumePage = async () => {

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const userActions = await getUserActions({
    userId: userId
  })

  const user = await db.user.findUnique({
    where: {
      userId: userId
    }
  })

  const eventUserInfo = userActions?.map((event) => {
    // Filter out surveys with eventResume true and extract questions and answers
    const surveys = event.surveys?.filter((survey) => survey.eventiResume === true && survey.type === false)
      .map((survey) => ({
        surveyId: survey.id,
        question: survey.question,
        answer: survey.userAnswer?.find((answer) => answer.userId === userId)?.textAnswer!
      }))


    return {
      title: event.title,
      description: event.description!,
      imageUrl: event.imageUrl!,
      datetime: event.datetime! && new Date(event.datetime).toLocaleDateString(),
      eventId: event.id,
      surveys, // include the surveys data
    }
  })

  const isSurveyCompleted = userActions?.map(event => ({
    eventId: event.id,
    isCompleted: event.surveys?.some(survey =>
      survey.userAnswer?.some(answer => answer.isCompleted)
    ) || false
  }));

  return (
    <div className="flex flex-col max-w-4xl mx-auto pb-20">
      <div className="p-4">
        <UserBasicInfo user={user} />
        <UserActiveInfo
          eventUserInfo={eventUserInfo}
          isCompleted={isSurveyCompleted}
        />
      </div>
    </div>
  );
}

export default UserResumePage;