"use client";

import { useState, useEffect, useMemo } from "react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Command, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator
} from "@/components/ui/command";
import { Textarea } from "@/components/ui/textarea";

import {
  Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, LineChart, Line, Area, AreaChart
} from "recharts";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Calendar, Users, IndianRupee, Video, MessageSquare, UserPlus, ArrowRight,
  PlusCircle, FileText, Bell, Search, Clock, CheckCircle, PieChart as PieChartIcon,
  TrendingUp, TrendingDown, AlertCircle, Star, Award, Stethoscope,
  Activity, Phone, Mail, MapPin, Pill, Syringe, HeartPulse, Brain,
  ClipboardList, Download, Filter, MoreVertical, CalendarClock, Zap,
  Target, DollarSign, Sparkles, ThumbsUp, ThumbsDown, AlertTriangle, ChevronDown, Check,
  Keyboard,
  Send,
  UsersRound,
  DoorOpen,
  Bed,
  Wand2,
  FlaskConical,
  Reply,
  PhoneCall
} from "lucide-react";

// --- Data Types ---
type Patient = {
  id: number;
  name: string;
  avatar: string;
  age: number;
  phone: string;
};

type Appointment = {
  id: string;
  time: string;
  patient: Patient;
  type: "In-Clinic" | "Video Call";
  status: "Checked-In" | "Confirmed" | "Upcoming" | "Completed" | "Cancelled";
  reason: string;
  priority: "normal" | "high";
};

type Task = {
  id: string;
  type: "Urgent Message" | "Lab Results" | "Prescription" | "Insurance Claim";
  description: string;
  time: string;
  link: string;
  priority: "urgent" | "high" | "normal";
  patientId?: number;
};

type QueuePatient = {
  id: number;
  name: string;
  avatar: string;
  reason: string;
  waitTime: string;
  type: "In-Clinic" | "Video Call";
  vitals: { bp: string; temp: string; pulse: string; };
};

type Message = {
  id: string;
  patientName: string;
  subject: string;
  time: string;
  type: "urgent" | "refill" | "general";
  read: boolean;
  patientId?: number;
  taskId?: string;
};

type Room = {
  id: string;
  name: string;
  status: "In Use" | "Available" | "Needs Cleaning";
  patientName?: string;
};

type Staff = {
  id: string;
  name: string;
  role: "Nurse" | "Asst.";
  status: string;
};

type LabResult = {
  patientId: number;
  testName: string;
  results: {
    name: string;
    value: string;
    flag: "Normal" | "Low" | "High";
  }[];
};


// --- Mock Data and Helper Functions ---
const mockTodaysAppointments: Appointment[] = [
  { id: "apt1", time: "09:30 AM", patient: { id: 1, name: "Vikram Kumar", avatar: "/avatars/05.png", age: 45, phone: "+91 98765 43210" }, type: "In-Clinic", status: "Checked-In", reason: "Annual Physical", priority: "normal" },
  { id: "apt2", time: "11:00 AM", patient: { id: 2, name: "Priya Singh", avatar: "/avatars/02.png", age: 32, phone: "+91 98765 43211" }, type: "Video Call", status: "Confirmed", reason: "Follow-up - Diabetes", priority: "normal" },
  { id: "apt3", time: "01:30 PM", patient: { id: 3, name: "Rohan Gupta", avatar: "/avatars/01.png", age: 28, phone: "+91 98765 43212" }, type: "In-Clinic", status: "Upcoming", reason: "Back Pain", priority: "high" },
  { id: "apt4", time: "03:00 PM", patient: { id: 4, name: "Anjali Mehta", avatar: "/avatars/03.png", age: 55, phone: "+91 98765 43213" }, type: "Video Call", status: "Upcoming", reason: "Hypertension Review", priority: "high" },
  { id: "apt5", time: "04:00 PM", patient: { id: 5, name: "Sunita Devi", avatar: "/avatars/04.png", age: 38, phone: "+91 98765 43214" }, type: "In-Clinic", status: "Upcoming", reason: "Vaccination", priority: "normal" },
];

