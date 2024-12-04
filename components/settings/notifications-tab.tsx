'use client';

import { useEffect, useState } from "react";
import { NotificationSettings } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  const addWebhook = (webhook: string) => {
    fetch('/api/users/webhooks', {
      method: 'POST',
      body: JSON.stringify({ webhook })
    })
      .then(res => {
        if (!res.ok) return;
        setWebhookInput("");
        setWebhooks(prev => [...prev, webhook]);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const deleteWebhook = (webhook: string) => {
    fetch('/api/users/webhooks', {
      method: 'DELETE',
      body: JSON.stringify({ webhook })
    })
      .then(res => {
        if (!res.ok) return;
        setWebhookInput("");
        setWebhooks(webhooks.filter(prev => prev !== webhook));
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
      <Label>Email Address</Label>
      <Input className={ "w-64" } value={notificationSettings?.email || ""} disabled/>

      <Label>Phone Number</Label>
      <Input autoComplete={"mobile tel"} className={ "w-64" }/>

      <Label htmlFor={ "webhook" }>Discord Webhooks</Label>
      <div className={ "w-full flex rounded-md flex-col border h-56 p-4 gap-y-4" }>
        <form onSubmit={ e => {e.preventDefault(); addWebhook(webhookInput);} } className={ "flex w-full h-1/4 gap-x-2" }>
          <Input autoComplete={"off"} value={webhookInput} onChange={e => setWebhookInput(e.target.value)} id={ "webhook" } className={ "h-full w-full" }/>
          <Button type={ "submit" }>+ Add</Button>
        </form>

        <div className={ "flex flex-col w-full overflow-y-auto rounded-md border h-full p-4" }>
          { webhooks.map((webhook, index) => (
            <p onClick={() => deleteWebhook(webhook)} className={ "text-sm hover:line-through hover:cursor-pointer hover:text-red-600" } key={index}>{ webhook }</p>
          )) }
        </div>
      </div>


    </div>
  );
}