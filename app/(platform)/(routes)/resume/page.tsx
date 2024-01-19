import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserBasicInfo from "./_components/user-basic-info";
import UserActiveInfo from "./_components/user-active-info";
import { getJoining } from "@/actions/get-joining";
import { getUserActions } from "@/actions/get-user-action";

const UserResumePage = async () => {

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const userActions = await getUserActions({
    userId: userId
  })

  const eventInfo = userActions?.map((event) => ({
    title: event.title,
    description: event.description!,
    datetime: event.datetime! && new Date(event.datetime).toLocaleDateString(),
    eventId: event.id,
  }))

  const isSurveyCompleted = userActions?.map(event => ({
    eventId: event.id,
    isCompleted: event.surveys?.some(survey =>
      survey.userAnswer?.some(answer => answer.isCompleted)
    ) || false
  }));

  console.log(isSurveyCompleted);

  return (
    <div className="flex flex-col max-w-4xl mx-auto pb-20">
      <div className="p-4">
        <UserBasicInfo />
        <UserActiveInfo
          eventInfo={eventInfo}
          isCompleted={isSurveyCompleted}
        />
      </div>
    </div>
  );
}

export default UserResumePage;