const mockWeeklyAppointmentData = [
  { day: "Mon", appointments: 10, revenue: 12000 },
  { day: "Tue", appointments: 12, revenue: 15000 },
  { day: "Wed", appointments: 8, revenue: 9500 },
  { day: "Thu", appointments: 14, revenue: 18000 },
  { day: "Fri", appointments: 11, revenue: 14500 },
  { day: "Sat", appointments: 7, revenue: 8500 },
];

const mockMonthlyTrends = [
  { month: "May", patients: 320, revenue: 480000 },
  { month: "Jun", patients: 340, revenue: 510000 },
  { month: "Jul", patients: 365, revenue: 547500 },
  { month: "Aug", patients: 380, revenue: 570000 },
  { month: "Sep", patients: 410, revenue: 615000 },
  { month: "Oct", patients: 425, revenue: 637500 },
];

const mockConsultationTypeData = [
  { name: 'In-Clinic', value: 8, fill: '#2563eb' },
  { name: 'Video Calls', value: 4, fill: '#60a5fa' },
  { name: 'Emergency', value: 1, fill: '#ef4444' },
];

const mockSpecialtyBreakdown = [
  { name: 'General', value: 45, fill: '#3b82f6' },
  { name: 'Cardiology', value: 20, fill: '#ef4444' },
  { name: 'Diabetes', value: 18, fill: '#f59e0b' },
  { name: 'Orthopedic', value: 17, fill: '#10b981' },
];

const mockPendingTasks: Task[] = [
  { id: "t1", type: "Urgent Message", description: "Rohan Verma: 'Experiencing chest pain...'", time: "5m ago", link: "/dashboard/messages/2", priority: "urgent", patientId: 6 },
  { id: "t2", type: "Lab Results", description: "Review blood test for Anjali Singh.", time: "2h ago", link: "/dashboard/patients/4/labs", priority: "high", patientId: 4 },
  { id: "t3", type: "Prescription", description: "Approve refill request for Vikram Reddy.", time: "4h ago", link: "/dashboard/patients/3/prescriptions", priority: "normal", patientId: 3 },
  { id: "t4", type: "Insurance Claim", description: "Verify claim for Priya Sharma's procedure.", time: "5h ago", link: "/dashboard/billing", priority: "normal", patientId: 2 },
];

const mockPatientQueue: QueuePatient[] = [
    { id: 1, name: "Vikram Kumar", avatar: "/avatars/05.png", reason: "Routine Check-up", waitTime: "15 min", type: "In-Clinic", vitals: { bp: "120/80", temp: "98.6°F", pulse: "72" } },
    { id: 6, name: "Aarav Sharma", avatar: "/avatars/06.png", reason: "Follow-up", waitTime: "5 min", type: "In-Clinic", vitals: { bp: "130/85", temp: "98.4°F", pulse: "78" } },
    { id: 2, name: "Priya Singh", avatar: "/avatars/02.png", reason: "Follow-up - Diabetes", waitTime: "", type: "Video Call", vitals: { bp: "N/A", temp: "N/A", pulse: "N/A" } },
];

const mockRecentActivity = [
  { icon: <CheckCircle className="h-4 w-4 text-green-500" />, text: "Vikram Kumar checked in for 09:30 AM appointment", time: "12m ago", action: "view" },
  { icon: <UserPlus className="h-4 w-4 text-blue-500" />, text: "New patient registered: Meera Iyer", time: "25m ago", action: "view" },
  { icon: <FileText className="h-4 w-4 text-indigo-500" />, text: "Lab results uploaded for Priya Singh", time: "45m ago", action: "review" },
  { icon: <Pill className="h-4 w-4 text-purple-500" />, text: "Prescription sent to pharmacy for Rohan Gupta", time: "1h ago", action: null },
  { icon: <Star className="h-4 w-4 text-amber-500" />, text: "New 5-star review from Anjali Mehta", time: "2h ago", action: "read" },
];

