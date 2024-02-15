import { getHostByEmail } from "@/data/host";
import { currentUser } from "@clerk/nextjs";
import BasicInfoForm from "./basic-info-form";

export const HostInfo = async () => {

  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress
  const host = await getHostByEmail(email)

  return (
    <>
      <BasicInfoForm host={host!} />
    </>
  );
}