import {
  IconCalendar,
  IconChartBar,
  IconDashboard,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconMoneybag,
  IconPhoto,
  IconSettings,
  IconStar,
  IconUsers,
} from "@tabler/icons-react";

export const SidebarData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard, 
    },
    {
      title: "User Management",
      url: "/admin/user-management",
      icon: IconUsers,
    },
    {
      title: "Track Payments",
      url: "/admin/track-payments",
      icon: IconMoneybag
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: IconChartBar,
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
