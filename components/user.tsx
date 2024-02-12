"use client";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function User({
  user,
  className,
}: {
  user: UserProfile;
  className?: string;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger className={className} asChild>
        <Button variant="link">
          <Avatar>
            <AvatarImage src={user.picture!} />
            <AvatarFallback className="text-center items-center justify-center w-full py-2 text-lg rounded-full border">
              {user.name?.[0] ?? "UK"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit gap-4 flex flex-col m-2">
        <div className="flex justify-between space-x-2">
          <Avatar>
            <AvatarImage src={user.picture!} />
            <AvatarFallback className="text-center items-center justify-center w-full py-2 text-lg rounded-full border">
              {user.name?.[0] ?? "UK"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-0">
            <h4 className="text-sm font-semibold">{user.name}</h4>
            <p className="text-sm">{user.email ?? "No email"}</p>
          </div>
        </div>
        <Button variant="destructive" asChild>
          <Link href="/api/auth/logout">
            <LogOut className="w-6 h-6 mr-2" />
            Logout
          </Link>
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}
