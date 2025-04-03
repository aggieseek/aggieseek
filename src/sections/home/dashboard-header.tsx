"use client";

import Link from "next/link";
import { RiAddLine, RiRestartLine, RiSearch2Line } from "react-icons/ri";
import useTrackedSectionsStore, {
  LoadingState,
} from "@/stores/useTrackedSectionsStore";
import { toast } from "sonner";
import { cn, CURRENT_TERM } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LoadingCircle from "@/components/loading-circle";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
  crn: z.string().length(5, { message: "" }),
});

export default function DashboardHeader() {
  const { addSection, trackedSections, fetchSections, loadState } =
    useTrackedSectionsStore();
  const isLoading = loadState === LoadingState.FETCHING;
  const isAdding = loadState === LoadingState.ADDING;
  const term = CURRENT_TERM ?? "202531";

  const crnForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      crn: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const crn = values.crn;

    if (
      trackedSections.some(
        (section) => section.crn === crn && section.term == term
      )
    ) {
      toast.error(`You are already tracking section ${crn}.`);
      return;
    }

    addSection(term, crn)
      .then(() => {
        toast.success(`Successfully added section ${crn}.`);
      })
      .catch(() => {
        toast.error(`Section ${crn} does not exist.`);
      })
      .finally(() => crnForm.reset());
  }

  return (
    <div className="flex justify-between sm:items-center mb-6 border-b pb-4">
      <div className="flex flex-col lg:flex-row lg:gap-x-12 lg:h-10 lg:items-center">
        <h3 className="font-bold text-xl">Your Courses</h3>

        <div className="flex items-center">
          <RiSearch2Line className="w-4 h-4" />
          <Link
            href="/dashboard/search"
            className="group text-sm gap-x-2 font-semibold p-2"
          >
            <p className="underline-anim">Search for Sections</p>
          </Link>
        </div>

        <div className="flex items-center">
          <RiAddLine className="w-4 h-4 mr-2" />
          <Popover>
            <PopoverTrigger>
              <div className="text-sm flex items-center gap-x-2 font-semibold  hover:cursor-pointer">
                <p className="underline-anim">Add by CRN</p>
              </div>
            </PopoverTrigger>
            <PopoverContent className="rounded-none w-max" align="start">
              <Form {...crnForm}>
                <form
                  onSubmit={crnForm.handleSubmit(onSubmit)}
                  className="flex gap-x-3 items-center"
                >
                  <FormField
                    control={crnForm.control}
                    name="crn"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputOTP autoComplete="off" maxLength={5} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className="w-20" disabled={isAdding} type="submit">
                    {isAdding ? <LoadingCircle /> : "Submit"}
                  </Button>
                </form>
              </Form>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <RiRestartLine
        onClick={() => fetchSections(term)}
        className={cn(
          "w-5 h-5",
          isLoading ? "animate-spin opacity-50" : "hover:cursor-pointer"
        )}
      />
    </div>
  );
}
