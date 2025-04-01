import { useEffect, useState } from "react";
import { NotificationSettings } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  RiCheckLine,
  RiDiscordFill,
  RiMailOpenFill,
  RiPhoneFill,
} from "react-icons/ri";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingCircle from "../loading-circle";
import {
  getNotificationSettings,
  updatePhoneNumber,
  updatePreferences,
} from "@/actions/notification-settings";
import PreferencesSelect from "./preferences-select";
import { getWebhooks } from "@/actions/webhooks";
import WebhooksSelect from "./webhooks-input";
import { toast } from "sonner";
import { getUserDiscordId } from "@/actions/discord";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export const PreferencesSchema = z.object({
  sectionOpen: z.boolean(),
  sectionClose: z.boolean(),
  instructorChange: z.boolean(),
  globalEnabled: z.boolean(),
  smsEnabled: z.boolean(),
  emailEnabled: z.boolean(),
  discordEnabled: z.boolean(),
});

function DiscordButton({
  discordId,
  setDiscordId,
}: {
  discordId: string | undefined | null;
  setDiscordId: (value: string | undefined | null) => void;
}) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  function handleDisconnect() {
    fetch("/api/auth/discord/disconnect")
      .then((res) => {
        if (res.ok) {
          getUserDiscordId().then((discordId) => {
            setDiscordId(discordId);
            console.log("a");
            toast.success("Successfully unlinked your discord account!");
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

export default function NotificationsTab() {
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [discordId, setDiscordId] = useState<string | undefined | null>(
    undefined
  );
  const [webhooks, setWebhooks] = useState<string[] | undefined>(undefined);

  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const status = searchParams.get("status");
  const router = useRouter();

  const preferencesForm = useForm<z.infer<typeof PreferencesSchema>>({
    resolver: zodResolver(PreferencesSchema),
  });

  function saveChanges() {
    if (phoneNumber === undefined) return;
    Promise.all([
      updatePhoneNumber(phoneNumber),
      updatePreferences(preferencesForm.getValues()),
    ])
      .then(() => {
        toast.success("Your changes were successfully saved!");
      })
      .catch(() => {
        toast.error("An error occurred while trying to save your settings.");
      });
  }

  useEffect(() => {
    getNotificationSettings().then((data) => {
      if (!data) return;
      setNotificationSettings(data);
      preferencesForm.reset({
        sectionOpen: data.sectionOpen,
        sectionClose: data.sectionClose,
        instructorChange: data.instructorChange,
        smsEnabled: data.smsEnabled,
        globalEnabled: data.globalEnabled,
        emailEnabled: data.emailEnabled,
        discordEnabled: data.discordEnabled,
      });
    });
    getWebhooks().then((data) => setWebhooks(data));
    getUserDiscordId().then((data) => setDiscordId(data ?? null));
  }, []);

  useEffect(() => {
    setPhoneNumber(notificationSettings?.phoneNumber ?? "");
  }, [notificationSettings]);

  useEffect(() => {
    if (!status) return;

    if (status === "success")
      toast.success("Successfully linked your discord account!");
    if (status === "error")
      toast.error("An error occurred while linking your account.");
    if (status === "exists")
      toast.error("This discord account is already linked to another user.");
    if (status === "dcerror")
      toast.error("An error occurred while unlinking your account.");

    router.push("?");
  }, []);

  if (
    phoneNumber === undefined ||
    webhooks === undefined ||
    discordId === undefined ||
    !notificationSettings
  ) {
    return (
      <div className="flex justify-center mt-8">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className={"flex flex-col gap-y-6 pt-4"}>
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-8 md:gap-y-6">
          <div className="flex flex-col gap-2">
            <Label className={"flex gap-x-2"}>
              <RiMailOpenFill />
              Email Address
            </Label>
            <Input
              className={"w-64"}
              value={session?.user?.email || ""}
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className={"flex gap-x-2"}>
              <RiPhoneFill />
              Phone Number
            </Label>
            <Input
              className={"w-64"}
              placeholder="(123) 456-7890"
              defaultValue={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="hidden lg:flex flex-col gap-y-2">
          <Button onClick={saveChanges} className="">
            Save Changes
          </Button>

          <DiscordButton discordId={discordId} setDiscordId={setDiscordId} />
        </div>
      </div>

      <Accordion className="mb-3" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <Label htmlFor={"webhook"} className={"flex gap-x-2"}>
              <RiDiscordFill />
              Discord Webhooks
            </Label>
          </AccordionTrigger>
          <AccordionContent>
            <WebhooksSelect webhooks={webhooks} setWebhooks={setWebhooks} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex gap-x-8">
        <PreferencesSelect form={preferencesForm} />
      </div>

      <div className="flex lg:hidden gap-x-2">
        <Button onClick={saveChanges} className="">
          Save Changes
        </Button>

        <DiscordButton discordId={discordId} setDiscordId={setDiscordId} />
      </div>
    </div>
  );
}
