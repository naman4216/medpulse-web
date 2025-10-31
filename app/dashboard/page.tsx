// File: app/dashboard/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, 
    PieChart, Pie, Cell, Legend, LineChart, Line, Area, AreaChart
} from "recharts";
import Link from "next/link";
import { 
  Calendar, Users, IndianRupee, Video, MessageSquare, UserPlus, ArrowRight, 
  PlusCircle, FileText, Bell, Search, Clock, CheckCircle, PieChart as PieChartIcon,
  TrendingUp, TrendingDown, AlertCircle, Star, Award, Stethoscope, 
  Activity, Phone, Mail, MapPin, Pill, Syringe, HeartPulse, Brain,
  ClipboardList, Download, Filter, MoreVertical, CalendarClock, Zap,
  Target, DollarSign, Sparkles, ThumbsUp, ThumbsDown, AlertTriangle
} from "lucide-react";

// --- ENHANCED DATA STRUCTURES ---

const todaysAppointments = [
  { time: "09:30 AM", patient: { id: 1, name: "Vikram Kumar", avatar: "/avatars/05.png", age: 45, phone: "+91 98765 43210" }, type: "In-Clinic", status: "Checked-In", reason: "Annual Physical", priority: "normal" },
  { time: "11:00 AM", patient: { id: 2, name: "Priya Singh", avatar: "/avatars/02.png", age: 32, phone: "+91 98765 43211" }, type: "Video Call", status: "Confirmed", reason: "Follow-up - Diabetes", priority: "normal" },
  { time: "01:30 PM", patient: { id: 3, name: "Rohan Gupta", avatar: "/avatars/01.png", age: 28, phone: "+91 98765 43212" }, type: "In-Clinic", status: "Upcoming", reason: "Back Pain", priority: "normal" },
  { time: "03:00 PM", patient: { id: 4, name: "Anjali Mehta", avatar: "/avatars/03.png", age: 55, phone: "+91 98765 43213" }, type: "Video Call", status: "Upcoming", reason: "Hypertension Review", priority: "high" },
  { time: "04:00 PM", patient: { id: 5, name: "Sunita Devi", avatar: "/avatars/04.png", age: 38, phone: "+91 98765 43214" }, type: "In-Clinic", status: "Upcoming", reason: "Vaccination", priority: "normal" },
];

const weeklyAppointmentData = [
  { day: "Mon", appointments: 10, revenue: 12000 }, 
  { day: "Tue", appointments: 12, revenue: 15000 }, 
  { day: "Wed", appointments: 8, revenue: 9500 }, 
  { day: "Thu", appointments: 14, revenue: 18000 }, 
  { day: "Fri", appointments: 11, revenue: 14500 }, 
  { day: "Sat", appointments: 7, revenue: 8500 },
];

const monthlyTrends = [
  { month: "May", patients: 320, revenue: 480000 },
  { month: "Jun", patients: 340, revenue: 510000 },
  { month: "Jul", patients: 365, revenue: 547500 },
  { month: "Aug", patients: 380, revenue: 570000 },
  { month: "Sep", patients: 410, revenue: 615000 },
  { month: "Oct", patients: 425, revenue: 637500 },
];

const consultationTypeData = [
    { name: 'In-Clinic', value: 8, fill: '#2563eb' },
    { name: 'Video Calls', value: 4, fill: '#60a5fa' },
    { name: 'Emergency', value: 1, fill: '#ef4444' },
];

const specialtyBreakdown = [
  { name: 'General', value: 45, fill: '#3b82f6' },
  { name: 'Cardiology', value: 20, fill: '#ef4444' },
  { name: 'Diabetes', value: 18, fill: '#f59e0b' },
  { name: 'Orthopedic', value: 17, fill: '#10b981' },
];

const pendingTasks = [
    { type: "Urgent Message", description: "Rohan Verma: 'Experiencing chest pain...'", time: "5m ago", link: "/dashboard/messages/2", priority: "urgent" },
    { type: "Lab Results", description: "Review blood test for Anjali Singh.", time: "2h ago", link: "/dashboard/patients/1/labs", priority: "high" },
    { type: "Prescription", description: "Approve refill request for Vikram Reddy.", time: "4h ago", link: "/dashboard/patients/3/prescriptions", priority: "normal" },
    { type: "Insurance Claim", description: "Verify claim for Priya Sharma's procedure.", time: "5h ago", link: "/dashboard/billing", priority: "normal" },
];

const patientQueue = [
  { id: 1, name: "Vikram Kumar", avatar: "/avatars/05.png", reason: "Routine Check-up", waitTime: "15 min", vitals: { bp: "120/80", temp: "98.6°F", pulse: "72" } },
  { id: 6, name: "Aarav Sharma", avatar: "/avatars/06.png", reason: "Follow-up", waitTime: "5 min", vitals: { bp: "130/85", temp: "98.4°F", pulse: "78" } },
];

