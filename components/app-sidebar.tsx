"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  ChevronDown,
  ChevronRight,
  Link,
  User,
  LayoutDashboard,
  Settings,
  BarChart2,
  Users,
  Globe,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Linkme",
    url: "/dashboard/links",
    icon: Link,
    children: [
      {
        title: "Links",
        url: "/dashboard/links",
      },
    ],
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart2,
  },
  {
    title: "Followers",
    url: "/dashboard/followers",
    icon: Users,
  },
  {
    title: "Public Page",
    url: "/your-username",
    icon: Globe,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [open, setOpen] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUsername(
          data.user.user_metadata?.user_name || // GitHub username
            data.user.user_metadata?.username || // Other providers
            data.user.email || // Fallback to email
            null
        );
      }
    }
    fetchUser();
  }, [supabase]);

  const handleToggle = (title: string) => {
    setOpen(open === title ? null : title);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="py-2 px-10 rounded-lg hover:bg-gray-100 transition cursor-pointer">
              {username}
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        className="flex items-center w-full px-2 py-2 text-left hover:bg-muted rounded transition"
                        onClick={() => handleToggle(item.title)}
                        aria-expanded={open === item.title}
                        aria-controls={`submenu-${item.title}`}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span className="flex-1">{item.title}</span>
                        {open === item.title ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      <div
                        id={`submenu-${item.title}`}
                        className={`overflow-hidden transition-all duration-300 ${
                          open === item.title
                            ? "max-h-40 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <ul className="ml-6 mt-1 space-y-1">
                          {item.children.map((sub) => (
                            <li key={sub.title}>
                              <a
                                href={sub.url}
                                className="block px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition"
                              >
                                {sub.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
