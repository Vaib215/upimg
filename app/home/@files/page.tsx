import { LayoutGrid } from "@/components/ui/layout-grid";
import { getImages } from "@/lib/pocketbase";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default async function FilesPage() {
  const session = await getSession();
  if (!session) return redirect("/api/auth/login");
  const { data, error } = await getImages(session?.user?.email);
  if(error) {
    toast.error("Error fetching images");
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
          thumbnail: `${process.env.POCKETBASE_URL}/api/files/${image.collectionId}/${image.id}/${image.asset}`,
        }))}
      />
    </div>
  );
}
