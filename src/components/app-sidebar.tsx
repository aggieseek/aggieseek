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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  RiArrowDownSLine,
  RiHome3Line,
  RiSearch2Line,
  RiSettings2Line,
} from "react-icons/ri";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function MenuCategory({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="text-white">
            {title}
            <RiArrowDownSLine className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu className="text-white">{children}</SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

function MenuItem({
  name,
  href,
  active = (path) => path.startsWith(href),
  icon,
}: {
  name: string;
  href: string;
  active: (path: string) => boolean;
  icon: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarMenuItem
      className={
        active(pathname)
          ? "sidebar-selected bg-sidebar-accent"
          : "sidebar-hover"
      }
    >
      <SidebarMenuButton asChild>
        <Link href={href}>
          {icon}
          <span>{name}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
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
        <MenuCategory title="Menu">
          <MenuItem
            name="Home"
            href="/dashboard"
            active={(path) => path === "/dashboard"}
            icon={<RiHome3Line />}
          />

          <MenuItem
            name="Search"
            href="/dashboard/search"
            active={(path) => path.startsWith("/dashboard/search")}
            icon={<RiSearch2Line />}
          />

          <MenuItem
            name="Settings"
            href="/dashboard/settings"
            active={(path) => path.startsWith("/dashboard/settings")}
            icon={<RiSettings2Line />}
          />
        </MenuCategory>

        <MenuCategory title="Support">
          <MenuItem
            name="Feedback"
            href="/dashboard/feedback"
            active={(path) => path === "/dashboard/feedback"}
            icon={<RiHome3Line />}
          />
        </MenuCategory>
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
      <SidebarTrigger className="transition-opacity border rounded-md bg-gray-50 absolute top-3 opacity-50 hover:opacity-100 -right-10 shadow-lg" />
    </Sidebar>
  );
}
