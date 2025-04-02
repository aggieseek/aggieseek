"use client";

import {
  RiContactsBook2Fill,
  RiErrorWarningFill,
  RiNotification2Fill,
} from "react-icons/ri";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { Form, FormField } from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { PreferencesSchema } from "./notifications-tab";
import { z } from "zod";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function PreferencesSelect({
  form,
  savedPhone,
}: {
  form: UseFormReturn<z.infer<typeof PreferencesSchema>>;
  savedPhone: string | undefined;
}) {
  return (
    <Form {...form}>
      <form className="flex w-full flex-col gap-y-8 lg:flex-row lg:gap-x-8">
        <div className="flex w-full lg:w-64 h-max flex-col gap-2">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
            <Label className={"flex gap-x-2 mb-2"}>
              <RiNotification2Fill />
              Notification Preferences
            </Label>
          </div>
          <Separator />
          <FormField
            control={form.control}
            name="sectionOpen"
            render={({ field }) => (
              <div className="flex items-center justify-between">
                <div>
                  <p className=" text-sm font-medium">Class Openings</p>
                </div>
                <div className="flex gap-12 ml-0 lg:gap-8 lg:mr-2 lg:mt-0">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </div>
            )}
          />
          <Separator className="" />
          <FormField
            control={form.control}
            name="sectionClose"
            render={({ field }) => (
              <div className="flex items-center justify-between">
                <div>
                  <p className=" text-sm font-medium">Class Closings</p>
                </div>
                <div className="flex gap-12 ml-0 lg:gap-8 lg:mr-2 lg:mt-0">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </div>
            )}
          />
          <Separator className="" />
          <FormField
            control={form.control}
            name="instructorChange"
            render={({ field }) => (
              <div className="flex items-center justify-between">
                <div>
                  <p className=" text-sm font-medium">Instructor Changes</p>
                </div>
                <div className="flex gap-12 ml-0 lg:gap-8 lg:mr-2 lg:mt-0">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </div>
            )}
          />
        </div>
        <div className="flex w-full lg:w-64 h-max flex-col gap-2">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
            <Label className={"flex gap-x-2 mb-2"}>
              <RiContactsBook2Fill />
              Communication Preferences
            </Label>
          </div>
          <Separator />
          <FormField
            control={form.control}
            name="globalEnabled"
            render={({ field }) => (
              <div className="flex items-center justify-between">
                <div>
                  <p className=" text-sm font-medium">AggieSeek Server</p>
                </div>
                <div className="flex gap-12 ml-0 lg:gap-8 lg:mr-2 lg:mt-0">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </div>
            )}
          />
          <Separator className="" />
          <FormField
            control={form.control}
            name="smsEnabled"
            render={({ field }) => (
              <div className="flex items-center justify-between">
                <div className="flex gap-x-2">
                  <p className="text-sm font-medium">SMS Messaging</p>
                  {(!savedPhone && field.value) && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger type="button">
                          <RiErrorWarningFill className="self-center w-4 h-4 text-red-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>You do not have a phone number set.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <div className="flex gap-12 ml-0 lg:gap-8 lg:mr-2 lg:mt-0">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </div>
            )}
          />
          {/* <Separator className="" />
          <FormField
            control={form.control}
            name="emailEnabled"
            render={({ field }) => (
              <div className="flex items-center justify-between">
                <div>
                  <p className=" text-sm font-medium">Email</p>
                </div>
                <div className="flex gap-12 ml-0 lg:gap-8 lg:mr-2 lg:mt-0">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </div>
            )}
          /> */}
          <Separator className="" />
          <FormField
            control={form.control}
            name="discordEnabled"
            render={({ field }) => (
              <div className="flex items-center justify-between">
                <div>
                  <p className=" text-sm font-medium">Discord Webhooks</p>
                </div>
                <div className="flex gap-12 ml-0 lg:gap-8 lg:mr-2 lg:mt-0">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </div>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
