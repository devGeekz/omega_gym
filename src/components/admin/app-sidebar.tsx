"use client";

import * as React from "react";
import {
  IconCalendar,
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconPhoto,
  IconSettings,
  IconStar,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/admin/nav-documents";
import { NavMain } from "@/components/admin/nav-main";
import { NavSecondary } from "@/components/admin/nav-secondary";
import { NavUser } from "@/components/admin/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "User Management",
      url: "/admin/user-management",
      icon: IconListDetails,
    },
    {
      title: "Track Payments",
      url: "/admin/track-payments",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: IconChartBar,
    },

  ],
  navClouds: [
    {
      title: "Capturevzcvzv",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposalsdafafa",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/admin/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/admin/help",
      icon: IconHelp,
    },
  ],
  documents: [
    {
      name: "Class Schedule",
      url: "/admin/class-schedules",
      icon: IconCalendar,
    },
    {
      name: "Gallery",
      url: "/admin/gallery",
      icon: IconPhoto,
    },
    {
      name: "Trainers List",
      url: "/admin/trainers",
      icon: IconUsers,
    },
    {
      name: "Membership Plans",
      url: "/admin/membership-plans",
      icon: IconFileWord,
    },
    {
      name: "Success Stories",
      url: "/admin/success-stories",
      icon: IconStar,
    },
    {
      name: "Gym Policies",
      url: "/admin/gym-policies",
      icon: IconFileDescription,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="#">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session!.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
