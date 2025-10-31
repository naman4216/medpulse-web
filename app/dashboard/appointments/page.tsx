"use client";

import { useState, useMemo, type FC, type ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Calendar, Clock, MoreHorizontal, PlusCircle, Check, X, CalendarPlus,
  Search, Video, Phone, User, Mail, FileText, Send, MessageSquare, Bell, Download,
  Filter, RefreshCw, CheckCircle, XCircle, AlertCircle, Users,
  MapPin, Pill, Activity, History, Star, DollarSign, Copy,
  CalendarDays, Timer, AlertTriangle, ChevronRight, Grid3x3, List, Printer
} from "lucide-react";


//=========== 1. TYPE DEFINITIONS ===========//

type AppointmentStatus = "Confirmed" | "Scheduled" | "Completed" | "Canceled" | "Pending";
type AppointmentType = "Consultation" | "Follow-up" | "Telemedicine" | "New Patient";
type AppointmentPriority = "normal" | "high" | "urgent";

interface AppointmentPatient {
  name: string;
  avatar: string;
  phone: string;
  email: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;
  lastVisit: string;
}

interface Appointment {
  id: string;
  patient: AppointmentPatient;
  date: string;
  time: string;
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
  duration: number;
  notes: string;
  checkedIn: boolean;
  priority: AppointmentPriority;
  fee: number;
}

interface NewAppointmentState {
  patientName: string;
  phone: string;
  email: string;
  age: string;
  gender: AppointmentPatient['gender'];
  bloodGroup: string;
  date: string;
  time: string;
  type: AppointmentType;
  reason: string;
  duration: number;
  notes: string;
  fee: number;
}

interface RescheduleState {
  date: string;
  time: string;
  reason: string;
}

//=========== 2. INITIAL DATA ===========//

const initialAppointments: Appointment[] = [
  { id: "APT001", patient: { name: "Rohan Verma", avatar: "/avatars/01.png", phone: "+91 98765 43210", email: "rohan.v@email.com", age: 32, gender: "Male", bloodGroup: "O+", lastVisit: "2025-09-15" }, date: "2025-10-30", time: "10:00 AM", type: "Consultation", status: "Confirmed", reason: "Annual checkup", duration: 30, notes: "Patient has history of hypertension", checkedIn: false, priority: "normal", fee: 500 },
  { id: "APT002", patient: { name: "Anjali Singh", avatar: "/avatars/02.png", phone: "+91 98765 43211", email: "anjali.s@email.com", age: 28, gender: "Female", bloodGroup: "A+", lastVisit: "2025-10-15" }, date: "2025-10-30", time: "11:30 AM", type: "Follow-up", status: "Scheduled", reason: "Blood test results review", duration: 20, notes: "Follow-up for recent lab work", checkedIn: false, priority: "normal", fee: 300 },
  { id: "APT003", patient: { name: "Amit Kumar", avatar: "/avatars/05.png", phone: "+91 98765 43212", email: "amit.k@email.com", age: 45, gender: "Male", bloodGroup: "B+", lastVisit: "2025-10-20" }, date: "2025-10-31", time: "02:00 PM", type: "Telemedicine", status: "Scheduled", reason: "Diabetes management consultation", duration: 30, notes: "Regular diabetes check-in", checkedIn: false, priority: "high", fee: 400 },
  { id: "APT004", patient: { name: "Sneha Patel", avatar: "/avatars/04.png", phone: "+91 98765 43213", email: "sneha.p@email.com", age: 35, gender: "Female", bloodGroup: "AB+", lastVisit: "2025-11-01" }, date: "2025-11-01", time: "09:00 AM", type: "New Patient", status: "Completed", reason: "Initial consultation", duration: 45, notes: "First time patient", checkedIn: true, priority: "normal", fee: 800 },
  { id: "APT005", patient: { name: "Vikram Reddy", avatar: "/avatars/03.png", phone: "+91 98765 43214", email: "vikram.r@email.com", age: 52, gender: "Male", bloodGroup: "O-", lastVisit: "2025-09-10" }, date: "2025-11-02", time: "03:30 PM", type: "Consultation", status: "Canceled", reason: "Back pain assessment", duration: 30, notes: "Patient cancelled due to emergency", checkedIn: false, priority: "normal", fee: 500 },
  { id: "APT006", patient: { name: "Priya Sharma", avatar: "/avatars/01.png", phone: "+91 98765 43215", email: "priya.s@email.com", age: 29, gender: "Female", bloodGroup: "B-", lastVisit: "2025-10-25" }, date: "2025-10-30", time: "02:00 PM", type: "Follow-up", status: "Confirmed", reason: "Post-surgery checkup", duration: 25, notes: "Post-operative review", checkedIn: false, priority: "high", fee: 600 },
  { id: "APT007", patient: { name: "Rahul Mehta", avatar: "/avatars/02.png", phone: "+91 98765 43216", email: "rahul.m@email.com", age: 38, gender: "Male", bloodGroup: "A-", lastVisit: "2025-08-20" }, date: "2025-10-31", time: "10:30 AM", type: "Consultation", status: "Pending", reason: "Chest pain evaluation", duration: 30, notes: "Requires urgent attention", checkedIn: false, priority: "urgent", fee: 500 },
  { id: "APT008", patient: { name: "Neha Gupta", avatar: "/avatars/03.png", phone: "+91 98765 43217", email: "neha.g@email.com", age: 41, gender: "Female", bloodGroup: "O+", lastVisit: "2025-10-10" }, date: "2025-11-03", time: "11:00 AM", type: "Telemedicine", status: "Scheduled", reason: "Prescription refill", duration: 15, notes: "Routine prescription renewal", checkedIn: false, priority: "normal", fee: 250 },
];

