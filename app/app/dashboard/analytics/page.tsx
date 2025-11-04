"use client";

import { useState, useMemo, useEffect, JSXElementConstructor, ReactElement, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { IndianRupee, Users, CalendarCheck, Clock, TrendingUp, TrendingDown, Download, Filter, Calendar, Activity, DollarSign, UserCheck, AlertCircle, Search, Target, Zap, Award, ChevronRight, RefreshCw, Eye, ArrowUpRight, ArrowDownRight, CheckCircle2, XCircle, Clock10, UserX, Star } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Pie, PieChart, Cell, Line, LineChart, Area, AreaChart, CartesianGrid, ComposedChart, Scatter, ScatterChart, ZAxis, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieLabelRenderProps } from "recharts";

// --- START: TYPESCRIPT FIX 1 ---
// Define a mapping for appointment statuses to icons and colors first
const statusConfig = {
  Completed: { icon: CheckCircle2, color: 'text-green-500' },
  Scheduled: { icon: Clock10, color: 'text-blue-500' },
  Canceled: { icon: XCircle, color: 'text-red-500' },
  'No-Show': { icon: UserX, color: 'text-orange-500' },
};

// Define a type for the possible statuses from the keys of statusConfig
type AppointmentStatus = keyof typeof statusConfig;

// Define the shape of an Appointment object
interface Appointment {
  id: string;
  patient: string;
  type: string;
  status: AppointmentStatus; // Use the specific status type here
  date: string;
  time: string;
  revenue: number;
  doctor: string;
  rating: number | null;
}
// --- END: TYPESCRIPT FIX 1 ---

// Extended data with more details
const revenueData = [
  { month: "May", revenue: 45000, expenses: 28000, profit: 17000, target: 50000, patients: 180 },
  { month: "Jun", revenue: 52000, expenses: 30000, profit: 22000, target: 55000, patients: 195 },
  { month: "Jul", revenue: 78000, expenses: 35000, profit: 43000, target: 60000, patients: 208 },
  { month: "Aug", revenue: 61000, expenses: 32000, profit: 29000, target: 65000, patients: 224 },
  { month: "Sep", revenue: 89000, expenses: 38000, profit: 51000, target: 70000, patients: 239 },
  { month: "Oct", revenue: 95000, expenses: 40000, profit: 55000, target: 75000, patients: 254 },
];

const dailyAppointmentsData = [
  { day: "Mon", appointments: 12, completed: 10, canceled: 2, revenue: 8500, avgDuration: 25 },
  { day: "Tue", appointments: 15, completed: 14, canceled: 1, revenue: 11200, avgDuration: 23 },
  { day: "Wed", appointments: 18, completed: 16, canceled: 2, revenue: 13600, avgDuration: 22 },
  { day: "Thu", appointments: 14, completed: 12, canceled: 2, revenue: 9800, avgDuration: 24 },
  { day: "Fri", appointments: 20, completed: 18, canceled: 2, revenue: 15400, avgDuration: 21 },
  { day: "Sat", appointments: 10, completed: 9, canceled: 1, revenue: 7200, avgDuration: 20 },
  { day: "Sun", appointments: 5, completed: 5, canceled: 0, revenue: 4100, avgDuration: 19 },
];

const hourlyDistribution = [
  { hour: "9 AM", appointments: 3 },
  { hour: "10 AM", appointments: 8 },
  { hour: "11 AM", appointments: 12 },
  { hour: "12 PM", appointments: 10 },
  { hour: "1 PM", appointments: 5 },
  { hour: "2 PM", appointments: 9 },
  { hour: "3 PM", appointments: 14 },
  { hour: "4 PM", appointments: 11 },
  { hour: "5 PM", appointments: 7 },
  { hour: "6 PM", appointments: 4 },
];

const patientGrowthData = [
  { month: "May", totalPatients: 1180, newPatients: 12, returning: 168, churnRate: 2.5 },
  { month: "Jun", totalPatients: 1195, newPatients: 15, returning: 180, churnRate: 2.3 },
  { month: "Jul", totalPatients: 1208, newPatients: 13, returning: 195, churnRate: 2.1 },
  { month: "Aug", totalPatients: 1224, newPatients: 16, returning: 208, churnRate: 2.0 },
  { month: "Sep", totalPatients: 1239, newPatients: 15, returning: 224, churnRate: 1.9 },
  { month: "Oct", totalPatients: 1254, newPatients: 15, returning: 239, churnRate: 1.8 },
];

