import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      afterSignInUrl="/search"
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-yellow-600 hover:bg-yellow-500",
        },
        layout: {
          logoPlacement: "inside",
        }
      }}
    />
  );
}