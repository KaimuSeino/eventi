import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
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