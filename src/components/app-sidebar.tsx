import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Banknote,
  ChevronDown,
  Home,
  Info,
  MessageCircleQuestion,
  Phone,
  Search,
  Settings,
} from "lucide-react";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="bg-[#492727] h-36 flex justify-center items-center">
        <Image
          className="absolute w-full rotate-180 top-0"
          src={"/images/pyramids.png"}
          alt=""
          width={225}
          height={225}
        />
        <Link href={"/"} className="z-10">
          <div className="transition-transform hover:scale-105 active:scale-95 hover:cursor-pointer">
            <Image
              src={"/images/logo-white-beta.png"}
              alt="AggieSeek"
              width={225}
              height={225}
            />
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="text-white">
                Menu
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="text-white">
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href={"/dashboard"}
                        className={
                          pathname === "/dashboard" ? "border-l-2" : undefined
                        }
                      >
                        <Home />
                        <span>Home</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href={"/dashboard/search"}
                        className={
                          pathname.startsWith("/dashboard/search")
                            ? "border-l-2"
                            : undefined
                        }
                      >
                        <Search />
                        <span>Search</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href={"/dashboard/settings"}
                        className={
                          pathname.startsWith("/dashboard/settings")
                            ? "border-l-2"
                            : undefined
                        }
                      >
                        <Settings />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="text-white">
                Support
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="text-white">
                  <SidebarMenuItem className="hidden">
                    <SidebarMenuButton
                      asChild
                      className={
                        pathname.startsWith("/dashboard/about")
                          ? "border-l-2"
                          : undefined
                      }
                    >
                      <Link href={"/about"}>
                        <Info />
                        <span>About</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem className={"hidden"}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={"/dashboard/contact"}
                        className={
                          pathname.startsWith("/dashboard/contact")
                            ? "border-l-2"
                            : undefined
                        }
                      >
                        <Phone />
                        <span>Contact</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href={"/dashboard/feedback"}
                        className={
                          pathname.startsWith("/dashboard/feedback")
                            ? "border-l-2"
                            : undefined
                        }
                      >
                        <MessageCircleQuestion />
                        <span>Feedback</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem className={"hidden"}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={"https://ko-fi.com/aggieseek"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Banknote />
                        <span>Donate</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
