'use client';

import { useEffect, useState } from "react";
import { NotificationSettings } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaDiscord, FaPhone, FaEnvelope } from "react-icons/fa6";

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
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings | null>(null);
  const [webhooks, setWebhooks] = useState<string[]>([]);
  const [webhookInput, setWebhookInput] = useState<string>("");

  const addWebhook = (webhookUrl: string) => {
    fetch('/api/users/webhooks', {
      method: 'POST',
      body: JSON.stringify({ webhookUrl })
    })
      .then(res => {
        if (!res.ok) return;
        setWebhookInput("");
        setWebhooks(prev => [...prev, webhookUrl]);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const deleteWebhook = (webhookUrl: string) => {
    fetch('/api/users/webhooks', {
      method: 'DELETE',
      body: JSON.stringify({ webhookUrl })
    })
      .then(res => {
        if (!res.ok) return;
        setWebhookInput("");
        setWebhooks(webhooks.filter(prev => prev !== webhookUrl));
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    getDataFromRoute('/api/users/notifications')
      .then(result => setNotificationSettings(result));
    getDataFromRoute('/api/users/webhooks')
      .then(result => setWebhooks(result));
  }, []);

  return (
    <div className={ "flex flex-col gap-y-4 pt-4" }>
      <Label className={"flex gap-x-2"}>
        <FaEnvelope />
        Email Address
      </Label>
      <Input className={ "w-64" } value={notificationSettings?.email || ""} disabled/>

      <Label className={"flex gap-x-2"}>
        <FaPhone />
        Phone Number
      </Label>
      <Input autoComplete={"mobile tel"} placeholder="Enter your phone number" className={ "w-64" }/>

      <Label htmlFor={"webhook"} className={"flex gap-x-2"}>
        <FaDiscord />
        Discord Webhooks
      </Label>
      <div className={ "flex rounded-md flex-col border p-4 gap-y-4" }>
        <form onSubmit={ e => {e.preventDefault(); addWebhook(webhookInput);} } className={ "flex w-full h-1/4 gap-x-2" }>
          <Input autoComplete={"off"} value={webhookInput} placeholder="Enter your Discord webhook" onChange={e => setWebhookInput(e.target.value)} id={ "webhook" } className={ "h-full w-full" }/>
          <Button className={"transition-transform active:scale-95"} type={ "submit" }>+ Add</Button>
        </form>

        <div className={ "flex flex-col rounded-md border h-full p-4" }>
          { webhooks.map((webhook, index) => (
            <p onClick={() => deleteWebhook(webhook)} className={ "text-sm hover:line-through hover:cursor-pointer hover:text-red-600 break-words whitespace-normal  " } key={index}>{ webhook }</p>
          )) }
        </div>
      </div>


    </div>
  );
}