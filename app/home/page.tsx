import ProfileServer from "@/components/user-profile";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <nav>
      <ProfileServer />
    </nav>
  );
}
