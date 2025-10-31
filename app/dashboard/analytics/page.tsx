"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IndianRupee, Users, CalendarCheck, Clock, TrendingUp, TrendingDown, Download, Filter, Calendar, Activity, DollarSign, UserCheck, AlertCircle } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Pie, PieChart, Cell, Line, LineChart, Area, AreaChart, CartesianGrid } from "recharts";

// Extended data
const revenueData = [
  { month: "May", revenue: 45000, expenses: 28000, profit: 17000 },
  { month: "Jun", revenue: 52000, expenses: 30000, profit: 22000 },
  { month: "Jul", revenue: 78000, expenses: 35000, profit: 43000 },
  { month: "Aug", revenue: 61000, expenses: 32000, profit: 29000 },
  { month: "Sep", revenue: 89000, expenses: 38000, profit: 51000 },
  { month: "Oct", revenue: 95000, expenses: 40000, profit: 55000 },
];

const dailyAppointmentsData = [
  { day: "Mon", appointments: 12, completed: 10, canceled: 2 },
  { day: "Tue", appointments: 15, completed: 14, canceled: 1 },
  { day: "Wed", appointments: 18, completed: 16, canceled: 2 },
  { day: "Thu", appointments: 14, completed: 12, canceled: 2 },
  { day: "Fri", appointments: 20, completed: 18, canceled: 2 },
  { day: "Sat", appointments: 10, completed: 9, canceled: 1 },
  { day: "Sun", appointments: 5, completed: 5, canceled: 0 },
];

const patientGrowthData = [
  { month: "May", patients: 1180, newPatients: 12 },
  { month: "Jun", patients: 1195, newPatients: 15 },
  { month: "Jul", patients: 1208, newPatients: 13 },
  { month: "Aug", patients: 1224, newPatients: 16 },
  { month: "Sep", patients: 1239, newPatients: 15 },
  { month: "Oct", patients: 1254, newPatients: 15 },
];

const appointmentTypeData = [
  { name: "Consultation", value: 400, color: "#0088FE" },
  { name: "Follow-up", value: 300, color: "#00C49F" },
  { name: "New Patient", value: 200, color: "#FFBB28" },
  { name: "Telemedicine", value: 278, color: "#FF8042" },
  { name: "Emergency", value: 150, color: "#8884d8" },
];

const departmentPerformance = [
  { department: "General Medicine", patients: 450, revenue: 42000, satisfaction: 4.5 },
  { department: "Cardiology", patients: 230, revenue: 35000, satisfaction: 4.7 },
  { department: "Pediatrics", patients: 310, revenue: 28000, satisfaction: 4.6 },
  { department: "Orthopedics", patients: 180, revenue: 32000, satisfaction: 4.4 },
  { department: "Dermatology", patients: 195, revenue: 25000, satisfaction: 4.8 },
];

