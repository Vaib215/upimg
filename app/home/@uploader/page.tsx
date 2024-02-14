"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CircleDashed, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DRAG_STATE = {
  DRAG_OVER: "Drop your files here!",
  DROP: "Looks good!",
  NOT_UPLOADING: "Drop your files here or Click to upload",
};

export default function UploadPage() {
  const [status, setStatus] = useState<string>(DRAG_STATE.NOT_UPLOADING);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const router = useRouter();

  const handleFileUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      files &&
        Array.from(files).forEach((file) => {
          formData.append("file", file);
        });
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if(response.status === 200) {
        setFiles(null);
        router.refresh();
        toast.success(files?.length === 1 ? "Image uploaded successfully" : `${files?.length} Images uploaded successfully`);
      }
    } catch {
      console.error("Error uploading file");
      toast.error("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="m-16 flex-1">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Upload Image</span>
        </CardTitle>
        <CardDescription>Accepts png/jpg/svg/gif/heic formats</CardDescription>
      </CardHeader>
      <CardContent
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.dataTransfer.files.length > 1) {
            setStatus(DRAG_STATE.DROP);
            setFiles(e.dataTransfer.files);
          } else {
            setStatus(DRAG_STATE.NOT_UPLOADING);
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setStatus(DRAG_STATE.DRAG_OVER);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setStatus(DRAG_STATE.NOT_UPLOADING);
        }}
        className="relative"
      >
        <Input
          id="picture"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            setFiles(e.target.files);
          }}
          className="opacity-0 w-full h-max aspect-square"
        />
        {files === null || files.length === 0 ? (
          <Label
            htmlFor="picture"
            className={cn(
              "absolute cursor-pointer inset-6 top-0 flex flex-col items-center justify-center bg-background rounded-xl gap-y-2 border-4",
              status === DRAG_STATE.DRAG_OVER && "border-primary",
              status === DRAG_STATE.DROP && "border-destructive"
            )}
          >
            <UploadCloud size={100} />
            <span className="text-center text-xl max-w-56">{status}</span>
          </Label>
        ) : (
          <>
            <div className="absolute inset-6 top-0 bg-background rounded-xl gap-y-2 overflow-hidden border-4">
              <Input
                type="file"
                className="hidden w-full h-max aspect-square"
                id="additionalPictures"
                multiple
                accept="image/*"
                onChange={(e) => {
                  e.preventDefault();
                  setFiles((prevFiles) => {
                    const newFiles = new DataTransfer();
                    prevFiles &&
                      Array.from(prevFiles).forEach((file) =>
                        newFiles.items.add(file)
                      );
                    e.target.files &&
                      Array.from(e.target.files).forEach((file) => {
                        if (files.length > 9) newFiles.items.remove(0);
                        newFiles.items.add(file);
                      });
                    return newFiles.files;
                  });
                }}
              />
              <div
                className={cn(
                  "grid p-4 gap-4 h-full overflow-auto grid-cols-3 grid-rows-3"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  if (e.target === e.currentTarget) {
                    document.getElementById("additionalPictures")?.click();
                  }
                }}
              >
                {files &&
                  Array.from(files)?.map((_, index) => (
                    <div
                      key={index}
                      className="w-full relative overflow-hidden aspect-square border-4 border-primary rounded-lg"
                    >
                      <X
                        onClick={() => {
                          setFiles((prevFiles) => {
                            const newFiles = new DataTransfer();
                            prevFiles &&
                              Array.from(prevFiles).forEach((file, i) => {
                                if (i !== index) newFiles.items.add(file);
                              });
                            return newFiles.files;
                          });
                        }}
                        className="absolute bg-background rounded top-0 right-0 m-2 cursor-pointer"
                      />
                      <img
                        src={URL.createObjectURL(files[index])}
                        alt={`uploaded file ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                {files.length < 9 && (
                  <Label
                    className={cn(
                      "w-full aspect-square border-4 border-dashed flex flex-col items-center justify-center cursor-pointer bg-opacity-10 rounded-lg",
                      status === DRAG_STATE.DRAG_OVER && "border-primary"
                    )}
                    htmlFor="additionalPictures"
                  >
                    <UploadCloud className="text-muted" size={100} />
                  </Label>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: files !== null ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          files !== null ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <CardFooter className="gap-4 justify-end">
          <Button
            size={"lg"}
            variant={"destructive"}
            disabled={loading}
            type="reset"
            onClick={() => setFiles(null)}
            className="text-lg"
          >
            Reset
          </Button>
          <Button
            size={"lg"}
            variant={"default"}
            disabled={loading}
            type="submit"
            className="text-lg"
            onClick={handleFileUpload}
          >
            {loading ? <CircleDashed className="animate-spin mr-2"/> : <UploadCloud size={16} className="mr-2" /> }
            Upload
          </Button>
        </CardFooter>
      </motion.div>
    </Card>
  );
}
