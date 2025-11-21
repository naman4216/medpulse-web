// File: components/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  Heart,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/appointments", icon: Calendar, label: "Appointments" },
  { href: "/dashboard/patients", icon: Users, label: "Patients" },
  { href: "/dashboard/messages", icon: MessageSquare, label: "Messages" },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userType');
    router.push('/login');
  };

  return (
    // This code is correct. The `sticky` and `h-screen` properties
    // will work perfectly inside the flex container from layout.tsx.
    <aside className="hidden w-64 flex-col border-r bg-background md:flex sticky top-0 h-screen">
      <div className="flex h-16 items-center border-b px-6 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-3 font-semibold text-lg">
          <div className="bg-primary p-2 rounded-lg">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="tracking-tight">HealthCare Pro</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} passHref>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-base font-normal",
                    pathname === item.href 
                      ? "bg-primary/10 text-primary font-semibold"
                      // ✨ Subtle UI improvement for hover state
                      : "hover:bg-muted" 
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* ✨ IMPROVEMENT: Replaced redundant button with a User Profile section */}
      <div className="mt-auto p-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-2">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Dr. Sharma" />
                    <AvatarFallback>DS</AvatarFallback>
                </Avatar>
                <div className="text-left">
                    <p className="font-medium text-sm">Dr. Sharma</p>
                    <p className="text-xs text-muted-foreground">View Settings</p>
                </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="right" className="w-56 mb-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4"/>
                    Settings
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4"/>
                Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}