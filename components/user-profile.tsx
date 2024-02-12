import { getSession } from "@auth0/nextjs-auth0";
import User from "./user";

export default async function ProfileServer() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return null;
  }

  return (
    <User className="absolute top-4 right-2" user={user} />
  );
}