const appointmentTypeData = [
  { name: "Consultation", value: 400, color: "#0088FE", revenue: 180000 },
  { name: "Follow-up", value: 300, color: "#00C49F", revenue: 90000 },
  { name: "New Patient", value: 200, color: "#FFBB28", revenue: 120000 },
  { name: "Telemedicine", value: 278, color: "#FF8042", revenue: 111200 },
  { name: "Emergency", value: 150, color: "#8884d8", revenue: 120000 },
];

const departmentPerformance = [
  { department: "General Medicine", patients: 450, revenue: 42000, satisfaction: 4.5, growth: 12, utilization: 85 },
  { department: "Cardiology", patients: 230, revenue: 35000, satisfaction: 4.7, growth: 8, utilization: 92 },
  { department: "Pediatrics", patients: 310, revenue: 28000, satisfaction: 4.6, growth: 15, utilization: 78 },
  { department: "Orthopedics", patients: 180, revenue: 32000, satisfaction: 4.4, growth: 5, utilization: 88 },
  { department: "Dermatology", patients: 195, revenue: 25000, satisfaction: 4.8, growth: 18, utilization: 75 },
];

// Apply the Appointment type to the data array
const recentAppointments: Appointment[] = [
    { id: "APT001", patient: "Rohan Verma", type: "Consultation", status: "Completed", date: "2025-10-29", time: "10:30 AM", revenue: 500, doctor: "Dr. Shah", rating: 5 },
    { id: "APT002", patient: "Anjali Singh", type: "Follow-up", status: "Completed", date: "2025-10-29", time: "11:00 AM", revenue: 300, doctor: "Dr. Patel", rating: 4 },
    { id: "APT003", patient: "Amit Kumar", type: "Telemedicine", status: "Scheduled", date: "2025-10-30", time: "02:00 PM", revenue: 400, doctor: "Dr. Kumar", rating: null },
    { id: "APT004", patient: "Sneha Patel", type: "New Patient", status: "Scheduled", date: "2025-10-31", time: "09:30 AM", revenue: 600, doctor: "Dr. Shah", rating: null },
    { id: "APT005", patient: "Vikram Reddy", type: "Canceled", status: "Scheduled",date: "2025-10-28", time: "03:00 PM", revenue: 0, doctor: "Dr. Mehta", rating: null },
    { id: "APT006", patient: "Priya Sharma", type: "Emergency", status: "Completed", date: "2025-10-29", time: "04:30 PM", revenue: 800, doctor: "Dr. Reddy", rating: 5 },
    { id: "APT007", patient: "Rahul Mehta", type: "Follow-up", status: "Completed", date: "2025-10-28", time: "01:00 PM", revenue: 300, doctor: "Dr. Kumar", rating: 4 },
    { id: "APT008", patient: "Neha Gupta", type: "Consultation", status: "No-Show", date: "2025-10-27", time: "11:30 AM", revenue: 0, doctor: "Dr. Patel", rating: null },
];

const topDoctors = [
  { name: "Dr. Shah", patients: 156, revenue: 78000, rating: 4.8, specialization: "General Medicine" },
  { name: "Dr. Patel", patients: 142, revenue: 71000, rating: 4.7, specialization: "Cardiology" },
  { name: "Dr. Kumar", patients: 138, revenue: 69000, rating: 4.6, specialization: "Pediatrics" },
  { name: "Dr. Mehta", patients: 125, revenue: 62500, rating: 4.5, specialization: "Orthopedics" },
  { name: "Dr. Reddy", patients: 118, revenue: 59000, rating: 4.9, specialization: "Emergency" },
];

const performanceMetrics = [
    { metric: "Patient Satisfaction", value: 92, target: 90, category: "Quality", fullMark: 100 },
    { metric: "Wait Time (min)", value: 15, target: 20, category: "Efficiency", fullMark: 60 },
    { metric: "Utilization (%)", value: 88, target: 85, category: "Operations", fullMark: 100 },
    { metric: "Revenue/Patient (₹)", value: 380, target: 350, category: "Financial", fullMark: 500 },
    { metric: "Productivity (%)", value: 85, target: 80, category: "Operations", fullMark: 100 },
    { metric: "Retention (%)", value: 94, target: 90, category: "Quality", fullMark: 100 },
];