const initialNewAppointmentState: NewAppointmentState = {
  patientName: "", phone: "", email: "", age: "", gender: "Male", bloodGroup: "O+", date: "", time: "", type: "Consultation", reason: "", duration: 30, notes: "", fee: 500
};

//=========== 3. HELPER FUNCTIONS ===========//

const getStatusBadgeVariant = (status: AppointmentStatus): BadgeProps['variant'] => {
  switch (status) {
    case "Confirmed": return "default";
    case "Completed": return "secondary";
    case "Canceled": return "destructive";
    case "Pending": return "outline";
    case "Scheduled": return "outline";
    default: return "outline";
  }
};

const getStatusIcon = (status: AppointmentStatus): ReactNode => {
  switch (status) {
    case "Confirmed": return <CheckCircle className="h-4 w-4" />;
    case "Completed": return <Check className="h-4 w-4" />;
    case "Canceled": return <XCircle className="h-4 w-4" />;
    case "Pending": return <Clock className="h-4 w-4" />;
    default: return <Calendar className="h-4 w-4" />;
  }
};

const getPriorityBadge = (priority: AppointmentPriority): ReactNode => {
  switch (priority) {
    case "urgent": return <Badge variant="destructive" className="text-xs">Urgent</Badge>;
    case "high": return <Badge variant="outline" className="text-xs border-orange-500 text-orange-700">High</Badge>;
    default: return null;
  }
};

