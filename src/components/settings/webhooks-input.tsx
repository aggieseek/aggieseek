"use client";

import { addWebhook, deleteWebhook, getWebhooks } from "@/actions/webhooks";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

interface WebhooksSelectProp {
  webhooks: string[] | undefined;
  setWebhooks: (value: string[] | undefined) => void;
}

export default function WebhooksSelect({
  webhooks,
  setWebhooks,
}: WebhooksSelectProp) {
  const [webhookInput, setWebhookInput] = useState<string>("");

  useEffect(() => {
    getWebhooks().then((data) => setWebhooks(data));
  }, []);

  return (
    <div className=" flex flex-col gap-2">
      <div className={"flex rounded-md flex-col border p-4 gap-y-4"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addWebhook(webhookInput).then(() =>
              getWebhooks().then((data) => setWebhooks(data))
            );
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
          {webhooks?.length === 0 ? (
            <span className="text-sm">No webhooks found.</span>
          ) : (
            webhooks?.map((webhook, index) => (
              <p
                onClick={() => deleteWebhook(webhook)}
                className={
                  "text-sm hover:line-through hover:cursor-pointer break-words whitespace-normal  "
                }
                key={index}
              >
                {webhook}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
