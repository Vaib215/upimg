"use server";

import { deleteImage } from "@/lib/pocketbase";
import { revalidatePath } from "next/cache";

const deleteImageServer = async (id: string) => {
  const response = await deleteImage(id);
  revalidatePath("/")
  return response;
}

export default deleteImageServer;
