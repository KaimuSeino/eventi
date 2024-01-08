import { getComments } from "@/actions/get-comment";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

export const CommentList = async ({
  eventId
}: {
  eventId: string
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/")
  }
  const comments = await getComments({
    eventId: eventId
  })

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">コメント一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {comments === null ? (
            <div>コメントなし</div>
          ) : (
            comments.map((comment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <Avatar>
                    <AvatarImage src={comment.userImage || "/path/to/default/avatar.jpg"} />
                  </Avatar>
                  <div className="ml-4">
                    <div>{comment.emailAddress}</div>
                    <div>{comment.content}</div>
                  </div>
                </div>
              </div>
            )
            ))}
        </CardContent>
      </Card>
    </div>
  )
}