const recentActivity = [
    { icon: <CheckCircle className="h-4 w-4 text-green-500"/>, text: "Vikram Kumar checked in for 09:30 AM appointment", time: "12m ago", action: "view" },
    { icon: <UserPlus className="h-4 w-4 text-blue-500"/>, text: "New patient registered: Meera Iyer", time: "25m ago", action: "view" },
    { icon: <FileText className="h-4 w-4 text-indigo-500"/>, text: "Lab results uploaded for Priya Singh", time: "45m ago", action: "review" },
    { icon: <Pill className="h-4 w-4 text-purple-500"/>, text: "Prescription sent to pharmacy for Rohan Gupta", time: "1h ago", action: null },
    { icon: <Star className="h-4 w-4 text-amber-500"/>, text: "New 5-star review from Anjali Mehta", time: "2h ago", action: "read" },
];

const upcomingFollowUps = [
  { patient: "Meera Patel", date: "Tomorrow", time: "10:00 AM", reason: "Post-surgery check" },
  { patient: "Rahul Desai", date: "Nov 2", time: "02:00 PM", reason: "Lab review" },
  { patient: "Kavita Joshi", date: "Nov 5", time: "11:30 AM", reason: "Medication adjustment" },
];

const prescriptionAlerts = [
  { patient: "Amit Verma", medication: "Metformin", status: "Refill needed", daysLeft: 3 },
  { patient: "Sita Reddy", medication: "Lisinopril", status: "Interaction alert", severity: "high" },
];

const performanceMetrics = {
  patientSatisfaction: 96,
  avgWaitTime: 12, // minutes
  appointmentCompletionRate: 94,
  responseTime: 8, // minutes
};

