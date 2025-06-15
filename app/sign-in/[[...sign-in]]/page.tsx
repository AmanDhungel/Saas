import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex items-center justify-center h-[90vh] my-auto">
      <SignIn />;
    </main>
  );
}
