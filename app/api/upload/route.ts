"use server";
import { upload } from "@/lib/pocketbase";
import { getSession } from "@auth0/nextjs-auth0";

async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("file");
    const session = await getSession();
    if (!session) return new Response("Unauthorized", { status: 401 });
    if (!files || files.length === 0) return new Response("No files found", { status: 400 });

    const uploadData = {
      assets: files as unknown as File[],
      owner: session?.user?.email ?? "anonymous",
    };

    const responses = await Promise.all(uploadData.assets.map((asset) => upload({ asset, owner: uploadData.owner })));

    if (responses && responses.length > 0) {
      return new Response(JSON.stringify({ success: true, data: responses }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ success: false, data: responses }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}

export { POST };