const todayStats = {
  completed: 5,
  remaining: 7,
  cancelled: 1,
  noShows: 0,
};

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "Checked-In": return "default";
    case "Confirmed": return "secondary";
    case "Upcoming": return "outline";
    default: return "secondary";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent": return "text-red-600 bg-red-50 border-red-200";
    case "high": return "text-orange-600 bg-orange-50 border-orange-200";
    default: return "text-slate-600 bg-slate-50 border-slate-200";
  }
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome back, Dr. Sharma!
          </h1>
          <p className="text-muted-foreground pt-1">Here's your practice overview for Thursday, October 30, 2025</p>
        </div>
        <div className="flex w-full sm:w-auto items-center gap-2">
            <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search patients..." className="pl-8 sm:w-48 md:w-64"/>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <PlusCircle className="h-4 w-4 mr-2" /> New Appointment
            </Button>
        </div>
      </div>

      {/* Enhanced Stat Cards with Trends */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/appointments">
          <Card className="transition-all hover:shadow-lg hover:border-blue-300 cursor-pointer ">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-medium">12</div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <p className="text-xs text-green-600 font-medium">+16% from last week</p>
              </div>
              <Progress value={42} className="mt-3 h-2" />
              <p className="text-xs text-muted-foreground mt-1">5 completed, 7 remaining</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/patients">
          <Card className="transition-all hover:shadow-lg hover:border-green-300 cursor-pointer ">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
              <Users className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-medium">{patientQueue.length}</div>
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

        <Link href="/dashboard/messages">
          <Card className="transition-all hover:shadow-lg hover:border-purple-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-medium">3</div>
              <div className="flex items-center gap-2 mt-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p className="text-xs text-red-600 font-medium">1 urgent message</p>
              </div>
              <Progress value={25} className="mt-3 h-2 bg-red-100" />
              <p className="text-xs text-muted-foreground mt-1">Avg response: {performanceMetrics.responseTime} min</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Performance Snapshot */}
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

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
            {/* Patient Queue Card - Enhanced */}
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
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" /> Filter
                      </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {patientQueue.length > 0 ? (
                        <div className="space-y-4">
                            {patientQueue.map((patient) => (
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
                                    <div className="flex items-center gap-4">
                                        <div className="text-center px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
                                            <Clock className="h-4 w-4 text-amber-600 mx-auto mb-1" />
                                            <span className="text-xs font-medium text-amber-700">{patient.waitTime}</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                            <Video className="h-4 w-4 mr-2" />
                                            Start
                                          </Button>
                                          <Button size="sm" variant="outline">
                                            <FileText className="h-4 w-4 mr-2" />
                                            Chart
                                          </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">No patients in queue</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Today's Agenda - Enhanced */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarClock className="h-5 w-5 text-blue-500" />
                      Today's Schedule
                    </CardTitle>
                    <CardDescription>
                      {todaysAppointments.length} appointments • {todayStats.completed} completed • {todayStats.remaining} remaining
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
                  <ul className="-my-4 divide-y divide-slate-100">
                    {todaysAppointments.map((apt) => (
                      <li key={apt.time} className={`flex items-center gap-4 py-4 px-3 rounded-lg hover:bg-slate-50 transition-all ${apt.priority === 'high' ? 'bg-orange-50/50' : ''}`}>
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
                          <Badge variant={getStatusBadgeVariant(apt.status)}>{apt.status}</Badge>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Analytics Dashboard */}
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
                        <BarChart data={weeklyAppointmentData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip cursor={{ fill: 'rgba(37, 99, 235, 0.1)' }} contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}/>
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
                        <AreaChart data={weeklyAppointmentData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}/>
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
                      <LineChart data={monthlyTrends} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="left" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="right" orientation="right" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}/>
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
                        <PieChartIcon className="h-5 w-5"/>
                        Consultation Types
                      </CardTitle>
                      <CardDescription>Today's appointment distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie data={consultationTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} label={({ name, value }) => `${name} (${value})`}>
                              {consultationTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
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
                        <Brain className="h-5 w-5"/>
                        Specialty Breakdown
                      </CardTitle>
                      <CardDescription>Patient distribution by specialty</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie data={specialtyBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                              {specialtyBreakdown.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
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

        {/* Side Column - Enhanced */}
        <div className="space-y-6">
          {/* Pending Tasks Card - Enhanced */}
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-amber-600" />
                Pending Tasks
                <Badge variant="destructive" className="ml-auto">{pendingTasks.length}</Badge>
              </CardTitle>
              <CardDescription>Items requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {pendingTasks.map((task, index) => (
                      <Link href={task.link} key={index} className={`block p-3 rounded-lg border-l-4 hover:shadow-md transition-all ${getPriorityColor(task.priority)}`}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold">{task.type}</p>
                              {task.priority === 'urgent' && <Badge variant="destructive" className="text-xs">Urgent</Badge>}
                            </div>
                            <p className="text-xs text-muted-foreground">{task.time}</p>
                          </div>
                          <p className="text-sm text-slate-700">{task.description}</p>
                      </Link>
                    ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/dashboard/tasks">View All Tasks</Link>
                </Button>
            </CardContent>
          </Card>

          {/* Prescription Alerts */}
          <Card className="">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-red-500" />
                Prescription Alerts
              </CardTitle>
              <CardDescription>Medication monitoring and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {prescriptionAlerts.map((alert, index) => (
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

          {/* Upcoming Follow-ups */}
          <Card className="">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-purple-500" />
                Upcoming Follow-ups
              </CardTitle>
              <CardDescription>Scheduled follow-up appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingFollowUps.map((followUp, index) => (
                  <div key={index} className="p-3 rounded-lg border border-purple-100 bg-purple-50/50 hover:bg-purple-100 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">{followUp.patient}</p>
                        <p className="text-xs text-muted-foreground mt-1">{followUp.reason}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-purple-700">{followUp.date}</p>
                        <p className="text-xs text-muted-foreground">{followUp.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/dashboard/follow-ups">View All Follow-ups</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity Card - Enhanced */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest events in your practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="mt-1 p-2 rounded-full bg-slate-100">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                        {activity.action && (
                          <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                            {activity.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-sm" asChild>
                <Link href="/dashboard/activity">View All Activity</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Enhanced Financial Summary */}
          <Card className="">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Financial Summary
              </CardTitle>
              <CardDescription>Today's financial overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800">Collected Today</span>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-2xl font-medium text-green-800">₹15,000</span>
                    <Progress value={75} className="mt-2 h-2 bg-green-100" />
                    <p className="text-xs text-green-700 mt-1">75% of daily target</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-red-800">Outstanding</span>
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="text-2xl font-medium text-red-800">₹2,500</span>
                    <p className="text-xs text-red-700 mt-1">3 pending payments</p>
                </div>
                <div className="pt-2 border-t">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Revenue Breakdown
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <Users className="h-3 w-3 text-green-500" />
                            In-Clinic
                          </span>
                          <span className="font-semibold">₹10,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <Video className="h-3 w-3 text-blue-500" />
                            Video Calls
                          </span>
                          <span className="font-semibold">₹5,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <Syringe className="h-3 w-3 text-purple-500" />
                            Procedures
                          </span>
                          <span className="font-semibold">₹0</span>
                      </div>
                    </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href="/dashboard/billing">
                      <FileText className="h-3 w-3 mr-2" />
                      Billing
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href="/dashboard/reports">
                      <Download className="h-3 w-3 mr-2" />
                      Reports
                    </Link>
                  </Button>
                </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="h-auto flex-col py-3 gap-2" asChild>
                  <Link href="/dashboard/appointments/new">
                    <Calendar className="h-5 w-5" />
                    <span className="text-xs">New Appointment</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="h-auto flex-col py-3 gap-2" asChild>
                  <Link href="/dashboard/patients/new">
                    <UserPlus className="h-5 w-5" />
                    <span className="text-xs">Add Patient</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="h-auto flex-col py-3 gap-2" asChild>
                  <Link href="/dashboard/prescriptions/new">
                    <Pill className="h-5 w-5" />
                    <span className="text-xs">New Prescription</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="h-auto flex-col py-3 gap-2" asChild>
                  <Link href="/dashboard/reports/generate">
                    <FileText className="h-5 w-5" />
                    <span className="text-xs">Generate Report</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}