const mockUpcomingFollowUps = [
  { patient: "Meera Patel", date: "Tomorrow", time: "10:00 AM", reason: "Post-surgery check" },
  { patient: "Rahul Desai", date: "Nov 2", time: "02:00 PM", reason: "Lab review" },
  { patient: "Kavita Joshi", date: "Nov 5", time: "11:30 AM", reason: "Medication adjustment" },
];

const mockPrescriptionAlerts = [
  { patient: "Amit Verma", medication: "Metformin", status: "Refill needed", daysLeft: 3 },
  { patient: "Sita Reddy", medication: "Lisinopril", status: "Interaction alert", severity: "high" },
];

const mockMessages: Message[] = [
  { id: "m1", patientName: "Rohan Verma", subject: "Experiencing chest pain...", time: "5m ago", type: "urgent", read: false, patientId: 6, taskId: "t1" },
  { id: "m2", patientName: "Vikram Reddy", subject: "Refill request: Atorvastatin", time: "4h ago", type: "refill", read: false, patientId: 3, taskId: "t3" },
  { id: "m3", patientName: "Amit Verma", subject: "Refill request: Metformin", time: "6h ago", type: "refill", read: false },
  { id: "m4", patientName: "Kavita Joshi", subject: "Question about side effects", time: "8h ago", type: "general", read: true },
];

const mockRoomStatus: Room[] = [
  { id: "r1", name: "Room 1", status: "In Use", patientName: "Vikram Kumar" },
  { id: "r2", name: "Room 2", status: "Available" },
  { id: "r3", name: "Room 3", status: "Needs Cleaning" },
];

const mockStaffStatus: Staff[] = [
  { id: "s1", name: "Nurse Priya", role: "Nurse", status: "Triage (Aarav Sharma)" },
  { id: "s2", name: "Asst. Rahul", role: "Asst.", status: "Vitals (Sunita Devi)" },
];

const mockLabResults: Record<number, LabResult> = {
  4: {
    patientId: 4,
    testName: "Complete Blood Count (CBC)",
    results: [
      { name: "RBC", value: "4.8", flag: "Normal" },
      { name: "WBC", value: "9.2", flag: "Normal" },
      { name: "Platelets", value: "350", flag: "Normal" },
      { name: "Hemoglobin", value: "11.2", flag: "Low" },
    ],
  },
};

const performanceMetrics = {
  patientSatisfaction: 96,
  avgWaitTime: 12,
  appointmentCompletionRate: 94,
  responseTime: 8,
};

const getStatusBadgeVariant = (status: Appointment["status"]) => {
  switch (status) {
    case "Checked-In": return "default";
    case "Confirmed": return "secondary";
    case "Upcoming": return "outline";
    case "Completed": return "secondary"; // FIX: Changed from "success" to a valid variant
    case "Cancelled": return "destructive";
    default: return "secondary";
  }
};

const getRoomStatusColor = (status: Room["status"]) => {
  switch (status) {
    case "In Use": return "text-blue-600 bg-blue-50";
    case "Available": return "text-green-600 bg-green-50";
    case "Needs Cleaning": return "text-amber-600 bg-amber-50";
    default: return "text-slate-600 bg-slate-50";
  }
};

