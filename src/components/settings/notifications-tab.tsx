"use client";

import { useEffect, useState } from "react";
import { NotificationSettings } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaDiscord, FaPhone, FaEnvelope, FaBell } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";

async function getDataFromRoute(endpoint: string) {
  try {
    const res = await fetch(endpoint);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default function NotificationsTab() {
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [webhooks, setWebhooks] = useState<string[]>([]);
  const [webhookInput, setWebhookInput] = useState<string>("");
  const { data: session } = useSession();

  const addWebhook = (webhookUrl: string) => {
    fetch("/api/users/webhooks", {
      method: "POST",
      body: JSON.stringify({ webhookUrl }),
    })
      .then((res) => {
        if (!res.ok) return;
        setWebhookInput("");
        setWebhooks((prev) => [...prev, webhookUrl]);
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
        setWebhooks(webhooks.filter((prev) => prev !== webhookUrl));
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
  }, []);

  useEffect(() => {
    setPhoneNumber(notificationSettings?.phoneNumber || null);
  }, [notificationSettings]);

  return (
    <div className={"flex flex-col gap-y-8 md:gap-y-6 pt-4"}>
      <div className="flex flex-col gap-2">
        <Label className={"flex gap-x-2"}>
          <FaEnvelope />
          Email Address
        </Label>
        <Input className={"w-64"} value={session?.user?.email || ""} disabled />
      </div>
      <div className="flex flex-col gap-2">
        <Label className={"flex gap-x-2"}>
          <FaPhone />
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
          <FaDiscord />
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
                  "text-sm hover:line-through hover:cursor-pointer hover:text-red-600 break-words whitespace-normal  "
                }
                key={index}
              >
                {webhook}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
          <Label className={"flex gap-x-2 mb-2"}>
            <FaBell />
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
    </div>
  );
}
