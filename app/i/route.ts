import pb from "@/lib/pocketbase";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });
  if (!id) return new Response("No id found", { status: 400 });

  const file = await pb.collection("images").getOne(id);
  if (!file) return new Response("No file found", { status: 404 });
  const image = await axios.get(`${process.env.POCKETBASE_URL}/api/files/${file.collectionId}/${file.id}/${file.asset}`, {
    responseType: "arraybuffer",
  });
  return new Response(image.data, {
    headers: {
      "Content-Type": "image/jpeg",
    },
    status: 200,
  });
}