const today = new Date();
const formattedDate = today.toLocaleDateString("en-IN", {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

// --- Modal Components ---
function NewAppointmentModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Appointment</DialogTitle>
          <DialogDescription>
            Fill in the details to schedule a new appointment.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="patient-name">Patient</Label>
            <Input id="patient-name" placeholder="Search patient name..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="datetime">Date & Time</Label>
            <Input id="datetime" type="datetime-local" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-clinic">In-Clinic</SelectItem>
                <SelectItem value="video-call">Video Call</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reason">Reason</Label>
            <Input id="reason" placeholder="e.g., Annual Physical" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">Schedule Appointment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function RescheduleAppointmentModal({
  appointment,
  onOpenChange,
  onConfirm,
}: {
  appointment: Appointment | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: (appointmentId: string, newDateTime: string) => void;
}) {
  const [newDateTime, setNewDateTime] = useState("");

  if (!appointment) return null;

  const handleConfirm = () => {
    onConfirm(appointment.id, newDateTime);
  };

  return (
    <Dialog open={!!appointment} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogDescription>
            Select a new date and time for <strong className="text-foreground">{appointment.patient.name}</strong>.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="new-datetime">New Date & Time</Label>
            <Input 
              id="new-datetime" 
              type="datetime-local" 
              value={newDateTime}
              onChange={(e) => setNewDateTime(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reschedule-reason">Reason for Rescheduling (Optional)</Label>
            <Textarea id="reschedule-reason" placeholder="e.g., Patient request, doctor unavailability..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleConfirm} disabled={!newDateTime}>Confirm Reschedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function QuickReviewLabModal({ task, labResult, onOpenChange, onResolve }: { task: Task | null, labResult: LabResult | null, onOpenChange: (open: boolean) => void, onResolve: (taskId: string) => void }) {
  if (!task || !labResult) return null;
  return (
    <Dialog open={!!task} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick Lab Review</DialogTitle>
          <DialogDescription>{task.description}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <h4 className="font-medium">{labResult.testName}</h4>
          <div className="mt-2 space-y-1">
            {labResult.results.map(result => (
              <div key={result.name} className="flex justify-between text-sm p-2 rounded-md bg-slate-50">
                <span className="text-muted-foreground">{result.name}</span>
                <span className={`font-medium ${result.flag === 'Low' ? 'text-blue-600' : result.flag === 'High' ? 'text-red-600' : ''}`}>
                  {result.value} {result.flag !== 'Normal' && `(${result.flag})`}
                </span>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onResolve(task.id)}>
            Reviewed & Message Patient
          </Button>
          <Button onClick={() => onResolve(task.id)}>
            <Check className="h-4 w-4 mr-2" />
            Mark as Reviewed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function DashboardPage() {
  const router = useRouter();

  const [todaysAppointments, setTodaysAppointments] = useState<Appointment[]>(mockTodaysAppointments);
  const [pendingTasks, setPendingTasks] = useState<Task[]>(mockPendingTasks);
  const [patientQueue, setPatientQueue] = useState<QueuePatient[]>(mockPatientQueue);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  
  const [queueFilter, setQueueFilter] = useState({
    inClinic: true,
    videoCall: true,
  });

  const [openCommandBar, setOpenCommandBar] = useState(false);
  const [openNewAppointmentModal, setOpenNewAppointmentModal] = useState(false);
  const [reviewingTask, setReviewingTask] = useState<Task | null>(null);

  const [reschedulingAppointment, setReschedulingAppointment] = useState<Appointment | null>(null);

  const appointmentStats = useMemo(() => {
    const completed = todaysAppointments.filter(apt => apt.status === 'Completed').length;
    const remaining = todaysAppointments.filter(
      apt => apt.status === 'Upcoming' || apt.status === 'Confirmed' || apt.status === 'Checked-In'
    ).length;
    const cancelled = todaysAppointments.filter(apt => apt.status === 'Cancelled').length;
    return { completed, remaining, cancelled };
  }, [todaysAppointments]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenCommandBar((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleResolveTask = (taskId: string) => {
    setPendingTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
    setReviewingTask(null);
  };

  const handleApproveRefill = (messageId: string, taskId?: string) => {
    setMessages(currentMessages => currentMessages.filter(msg => msg.id !== messageId));
    if (taskId) {
      setPendingTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
    }
  };

  const handleUpdateAppointmentStatus = (appointmentId: string, newStatus: Appointment["status"]) => {
    setTodaysAppointments(currentAppointments =>
      currentAppointments.map(apt =>
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    );
  };

  const handleConfirmReschedule = (appointmentId: string, newDateTime: string) => {
    const rescheduledApt = todaysAppointments.find(apt => apt.id === appointmentId);
    alert(`Appointment for ${rescheduledApt?.patient.name} has been rescheduled to ${new Date(newDateTime).toLocaleString()}.`);
    setTodaysAppointments(current => current.filter(apt => apt.id !== appointmentId));
    setReschedulingAppointment(null);
  };

  const handleQueueFilterChange = (type: "inClinic" | "videoCall", checked: boolean) => {
    setQueueFilter(currentFilters => ({
      ...currentFilters,
      [type]: checked,
    }));
  };

  const runCommand = (command: () => void) => {
    setOpenCommandBar(false);
    command();
  };

  const filteredPatientQueue = patientQueue.filter(patient => {
    if (queueFilter.inClinic && patient.type === "In-Clinic") return true;
    if (queueFilter.videoCall && patient.type === "Video Call") return true;
    return false;
  });

  const highPriorityAppointments = todaysAppointments.filter(apt => apt.priority === 'high');
  const urgentTasks = pendingTasks.filter(task => task.priority === 'urgent');
  const firstPatientWaiting = patientQueue.find(p => p.type === "In-Clinic");
  const urgentMessages = messages.filter(m => m.type === 'urgent' && !m.read);
  const refillMessages = messages.filter(m => m.type === 'refill' && !m.read);
  const generalMessages = messages.filter(m => m.type === 'general' && !m.read);
  const completedAppointmentCount = appointmentStats.completed;

  return (
    <div className="space-y-6">
      <RescheduleAppointmentModal 
        appointment={reschedulingAppointment}
        onOpenChange={(open) => !open && setReschedulingAppointment(null)}
        onConfirm={handleConfirmReschedule}
      />
      
      <Dialog open={openCommandBar} onOpenChange={setOpenCommandBar}>
        <DialogContent className="overflow-hidden p-0 shadow-lg">
          <DialogTitle className="sr-only">Command Menu</DialogTitle>
          <DialogDescription className="sr-only">
            Type a command or search to quickly navigate or take an action.
          </DialogDescription>
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Patients">
                <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/patients/1'))}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Vikram Kumar</span>
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/patients/2'))}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Priya Singh</span>
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/patients/3'))}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Rohan Gupta</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem onSelect={() => runCommand(() => setOpenNewAppointmentModal(true))}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>New Appointment</span>
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/prescriptions/new'))}>
                  <Pill className="mr-2 h-4 w-4" />
                  <span>New Prescription</span>
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/messages'))}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>View All Messages</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
      <NewAppointmentModal open={openNewAppointmentModal} onOpenChange={setOpenNewAppointmentModal} />
      <QuickReviewLabModal
        task={reviewingTask}
        labResult={reviewingTask?.patientId ? mockLabResults[reviewingTask.patientId] : null}
        onOpenChange={(open) => !open && setReviewingTask(null)}
        onResolve={handleResolveTask}
      />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome back, Dr. Sharma!
          </h1>
          <p className="text-muted-foreground pt-1">Here's your practice overview for {formattedDate || "Today"}</p>
        </div>
        <div className="flex w-full sm:w-auto items-center gap-2">
          <Button
            variant="outline"
            className="w-full sm:w-48 md:w-64 justify-start text-muted-foreground"
            onClick={() => setOpenCommandBar(true)}
          >
            <span className="pl-7">Search / Command...</span>
            <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            onClick={() => setOpenNewAppointmentModal(true)}
          >
            <PlusCircle className="h-4 w-4 mr-2" /> New Appointment
          </Button>
        </div>
      </div>
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-blue-600" />
            Your Daily Briefing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base text-slate-700">
            Good morning, Dr. Sharma. You have <strong className="text-blue-600">{todaysAppointments.length} appointments</strong> today, including <strong className="text-orange-600">{highPriorityAppointments.length} high-priority</strong> reviews.
            You have <strong className="text-red-600">{urgentTasks.length} urgent task(s)</strong> needing attention.
            {firstPatientWaiting ? (
              <>
                {' '}Your first patient, <strong className="text-green-700">{firstPatientWaiting.name}</strong>, is checked in.
              </>
            ) : (
              " No patients are checked in yet."
            )}
          </p>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/appointments">
          <Card className="transition-all hover:shadow-lg hover:border-blue-300 cursor-pointer ">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-medium">{todaysAppointments.length}</div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <p className="text-xs text-green-600 font-medium">+16% from last week</p>
              </div>
              <Progress value={Math.round((completedAppointmentCount / todaysAppointments.length) * 100) || 0} className="mt-3 h-2" />
              <p className="text-xs text-muted-foreground mt-1">{completedAppointmentCount} completed, {appointmentStats.remaining} remaining</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/patients">
          <Card className="transition-all hover:shadow-lg hover:border-green-300 cursor-pointer ">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patients in Queue</CardTitle>
              <Users className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-medium">{filteredPatientQueue.length}</div>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <p className="text-xs text-amber-600 font-medium">Avg wait: {performanceMetrics.avgWaitTime} min</p>
              </div>
              <Progress value={65} className="mt-3 h-2" />
              <p className="text-xs text-muted-foreground mt-1">Ready for consultation</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/analytics">
          <Card className="transition-all hover:shadow-lg hover:border-indigo-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
              <IndianRupee className="h-5 w-5 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-medium">₹15,000</div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <p className="text-xs text-green-600 font-medium">+12% from yesterday</p>
              </div>
              <Progress value={75} className="mt-3 h-2" />
              <p className="text-xs text-muted-foreground mt-1">Target: ₹20,000/day</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/patients?filter=labs">
          <Card className="transition-all hover:shadow-lg hover:border-purple-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Labs</CardTitle>
              <FlaskConical className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-medium">{pendingTasks.filter(t => t.type === "Lab Results").length}</div>
              <div className="flex items-center gap-2 mt-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p className="text-xs text-red-600 font-medium">{pendingTasks.filter(t => t.type === "Lab Results" && t.priority === "high").length} high priority</p>
              </div>
              <Progress value={33} className="mt-3 h-2 bg-red-100" />
              <p className="text-xs text-muted-foreground mt-1">To review</p>
            </CardContent>
          </Card>
        </Link>
      </div>
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            Performance Snapshot
          </CardTitle>
          <CardDescription>Your key performance indicators for this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-5 w-5 text-amber-500" />
                <span className="text-2xl font-medium text-blue-600">{performanceMetrics.patientSatisfaction}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-medium text-green-600">{performanceMetrics.appointmentCompletionRate}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-indigo-500" />
                <span className="text-2xl font-medium text-indigo-600">{performanceMetrics.avgWaitTime} min</span>
              </div>
              <p className="text-sm text-muted-foreground">Avg Wait Time</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-purple-500" />
                <span className="text-2xl font-medium text-purple-600">{performanceMetrics.responseTime} min</span>
              </div>
              <p className="text-sm text-muted-foreground">Response Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-500" />
                    Patient Queue
                  </CardTitle>
                  <CardDescription>Patients checked in and ready for consultation</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" /> Filter
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Show</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={queueFilter.inClinic}
                      onCheckedChange={(checked) => handleQueueFilterChange("inClinic", checked)}
                    >
                      In-Clinic
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={queueFilter.videoCall}
                      onCheckedChange={(checked) => handleQueueFilterChange("videoCall", checked)}
                    >
                      Video Call
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              {filteredPatientQueue.length > 0 ? (
                <div className="space-y-4">
                  {filteredPatientQueue.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all bg-gradient-to-r from-white to-slate-50">
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="h-12 w-12 ring-2 ring-blue-100">
                          <AvatarImage src={patient.avatar} />
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold text-lg">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">{patient.reason}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-xs">
                              <HeartPulse className="h-3 w-3 text-red-500" />
                              <span>{patient.vitals.bp}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <Activity className="h-3 w-3 text-blue-500" />
                              <span>{patient.vitals.pulse} bpm</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <Stethoscope className="h-3 w-3 text-green-500" />
                              <span>{patient.vitals.temp}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-center px-3 py-2 bg-amber-50 rounded-lg border border-amber-200 w-20 flex flex-col items-center justify-center h-[56px]">
                          {patient.type === 'In-Clinic' ? (
                            <>
                              <Clock className="h-4 w-4 text-amber-600 mb-1" />
                              <span className="text-xs font-medium text-amber-700">{patient.waitTime}</span>
                            </>
                          ) : (
                            <>
                              <Video className="h-4 w-4 text-amber-600 mb-1" />
                              <span className="text-xs font-medium text-amber-700">Video Call</span>
                            </>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                            <Link href={patient.type === "Video Call" ? `/dashboard/messages?patient=${patient.id}&video=true` : `/dashboard/messages?patient=${patient.id}`}>
                              {patient.type === 'Video Call' ? (
                                <Video className="h-4 w-4 mr-2" />
                              ) : (
                                <Stethoscope className="h-4 w-4 mr-2" />
                              )}
                              Start
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/dashboard/patients/${patient.id}/chart`}>
                              <FileText className="h-4 w-4 mr-2" />
                              Chart
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/dashboard/messages?patient=${patient.id}`}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No patients in queue{queueFilter.inClinic !== queueFilter.videoCall ? " with current filters" : ""}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CalendarClock className="h-5 w-5 text-blue-500" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>
                  {todaysAppointments.length} appointments • {appointmentStats.completed} completed • {appointmentStats.remaining} remaining
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/appointments">
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flow-root">
                {todaysAppointments.length > 0 ? (
                  <ul className="-my-4 divide-y divide-slate-100">
                    {todaysAppointments.map((apt) => (
                      <li key={apt.id} className={`flex items-center gap-4 py-4 px-3 rounded-lg hover:bg-slate-50 transition-all ${apt.priority === 'high' ? 'bg-orange-50/50' : ''}`}>
                        <div className="w-20 text-sm font-medium text-slate-800 text-center">
                          <div>{apt.time.split(' ')[0]}</div>
                          <div className="text-xs text-muted-foreground">{apt.time.split(' ')[1]}</div>
                        </div>
                        <Avatar className="ring-2 ring-blue-100">
                          <AvatarImage src={apt.patient.avatar} />
                          <AvatarFallback>{apt.patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold hover:underline">
                              <Link href={`/dashboard/patients/${apt.patient.id}`}>{apt.patient.name}</Link>
                            </p>
                            {apt.priority === 'high' && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{apt.reason}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              {apt.type === "Video Call" ? <Video className="h-3 w-3 text-blue-500" /> : <Users className="h-3 w-3 text-green-500" />}
                              {apt.type}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {apt.patient.phone}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={getStatusBadgeVariant(apt.status)}
                            className={apt.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {apt.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>{apt.patient.name}</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/patients/${apt.patient.id}/chart`}>
                                  <FileText className="h-4 w-4 mr-2" />
                                  View Patient Chart
                                </Link>
                              </DropdownMenuItem>
                              {apt.status !== 'Completed' && (
                                <DropdownMenuItem onClick={() => handleUpdateAppointmentStatus(apt.id, "Completed")}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark as Completed
                                </DropdownMenuItem>
                              )}
                              
                              <DropdownMenuItem onClick={() => setReschedulingAppointment(apt)}>
                                <CalendarClock className="h-4 w-4 mr-2" />
                                Reschedule
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => handleUpdateAppointmentStatus(apt.id, "Cancelled")}>
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Cancel Appointment
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="font-medium">No appointments scheduled for today.</p>
                    <p className="text-sm text-muted-foreground">Click "New Appointment" to add one.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
           <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Appointments This Week</CardTitle>
                    <CardDescription>Daily appointment volume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={mockWeeklyAppointmentData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip cursor={{ fill: 'rgba(37, 99, 235, 0.1)' }} contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} />
                        <Bar dataKey="appointments" fill="#2563eb" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Revenue This Week</CardTitle>
                    <CardDescription>Daily revenue breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={mockWeeklyAppointmentData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} />
                        <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="monthly" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">6-Month Trends</CardTitle>
                  <CardDescription>Patient volume and revenue trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={mockMonthlyTrends} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis yAxisId="left" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis yAxisId="right" orientation="right" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="patients" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
                      <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="breakdown" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <PieChartIcon className="h-5 w-5" />
                      Consultation Types
                    </CardTitle>
                    <CardDescription>Today's appointment distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={mockConsultationTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} label={({ name, value }) => `${name} (${value})`}>
                          {mockConsultationTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                        </Pie>
                        <Tooltip />
                        <Legend iconSize={10} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Specialty Breakdown
                    </CardTitle>
                    <CardDescription>Patient distribution by specialty</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={mockSpecialtyBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                          {mockSpecialtyBreakdown.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                        </Pie>
                        <Tooltip />
                        <Legend iconSize={10} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                Message Triage
                {messages.filter(m => !m.read).length > 0 && (
                  <Badge variant="destructive" className="ml-auto">{messages.filter(m => !m.read).length}</Badge>
                )}
              </CardTitle>
              <CardDescription>Patient messages needing action</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {urgentMessages.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-red-600 uppercase mb-2">Urgent</h4>
                  {urgentMessages.map(msg => (
                    <div key={msg.id} className="p-3 rounded-lg bg-red-50 border border-red-200">
                      <p className="font-semibold text-sm">{msg.patientName}</p>
                      <p className="text-sm text-red-700 truncate">{msg.subject}</p>
                      <div className="flex gap-2 mt-2">
                        <Button variant="destructive" size="sm" className="flex-1 h-8">
                          <PhoneCall className="h-3 w-3 mr-1.5" /> Call
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 h-8">
                          <Reply className="h-3 w-3 mr-1.5" /> Reply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {refillMessages.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-amber-600 uppercase mb-2">Refill Requests</h4>
                  <div className="space-y-2">
                    {refillMessages.map(msg => (
                      <div key={msg.id} className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                        <p className="font-semibold text-sm">{msg.patientName}</p>
                        <p className="text-sm text-amber-700 truncate">{msg.subject}</p>
                        <div className="flex gap-2 mt-2">
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="flex-1 h-8 bg-green-600 text-white hover:bg-green-700" 
                            onClick={() => handleApproveRefill(msg.id, msg.taskId)}
                          >
                            <Check className="h-3 w-3 mr-1.5" /> Approve
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 h-8">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {generalMessages.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">General</h4>
                  <div className="space-y-2">
                    {generalMessages.map(msg => (
                      <div key={msg.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                        <p className="font-semibold text-sm">{msg.patientName}</p>
                        <p className="text-sm text-slate-600 truncate">{msg.subject}</p>
                        <Button variant="link" size="sm" className="h-auto p-0 mt-1">
                          View & Reply
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <Button variant="outline" className="w-full mt-2" asChild>
                <Link href="/dashboard/messages">View All Messages</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                Clinic Status
              </CardTitle>
              <CardDescription>Real-time room and staff activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-3">Rooms</h4>
                <div className="space-y-2">
                  {mockRoomStatus.map(room => (
                    <div key={room.id} className={`flex items-center justify-between p-2 rounded-lg text-sm ${getRoomStatusColor(room.status)}`}>
                      <div className="flex items-center gap-2 font-medium">
                        {room.status === 'Available' ? <DoorOpen className="h-4 w-4" /> : <Bed className="h-4 w-4" />}
                        <span>{room.name}</span>
                      </div>
                      <span className="text-xs font-medium">
                        {room.status === "In Use" ? room.patientName : room.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold mb-3">Staff</h4>
                <div className="space-y-2">
                  {mockStaffStatus.map(staff => (
                    <div key={staff.id} className="flex items-start gap-3 p-2 rounded-lg bg-slate-50">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{staff.name} <span className="text-xs text-muted-foreground">({staff.role})</span></p>
                        <p className="text-xs text-muted-foreground">{staff.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-red-500" />
                Prescription Alerts
              </CardTitle>
              <CardDescription>Medication monitoring and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockPrescriptionAlerts.map((alert, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${alert.severity === 'high' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{alert.patient}</p>
                        <p className="text-sm text-muted-foreground">{alert.medication}</p>
                      </div>
                      {alert.severity === 'high' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    </div>
                    <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'} className="mt-2 text-xs">
                      {alert.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}