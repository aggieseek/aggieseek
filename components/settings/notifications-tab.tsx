"use client";

import { useEffect, useState } from "react";
import { NotificationSettings } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaDiscord, FaPhone, FaEnvelope, FaBell } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [webhooks, setWebhooks] = useState<string[]>([]);
  const [webhookInput, setWebhookInput] = useState<string>("");

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

  return (
    <div className={"flex flex-col gap-y-6 pt-4"}>
      <div className=" flex flex-col gap-2">
        <Label className={"flex gap-x-2"}>
          <FaEnvelope />
          Email Address
        </Label>
        <Input
          className={"w-64"}
          value={notificationSettings?.email || ""}
          disabled
        />
      </div>
      <div className=" flex flex-col gap-2">
        <Label className={"flex gap-x-2"}>
          <FaPhone />
          Phone Number
        </Label>
        <Input
          autoComplete={"mobile tel"}
          placeholder="Enter your phone number"
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
        <div className="flex items-center justify-between gap-2">
          <Label className={"flex gap-x-2"}>
            <FaBell />
            Notification Preferences
          </Label>
          <div className="flex gap-4 text-neutral-500">
            <p className=" text-sm font-semibold">Discord</p>
            <p className=" text-sm font-semibold">SMS</p>
            <p className=" text-sm font-semibold">Email</p>
          </div>
        </div>
        <Separator className="mt-2" />
        <div className="flex items-center justify-between">
          <div>
            <p className=" text-sm font-semibold">Class Openings</p>
            <p className=" text-sm text-neutral-500">
              Get notified when classes open up
            </p>
          </div>
          <div className=" flex gap-8 mr-2">
            <Checkbox />
            <Checkbox />
            <Checkbox />
          </div>
        </div>
        <Separator className="" />
        <div className="flex items-center justify-between">
          <div>
            <p className=" text-sm font-semibold">Change in Seats</p>
            <p className=" text-sm text-neutral-500">
              Get notified when class seat amounts change
            </p>
          </div>
          <div className=" flex gap-8 mr-2">
            <Checkbox />
            <Checkbox />
            <Checkbox />
          </div>
        </div>
        <Separator className="" />
        <div className="flex items-center justify-between">
          <div>
            <p className=" text-sm font-semibold">Class Closings</p>
            <p className=" text-sm text-neutral-500">
              Get notified when classes close
            </p>
          </div>
          <div className=" flex gap-8 mr-2">
            <Checkbox />
            <Checkbox />
            <Checkbox />
          </div>
        </div>
      </div>
    </div>
  );
}
