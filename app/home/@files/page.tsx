import { LayoutGrid } from "@/components/ui/layout-grid";
import { getImages } from "@/lib/pocketbase";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import React from "react";

export default async function FilesPage() {
  const session = await getSession();
  if (!session) return redirect("/api/auth/login");
  const { data, error } = await getImages(session?.user?.email);

  if(error) {
    return <div className="flex-1 flex h-full items-center">
      Failed to fetch images. There's some issue with the server. Please try again later.
    </div>
  }
  return (
    <div className="lg:h-screen lg:overflow-auto py-4 w-full flex flex-col">
      <h2 className={"text-3xl font-bold text-primary px-4 mt-12 mx-6"}>
        Your uploads
      </h2>
      <LayoutGrid
        cards={data?.map((image) => ({
          id: image.id,
          name: image.asset,
          className: "col-span-1 aspect-square",
          thumbnail: `/i?id=${image.id}`,
        }))}
      />
    </div>
  );
}
