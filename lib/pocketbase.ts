import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.POCKETBASE_URL);
pb.autoCancellation(false);

type Image = {
  asset: File;
  owner: string;
}

export const upload = async (image: Image) => {
  try {
    const uploadResponse = await pb.collection("images").create(image);
    return {
      success: true,
      data: uploadResponse,
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error,
    }
  }
};

export const getImages = async (identifier: string) => {
  try {
    const images = await pb.collection("images").getFullList({
      filter: `owner = "${identifier}"`
    });
    return {
      success: true,
      data: images,
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error,
    }
  }
}

export const deleteImage = async (id: string) => {
  try {
    const deleteResponse = await pb.collection("images").delete(id);
    return {
      success: true,
      data: deleteResponse,
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error,
    }
  }
}

export default pb;