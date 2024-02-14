import deleteImageServer from "@/actions/delete-image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

export function DeleteImageBtn({
  id,
  setSelected,
}: {
  id: string;
  setSelected: (card: any) => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"sm"} variant="destructive">
          <TrashIcon size={16} className="mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            image from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              const response = await deleteImageServer(id);
              if (response.success) {
                setSelected(null);
                toast.success("Image deleted successfully");
              } else {
                toast.error("Error deleting image");
              }
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
