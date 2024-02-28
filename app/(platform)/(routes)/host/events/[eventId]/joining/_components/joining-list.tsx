import { getJoinings } from "@/actions/get-joinings";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import JoiningCompletedButton from "./joining-completed-button";
import { getApplicantsByEventId } from "@/data/applicant";

export const JoiningList = async ({
  eventId
}: {
  eventId: string
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/")
  }

  const joinings = await getJoinings({
    eventId: eventId,
  });

  const applicants = await getApplicantsByEventId(eventId);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">参加者一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {joinings === null ? (
            <div>コメントなし</div>
          ) : (
            joinings.map((joining, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <Avatar>
                    <AvatarImage src={joining.userImage || "/path/to/default/avatar.jpg"} />
                  </Avatar>
                  <div className="ml-4">
                    <p>{joining.lastName} {joining.firstName}</p>
                    <div>{joining.emailAddress}</div>
                  </div>
                </div>
                <div>
                  {joining.isCompleted === false ? (
                    <div>
                      <JoiningCompletedButton eventId={joining.eventId} userId={joining.userId} />
                    </div>
                  ) : (
                    <div>
                      <Button
                        disabled={false}
                        variant="link"
                      >
                        参加が完了しました
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )
            ))}
        </CardContent>
      </Card>
    </div>
  )
}