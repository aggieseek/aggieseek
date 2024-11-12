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
import { Banknote, ChevronDown, Info, LayoutDashboard, MessageCircleQuestion, Phone, Search, Settings } from "lucide-react";
import Image from "next/image";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import Link from "next/link";

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="bg-[#492727] h-36 flex justify-center items-center">
                <Image className="absolute w-full rotate-180 top-0" src={"/images/pyramids.png"} alt="" width={225} height={225} />
                <Link href={"/"} className="z-10">
                    <div className="transition-transform hover:scale-105 active:scale-95 hover:cursor-pointer">
                        <Image src={"/images/logo-white.png"} alt="AggieSeek" width={225} height={225} />
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
                                            <Link href={"/dashboard"}>
                                                <LayoutDashboard />
                                                <span>Dashboard</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href={"/search"}>
                                                <Search />
                                                <span>Search</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href={"/settings"}>
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
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href={"/dashboard"}>
                                                <Info />
                                                <span>About</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href={"https://ko-fi.com/aggieseek"} target="_blank" rel="noopener noreferrer">
                                                <Banknote />
                                                <span>Donate</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href={"/search"}>
                                                <Phone />
                                                <span>Contact</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href={"/settings"}>
                                                <MessageCircleQuestion />
                                                <span>Feedback</span>
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
