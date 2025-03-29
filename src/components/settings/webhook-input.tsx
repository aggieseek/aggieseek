import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface WebhookInputProps {
  id: string;
  className?: string;
}

export default function WebhookInput({
  id,
  className = "",
}: WebhookInputProps) {
  const [webhooks, setWebhooks] = useState<string[]>([]);
  const [webhookInput, setWebhookInput] = useState<string>("");

  useEffect(() => {
    fetch("/api/users/webhooks")
      .then((result) => result.json())
      .then((data) => setWebhooks(data));
  }, []);

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

  return (
    <div
      className={cn(
        "flex rounded-md flex-col border h-56 p-4 gap-y-4",
        className
      )}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addWebhook(webhookInput);
        }}
        className={"flex w-full h-1/4 gap-x-2"}
      >
        <Input
          autoComplete={"off"}
          value={webhookInput}
          onChange={(e) => setWebhookInput(e.target.value)}
          id={id}
          className={"h-full w-full"}
        />
        <Button
          className={"transition-transform active:scale-95"}
          type={"submit"}
        >
          + Add
        </Button>
      </form>

      <div
        className={
          "flex flex-col w-full overflow-y-auto rounded-md border h-full p-4"
        }
      >
        {webhooks.map((webhook, index) => (
          <p
            onClick={() => deleteWebhook(webhook)}
            className={"text-sm hover:line-through hover:cursor-pointer"}
            key={index}
          >
            {webhook}
          </p>
        ))}
      </div>
    </div>
  );
}
