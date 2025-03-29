import { useEffect, useState } from "react";
import { NotificationSettings } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import {
  RiCheckboxCircleFill,
  RiCheckLine,
  RiDiscordFill,
  RiErrorWarningFill,
  RiMailOpenFill,
  RiNotification2Fill,
  RiPhoneFill,
} from "react-icons/ri";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingCircle from "../loading-circle";
import { cn } from "@/lib/utils";

async function getDataFromRoute(endpoint: string) {
  try {
    const res = await fetch(endpoint);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

function DiscordButton({
  discordId,
  setDiscordId,
}: {
  discordId: string | undefined;
  setDiscordId: (value: string | undefined) => void;
}) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  function handleDisconnect() {
    fetch("/api/auth/discord/disconnect")
      .then((res) => {
        if (res.ok) {
          getDataFromRoute("/api/users/discord").then((result) => {
            setDiscordId(result.discordId);
            router.push("?status=dcsuccess");
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const buttonClasses = cn([
    "transition-all w-max group p-1 pr-4 bg-[#7289da] active:scale-[0.97]",
    discordId
      ? "hover:bg-[#7289da] opacity-80 hover:opacity-100"
      : "hover:bg-[#5b72c3]",
  ]);

  const buttonText = discordId
    ? isHovered
      ? "Unlink Discord"
      : "Discord Linked"
    : "Link Discord";

  const icon = discordId ? (
    isHovered ? (
      <RiDiscordFill />
    ) : (
      <RiCheckLine />
    )
  ) : (
    <RiDiscordFill />
  );

  return (
    <Button
      onClick={() =>
        discordId
          ? handleDisconnect()
          : router.push("/api/auth/discord/connect")
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={buttonClasses}
    >
      <div
        className={
          "transition-colors bg-[#4f68c1] p-2 group-hover:bg-[#4158ab] flex justify-center items-center text-white h-full aspect-square rounded-sm mr-2"
        }
      >
        {icon}
      </div>
      <div className="w-28">
        <p>{buttonText}</p>
      </div>
    </Button>
  );
}

function StatusMessage({ status }: { status: string | null }) {
  if (status == "failed") {
    return (
      <div className="flex items-center font-semibold gap-x-4 border rounded-lg border-red-200 bg-red-100 p-3">
        <RiErrorWarningFill className="w-5 h-5" />
        An error occurred while trying to link your discord account.
      </div>
    );
  }

  if (status == "success") {
    return (
      <div className="flex items-center font-semibold gap-x-4 border rounded-lg border-green-200 bg-green-100 p-3">
        <RiCheckboxCircleFill className="w-5 h-5" />
        Successfully linked your discord account!
      </div>
    );
  }

  if (status == "exists") {
    return (
      <div className="flex items-center font-semibold gap-x-4 border rounded-lg border-red-200 bg-red-100 p-3">
        <RiErrorWarningFill className="w-5 h-5" />
        This discord account is linked to another user.
      </div>
    );
  }

  if (status == "dcerror") {
    return (
      <div className="flex items-center font-semibold gap-x-4 border rounded-lg border-red-200 bg-red-100 p-3">
        <RiErrorWarningFill className="w-5 h-5" />
        An error occurred while trying to unlink your discord account.
      </div>
    );
  }

  if (status == "dcsuccess") {
    return (
      <div className="flex items-center font-semibold gap-x-4 border rounded-lg border-green-200 bg-green-100 p-3">
        <RiCheckboxCircleFill className="w-5 h-5" />
        Successfully unlinked your discord account!
      </div>
    );
  }

  return <></>;
}

export default function NotificationsTab() {
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [webhooks, setWebhooks] = useState<string[] | undefined>(undefined);
  const [discordId, setDiscordId] = useState<string | undefined>(undefined);

  const [webhookInput, setWebhookInput] = useState<string>("");

  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const status = searchParams.get("status");

  const addWebhook = (webhookUrl: string) => {
    fetch("/api/users/webhooks", {
      method: "POST",
      body: JSON.stringify({ webhookUrl }),
    })
      .then((res) => {
        if (!res.ok) return;
        setWebhookInput("");
        setWebhooks((prev) => [...(prev ?? []), webhookUrl]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteWebhook = (webhookUrl: string) => {
    fetch("/api/users/webhooks", {
      method: "DELETE",
      body: JSON.stringify({ webhookUrl }),
    })
      .then((res) => {
        if (!res.ok) return;
        setWebhookInput("");
        setWebhooks((webhooks ?? []).filter((prev) => prev !== webhookUrl));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getDataFromRoute("/api/users/notifications").then((result) =>
      setNotificationSettings(result)
    );
    getDataFromRoute("/api/users/webhooks").then((result) =>
      setWebhooks(result)
    );
    getDataFromRoute("/api/users/discord").then((result) => {
      setDiscordId(result.discordId);
    });
  }, []);

  useEffect(() => {
    setPhoneNumber(notificationSettings?.phoneNumber || "");
  }, [notificationSettings]);

  if (
    phoneNumber === undefined ||
    webhooks === undefined ||
    discordId === undefined
  ) {
    return (
      <div className="flex justify-center mt-8">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className={"flex flex-col gap-y-8 md:gap-y-6 pt-4"}>
      <StatusMessage status={status} />

      <div className="flex flex-col gap-2">
        <Label className={"flex gap-x-2"}>
          <RiMailOpenFill />
          Email Address
        </Label>
        <Input className={"w-64"} value={session?.user?.email || ""} disabled />
      </div>
      <div className="flex flex-col gap-2 hidden">
        <Label className={"flex gap-x-2"}>
          <RiPhoneFill />
          Phone Number
        </Label>
        <Input
          autoComplete={"mobile tel"}
          placeholder="Enter your phone number"
          value={phoneNumber || ""}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={"w-64"}
        />
      </div>
      <div className=" flex flex-col gap-2">
        <Label htmlFor={"webhook"} className={"flex gap-x-2"}>
          <RiDiscordFill />
          Discord Webhooks
        </Label>
        <div className={"flex rounded-md flex-col border p-4 gap-y-4"}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addWebhook(webhookInput);
            }}
            className={"flex w-full h-1/4 gap-x-2 items-center"}
          >
            <Input
              autoComplete={"off"}
              value={webhookInput}
              placeholder="Enter your Discord webhook"
              onChange={(e) => setWebhookInput(e.target.value)}
              id={"webhook"}
              className={"h-full w-full"}
            />
            <Button
              className={"transition-transform active:scale-95"}
              type={"submit"}
            >
              + Add
            </Button>
          </form>

          <div className={"flex flex-col rounded-md border h-full p-4"}>
            {webhooks.map((webhook, index) => (
              <p
                onClick={() => deleteWebhook(webhook)}
                className={
                  "text-sm hover:line-through hover:cursor-pointer break-words whitespace-normal  "
                }
                key={index}
              >
                {webhook}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
          <Label className={"flex gap-x-2 mb-2"}>
            <RiNotification2Fill />
            Notification Preferences
          </Label>
          <div className="flex gap-4 text-neutral-500 text-sm font-semibold">
            <p>Discord</p>
            <p>SMS</p>
            <p>Email</p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className=" text-sm font-semibold">Class Openings</p>
            <p className=" text-xs text-neutral-500">
              Get notified when classes open up
            </p>
          </div>
          <div className="flex gap-12 ml-0 lg:gap-8 lg:mr-2 mt-2 lg:mt-0">
            <Checkbox />
            <Checkbox />
            <Checkbox />
          </div>
        </div>
        <Separator className="" />
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className=" text-sm font-semibold">Class Closings</p>
            <p className=" text-xs text-neutral-500">
              Get notified when classes close
            </p>
          </div>
          <div className=" flex gap-12 ml-0 lg:gap-8 lg:mr-2 mt-2 lg:mt-0">
            <Checkbox />
            <Checkbox />
            <Checkbox />
          </div>
        </div>
        <Separator className="" />
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className=" text-sm font-semibold">Instructor Changes</p>
            <p className=" text-xs text-neutral-500">
              Get notified when instructors change for a class
            </p>
          </div>
          <div className=" flex gap-12 ml-0 lg:gap-8 lg:mr-2 mt-2 lg:mt-0">
            <Checkbox />
            <Checkbox />
            <Checkbox />
          </div>
        </div>
      </div>

      <DiscordButton discordId={discordId} setDiscordId={setDiscordId} />

      <Button className="w-40 hidden">Save Changes</Button>
    </div>
  );
}
