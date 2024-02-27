import CreateUserForm from "./_components/create-user-form";



export default async function UserForm() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      {/* <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
        <Image
          className="animate-spin text-yellow-500"
          width={24}
          height={24}
          src="/logo.png"
          alt="logo"
        />
      </div> */}
      <CreateUserForm />
    </div >
  )
}