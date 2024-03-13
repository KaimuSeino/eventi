import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserBasicInfo from "./_components/user-basic-info-form";
import UserActiveInfo from "./_components/user-active-info";
import { getUserActions } from "@/actions/get-user-action";
import { db } from "@/lib/db";
import { getHostByEventId } from "@/data/host";
import Footer from "@/components/footer";

const UserResumePage = async () => {

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const userActions = await getUserActions({ userId: userId })

  const user = await db.user.findUnique({ where: { userId: userId } })

  const eventUserInfoPromises = userActions?.map(async (event) => {
    const surveys = event.surveys?.filter(survey => survey.eventiResume === true && survey.type === false)
      .map(survey => ({
        surveyId: survey.id,
        question: survey.question,
        answer: survey.userAnswer?.find(answer => answer.userId === userId)?.textAnswer || ''
      }));

    const host = await getHostByEventId(event.id);

    return {
      id: event.id,
      title: event.title,
      description: event.description || '',
      imageUrl: event.imageUrl || '',
      startDatetime: event.startDatetime ? new Date(event.startDatetime).toLocaleDateString() : '',
      endDatetime: event.endDatetime ? new Date(event.endDatetime).toLocaleDateString() : '',
      eventId: event.id,
      surveys,
      host,
    };
  });

  const eventUserInfo = eventUserInfoPromises ? await Promise.all(eventUserInfoPromises) : [];

  const isSurveyCompleted = userActions?.map(event => ({
    eventId: event.id,
    isCompleted: event.surveys?.some(survey =>
      survey.userAnswer?.some(answer => answer.isCompleted)
    ) || false
  }));

  return (
    <>
      <div className="flex flex-col max-w-4xl mx-auto pb-20 p-4">
        <UserBasicInfo user={user} />
        <UserActiveInfo
          eventUserInfo={eventUserInfo}
          isCompleted={isSurveyCompleted}
        />
      </div>
      <Footer />
    </>
  );

}

export default UserResumePage;