//=========== 4. APPOINTMENTS PAGE COMPONENT ===========//

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState<boolean>(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState<boolean>(false);
  const [isSendReminderOpen, setIsSendReminderOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [newAppointment, setNewAppointment] = useState<NewAppointmentState>(initialNewAppointmentState);
  const [rescheduleData, setRescheduleData] = useState<RescheduleState>({ date: "", time: "", reason: "" });

  const filteredAppointments = useMemo(() => {
    return appointments.filter(apt => {
      const matchesSearch = apt.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || apt.id.toLowerCase().includes(searchQuery.toLowerCase()) || apt.reason.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
      const matchesType = typeFilter === "all" || apt.type === typeFilter;
      let matchesDate = true;
      const today = new Date().toISOString().slice(0, 10); // Use dynamic today's date
      if (dateFilter === "today") matchesDate = apt.date === today;
      else if (dateFilter === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        matchesDate = apt.date === tomorrow.toISOString().slice(0, 10);
      } else if (dateFilter === "week") {
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        matchesDate = apt.date >= today && apt.date <= nextWeek.toISOString().slice(0, 10);
      }
      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });
  }, [appointments, searchQuery, statusFilter, typeFilter, dateFilter]);

  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const todayAppts = appointments.filter(apt => apt.date === today);
    const completedToday = todayAppts.filter(apt => apt.status === "Completed").length;
    const totalRevenue = todayAppts.filter(apt => apt.status === "Completed").reduce((sum, apt) => sum + apt.fee, 0);
    const expectedRevenue = todayAppts.filter(apt => apt.status !== "Canceled").reduce((sum, apt) => sum + apt.fee, 0);

    return {
      todayTotal: todayAppts.length,
      confirmedToday: todayAppts.filter(apt => apt.status === "Confirmed").length,
      completedToday,
      pendingToday: todayAppts.filter(apt => apt.status === "Pending" || apt.status === "Scheduled").length,
      cancelledToday: todayAppts.filter(apt => apt.status === "Canceled").length,
      checkedInToday: todayAppts.filter(apt => apt.checkedIn).length,
      upcoming: appointments.filter(apt => apt.date >= today && apt.status !== "Completed" && apt.status !== "Canceled").length,
      pending: appointments.filter(apt => apt.status === "Pending").length,
      urgent: appointments.filter(apt => apt.priority === "urgent" && apt.status !== "Completed" && apt.status !== "Canceled").length,
      totalRevenue,
      expectedRevenue,
      completionRate: todayAppts.length > 0 ? Math.round((completedToday / todayAppts.filter(a => a.status !== 'Canceled').length) * 100) : 0,
    };
  }, [appointments]);

  const handleConfirm = (id: string) => setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: "Confirmed" } : apt));
  const handleCheckIn = (id: string) => setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, checkedIn: true, status: "Confirmed" } : apt));
  const handleComplete = (id: string) => setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: "Completed" } : apt));
  const handleCancel = (id: string) => setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: "Canceled" } : apt));
  const handleViewDetails = (appointment: Appointment) => { setSelectedAppointment(appointment); setIsDetailsOpen(true); };
  const handleReschedule = (appointment: Appointment) => { setSelectedAppointment(appointment); setRescheduleData({ date: appointment.date, time: appointment.time, reason: "" }); setIsRescheduleOpen(true); };
  const handleSendReminder = (appointment: Appointment) => { setSelectedAppointment(appointment); setIsSendReminderOpen(true); };

  const submitReschedule = () => {
    if (selectedAppointment && rescheduleData.date && rescheduleData.time) {
      setAppointments(prev => prev.map(apt => apt.id === selectedAppointment.id ? { ...apt, date: rescheduleData.date, time: rescheduleData.time, notes: apt.notes + ` | Rescheduled: ${rescheduleData.reason}` } : apt));
      setIsRescheduleOpen(false);
    }
  };

  const handleAddAppointment = () => {
    if (newAppointment.patientName && newAppointment.date && newAppointment.time) {
      const newApt: Appointment = {
        id: `APT${String(appointments.length + 1).padStart(3, '0')}`,
        patient: { name: newAppointment.patientName, avatar: "/avatars/01.png", phone: newAppointment.phone, email: newAppointment.email, age: parseInt(newAppointment.age) || 0, gender: newAppointment.gender, bloodGroup: newAppointment.bloodGroup, lastVisit: "" },
        date: newAppointment.date, time: newAppointment.time, type: newAppointment.type, status: "Scheduled", reason: newAppointment.reason, duration: newAppointment.duration, notes: newAppointment.notes, checkedIn: false, priority: "normal", fee: newAppointment.fee
      };
      setAppointments(prev => [...prev, newApt]);
      setIsNewAppointmentOpen(false);
      setNewAppointment(initialNewAppointmentState);
    }
  };

  const confirmSendReminder = () => {
    setIsSendReminderOpen(false);
    alert(`Reminder sent to ${selectedAppointment?.patient.name}`);
  };

  return (
    <div className="space-y-6 p-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-medium tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Appointments</h1><p className="text-muted-foreground pt-1">Comprehensive scheduling and patient management system</p></div>
        <div className="flex gap-2 flex-wrap"><Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Export</Button><Button variant="outline" size="sm"><Printer className="h-4 w-4 mr-2" />Print</Button><Button onClick={() => setIsNewAppointmentOpen(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"><PlusCircle className="h-4 w-4 mr-2" />New Appointment</Button></div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <Card className="hover:shadow-lg transition-shadow"><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Today's Total</CardTitle><Calendar className="h-4 w-4 text-blue-500" /></CardHeader><CardContent><div className="text-2xl font-medium">{stats.todayTotal}</div><Progress value={stats.completionRate} className="mt-2 h-2" /><p className="text-xs text-muted-foreground mt-1">{stats.completedToday} completed</p></CardContent></Card>
        <Card className="hover:shadow-lg transition-shadow"><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Confirmed</CardTitle><CheckCircle className="h-4 w-4 text-green-500" /></CardHeader><CardContent><div className="text-2xl font-medium text-green-600">{stats.confirmedToday}</div><p className="text-xs text-muted-foreground mt-1">{stats.checkedInToday} checked in</p></CardContent></Card>
        <Card className="hover:shadow-lg transition-shadow"><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Pending</CardTitle><Clock className="h-4 w-4 text-amber-500" /></CardHeader><CardContent><div className="text-2xl font-medium text-amber-600">{stats.pending}</div><p className="text-xs text-muted-foreground mt-1">Need confirmation</p></CardContent></Card>
        <Card className="hover:shadow-lg transition-shadow"><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Urgent</CardTitle><AlertTriangle className="h-4 w-4 text-red-500" /></CardHeader><CardContent><div className="text-2xl font-medium text-red-600">{stats.urgent}</div><p className="text-xs text-muted-foreground mt-1">Require attention</p></CardContent></Card>
        <Card className="hover:shadow-lg transition-shadow"><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Upcoming</CardTitle><CalendarDays className="h-4 w-4 text-purple-500" /></CardHeader><CardContent><div className="text-2xl font-medium text-purple-600">{stats.upcoming}</div><p className="text-xs text-muted-foreground mt-1">Future appointments</p></CardContent></Card>
        <Card className="hover:shadow-lg transition-shadow"><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Revenue</CardTitle><DollarSign className="h-4 w-4 text-indigo-500" /></CardHeader><CardContent><div className="text-2xl font-medium text-indigo-600">₹{stats.totalRevenue}</div><p className="text-xs text-muted-foreground mt-1">Expected: ₹{stats.expectedRevenue}</p></CardContent></Card>
      </div>

      {stats.pending > 3 && (<Alert className="border-amber-200 bg-amber-50"><AlertTriangle className="h-4 w-4 text-amber-600" /><AlertDescription className="text-amber-800">You have {stats.pending} pending appointments that need confirmation. Consider reaching out to patients.</AlertDescription></Alert>)}

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input placeholder="Search by patient name, ID, or reason..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" /></div>
              <Select value={dateFilter} onValueChange={setDateFilter}><SelectTrigger className="w-full md:w-[160px]"><SelectValue placeholder="Date" /></SelectTrigger><SelectContent><SelectItem value="all">All Dates</SelectItem><SelectItem value="today">Today</SelectItem><SelectItem value="tomorrow">Tomorrow</SelectItem><SelectItem value="week">This Week</SelectItem></SelectContent></Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-full md:w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">All Statuses</SelectItem><SelectItem value="Scheduled">Scheduled</SelectItem><SelectItem value="Confirmed">Confirmed</SelectItem><SelectItem value="Pending">Pending</SelectItem><SelectItem value="Completed">Completed</SelectItem><SelectItem value="Canceled">Canceled</SelectItem></SelectContent></Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}><SelectTrigger className="w-full md:w-[160px]"><SelectValue placeholder="Type" /></SelectTrigger><SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="Consultation">Consultation</SelectItem><SelectItem value="Follow-up">Follow-up</SelectItem><SelectItem value="Telemedicine">Telemedicine</SelectItem><SelectItem value="New Patient">New Patient</SelectItem></SelectContent></Select>
              <div className="flex gap-2"><Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}><List className="h-4 w-4" /></Button><Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}><Grid3x3 className="h-4 w-4" /></Button></div>
            </div>
            <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Showing {filteredAppointments.length} of {appointments.length} appointments</span><Button variant="ghost" size="sm" onClick={() => { setSearchQuery(""); setStatusFilter("all"); setTypeFilter("all"); setDateFilter("all"); }}><RefreshCw className="h-4 w-4 mr-2" />Reset Filters</Button></div>
          </div>
        </CardContent>
      </Card>

      {viewMode === "list" ? (
        <Card>
          <CardHeader><CardTitle>Appointment Schedule</CardTitle><CardDescription>Complete list of all appointments with detailed information</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12"><Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No appointments found matching your criteria</p><Button variant="link" onClick={() => setIsNewAppointmentOpen(true)} className="mt-2">Schedule new appointment</Button></div>
            ) : (
              <div className="space-y-2">
                {filteredAppointments.map((apt) => (
                  <div key={apt.id} className={`flex items-center gap-4 p-4 border-2 rounded-lg hover:shadow-md cursor-pointer transition-all ${apt.priority === "urgent" ? "border-red-200 bg-red-50" : apt.priority === "high" ? "border-orange-200 bg-orange-50" : "border-slate-200 hover:border-blue-300"} ${apt.checkedIn ? "bg-green-50/30" : ""}`} onClick={() => handleViewDetails(apt)}>
                    <Avatar className="h-14 w-14 ring-2 ring-blue-100"><AvatarImage src={apt.patient.avatar} alt={apt.patient.name} /><AvatarFallback>{apt.patient.name.charAt(0)}</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1"><p className="font-semibold text-lg">{apt.patient.name}</p>{apt.checkedIn && <Badge variant="secondary" className="text-xs">Checked In</Badge>}{getPriorityBadge(apt.priority)}{apt.type === "Telemedicine" && (<Badge variant="outline" className="text-xs"><Video className="h-3 w-3 mr-1" />Online</Badge>)}</div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground"><span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{apt.date}</span><span className="flex items-center gap-1"><Clock className="h-3 w-3" />{apt.time}</span><span className="flex items-center gap-1"><Timer className="h-3 w-3" />{apt.duration} min</span><span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />₹{apt.fee}</span></div>
                      <p className="text-sm text-slate-600 mt-1 line-clamp-1">{apt.reason}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center hidden md:block"><div className="text-xs text-muted-foreground mb-1">Status</div><Badge variant={getStatusBadgeVariant(apt.status)} className="flex items-center gap-1">{getStatusIcon(apt.status)}{apt.status}</Badge></div>
                      <DropdownMenu><DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}><Button variant="ghost" size="icon" className="shrink-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleViewDetails(apt); }}><User className="mr-2 h-4 w-4" />View Details</DropdownMenuItem>
                          {!apt.checkedIn && apt.status !== "Completed" && apt.status !== "Canceled" && (<DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleCheckIn(apt.id); }}><CheckCircle className="mr-2 h-4 w-4 text-green-600" />Check In</DropdownMenuItem>)}
                          {apt.status === "Pending" || apt.status === "Scheduled" ? (<DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleConfirm(apt.id); }}><Check className="mr-2 h-4 w-4 text-blue-600" />Confirm</DropdownMenuItem>) : null}
                          {apt.status === "Confirmed" || apt.checkedIn ? (<DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleComplete(apt.id); }}><CheckCircle className="mr-2 h-4 w-4 text-green-600" />Mark Complete</DropdownMenuItem>) : null}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleReschedule(apt); }}><CalendarPlus className="mr-2 h-4 w-4" />Reschedule</DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleSendReminder(apt); }}><Bell className="mr-2 h-4 w-4" />Send Reminder</DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(apt.id); }}><Copy className="mr-2 h-4 w-4" />Copy ID</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {apt.status !== "Canceled" && apt.status !== "Completed" ? (<DropdownMenuItem className="text-red-600" onClick={(e) => { e.stopPropagation(); handleCancel(apt.id); }}><X className="mr-2 h-4 w-4" />Cancel Appointment</DropdownMenuItem>) : null}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAppointments.length === 0 ? (<Card className="col-span-full"><CardContent className="text-center py-12"><Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No appointments found</p></CardContent></Card>) : (
            filteredAppointments.map((apt) => (
              <Card key={apt.id} className={`hover:shadow-lg transition-all cursor-pointer ${apt.priority === "urgent" ? "border-red-300" : apt.priority === "high" ? "border-orange-300" : ""}`} onClick={() => handleViewDetails(apt)}>
                <CardHeader className="pb-3"><div className="flex items-start justify-between"><div className="flex items-center gap-3"><Avatar className="h-12 w-12"><AvatarImage src={apt.patient.avatar} /><AvatarFallback>{apt.patient.name.charAt(0)}</AvatarFallback></Avatar><div><CardTitle className="text-base">{apt.patient.name}</CardTitle><p className="text-xs text-muted-foreground">{apt.id}</p></div></div>{getPriorityBadge(apt.priority)}</div></CardHeader>
                <CardContent className="space-y-3"><div className="flex items-center justify-between text-sm"><span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" />{apt.date}</span><span className="flex items-center gap-1 font-medium"><Clock className="h-3 w-3" />{apt.time}</span></div><div className="flex items-center justify-between"><Badge variant="outline" className="text-xs">{apt.type}</Badge><Badge variant={getStatusBadgeVariant(apt.status)} className="text-xs">{apt.status}</Badge></div><p className="text-sm text-muted-foreground line-clamp-2">{apt.reason}</p><div className="flex items-center justify-between pt-2 border-t"><span className="text-sm text-muted-foreground">{apt.duration} min</span><span className="text-sm font-semibold text-green-600">₹{apt.fee}</span></div><Button variant="outline" size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); handleViewDetails(apt); }}>View Details<ChevronRight className="h-4 w-4 ml-2" /></Button></CardContent>
              </Card>
            )))}
        </div>
      )}

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Appointment Details</DialogTitle><DialogDescription>Complete information and patient history</DialogDescription></DialogHeader>
          {selectedAppointment && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3"><TabsTrigger value="details">Details</TabsTrigger><TabsTrigger value="patient">Patient Info</TabsTrigger><TabsTrigger value="history">History</TabsTrigger></TabsList>
              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg"><Avatar className="h-16 w-16 ring-2 ring-blue-200"><AvatarImage src={selectedAppointment.patient.avatar} /><AvatarFallback>{selectedAppointment.patient.name.charAt(0)}</AvatarFallback></Avatar><div className="flex-1"><h3 className="text-xl font-semibold">{selectedAppointment.patient.name}</h3><div className="flex items-center gap-2 mt-2"><Badge variant={getStatusBadgeVariant(selectedAppointment.status)}>{selectedAppointment.status}</Badge>{getPriorityBadge(selectedAppointment.priority)}{selectedAppointment.checkedIn && (<Badge variant="secondary">Checked In</Badge>)}</div></div></div>
                <div className="grid grid-cols-2 gap-4"><div className="space-y-1 p-3 bg-blue-50 rounded-lg"><div className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />Appointment ID</div><div className="font-semibold">{selectedAppointment.id}</div></div><div className="space-y-1 p-3 bg-blue-50 rounded-lg"><div className="text-xs text-muted-foreground flex items-center gap-1"><Activity className="h-3 w-3" />Type</div><div className="font-semibold">{selectedAppointment.type}</div></div><div className="space-y-1 p-3 bg-green-50 rounded-lg"><div className="text-xs text-muted-foreground flex items-center gap-1"><CalendarDays className="h-3 w-3" />Date</div><div className="font-semibold">{selectedAppointment.date}</div></div><div className="space-y-1 p-3 bg-green-50 rounded-lg"><div className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />Time</div><div className="font-semibold">{selectedAppointment.time}</div></div><div className="space-y-1 p-3 bg-purple-50 rounded-lg"><div className="text-xs text-muted-foreground flex items-center gap-1"><Timer className="h-3 w-3" />Duration</div><div className="font-semibold">{selectedAppointment.duration} minutes</div></div><div className="space-y-1 p-3 bg-green-50 rounded-lg"><div className="text-xs text-muted-foreground flex items-center gap-1"><DollarSign className="h-3 w-3" />Consultation Fee</div><div className="font-semibold text-green-600">₹{selectedAppointment.fee}</div></div></div>
                <div className="space-y-2 border-t pt-4"><h4 className="font-semibold flex items-center gap-2"><FileText className="h-4 w-4" />Reason for Visit</h4><p className="text-sm p-3 bg-slate-50 rounded-lg">{selectedAppointment.reason}</p></div>
                {selectedAppointment.notes && (<div className="space-y-2"><h4 className="font-semibold flex items-center gap-2"><MessageSquare className="h-4 w-4" />Clinical Notes</h4><p className="text-sm p-3 bg-amber-50 rounded-lg border border-amber-200">{selectedAppointment.notes}</p></div>)}
              </TabsContent>
              <TabsContent value="patient" className="space-y-4 mt-4">
                <div className="space-y-3"><h4 className="font-semibold">Patient Information</h4><div className="grid grid-cols-2 gap-3"><div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"><User className="h-4 w-4 text-muted-foreground" /><div><div className="text-xs text-muted-foreground">Age</div><div className="font-medium">{selectedAppointment.patient.age} years</div></div></div><div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"><User className="h-4 w-4 text-muted-foreground" /><div><div className="text-xs text-muted-foreground">Gender</div><div className="font-medium">{selectedAppointment.patient.gender}</div></div></div><div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg"><Activity className="h-4 w-4 text-red-600" /><div><div className="text-xs text-muted-foreground">Blood Group</div><div className="font-medium text-red-600">{selectedAppointment.patient.bloodGroup}</div></div></div><div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"><History className="h-4 w-4 text-muted-foreground" /><div><div className="text-xs text-muted-foreground">Last Visit</div><div className="font-medium">{selectedAppointment.patient.lastVisit || "First Visit"}</div></div></div></div></div>
                <div className="space-y-3 border-t pt-4"><h4 className="font-semibold">Contact Information</h4><div className="space-y-2"><div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"><Phone className="h-5 w-5 text-blue-600" /><div><div className="text-xs text-muted-foreground">Phone</div><div className="font-medium">{selectedAppointment.patient.phone}</div></div><Button variant="outline" size="sm" className="ml-auto"><Phone className="h-3 w-3 mr-1" />Call</Button></div><div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"><Mail className="h-5 w-5 text-blue-600" /><div><div className="text-xs text-muted-foreground">Email</div><div className="font-medium">{selectedAppointment.patient.email}</div></div><Button variant="outline" size="sm" className="ml-auto"><Mail className="h-3 w-3 mr-1" />Email</Button></div></div></div>
              </TabsContent>
              <TabsContent value="history" className="space-y-4 mt-4">
                <div className="space-y-3"><h4 className="font-semibold">Visit History</h4><div className="space-y-2"><div className="flex items-start gap-3 p-3 border rounded-lg"><div className="p-2 bg-green-100 rounded-full"><CheckCircle className="h-4 w-4 text-green-600" /></div><div className="flex-1"><div className="font-medium">Annual Checkup</div><div className="text-sm text-muted-foreground">September 15, 2025</div><p className="text-sm mt-1">Complete physical examination. All vitals normal.</p></div></div><div className="flex items-start gap-3 p-3 border rounded-lg"><div className="p-2 bg-green-100 rounded-full"><CheckCircle className="h-4 w-4 text-green-600" /></div><div className="flex-1"><div className="font-medium">Follow-up Consultation</div><div className="text-sm text-muted-foreground">August 10, 2025</div><p className="text-sm mt-1">Blood pressure check. Medication adjusted.</p></div></div></div></div>
                <div className="space-y-3 border-t pt-4"><h4 className="font-semibold flex items-center gap-2"><Pill className="h-4 w-4" />Current Medications</h4><div className="space-y-2"><div className="p-3 bg-purple-50 rounded-lg border border-purple-200"><div className="font-medium">Lisinopril 10mg</div><div className="text-sm text-muted-foreground">Once daily for hypertension</div></div><div className="p-3 bg-purple-50 rounded-lg border border-purple-200"><div className="font-medium">Aspirin 75mg</div><div className="text-sm text-muted-foreground">Once daily for cardiovascular health</div></div></div></div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter className="gap-2"><Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Close</Button>{selectedAppointment && selectedAppointment.status !== "Completed" && selectedAppointment.status !== "Canceled" && (<><Button variant="outline" onClick={() => { setIsDetailsOpen(false); handleReschedule(selectedAppointment); }}><CalendarPlus className="h-4 w-4 mr-2" />Reschedule</Button>{!selectedAppointment.checkedIn ? (<Button onClick={() => { handleCheckIn(selectedAppointment.id); setIsDetailsOpen(false); }}><CheckCircle className="h-4 w-4 mr-2" />Check In</Button>) : (<Button onClick={() => { handleComplete(selectedAppointment.id); setIsDetailsOpen(false); }}><Check className="h-4 w-4 mr-2" />Complete</Button>)}</>)}</DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>Schedule New Appointment</DialogTitle><DialogDescription>Enter patient and appointment details</DialogDescription></DialogHeader><div className="space-y-6"><div className="space-y-4"><h4 className="font-semibold text-sm">Patient Information</h4><div className="grid grid-cols-2 gap-4"><div className="space-y-2 col-span-2"><Label>Patient Name *</Label><Input value={newAppointment.patientName} onChange={(e) => setNewAppointment(prev => ({ ...prev, patientName: e.target.value }))} placeholder="Enter full name" /></div><div className="space-y-2"><Label>Age</Label><Input type="number" value={newAppointment.age} onChange={(e) => setNewAppointment(prev => ({ ...prev, age: e.target.value }))} placeholder="Age" /></div><div className="space-y-2"><Label>Gender</Label><Select value={newAppointment.gender} onValueChange={(value: AppointmentPatient['gender']) => setNewAppointment(prev => ({ ...prev, gender: value }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>Phone</Label><Input value={newAppointment.phone} onChange={(e) => setNewAppointment(prev => ({ ...prev, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" /></div><div className="space-y-2"><Label>Email</Label><Input type="email" value={newAppointment.email} onChange={(e) => setNewAppointment(prev => ({ ...prev, email: e.target.value }))} placeholder="patient@email.com" /></div><div className="space-y-2"><Label>Blood Group</Label><Select value={newAppointment.bloodGroup} onValueChange={(value) => setNewAppointment(prev => ({ ...prev, bloodGroup: value }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="A+">A+</SelectItem><SelectItem value="A-">A-</SelectItem><SelectItem value="B+">B+</SelectItem><SelectItem value="B-">B-</SelectItem><SelectItem value="AB+">AB+</SelectItem><SelectItem value="AB-">AB-</SelectItem><SelectItem value="O+">O+</SelectItem><SelectItem value="O-">O-</SelectItem></SelectContent></Select></div></div></div><div className="space-y-4 border-t pt-4"><h4 className="font-semibold text-sm">Appointment Details</h4><div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Date *</Label><Input type="date" value={newAppointment.date} onChange={(e) => setNewAppointment(prev => ({ ...prev, date: e.target.value }))} /></div><div className="space-y-2"><Label>Time *</Label><Input type="time" value={newAppointment.time} onChange={(e) => setNewAppointment(prev => ({ ...prev, time: e.target.value }))} /></div><div className="space-y-2"><Label>Appointment Type</Label><Select value={newAppointment.type} onValueChange={(value: AppointmentType) => setNewAppointment(prev => ({ ...prev, type: value }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Consultation">Consultation</SelectItem><SelectItem value="Follow-up">Follow-up</SelectItem><SelectItem value="Telemedicine">Telemedicine</SelectItem><SelectItem value="New Patient">New Patient</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>Duration (minutes)</Label><Input type="number" value={newAppointment.duration} onChange={(e) => setNewAppointment(prev => ({ ...prev, duration: parseInt(e.target.value) || 30 }))} min="15" step="5" /></div><div className="space-y-2"><Label>Consultation Fee (₹)</Label><Input type="number" value={newAppointment.fee} onChange={(e) => setNewAppointment(prev => ({ ...prev, fee: parseInt(e.target.value) || 500 }))} min="0" /></div><div className="space-y-2 col-span-2"><Label>Reason for Visit</Label><Textarea value={newAppointment.reason} onChange={(e) => setNewAppointment(prev => ({ ...prev, reason: e.target.value }))} placeholder="Describe the reason for this appointment..." rows={2} /></div><div className="space-y-2 col-span-2"><Label>Additional Notes</Label><Textarea value={newAppointment.notes} onChange={(e) => setNewAppointment(prev => ({ ...prev, notes: e.target.value }))} placeholder="Any additional clinical notes or special instructions..." rows={2} /></div></div></div></div><DialogFooter><Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>Cancel</Button><Button onClick={handleAddAppointment} disabled={!newAppointment.patientName || !newAppointment.date || !newAppointment.time}><PlusCircle className="h-4 w-4 mr-2" />Schedule Appointment</Button></DialogFooter></DialogContent>
      </Dialog>

      <Dialog open={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
        <DialogContent><DialogHeader><DialogTitle>Reschedule Appointment</DialogTitle><DialogDescription>{selectedAppointment && `Rescheduling appointment for ${selectedAppointment.patient.name}`}</DialogDescription></DialogHeader><div className="space-y-4"><Alert><AlertCircle className="h-4 w-4" /><AlertDescription>Original: {selectedAppointment?.date} at {selectedAppointment?.time}</AlertDescription></Alert><div className="space-y-2"><Label>New Date</Label><Input type="date" value={rescheduleData.date} onChange={(e) => setRescheduleData(prev => ({ ...prev, date: e.target.value }))} /></div><div className="space-y-2"><Label>New Time</Label><Input type="time" value={rescheduleData.time} onChange={(e) => setRescheduleData(prev => ({ ...prev, time: e.target.value }))} /></div><div className="space-y-2"><Label>Reason for Rescheduling</Label><Textarea value={rescheduleData.reason} onChange={(e) => setRescheduleData(prev => ({ ...prev, reason: e.target.value }))} placeholder="Optional: Explain why this appointment is being rescheduled..." rows={3} /></div></div><DialogFooter><Button variant="outline" onClick={() => setIsRescheduleOpen(false)}>Cancel</Button><Button onClick={submitReschedule} disabled={!rescheduleData.date || !rescheduleData.time}><CalendarPlus className="h-4 w-4 mr-2" />Confirm Reschedule</Button></DialogFooter></DialogContent>
      </Dialog>

      <Dialog open={isSendReminderOpen} onOpenChange={setIsSendReminderOpen}>
        <DialogContent><DialogHeader><DialogTitle>Send Appointment Reminder</DialogTitle><DialogDescription>Send a reminder to {selectedAppointment?.patient.name} about their upcoming appointment</DialogDescription></DialogHeader><div className="space-y-4">{selectedAppointment && (<div className="p-4 bg-blue-50 rounded-lg border border-blue-200"><div className="space-y-2"><div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-blue-600" /><span className="font-medium">{selectedAppointment.date}</span></div><div className="flex items-center gap-2"><Clock className="h-4 w-4 text-blue-600" /><span className="font-medium">{selectedAppointment.time}</span></div><div className="flex items-center gap-2"><Activity className="h-4 w-4 text-blue-600" /><span className="font-medium">{selectedAppointment.type}</span></div></div></div>)}<div className="space-y-3"><h4 className="text-sm font-semibold">Send via:</h4><div className="space-y-2"><div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50"><div className="flex items-center gap-3"><MessageSquare className="h-5 w-5 text-green-600" /><div><div className="font-medium">SMS</div><div className="text-sm text-muted-foreground">{selectedAppointment?.patient.phone}</div></div></div><Button variant="outline" size="sm">Send</Button></div><div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50"><div className="flex items-center gap-3"><Mail className="h-5 w-5 text-blue-600" /><div><div className="font-medium">Email</div><div className="text-sm text-muted-foreground">{selectedAppointment?.patient.email}</div></div></div><Button variant="outline" size="sm">Send</Button></div><div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50"><div className="flex items-center gap-3"><Phone className="h-5 w-5 text-purple-600" /><div><div className="font-medium">Phone Call</div><div className="text-sm text-muted-foreground">Make a call to remind</div></div></div><Button variant="outline" size="sm">Call Now</Button></div></div></div></div><DialogFooter><Button variant="outline" onClick={() => setIsSendReminderOpen(false)}>Close</Button><Button onClick={confirmSendReminder}><Send className="h-4 w-4 mr-2" />Send All Reminders</Button></DialogFooter></DialogContent>
      </Dialog>
    </div>
  );
}
