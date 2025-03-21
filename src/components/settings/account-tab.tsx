"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { signOut } from "next-auth/react";

export default function AccountTab() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [clicks, setClicks] = useState<number>(2);

  const clickMessages: Record<number, string> = {
    2: "Delete Account",
    1: "Click to confirm",
    0: "Deleting...",
  };

  useEffect(() => {
    const deleteAccount = () => {
      fetch("/api/users", {
        method: "DELETE",
      }).then(() => {
        router.push("/");
      });
    };

    if (clicks === 0) {
      deleteAccount();
    }
  }, [clicks, router]);

  return (
    <>
      <div className={"flex flex-col pt-4 gap-y-4"}>
        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          className={"w-40"}
          variant={"default"}
        >
          Log Out
        </Button>
        <Button
          onClick={() => setDialogOpen(true)}
          className={"w-40"}
          variant={"destructive"}
        >
          Delete Account
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-96" onCloseAutoFocus={() => setClicks(2)}>
          <DialogHeader>
            <div className="space-y-2">
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action is permanent and cannot be undone. All your data
                will be permanently erased.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className={"flex justify-end gap-x-8 mt-4"}>
            <Button
              className={"flex-1"}
              variant={"default"}
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>

            <Button
              className={"flex-1"}
              variant={"destructive"}
              onClick={() => setClicks(Math.max(-1, clicks - 1))}
            >
              {clickMessages[clicks]}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