export default function AdvancedAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [comparisonMode, setComparisonMode] = useState(false);
  const [liveUpdate, setLiveUpdate] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    if (liveUpdate) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [liveUpdate]);

  const filteredAppointments = useMemo(() => {
    let filtered = recentAppointments;
    
    if (statusFilter !== "all") {
        filtered = filtered.filter(apt => apt.status === statusFilter);
    }
    
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(apt => 
        apt.patient.toLowerCase().includes(lowercasedQuery) ||
        apt.id.toLowerCase().includes(lowercasedQuery) ||
        apt.doctor.toLowerCase().includes(lowercasedQuery)
      );
    }
    
    return filtered;
  }, [statusFilter, searchQuery]);
  
  const filteredDepartmentPerformance = useMemo(() => {
    if (selectedDepartment === 'all') {
      return departmentPerformance;
    }
    return departmentPerformance.filter(d => d.department === selectedDepartment);
  }, [selectedDepartment]);

  const stats = useMemo(() => {
    const completedRevenue = recentAppointments
      .filter(apt => apt.status === "Completed")
      .reduce((sum, apt) => sum + apt.revenue, 0);

    const totalAppointments = recentAppointments.length;
    const completedAppointments = recentAppointments.filter(apt => apt.status === "Completed").length;
    const completionRate = totalAppointments > 0 ? Math.round((completedAppointments / totalAppointments) * 100) : 0;
    const noShowRate = totalAppointments > 0 ? Math.round((recentAppointments.filter(apt => apt.status === "No-Show").length / totalAppointments) * 100) : 0;

    return {
      revenue: completedRevenue,
      revenueGrowth: 12,
      appointments: totalAppointments,
      appointmentsGrowth: 5,
      completionRate,
      completionGrowth: 3,
      avgConsultationTime: 22,
      consultationChange: -2,
      noShowRate,
      cancelRate: totalAppointments > 0 ? Math.round((recentAppointments.filter(apt => apt.status === "Canceled").length / totalAppointments) * 100) : 0
    };
  }, []);

  const handleExportData = () => {
    const dataStr = JSON.stringify({
      revenue: revenueData,
      appointments: recentAppointments,
      departments: departmentPerformance,
      doctors: topDoctors,
      exportDate: new Date().toISOString()
    }, null, 2);
    
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3 z-50">
          <p className="font-medium text-lg mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between text-sm gap-4">
                <span className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }}/>
                    <span className="capitalize">{entry.name}:</span>
                </span>
                <span className="font-semibold" style={{ color: entry.color }}>
                    {typeof entry.value === 'number' && (entry.name.toLowerCase().includes('revenue') || entry.name.toLowerCase().includes('profit') || entry.name.toLowerCase().includes('expenses')) 
                        ? `₹${entry.value.toLocaleString()}` 
                        : entry.value}
                </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-[1800px] mx-auto bg-gradient-to-br from-background to-muted/20 min-h-screen">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-3xl font-medium tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Advanced Analytics
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 mt-1 text-sm md:text-base">
                Real-time insights and performance metrics
                {liveUpdate && (
                  <Badge variant="outline" className="text-xs">
                    <span className="animate-pulse h-2 w-2 rounded-full bg-green-500 mr-1.5" />
                    Live
                  </Badge>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 md:gap-3 mt-4 md:mt-0 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLiveUpdate(!liveUpdate)}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${liveUpdate ? 'animate-spin' : ''}`} />
            {liveUpdate ? 'Live' : 'Paused'}
          </Button>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setComparisonMode(!comparisonMode)}
            className="gap-2"
          >
            <Target className="h-4 w-4" />
            {comparisonMode ? 'Hide Targets' : 'Show Targets'}
          </Button>
          <Button variant="default" size="sm" onClick={handleExportData} className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
              <IndianRupee className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">₹{stats.revenue.toLocaleString()}</div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +{stats.revenueGrowth}% from last {timeRange}
              </div>
              <Button variant="ghost" size="sm" className="h-6 px-2">
                <Eye className="h-3 w-3" />
              </Button>
            </div>
            <div className="mt-3 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData.slice(-6)}>
                  <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
              <CalendarCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{stats.appointments}</div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +{stats.appointmentsGrowth}% from last week
              </div>
              <Badge variant="secondary" className="text-xs">
                {stats.completionRate}% complete
              </Badge>
            </div>
            <div className="mt-3 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyAppointmentsData}>
                  <Bar dataKey="completed" fill="#10b981" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
              <UserCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{stats.completionRate}%</div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +{stats.completionGrowth}% from last month
              </div>
              <Badge variant="outline" className="text-xs text-red-600">
                {stats.noShowRate}% no-show
              </Badge>
            </div>
            <div className="mt-3 h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Consultation</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-orange-100 dark:bg-orange-950 flex items-center justify-center">
              <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{stats.avgConsultationTime} min</div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-xs text-green-600">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                {Math.abs(stats.consultationChange)} min faster
              </div>
              <Badge variant="secondary" className="text-xs">
                Efficient
              </Badge>
            </div>
            <div className="mt-3 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyAppointmentsData}>
                  <Area type="monotone" dataKey="avgDuration" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Performance Score
              </CardTitle>
              <CardDescription>Overall practice health metrics</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-4xl font-medium text-primary">92</div>
              <div className="text-xs text-muted-foreground">out of 100</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {performanceMetrics.map((metric) => (
              <div key={metric.metric} className="p-3 rounded-lg bg-background border">
                <div className="text-xs text-muted-foreground mb-1">{metric.metric}</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-xl font-medium">{metric.value}</div>
                  {metric.value >= metric.target ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Target: {metric.target}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:w-auto">
          <TabsTrigger value="overview" className="gap-2"><Activity className="h-4 w-4" />Overview</TabsTrigger>
          <TabsTrigger value="financial" className="gap-2"><DollarSign className="h-4 w-4" />Financial</TabsTrigger>
          <TabsTrigger value="appointments" className="gap-2"><CalendarCheck className="h-4 w-4" />Appointments</TabsTrigger>
          <TabsTrigger value="patients" className="gap-2"><Users className="h-4 w-4" />Patients</TabsTrigger>
          <TabsTrigger value="performance" className="gap-2"><Target className="h-4 w-4" />Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Revenue & Profit Trends</CardTitle>
                    <CardDescription>6-month financial performance</CardDescription>
                  </div>
                  <Badge variant="outline" className="gap-1"><TrendingUp className="h-3 w-3" />+23% Growth</Badge>
                </div>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="profit" name="Profit" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Area type="monotone" dataKey="revenue" name="Revenue" fill="#2563eb" stroke="#2563eb" fillOpacity={0.3} />
                    {comparisonMode && <Line type="monotone" dataKey="target" name="Target" stroke="#f97316" strokeWidth={2} strokeDasharray="5 5" dot={false} />}
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
             <Card className="lg:col-span-3 hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle>Appointment Types</CardTitle>
                    <CardDescription>Breakdown of appointments by category</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={appointmentTypeData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                                // --- START: TYPESCRIPT FIX 2 ---
                                // Use a type assertion `(percent as number)` to fix the type error.
                                label={({ name, percent }: PieLabelRenderProps) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                                // --- END: TYPESCRIPT FIX 2 ---
                            >
                                {appointmentTypeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value, name) => [`${value} appointments`, name]} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
             <Card>
                <CardHeader>
                    <CardTitle>Revenue vs Expenses</CardTitle>
                    <CardDescription>Monthly comparison of income and operational costs</CardDescription>
                </CardHeader>
                <CardContent>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" fontSize={12} />
                            <YAxis fontSize={12} tickFormatter={(value) => `₹${value / 1000}k`} />
                            <Tooltip content={<CustomTooltip />}/>
                            <Legend />
                            <Bar dataKey="revenue" name="Revenue" fill="#8884d8" />
                            <Bar dataKey="expenses" name="Expenses" fill="#ff7300" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
             </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Revenue by Appointment Type</CardTitle>
                    <CardDescription>Financial contribution of each appointment category</CardDescription>
                </CardHeader>
                <CardContent>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={appointmentTypeData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" fontSize={12} tickFormatter={(value) => `₹${value / 1000}k`} />
                            <YAxis type="category" dataKey="name" fontSize={12} width={100} />
                            <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                            <Legend />
                            <Bar dataKey="revenue" name="Revenue" fill="#00C49F" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
             </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Peak Appointment Hours</CardTitle>
                        <CardDescription>Identify the busiest hours of the day</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={hourlyDistribution}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hour" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip />
                                <Area type="monotone" dataKey="appointments" stroke="#8884d8" fill="#8884d8" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Weekly Appointment Status</CardTitle>
                        <CardDescription>Performance across the week</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={dailyAppointmentsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
                                <Bar dataKey="canceled" stackId="a" fill="#ef4444" name="Canceled" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                 </Card>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle>Recent Appointments</CardTitle>
                            <CardDescription>A log of the latest patient interactions.</CardDescription>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                           <div className="relative w-full md:w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by patient, ID, doctor..."
                                    className="pl-8"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                                    <SelectItem value="Canceled">Canceled</SelectItem>
                                    <SelectItem value="No-Show">No-Show</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                                <tr>
                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">Patient</th>
                                    <th className="px-4 py-3">Doctor</th>
                                    <th className="px-4 py-3">Type</th>
                                    <th className="px-4 py-3">Date & Time</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right">Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.map((apt) => {
                                    const { icon: Icon, color } = statusConfig[apt.status];
                                    return (
                                        <tr key={apt.id} className="border-b hover:bg-muted/50 transition-colors">
                                            <td className="px-4 py-3 font-medium">{apt.id}</td>
                                            <td className="px-4 py-3">{apt.patient}</td>
                                            <td className="px-4 py-3">{apt.doctor}</td>
                                            <td className="px-4 py-3">{apt.type}</td>
                                            <td className="px-4 py-3">{apt.date} at {apt.time}</td>
                                            <td className="px-4 py-3">
                                                <Badge variant="outline" className={`gap-1.5 ${color} border-current`}>
                                                    <Icon className="h-3.5 w-3.5" />
                                                    {apt.status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-right font-semibold">₹{apt.revenue.toLocaleString()}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="patients" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Patient Growth Over Time</CardTitle>
                        <CardDescription>Tracking total, new, and returning patients.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={patientGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" fontSize={12} />
                                <YAxis yAxisId="left" fontSize={12} />
                                <YAxis yAxisId="right" orientation="right" fontSize={12} />
                                <Tooltip />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="totalPatients" name="Total Patients" stroke="#8884d8" />
                                <Line yAxisId="right" type="monotone" dataKey="newPatients" name="New Patients" stroke="#82ca9d" />
                                <Line yAxisId="right" type="monotone" dataKey="returning" name="Returning" stroke="#ffc658" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Patient Churn Rate</CardTitle>
                        <CardDescription>Percentage of patients lost over time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={patientGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" fontSize={12} />
                                <YAxis fontSize={12} domain={[0, 'dataMax + 1']} tickFormatter={(value) => `${value}%`} />
                                <Tooltip formatter={(value) => `${value}%`} />
                                <Area type="monotone" dataKey="churnRate" name="Churn Rate" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
             <div className="lg:col-span-2 grid gap-6">
                <Card>
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                             <div>
                                <CardTitle>Department Performance</CardTitle>
                                <CardDescription>Compare departments by key metrics.</CardDescription>
                            </div>
                            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                                <SelectTrigger className="w-full md:w-[220px]">
                                    <Filter className="h-4 w-4 mr-2"/>
                                    <SelectValue placeholder="Filter by Department"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Departments</SelectItem>
                                    {departmentPerformance.map(d => <SelectItem key={d.department} value={d.department}>{d.department}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                             <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid />
                                <XAxis type="number" dataKey="patients" name="Patients" unit="" fontSize={12} />
                                <YAxis type="number" dataKey="revenue" name="Revenue" unit="k" tickFormatter={(value) => `${value/1000}`} fontSize={12} />
                                <ZAxis type="number" dataKey="satisfaction" range={[60, 400]} name="Satisfaction" unit="" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name) => (name === 'Revenue' ? `₹${Number(value).toLocaleString()}`: value)} />
                                <Legend />
                                <Scatter name="Departments" data={filteredDepartmentPerformance} fill="#8884d8">
                                     {filteredDepartmentPerformance.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={appointmentTypeData[index % appointmentTypeData.length].color} />
                                    ))}
                                </Scatter>
                            </ScatterChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-yellow-500" /> Top Performing Doctors</CardTitle>
                        <CardDescription>Leaderboard based on revenue and patient ratings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topDoctors.map((doctor, index) => (
                                <div key={doctor.name} className="flex items-center justify-between p-3 rounded-lg bg-background border hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium text-lg text-muted-foreground">{index + 1}</span>
                                        <div>
                                            <p className="font-semibold">{doctor.name}</p>
                                            <p className="text-xs text-muted-foreground">{doctor.specialization}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-right">
                                        <div>
                                            <p className="font-medium">₹{doctor.revenue.toLocaleString()}</p>
                                            <p className="text-xs text-muted-foreground">Revenue</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                            <span className="font-medium">{doctor.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
             <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle>Overall Performance Metrics</CardTitle>
                    <CardDescription>A multi-dimensional view of practice health</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                         <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceMetrics}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="metric" fontSize={12}/>
                            <PolarRadiusAxis angle={30} domain={[0, 'dataMax + 10']} fontSize={10} />
                            <Radar name="Performance" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                             {comparisonMode && <Radar name="Target" dataKey="target" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.4} />}
                            <Tooltip />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}