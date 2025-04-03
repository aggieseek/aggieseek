"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import LoadingCircle from "../loading-circle";
import { Section } from "@prisma/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { RiCheckLine } from "react-icons/ri";
import { ChevronsUpDown, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Course, Term } from "@/lib/types";
import { getSubjects } from "@/actions/subjects";
import { getCourses } from "@/actions/courses";
import { useRouter, useSearchParams } from "next/navigation";
import { persistSearch } from "@/actions/persist";
import SearchClassCell from "./search-class-cell";

const pageSize = 8;
const formSchema = z.object({
  termCode: z.string({ required_error: "Please specify a term." }),
  subject: z.string().optional(),
  course: z.string().optional(),
});

const CURRENT_TERM = "202531";

function SectionDisplay({ sections }: { sections: Section[] | undefined }) {
  const [page, setPage] = useState<number>(0);
  const maxPage = sections ? Math.ceil(sections.length / pageSize) - 1 : 0;

  const incPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, maxPage));
  };

  const decPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  useEffect(() => {
    setPage(0);
  }, [sections]);

  if (sections === undefined) {
    return (
      <div className="mt-4 lg:mt-0">
        Choose from the filters to begin your search!
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between flex-1">
      <div className="flex flex-col text-xs w-full overflow-visible gap-y-1">
        {paginateArray(sections, page).map((section) => (
          <SearchClassCell key={section.term + section.crn} section={section} />
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <div className="text-xs self-center font-bold">
          Page {page + 1} of {maxPage + 1}{" "}
        </div>

        <div className="flex justify-end gap-x-2">
          <Button
            disabled={page === 0}
            className="transition-opacity"
            onClick={decPage}
          >
            Back
          </Button>

          <Button
            disabled={page === maxPage}
            className="transition-opacity"
            onClick={incPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function paginateArray<T>(array: T[], page: number): T[] {
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  return array.slice(startIndex, endIndex);
}

export default function SearchMenu({ terms }: { terms: Term[] }) {
  const [open, setOpen] = useState<boolean>(false);
  const [subjectsOpen, setSubjectsOpen] = useState<boolean>(false);
  const [coursesOpen, setCoursesOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      termCode: undefined,
      subject: undefined,
      course: undefined,
    },
  });

  const [subjects, setSubjects] = useState<string[] | undefined>(undefined);
  const [courses, setCourses] = useState<Course[] | undefined>(undefined);
  const [sections, setSections] = useState<Section[] | undefined>(undefined);

  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [subjectsLoading, setSubjectsLoading] = useState<boolean>(false);
  const [coursesLoading, setCoursesLoading] = useState<boolean>(false);
  const [isSearching, setSearching] = useState<boolean>(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { termCode: term, subject, course } = values;
    if (!term || !subject) return;
    setSearching(true);
    fetch(`/api/search/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ term, subject, course }),
    })
      .then((res) => res.json())
      .then((data: Section[]) => setSections(data))
      .finally(() => {
        setSearching(false);
        setPageLoading(false);
      });
  }

  function fetchSubjects() {
    setSubjectsLoading(true);
    getSubjects(form.getValues("termCode"))
      .then((subjects) => setSubjects(subjects))
      .finally(() => setSubjectsLoading(false));
  }

  function fetchCourses() {
    const subject = form.getValues("subject");
    if (!subject) return;
    setCoursesLoading(true);
    getCourses(form.getValues("termCode"), subject)
      .then((courses) => setCourses(courses))
      .finally(() => setCoursesLoading(false));
  }

  useEffect(() => {
    const term = searchParams.get("term") ?? undefined;
    const subject = searchParams.get("subject") ?? undefined;
    const course = searchParams.get("course") ?? undefined;

    form.setValue("termCode", term ?? CURRENT_TERM);
    persistSearch(term, subject, course).then((res) => {
      console.log(res);
      if (res !== false) {
        setSubjects(res.subjects);
        setCourses(res.courses);
        form.setValue("subject", subject);
        form.setValue("course", course);
        onSubmit(form.getValues());
      } else {
        fetchSubjects();
        router.push(`?term=${CURRENT_TERM}`);
        setPageLoading(false);
      }
    });
  }, []);

  if (pageLoading) {
    return (
      <div className="flex justify-center">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className="flex flex-col xl:flex-row flex-1 mt-1 xl:gap-x-4 h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full sticky flex-col justify-between xl:w-96 p-4 border rounded-lg"
        >
          <div className="flex flex-col gap-y-4">
            <div className="font-semibold">Filter Sections</div>

            <FormField
              control={form.control}
              name="termCode"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-1">Term</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={isSearching}
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? terms.find((term) => term.code === field.value)
                                ?.desc
                            : "Select term"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[--radix-popover-trigger-width] p-0"
                      align="start"
                    >
                      <Command
                        filter={(value, search) => {
                          const term = terms.find(
                            (term) => term.code === value
                          );
                          if (
                            term?.desc
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          )
                            return 1;
                          return 0;
                        }}
                      >
                        <CommandInput
                          placeholder="Search term..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No term found.</CommandEmpty>
                          <CommandGroup>
                            {terms.map((term) => (
                              <CommandItem
                                value={term.code}
                                key={term.code}
                                onSelect={() => {
                                  router.push(`?term=${term.code}`);
                                  form.setValue("termCode", term.code);
                                  form.setValue("subject", undefined);
                                  form.setValue("course", undefined);
                                  setOpen(false);
                                  setSections(undefined);
                                  setCourses(undefined);
                                  fetchSubjects();
                                }}
                                className="hover:cursor-pointer"
                              >
                                {term.desc}
                                <RiCheckLine
                                  className={cn(
                                    "ml-auto",
                                    term.code === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-1">Subject</FormLabel>
                  <Popover open={subjectsOpen} onOpenChange={setSubjectsOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={
                            subjects === undefined ||
                            subjectsLoading ||
                            isSearching
                          }
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between items-center",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <div>
                            {subjectsLoading ? (
                              <LoaderCircle
                                className={"animate-spin w-4 h-4"}
                              />
                            ) : subjects === undefined ? (
                              ""
                            ) : subjects.find(
                                (subject) => subject === field.value
                              ) ? (
                              field.value
                            ) : (
                              "Select subject"
                            )}
                          </div>
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[--radix-popover-trigger-width] p-0"
                      align="start"
                    >
                      <Command>
                        <CommandInput
                          placeholder="Search term..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No term found.</CommandEmpty>
                          <CommandGroup>
                            {subjects?.map((subject) => (
                              <CommandItem
                                value={subject}
                                key={subject}
                                onSelect={() => {
                                  router.push(
                                    `?term=${form.getValues(
                                      "termCode"
                                    )}&subject=${subject}`
                                  );
                                  form.setValue("subject", subject);
                                  form.setValue("course", undefined);
                                  setSubjectsOpen(false);
                                  fetchCourses();
                                }}
                                className="hover:cursor-pointer"
                              >
                                {subject}
                                <RiCheckLine
                                  className={cn(
                                    "ml-auto",
                                    subject === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="course"
              render={({ field }) => {
                const currentCourse = courses?.find(
                  (course) => course.course === field.value
                );
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mb-1">Course</FormLabel>
                    <Popover open={coursesOpen} onOpenChange={setCoursesOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={
                              courses === undefined ||
                              coursesLoading ||
                              isSearching
                            }
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <div>
                              {coursesLoading ? (
                                <LoaderCircle
                                  className={"animate-spin w-4 h-4"}
                                />
                              ) : !courses ? (
                                ""
                              ) : currentCourse ? (
                                `${currentCourse.course} - ${currentCourse.title}`
                              ) : (
                                "Select course"
                              )}
                            </div>
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[--radix-popover-trigger-width] p-0"
                        align="start"
                      >
                        <Command
                          filter={(value, search) => {
                            if (!courses) return 0;
                            const found = courses?.find(
                              (course) => course.course === value
                            );
                            if (!found) return 0;
                            const title = `${found.course} - ${found.title}`;
                            if (
                              title.toLowerCase().includes(search.toLowerCase())
                            )
                              return 1;
                            return 0;
                          }}
                        >
                          <CommandInput
                            placeholder="Search course..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No course found.</CommandEmpty>
                            <CommandGroup>
                              {courses?.map((course) => (
                                <CommandItem
                                  value={course.course}
                                  key={course.course + " - " + course.title}
                                  onSelect={() => {
                                    router.push(
                                      `?term=${form.getValues(
                                        "termCode"
                                      )}&subject=${form.getValues(
                                        "subject"
                                      )}&course=${course.course}`
                                    );

                                    if (field.value === course.course) {
                                      form.setValue("course", undefined);
                                    } else {
                                      form.setValue("course", course.course);
                                    }
                                    setCoursesOpen(false);
                                  }}
                                  className="hover:cursor-pointer"
                                >
                                  {course.course} - {course.title}
                                  <RiCheckLine
                                    className={cn(
                                      "ml-auto",
                                      course.course === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <Button
            disabled={isSearching || subjectsLoading || coursesLoading}
            type="submit"
            className="w-full mt-8 xl:mt-0"
          >
            {isSearching || subjectsLoading || coursesLoading ? (
              <LoadingCircle />
            ) : (
              "Search"
            )}
          </Button>
        </form>
      </Form>

      <SectionDisplay sections={sections} />
    </div>
  );
}
