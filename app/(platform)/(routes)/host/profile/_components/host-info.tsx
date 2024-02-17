import { getHostByEmail } from "@/data/host";
import { currentUser } from "@clerk/nextjs";
import BasicInfoForm from "./basic-info-form";
import CreateHostProfileForm from "./create-host-profile-form";

export const HostInfo = async () => {

  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress
  const host = await getHostByEmail(email)

  return (
    <>
      {host ? (
        <>
          <BasicInfoForm host={host!} />
        </>
      ) : (
        <div>
          <CreateHostProfileForm />
        </div>
      )}
    </>
  );
}