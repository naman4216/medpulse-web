// File: components/dashboard/Header.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle, Bell, UserPlus } from "lucide-react";
import Link from "next/link";

// --- DUMMY DATA FOR NOTIFICATIONS ---
// In a real app, this would come from a global state or API
const notifications = [
    { type: "Urgent Message", description: "Rohan Verma: 'Experiencing chest pain...'", link: "/dashboard/messages/2" },
    { type: "Lab Results", description: "Review blood test for Anjali Singh.", link: "/dashboard/patients/1/labs" },
];

export function Header() {
  return (
    // ✨ Changed to justify-end to shift all content to the right
    <header className="sticky top-0 z-30 flex h-16 items-center justify-end gap-4 border-b bg-background/80 px-4 backdrop-blur-lg sm:px-6">
      
      {/* Container for all controls, aligned to the right */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            className="w-full md:w-[200px] lg:w-[300px] rounded-full pl-9"
          />
        </div>

        {/* Quick Add Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="rounded-full">
              <PlusCircle className="h-5 w-5" />
              <span className="sr-only">Quick Add</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Create New</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/appointments/new" className="flex items-center gap-2 cursor-pointer">
                <PlusCircle className="h-4 w-4" />
                <span>New Appointment</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
               <Link href="/dashboard/patients/register" className="flex items-center gap-2 cursor-pointer">
                <UserPlus className="h-4 w-4" />
                <span>Register Patient</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="rounded-full relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Badge variant="secondary">{notifications.length} New</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                {notifications.map((item, index) => (
                    <DropdownMenuItem key={index} asChild>
                         <Link href={item.link} className="flex flex-col items-start gap-1 cursor-pointer w-full">
                            <p className="text-sm font-medium">{item.type}</p>
                            <p className="text-xs text-muted-foreground truncate w-full">{item.description}</p>
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm text-primary hover:underline cursor-pointer">
              <Link href="/dashboard/notifications">View all notifications</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Dr. Sharma" />
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Dr. Sharma</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/dashboard/profile" className="cursor-pointer">Profile</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/dashboard/settings" className="cursor-pointer">Settings</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}