const recentAppointments = [
  { id: "APT001", patient: "Rohan Verma", type: "Consultation", status: "Completed", date: "2025-10-29", time: "10:30 AM", revenue: 500 },
  { id: "APT002", patient: "Anjali Singh", type: "Follow-up", status: "Completed", date: "2025-10-29", time: "11:00 AM", revenue: 300 },
  { id: "APT003", patient: "Amit Kumar", type: "Telemedicine", status: "Scheduled", date: "2025-10-30", time: "02:00 PM", revenue: 400 },
  { id: "APT004", patient: "Sneha Patel", type: "New Patient", status: "Scheduled", date: "2025-10-31", time: "09:30 AM", revenue: 600 },
  { id: "APT005", patient: "Vikram Reddy", type: "Consultation", status: "Canceled", date: "2025-10-28", time: "03:00 PM", revenue: 0 },
  { id: "APT006", patient: "Priya Sharma", type: "Emergency", status: "Completed", date: "2025-10-29", time: "04:30 PM", revenue: 800 },
  { id: "APT007", patient: "Rahul Mehta", type: "Follow-up", status: "Completed", date: "2025-10-28", time: "01:00 PM", revenue: 300 },
  { id: "APT008", patient: "Neha Gupta", type: "Consultation", status: "No-Show", date: "2025-10-27", time: "11:30 AM", revenue: 0 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  // Filter appointments
  const filteredAppointments = useMemo(() => {
    if (statusFilter === "all") return recentAppointments;
    return recentAppointments.filter(apt => apt.status === statusFilter);
  }, [statusFilter]);

  // Calculate real-time stats
  const stats = useMemo(() => {
    const completedRevenue = recentAppointments
      .filter(apt => apt.status === "Completed")
      .reduce((sum, apt) => sum + apt.revenue, 0);

    const totalAppointments = recentAppointments.length;
    const completedAppointments = recentAppointments.filter(apt => apt.status === "Completed").length;
    const completionRate = Math.round((completedAppointments / totalAppointments) * 100);

    return {
      revenue: completedRevenue,
      appointments: totalAppointments,
      completionRate,
      avgConsultationTime: 22
    };
  }, []);

  const handleExportData = () => {
    alert("Exporting analytics data as CSV...");
  };

  return (
    <div className="space-y-6 p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium tracking-tight">Practice Analytics</h1>
          <p className="text-muted-foreground pt-1">
            Comprehensive insights into your practice's performance
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">₹{stats.revenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{stats.appointments}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5 from last week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{stats.completionRate}%</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Consultation</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{stats.avgConsultationTime} min</div>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              -2 min from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Different Views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Revenue & Profit Overview</CardTitle>
                <CardDescription>Monthly financial performance for the last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} tickFormatter={(value) => `₹${value / 1000}k`} />
                    <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="profit" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Appointments by Type</CardTitle>
                <CardDescription>Distribution of appointment categories</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
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
                      label={(entry: any) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
                    >
                      {appointmentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Appointment Trends</CardTitle>
                <CardDescription>Daily appointment statistics for this week</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyAppointmentsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="canceled" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Growth</CardTitle>
                <CardDescription>Total and new patients over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={patientGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="patients" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="newPatients" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue (6M)</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">₹4,20,000</div>
                <p className="text-xs text-muted-foreground">Average: ₹70,000/month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses (6M)</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">₹2,03,000</div>
                <p className="text-xs text-muted-foreground">Average: ₹33,833/month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Profit (6M)</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium text-green-600">₹2,17,000</div>
                <p className="text-xs text-muted-foreground">Profit margin: 51.7%</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Expenses vs Profit</CardTitle>
              <CardDescription>6-month financial comparison</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} tickFormatter={(value) => `₹${value / 1000}k`} />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Revenue and patient metrics by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Department</th>
                      <th className="text-right py-3 px-4 font-medium">Patients</th>
                      <th className="text-right py-3 px-4 font-medium">Revenue</th>
                      <th className="text-right py-3 px-4 font-medium">Satisfaction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentPerformance.map((dept) => (
                      <tr key={dept.department} className="border-b">
                        <td className="py-3 px-4 font-medium">{dept.department}</td>
                        <td className="text-right py-3 px-4">{dept.patients}</td>
                        <td className="text-right py-3 px-4">₹{dept.revenue.toLocaleString()}</td>
                        <td className="text-right py-3 px-4">
                          <Badge variant={dept.satisfaction >= 4.5 ? "default" : "outline"}>
                            ⭐ {dept.satisfaction}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Appointments</CardTitle>
                  <CardDescription>Detailed log of all appointments</CardDescription>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                    <SelectItem value="No-Show">No-Show</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">Patient</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Date & Time</th>
                      <th className="text-right py-3 px-4 font-medium">Revenue</th>
                      <th className="text-right py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-mono text-xs">{apt.id}</td>
                        <td className="py-3 px-4 font-medium">{apt.patient}</td>
                        <td className="py-3 px-4">{apt.type}</td>
                        <td className="py-3 px-4">
                          <div className="text-sm">{apt.date}</div>
                          <div className="text-xs text-muted-foreground">{apt.time}</div>
                        </td>
                        <td className="text-right py-3 px-4 font-medium">
                          {apt.revenue > 0 ? `₹${apt.revenue}` : "-"}
                        </td>
                        <td className="text-right py-3 px-4">
                          <Badge
                            variant={
                              apt.status === 'Completed' ? 'default' :
                                apt.status === 'Canceled' ? 'destructive' :
                                  apt.status === 'No-Show' ? 'destructive' :
                                    'outline'
                            }
                          >
                            {apt.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Patients Tab */}
        <TabsContent value="patients" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Patient Demographics</CardTitle>
                <CardDescription>Age distribution of active patients</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { age: "0-18", count: 180 },
                    { age: "19-35", count: 420 },
                    { age: "36-50", count: 380 },
                    { age: "51-65", count: 210 },
                    { age: "65+", count: 64 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Retention</CardTitle>
                <CardDescription>Monthly patient visit frequency</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={patientGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey="patients" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Patient Insights</CardTitle>
              <CardDescription>Key metrics and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Active Patients</p>
                    <p className="text-2xl font-bold">1,254</p>
                    <p className="text-xs text-muted-foreground">89% of total</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <Activity className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Avg. Visits/Patient</p>
                    <p className="text-2xl font-bold">3.2</p>
                    <p className="text-xs text-muted-foreground">Per year</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">At-Risk Patients</p>
                    <p className="text-2xl font-bold">42</p>
                    <p className="text-xs text-muted-foreground">Require follow-up</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
