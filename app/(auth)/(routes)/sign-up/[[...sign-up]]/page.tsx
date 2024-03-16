import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      afterSignUpUrl="/search"
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-yellow-600 hover:bg-yellow-500",
        },
        layout: {
          logoPlacement: "inside"
        }
      }}
    />
  );
}