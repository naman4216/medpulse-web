"use client";

import { useState, useMemo, type FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  FileText, MoreHorizontal, PlusCircle, Search, Users, CalendarPlus, UserPlus,
  Phone, Mail, MapPin, Calendar, Activity, Edit, Trash2, ChevronLeft, ChevronRight,
  Download, Filter, RefreshCw, Grid3x3, List, Printer, Send, MessageSquare,
  Star, TrendingUp, DollarSign,
  Pill, FileCheck, Heart, Cake, Users2, Check, User, UserX, UserCheck, Copy,
  Flag, Receipt,
  AlertCircle,
  CheckCircle
} from "lucide-react";


//=========== 1. TYPE DEFINITIONS ===========//

interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

interface Insurance {
  provider: string;
  policyNo: string;
  validUntil: string;
}

interface Appointments {
  total: number;
  upcoming: number;
  completed: number;
  cancelled: number;
}

interface Vitals {
  height: string;
  weight: string;
  bmi: number;
  bp: string;
}

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  status: "Active" | "Inactive";
  avatar: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  address: string;
  bloodGroup: "O+" | "O-" | "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-";
  medicalHistory: string;
  emergencyContact: EmergencyContact;
  insurance: Insurance;
  appointments: Appointments;
  prescriptions: number;
  labReports: number;
  vitals: Vitals;
  conditions: string[];
  medications: string[];
  allergies: string[];
  rating: number;
  totalSpent: number;
  lastPayment: number;
  priority: "normal" | "high";
}

interface NewPatientState {
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: Patient['gender'];
  address: string;
  bloodGroup: Patient['bloodGroup'];
  medicalHistory: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  insuranceProvider: string;
  insurancePolicyNo: string;
  insuranceValidUntil: string;
  height: string;
  weight: string;
  conditions: string;
  allergies: string;
}

interface AppointmentState {
  date: string;
  time: string;
  type: string;
  reason: string;
}

interface PrescriptionState {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string;
}

interface MessageState {
  subject: string;
  message: string;
  sendVia: "email" | "sms" | "both";
}

//=========== 2. INITIAL DATA ===========//

const initialPatients: Patient[] = [
  {
    id: "PAT001", name: "Rohan Verma", email: "rohan.v@example.com", phone: "+91 98765 43210", lastVisit: "2025-10-15", status: "Active", avatar: "/avatars/01.png", age: 32, gender: "Male", address: "Mumbai, Maharashtra", bloodGroup: "O+", medicalHistory: "No known allergies. Regular checkups.", emergencyContact: { name: "Priya Verma", relation: "Wife", phone: "+91 98765 43220" }, insurance: { provider: "Star Health", policyNo: "SH123456", validUntil: "2026-12-31" }, appointments: { total: 12, upcoming: 1, completed: 10, cancelled: 1 }, prescriptions: 8, labReports: 5, vitals: { height: "175 cm", weight: "72 kg", bmi: 23.5, bp: "120/80" }, conditions: ["Hypertension"], medications: ["Lisinopril 10mg"], allergies: [], rating: 5, totalSpent: 15000, lastPayment: 1500, priority: "normal"
  },
  {
    id: "PAT002", name: "Anjali Singh", email: "anjali.s@example.com", phone: "+91 98765 43211", lastVisit: "2025-10-12", status: "Active", avatar: "/avatars/02.png", age: 28, gender: "Female", address: "Delhi, Delhi", bloodGroup: "A+", medicalHistory: "Diabetic. On regular medication.", emergencyContact: { name: "Rajesh Singh", relation: "Father", phone: "+91 98765 43221" }, insurance: { provider: "Max Bupa", policyNo: "MB789012", validUntil: "2026-06-30" }, appointments: { total: 18, upcoming: 2, completed: 15, cancelled: 1 }, prescriptions: 15, labReports: 12, vitals: { height: "162 cm", weight: "58 kg", bmi: 22.1, bp: "118/75" }, conditions: ["Type 2 Diabetes"], medications: ["Metformin 500mg", "Glimepiride 2mg"], allergies: ["Penicillin"], rating: 5, totalSpent: 28000, lastPayment: 2000, priority: "high"
  },
  {
    id: "PAT003", name: "Vikram Reddy", email: "vikram.r@example.com", phone: "+91 98765 43212", lastVisit: "2025-09-28", status: "Active", avatar: "/avatars/03.png", age: 52, gender: "Male", address: "Hyderabad, Telangana", bloodGroup: "B+", medicalHistory: "Hypertension. Under observation.", emergencyContact: { name: "Lakshmi Reddy", relation: "Wife", phone: "+91 98765 43222" }, insurance: { provider: "ICICI Lombard", policyNo: "IL345678", validUntil: "2025-11-30" }, appointments: { total: 24, upcoming: 0, completed: 22, cancelled: 2 }, prescriptions: 20, labReports: 15, vitals: { height: "170 cm", weight: "78 kg", bmi: 26.9, bp: "135/85" }, conditions: ["Hypertension", "High Cholesterol"], medications: ["Amlodipine 5mg", "Atorvastatin 10mg"], allergies: [], rating: 4, totalSpent: 42000, lastPayment: 1800, priority: "high"
  },
  {
    id: "PAT004", name: "Sneha Patel", email: "sneha.p@example.com", phone: "+91 98765 43213", lastVisit: "2025-08-05", status: "Inactive", avatar: "/avatars/04.png", age: 35, gender: "Female", address: "Ahmedabad, Gujarat", bloodGroup: "AB+", medicalHistory: "Asthma. Carries inhaler.", emergencyContact: { name: "Amit Patel", relation: "Husband", phone: "+91 98765 43223" }, insurance: { provider: "Bajaj Allianz", policyNo: "BA901234", validUntil: "2026-03-31" }, appointments: { total: 8, upcoming: 0, completed: 7, cancelled: 1 }, prescriptions: 6, labReports: 4, vitals: { height: "158 cm", weight: "55 kg", bmi: 22.0, bp: "115/70" }, conditions: ["Asthma"], medications: ["Salbutamol Inhaler"], allergies: ["Dust", "Pollen"], rating: 5, totalSpent: 12000, lastPayment: 1200, priority: "normal"
  },
  {
    id: "PAT005", name: "Amit Kumar", email: "amit.k@example.com", phone: "+91 98765 43214", lastVisit: "2025-10-20", status: "Active", avatar: "/avatars/05.png", age: 45, gender: "Male", address: "Bangalore, Karnataka", bloodGroup: "O-", medicalHistory: "Recent surgery. Follow-up required.", emergencyContact: { name: "Neha Kumar", relation: "Sister", phone: "+91 98765 43224" }, insurance: { provider: "Religare", policyNo: "RL567890", validUntil: "2026-08-31" }, appointments: { total: 15, upcoming: 3, completed: 11, cancelled: 1 }, prescriptions: 12, labReports: 10, vitals: { height: "178 cm", weight: "82 kg", bmi: 25.9, bp: "128/82" }, conditions: ["Post-Surgery Recovery"], medications: ["Paracetamol 500mg", "Amoxicillin 500mg"], allergies: [], rating: 5, totalSpent: 35000, lastPayment: 5000, priority: "high"
  },
  {
    id: "PAT006", name: "Priya Sharma", email: "priya.s@example.com", phone: "+91 98765 43215", lastVisit: "2025-10-18", status: "Active", avatar: "/avatars/01.png", age: 29, gender: "Female", address: "Pune, Maharashtra", bloodGroup: "A-", medicalHistory: "Healthy. Annual checkup.", emergencyContact: { name: "Ravi Sharma", relation: "Brother", phone: "+91 98765 43225" }, insurance: { provider: "Care Health", policyNo: "CH234567", validUntil: "2026-05-31" }, appointments: { total: 6, upcoming: 1, completed: 5, cancelled: 0 }, prescriptions: 3, labReports: 2, vitals: { height: "165 cm", weight: "60 kg", bmi: 22.0, bp: "110/70" }, conditions: [], medications: [], allergies: [], rating: 5, totalSpent: 8000, lastPayment: 1500, priority: "normal"
  },
];

const initialNewPatientState: NewPatientState = {
  name: "", email: "", phone: "", age: "", gender: "Male", address: "", bloodGroup: "O+", medicalHistory: "", emergencyContactName: "", emergencyContactRelation: "", emergencyContactPhone: "", insuranceProvider: "", insurancePolicyNo: "", insuranceValidUntil: "", height: "", weight: "", conditions: "", allergies: ""
};

//=========== 3. PATIENTS PAGE COMPONENT ===========//

const PatientsPage: FC = () => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isNewPatientOpen, setIsNewPatientOpen] = useState<boolean>(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);
  const [isAddPrescriptionOpen, setIsAddPrescriptionOpen] = useState<boolean>(false);
  const [isAddLabReportOpen, setIsAddLabReportOpen] = useState<boolean>(false);
  const [isSendMessageOpen, setIsSendMessageOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState<string>("name");
  const itemsPerPage = 8;

  const [newPatient, setNewPatient] = useState<NewPatientState>(initialNewPatientState);
  const [editData, setEditData] = useState<Partial<Patient>>({});
  const [appointmentData, setAppointmentData] = useState<AppointmentState>({ date: "", time: "", type: "Consultation", reason: "" });
  const [prescriptionData, setPrescriptionData] = useState<PrescriptionState>({ medication: "", dosage: "", frequency: "", duration: "", notes: "" });
  const [messageData, setMessageData] = useState<MessageState>({ subject: "", message: "", sendVia: "email" });

  const filteredAndSortedPatients = useMemo(() => {
    let filtered = patients.filter(patient => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.phone.includes(searchQuery);
      const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || patient.priority === priorityFilter;
      const matchesGender = genderFilter === "all" || patient.gender === genderFilter;
      return matchesSearch && matchesStatus && matchesPriority && matchesGender;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name": return a.name.localeCompare(b.name);
        case "lastVisit": return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
        case "age": return b.age - a.age;
        case "spent": return b.totalSpent - a.totalSpent;
        default: return 0;
      }
    });
    return filtered;
  }, [patients, searchQuery, statusFilter, priorityFilter, genderFilter, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedPatients.length / itemsPerPage);
  const paginatedPatients = filteredAndSortedPatients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = useMemo(() => {
    if (patients.length === 0) {
      return { total: 0, active: 0, inactive: 0, newThisMonth: 0, avgAge: 0, totalRevenue: 0, highPriority: 0, upcomingAppointments: 0, avgRating: '0.0', maleCount: 0, femaleCount: 0, criticalConditions: 0 };
    }
    const activePatients = patients.filter(p => p.status === "Active").length;
    const currentMonth = new Date().getMonth();
    return {
      total: patients.length,
      active: activePatients,
      inactive: patients.length - activePatients,
      newThisMonth: patients.filter(p => new Date(p.lastVisit).getMonth() === currentMonth).length,
      avgAge: Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length),
      totalRevenue: patients.reduce((sum, p) => sum + p.totalSpent, 0),
      highPriority: patients.filter(p => p.priority === "high" && p.status === "Active").length,
      upcomingAppointments: patients.reduce((sum, p) => sum + p.appointments.upcoming, 0),
      avgRating: (patients.reduce((sum, p) => sum + p.rating, 0) / patients.length).toFixed(1),
      maleCount: patients.filter(p => p.gender === "Male").length,
      femaleCount: patients.filter(p => p.gender === "Female").length,
      criticalConditions: patients.filter(p => p.conditions.some(c => c.toLowerCase().includes("diabetes") || c.toLowerCase().includes("hypertension"))).length,
    };
  }, [patients]);

  const handleViewProfile = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsProfileOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setEditData({ ...patient });
    setIsEditOpen(true);
  };

  const handleDeletePatient = (id: string) => {
    if (window.confirm("Are you sure you want to delete this patient record? This action cannot be undone.")) {
      setPatients(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleScheduleAppointment = (patient: Patient) => {
    setSelectedPatient(patient);
    setAppointmentData({ date: "", time: "", type: "Consultation", reason: "" });
    setIsScheduleOpen(true);
  };

  const handleAddPrescription = (patient: Patient) => {
    setSelectedPatient(patient);
    setPrescriptionData({ medication: "", dosage: "", frequency: "", duration: "", notes: "" });
    setIsAddPrescriptionOpen(true);
  };

  const handleAddLabReport = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsAddLabReportOpen(true);
  };

  const handleSendMessage = (patient: Patient) => {
    setSelectedPatient(patient);
    setMessageData({ subject: "", message: "", sendVia: "email" });
    setIsSendMessageOpen(true);
  };

  const handleToggleStatus = (id: string) => {
    setPatients(prev => prev.map(p =>
      p.id === id ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" } : p
    ));
  };

  const submitNewPatient = () => {
    if (newPatient.name && newPatient.email && newPatient.phone) {
      const bmi = newPatient.height && newPatient.weight ? (parseFloat(newPatient.weight) / Math.pow(parseFloat(newPatient.height) / 100, 2)) : 0;
      const newPat: Patient = {
        id: `PAT${String(patients.length + 1).padStart(3, '0')}`,
        name: newPatient.name,
        email: newPatient.email,
        phone: newPatient.phone,
        age: parseInt(newPatient.age, 10) || 0,
        gender: newPatient.gender,
        address: newPatient.address,
        bloodGroup: newPatient.bloodGroup,
        medicalHistory: newPatient.medicalHistory,
        lastVisit: new Date().toISOString().split('T')[0],
        status: "Active",
        avatar: `/avatars/0${(patients.length % 5) + 1}.png`,
        emergencyContact: { name: newPatient.emergencyContactName, relation: newPatient.emergencyContactRelation, phone: newPatient.emergencyContactPhone },
        insurance: { provider: newPatient.insuranceProvider, policyNo: newPatient.insurancePolicyNo, validUntil: newPatient.insuranceValidUntil },
        appointments: { total: 0, upcoming: 0, completed: 0, cancelled: 0 },
        prescriptions: 0,
        labReports: 0,
        vitals: { height: `${newPatient.height} cm`, weight: `${newPatient.weight} kg`, bmi: parseFloat(bmi.toFixed(1)), bp: "N/A" },
        conditions: newPatient.conditions ? newPatient.conditions.split(',').map(c => c.trim()) : [],
        medications: [],
        allergies: newPatient.allergies ? newPatient.allergies.split(',').map(a => a.trim()) : [],
        rating: 5,
        totalSpent: 0,
        lastPayment: 0,
        priority: "normal"
      };
      setPatients(prev => [...prev, newPat]);
      setIsNewPatientOpen(false);
      setNewPatient(initialNewPatientState);
    }
  };

  const submitEditPatient = () => {
    if (editData.name && editData.email && selectedPatient) {
      setPatients(prev =>
        prev.map(p => p.id === selectedPatient.id ? { ...p, ...editData, age: typeof editData.age === 'string' ? parseInt(editData.age, 10) : editData.age ?? p.age } as Patient : p)
      );
      setIsEditOpen(false);
    }
  };

  const submitScheduleAppointment = () => {
    if (appointmentData.date && appointmentData.time && selectedPatient) {
      alert(`Appointment scheduled for ${selectedPatient.name} on ${appointmentData.date} at ${appointmentData.time}`);
      setPatients(prev => prev.map(p => p.id === selectedPatient.id ? { ...p, appointments: { ...p.appointments, upcoming: p.appointments.upcoming + 1, total: p.appointments.total + 1 } } : p));
      setIsScheduleOpen(false);
    }
  };

  const submitAddPrescription = () => {
    if (prescriptionData.medication && selectedPatient) {
      alert(`Prescription added for ${selectedPatient.name}`);
      setPatients(prev => prev.map(p => p.id === selectedPatient.id ? { ...p, prescriptions: p.prescriptions + 1, medications: [...p.medications, `${prescriptionData.medication} ${prescriptionData.dosage}`] } : p));
      setIsAddPrescriptionOpen(false);
    }
  };

  const submitSendMessage = () => {
    if (messageData.message && selectedPatient) {
      alert(`Message sent to ${selectedPatient.name} via ${messageData.sendVia}`);
      setIsSendMessageOpen(false);
    }
  };

  const exportPatientData = () => {
    alert("Exporting patient data as CSV...");
  };

  return (
    <div className="space-y-6 p-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Patient Management
          </h1>
          <p className="text-muted-foreground pt-1">
            Comprehensive patient records and medical history management
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={exportPatientData}><Download className="h-4 w-4 mr-2" />Export</Button>
          <Button variant="outline" size="sm"><Printer className="h-4 w-4 mr-2" />Print</Button>
          <Button onClick={() => setIsNewPatientOpen(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"><PlusCircle className="h-4 w-4 mr-2" />Add New Patient</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <Card className=" hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Patients</CardTitle><Users className="h-4 w-4 text-blue-500" /></CardHeader>
          <CardContent><div className="text-2xl font-medium">{stats.total}</div><div className="flex items-center gap-2 mt-1"><Progress value={stats.total > 0 ? (stats.active / stats.total) * 100 : 0} className="h-2" /></div><p className="text-xs text-muted-foreground mt-1">{stats.active} active</p></CardContent>
        </Card>
        <Card className=" hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Active Patients</CardTitle><UserCheck className="h-4 w-4 text-green-500" /></CardHeader>
          <CardContent><div className="text-2xl font-medium text-green-600">{stats.active}</div><p className="text-xs text-muted-foreground mt-1">{stats.inactive} inactive</p></CardContent>
        </Card>
        <Card className=" hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">New This Month</CardTitle><UserPlus className="h-4 w-4 text-purple-500" /></CardHeader>
          <CardContent><div className="text-2xl font-medium text-purple-600">+{stats.newThisMonth}</div><div className="flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3 text-green-500" /><span className="text-xs text-green-600">Growing</span></div></CardContent>
        </Card>
        <Card className=" hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">High Priority</CardTitle><Flag className="h-4 w-4 text-amber-500" /></CardHeader>
          <CardContent><div className="text-2xl font-medium text-amber-600">{stats.highPriority}</div><p className="text-xs text-muted-foreground mt-1">Need attention</p></CardContent>
        </Card>
        <Card className=" hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Revenue</CardTitle><DollarSign className="h-4 w-4 text-indigo-500" /></CardHeader>
          <CardContent><div className="text-2xl font-medium text-indigo-600">₹{(stats.totalRevenue / 1000).toFixed(0)}K</div><p className="text-xs text-muted-foreground mt-1">From all patients</p></CardContent>
        </Card>
        <Card className=" hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Satisfaction</CardTitle><Star className="h-4 w-4 text-rose-500" /></CardHeader>
          <CardContent><div className="text-2xl font-medium text-rose-600">{stats.avgRating}⭐</div><p className="text-xs text-muted-foreground mt-1">Average rating</p></CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-medium flex items-center gap-2"><CalendarPlus className="h-4 w-4" />Upcoming Appointments</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-medium text-blue-600">{stats.upcomingAppointments}</div><p className="text-xs text-muted-foreground mt-1">Scheduled visits</p></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-rose-50 to-pink-50">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-medium flex items-center gap-2"><Heart className="h-4 w-4" />Critical Conditions</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-medium text-rose-600">{stats.criticalConditions}</div><p className="text-xs text-muted-foreground mt-1">Require monitoring</p></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-medium flex items-center gap-2"><Users2 className="h-4 w-4" />Demographics</CardTitle></CardHeader>
          <CardContent><div className="flex items-center justify-around"><div><div className="text-2xl font-medium text-purple-600">{stats.maleCount}M</div><p className="text-xs text-muted-foreground">Male</p></div><div className="h-12 w-px bg-purple-200"></div><div><div className="text-2xl font-medium text-purple-600">{stats.femaleCount}F</div><p className="text-xs text-muted-foreground">Female</p></div></div></CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input placeholder="Search by name, email, phone, or patient ID..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="pl-10" /></div>
              <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}><SelectTrigger className="w-full lg:w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="Active">Active</SelectItem><SelectItem value="Inactive">Inactive</SelectItem></SelectContent></Select>
              <Select value={priorityFilter} onValueChange={(val) => { setPriorityFilter(val); setCurrentPage(1); }}><SelectTrigger className="w-full lg:w-[150px]"><SelectValue placeholder="Priority" /></SelectTrigger><SelectContent><SelectItem value="all">All Priority</SelectItem><SelectItem value="high">High</SelectItem><SelectItem value="normal">Normal</SelectItem></SelectContent></Select>
              <Select value={genderFilter} onValueChange={(val) => { setGenderFilter(val); setCurrentPage(1); }}><SelectTrigger className="w-full lg:w-[150px]"><SelectValue placeholder="Gender" /></SelectTrigger><SelectContent><SelectItem value="all">All Gender</SelectItem><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem></SelectContent></Select>
              <Select value={sortBy} onValueChange={setSortBy}><SelectTrigger className="w-full lg:w-[150px]"><SelectValue placeholder="Sort By" /></SelectTrigger><SelectContent><SelectItem value="name">Name (A-Z)</SelectItem><SelectItem value="lastVisit">Last Visit</SelectItem><SelectItem value="age">Age</SelectItem><SelectItem value="spent">Total Spent</SelectItem></SelectContent></Select>
              <div className="flex gap-2"><Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}><List className="h-4 w-4" /></Button><Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}><Grid3x3 className="h-4 w-4" /></Button></div>
            </div>
            <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Showing {paginatedPatients.length} of {filteredAndSortedPatients.length} patients</span><Button variant="ghost" size="sm" onClick={() => { setSearchQuery(""); setStatusFilter("all"); setPriorityFilter("all"); setGenderFilter("all"); setSortBy("name"); }}><RefreshCw className="h-4 w-4 mr-2" />Reset Filters</Button></div>
          </div>
        </CardContent>
      </Card>

      {viewMode === "list" ? (
        <Card>
          <CardHeader><CardTitle>Patient Records</CardTitle><CardDescription>Complete database of all registered patients</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {paginatedPatients.length === 0 ? (
              <div className="text-center py-12"><Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No patients found matching your criteria</p><Button variant="link" onClick={() => setIsNewPatientOpen(true)} className="mt-2">Add new patient</Button></div>
            ) : (
              <div className="space-y-2">
                {paginatedPatients.map((patient) => (
                  <div key={patient.id} className={`flex items-center gap-4 p-4 border-2 rounded-lg hover:shadow-md transition-all cursor-pointer ${patient.priority === "high" ? "border-orange-200 bg-orange-50/30" : "border-slate-200 hover:border-blue-300"}`} onClick={() => handleViewProfile(patient)}>
                    <Avatar className="h-14 w-14 ring-2 ring-blue-100 cursor-pointer"><AvatarImage src={patient.avatar} alt={patient.name} /><AvatarFallback>{patient.name.charAt(0)}</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1"><p className="font-semibold text-lg hover:underline">{patient.name}</p><Badge variant={patient.status === 'Active' ? 'default' : 'outline'}>{patient.status}</Badge>{patient.priority === "high" && (<Badge variant="outline" className="border-orange-500 text-orange-700">High Priority</Badge>)}<div className="flex items-center gap-1 ml-2">{[...Array(5)].map((_, i) => (<Star key={i} className={`h-3 w-3 ${i < patient.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />))}</div></div>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm text-muted-foreground"><span className="flex items-center gap-1"><FileText className="h-3 w-3" />{patient.id}</span><span className="flex items-center gap-1"><Cake className="h-3 w-3" />{patient.age} yrs</span><span className="flex items-center gap-1"><Activity className="h-3 w-3" />{patient.bloodGroup}</span><span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{patient.lastVisit}</span><span className="flex items-center gap-1"><CalendarPlus className="h-3 w-3" />{patient.appointments.upcoming} upcoming</span><span className="flex items-center gap-1 text-green-600 font-medium"><DollarSign className="h-3 w-3" />₹{patient.totalSpent.toLocaleString()}</span></div>
                    </div>
                    <div className="hidden lg:flex flex-col items-center gap-1 px-4 border-l"><div className="text-center"><div className="text-lg font-medium text-blue-600">{patient.appointments.total}</div><div className="text-xs text-muted-foreground">Visits</div></div></div>
                    <div className="hidden xl:flex flex-col items-center gap-1 px-4 border-l"><div className="text-center"><div className="text-lg font-medium text-purple-600">{patient.prescriptions}</div><div className="text-xs text-muted-foreground">Scripts</div></div></div>
                    <DropdownMenu><DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}><Button variant="ghost" size="icon" className="shrink-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleViewProfile(patient); }}><FileText className="mr-2 h-4 w-4" />View Full Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleScheduleAppointment(patient); }}><CalendarPlus className="mr-2 h-4 w-4" />Schedule Appointment</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleAddPrescription(patient); }}><Pill className="mr-2 h-4 w-4" />Add Prescription</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleAddLabReport(patient); }}><FileCheck className="mr-2 h-4 w-4" />Add Lab Report</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleSendMessage(patient); }}><Send className="mr-2 h-4 w-4" />Send Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleEditPatient(patient); }}><Edit className="mr-2 h-4 w-4" />Edit Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleToggleStatus(patient.id); }}>{patient.status === "Active" ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}Mark as {patient.status === "Active" ? "Inactive" : "Active"}</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(patient.id); }}><Copy className="mr-2 h-4 w-4" />Copy Patient ID</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={(e) => { e.stopPropagation(); handleDeletePatient(patient.id); }}><Trash2 className="mr-2 h-4 w-4" />Delete Patient</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          {totalPages > 1 && (<div className="flex items-center justify-between px-6 py-4 border-t"><p className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</p><div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}><ChevronLeft className="h-4 w-4 mr-1" />Previous</Button><Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}>Next<ChevronRight className="h-4 w-4 ml-1" /></Button></div></div>)}
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedPatients.length === 0 ? (<Card className="col-span-full"><CardContent className="text-center py-12"><Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No patients found</p></CardContent></Card>) : (paginatedPatients.map((patient) => (
              <Card key={patient.id} className={`hover:shadow-lg transition-all cursor-pointer ${patient.priority === "high" ? "border-orange-300" : ""}`} onClick={() => handleViewProfile(patient)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-3"><Avatar className="h-16 w-16 ring-2 ring-blue-100"><AvatarImage src={patient.avatar} /><AvatarFallback className="text-lg">{patient.name.charAt(0)}</AvatarFallback></Avatar><div className="flex flex-col items-end gap-1"><Badge variant={patient.status === 'Active' ? 'default' : 'outline'} className="text-xs">{patient.status}</Badge><div className="flex items-center gap-1">{[...Array(5)].map((_, i) => (<Star key={i} className={`h-3 w-3 ${i < patient.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />))}</div></div></div>
                  <CardTitle className="text-base">{patient.name}</CardTitle><p className="text-xs text-muted-foreground">{patient.id} • {patient.age} yrs</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm"><div className="flex items-center gap-1 text-muted-foreground"><Activity className="h-3 w-3" /><span className="text-xs">{patient.bloodGroup}</span></div><div className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" /><span className="text-xs">{patient.lastVisit}</span></div></div>
                  <div className="flex items-center justify-between pt-2 border-t"><div className="text-center"><div className="text-lg font-medium text-blue-600">{patient.appointments.total}</div><div className="text-xs text-muted-foreground">Visits</div></div><div className="h-8 w-px bg-slate-200"></div><div className="text-center"><div className="text-lg font-medium text-purple-600">{patient.prescriptions}</div><div className="text-xs text-muted-foreground">Scripts</div></div><div className="h-8 w-px bg-slate-200"></div><div className="text-center"><div className="text-lg font-medium text-green-600">₹{(patient.totalSpent / 1000).toFixed(0)}K</div><div className="text-xs text-muted-foreground">Spent</div></div></div>
                  {patient.appointments.upcoming > 0 && (<Alert className="py-2"><CalendarPlus className="h-4 w-4" /><AlertDescription className="text-xs">{patient.appointments.upcoming} upcoming appointment{patient.appointments.upcoming > 1 ? 's' : ''}</AlertDescription></Alert>)}
                </CardContent>
              </Card>
            )))}
          </div>
          {totalPages > 1 && (<div className="flex items-center justify-center gap-2 mt-6"><Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}><ChevronLeft className="h-4 w-4 mr-1" />Previous</Button><span className="text-sm text-muted-foreground px-4">Page {currentPage} of {totalPages}</span><Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}>Next<ChevronRight className="h-4 w-4 ml-1" /></Button></div>)}
        </>
      )}

      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Patient Profile</DialogTitle><DialogDescription>Complete medical record and patient information</DialogDescription></DialogHeader>
          {selectedPatient && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="medical">Medical</TabsTrigger><TabsTrigger value="appointments">Appointments</TabsTrigger><TabsTrigger value="prescriptions">Prescriptions</TabsTrigger><TabsTrigger value="billing">Billing</TabsTrigger></TabsList>
              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg"><Avatar className="h-20 w-20 ring-4 ring-blue-200"><AvatarImage src={selectedPatient.avatar} /><AvatarFallback className="text-2xl">{selectedPatient.name.charAt(0)}</AvatarFallback></Avatar><div className="flex-1"><h3 className="text-2xl font-semibold">{selectedPatient.name}</h3><p className="text-muted-foreground">{selectedPatient.id}</p><div className="flex items-center gap-2 mt-2"><Badge variant={selectedPatient.status === 'Active' ? 'default' : 'outline'}>{selectedPatient.status}</Badge>{selectedPatient.priority === "high" && (<Badge variant="outline" className="border-orange-500 text-orange-700">High Priority</Badge>)}<div className="flex items-center gap-1">{[...Array(5)].map((_, i) => (<Star key={i} className={`h-4 w-4 ${i < selectedPatient.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />))}</div></div></div><div className="flex flex-col gap-2"><Button size="sm" onClick={() => handleScheduleAppointment(selectedPatient)}><CalendarPlus className="h-4 w-4 mr-2" />Schedule</Button><Button size="sm" variant="outline" onClick={() => handleSendMessage(selectedPatient)}><MessageSquare className="h-4 w-4 mr-2" />Message</Button></div></div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4"><h4 className="font-semibold text-lg flex items-center gap-2"><User className="h-5 w-5" />Personal Information</h4><div className="space-y-3"><div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"><Cake className="h-5 w-5 text-muted-foreground mt-0.5" /><div className="flex-1"><p className="text-sm text-muted-foreground">Age & Gender</p><p className="font-medium">{selectedPatient.age} years • {selectedPatient.gender}</p></div></div><div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"><Activity className="h-5 w-5 text-red-500 mt-0.5" /><div className="flex-1"><p className="text-sm text-muted-foreground">Blood Group</p><p className="font-medium text-red-600">{selectedPatient.bloodGroup}</p></div></div><div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"><MapPin className="h-5 w-5 text-muted-foreground mt-0.5" /><div className="flex-1"><p className="text-sm text-muted-foreground">Address</p><p className="font-medium">{selectedPatient.address}</p></div></div></div></div>
                  <div className="space-y-4"><h4 className="font-semibold text-lg flex items-center gap-2"><Phone className="h-5 w-5" />Contact Information</h4><div className="space-y-3"><div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"><Phone className="h-5 w-5 text-blue-600 mt-0.5" /><div className="flex-1"><p className="text-sm text-muted-foreground">Phone</p><p className="font-medium">{selectedPatient.phone}</p></div><Button size="sm" variant="outline"><Phone className="h-3 w-3" /></Button></div><div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"><Mail className="h-5 w-5 text-blue-600 mt-0.5" /><div className="flex-1"><p className="text-sm text-muted-foreground">Email</p><p className="font-medium">{selectedPatient.email}</p></div><Button size="sm" variant="outline"><Mail className="h-3 w-3" /></Button></div><div className="p-3 bg-amber-50 rounded-lg border border-amber-200"><p className="text-sm font-semibold text-amber-800 mb-2">Emergency Contact</p><div className="space-y-1 text-sm"><p className="font-medium">{selectedPatient.emergencyContact.name}</p><p className="text-muted-foreground">{selectedPatient.emergencyContact.relation}</p><p className="text-muted-foreground">{selectedPatient.emergencyContact.phone}</p></div></div></div></div>
                </div>
                <div className="space-y-3 border-t pt-4"><h4 className="font-semibold text-lg flex items-center gap-2"><Heart className="h-5 w-5" />Vital Statistics</h4><div className="grid grid-cols-2 md:grid-cols-4 gap-3"><div className="p-3 bg-green-50 rounded-lg border border-green-200 text-center"><div className="text-2xl font-medium text-green-600">{selectedPatient.vitals.height}</div><div className="text-xs text-muted-foreground">Height</div></div><div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center"><div className="text-2xl font-medium text-blue-600">{selectedPatient.vitals.weight}</div><div className="text-xs text-muted-foreground">Weight</div></div><div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-center"><div className="text-2xl font-medium text-purple-600">{selectedPatient.vitals.bmi}</div><div className="text-xs text-muted-foreground">BMI</div></div><div className="p-3 bg-red-50 rounded-lg border border-red-200 text-center"><div className="text-2xl font-medium text-red-600">{selectedPatient.vitals.bp}</div><div className="text-xs text-muted-foreground">BP</div></div></div></div>
                {selectedPatient.insurance.provider && (<div className="space-y-3 border-t pt-4"><h4 className="font-semibold text-lg flex items-center gap-2"><FileCheck className="h-5 w-5" />Insurance Information</h4><div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200"><div className="grid md:grid-cols-3 gap-4"><div><p className="text-sm text-muted-foreground">Provider</p><p className="font-semibold">{selectedPatient.insurance.provider}</p></div><div><p className="text-sm text-muted-foreground">Policy Number</p><p className="font-semibold">{selectedPatient.insurance.policyNo}</p></div><div><p className="text-sm text-muted-foreground">Valid Until</p><p className="font-semibold">{selectedPatient.insurance.validUntil}</p></div></div></div></div>)}
              </TabsContent>
              <TabsContent value="medical" className="space-y-4 mt-4">
                <div className="space-y-3"><h4 className="font-semibold flex items-center gap-2"><FileText className="h-5 w-5" />Medical History</h4><p className="text-sm p-4 bg-slate-50 rounded-lg border whitespace-pre-line">{selectedPatient.medicalHistory}</p></div>
                {selectedPatient.conditions.length > 0 && (<div className="space-y-3 border-t pt-4"><h4 className="font-semibold flex items-center gap-2"><Heart className="h-5 w-5 text-red-500" />Current Conditions</h4><div className="flex flex-wrap gap-2">{selectedPatient.conditions.map((condition, idx) => (<Badge key={idx} variant="outline" className="border-red-300 text-red-700">{condition}</Badge>))}</div></div>)}
                {selectedPatient.medications.length > 0 && (<div className="space-y-3 border-t pt-4"><h4 className="font-semibold flex items-center gap-2"><Pill className="h-5 w-5 text-purple-500" />Current Medications</h4><div className="space-y-2">{selectedPatient.medications.map((medication, idx) => (<div key={idx} className="p-3 bg-purple-50 rounded-lg border border-purple-200"><p className="font-medium">{medication}</p></div>))}</div></div>)}
                {selectedPatient.allergies.length > 0 && (<div className="space-y-3 border-t pt-4"><h4 className="font-semibold flex items-center gap-2"><AlertCircle className="h-5 w-5 text-amber-500" />Allergies</h4><div className="flex flex-wrap gap-2">{selectedPatient.allergies.map((allergy, idx) => (<Badge key={idx} variant="outline" className="border-amber-500 text-amber-700">{allergy}</Badge>))}</div></div>)}
              </TabsContent>
              <TabsContent value="appointments" className="space-y-4 mt-4">
                <div className="grid grid-cols-4 gap-4"><Card><CardContent className="pt-6 text-center"><div className="text-3xl font-medium text-blue-600">{selectedPatient.appointments.total}</div><p className="text-sm text-muted-foreground">Total Visits</p></CardContent></Card><Card><CardContent className="pt-6 text-center"><div className="text-3xl font-medium text-green-600">{selectedPatient.appointments.completed}</div><p className="text-sm text-muted-foreground">Completed</p></CardContent></Card><Card><CardContent className="pt-6 text-center"><div className="text-3xl font-medium text-purple-600">{selectedPatient.appointments.upcoming}</div><p className="text-sm text-muted-foreground">Upcoming</p></CardContent></Card><Card><CardContent className="pt-6 text-center"><div className="text-3xl font-medium text-red-600">{selectedPatient.appointments.cancelled}</div><p className="text-sm text-muted-foreground">Cancelled</p></CardContent></Card></div>
                <div className="space-y-3"><h4 className="font-semibold">Appointment History</h4><div className="space-y-2"><div className="flex items-start gap-3 p-3 border rounded-lg"><div className="p-2 bg-green-100 rounded-full"><CheckCircle className="h-4 w-4 text-green-600" /></div><div className="flex-1"><div className="font-medium">Annual Physical Examination</div><div className="text-sm text-muted-foreground">{selectedPatient.lastVisit}</div><p className="text-sm mt-1">Complete checkup. All vitals within normal range.</p></div></div><div className="flex items-start gap-3 p-3 border rounded-lg"><div className="p-2 bg-green-100 rounded-full"><CheckCircle className="h-4 w-4 text-green-600" /></div><div className="flex-1"><div className="font-medium">Follow-up Consultation</div><div className="text-sm text-muted-foreground">September 15, 2025</div><p className="text-sm mt-1">Reviewed lab results. Medication adjusted.</p></div></div></div></div>
              </TabsContent>
              <TabsContent value="prescriptions" className="space-y-4 mt-4">
                <div className="flex items-center justify-between"><h4 className="font-semibold">Prescription History</h4><Button size="sm" onClick={() => { setIsProfileOpen(false); handleAddPrescription(selectedPatient); }}><PlusCircle className="h-4 w-4 mr-2" />New Prescription</Button></div>
                <div className="grid gap-3">{selectedPatient.medications.map((medication, idx) => (<Card key={idx}><CardContent className="pt-6"><div className="flex items-start justify-between"><div className="flex-1"><h5 className="font-semibold">{medication}</h5><p className="text-sm text-muted-foreground mt-1">Prescribed on: {selectedPatient.lastVisit}</p><div className="flex items-center gap-4 mt-2 text-sm"><span className="text-muted-foreground">Duration: 30 days</span><span className="text-muted-foreground">Refills: 2</span></div></div><Badge variant="secondary">Active</Badge></div></CardContent></Card>))}</div>
              </TabsContent>
              <TabsContent value="billing" className="space-y-4 mt-4">
                <div className="grid grid-cols-3 gap-4"><Card className="bg-gradient-to-br from-green-50 to-emerald-50"><CardContent className="pt-6 text-center"><div className="text-3xl font-medium text-green-600">₹{selectedPatient.totalSpent.toLocaleString()}</div><p className="text-sm text-muted-foreground">Total Spent</p></CardContent></Card><Card className="bg-gradient-to-br from-blue-50 to-cyan-50"><CardContent className="pt-6 text-center"><div className="text-3xl font-medium text-blue-600">₹{selectedPatient.lastPayment.toLocaleString()}</div><p className="text-sm text-muted-foreground">Last Payment</p></CardContent></Card><Card className="bg-gradient-to-br from-purple-50 to-violet-50"><CardContent className="pt-6 text-center"><div className="text-3xl font-medium text-purple-600">₹0</div><p className="text-sm text-muted-foreground">Outstanding</p></CardContent></Card></div>
                <div className="space-y-3"><h4 className="font-semibold">Payment History</h4><div className="space-y-2"><div className="flex items-center justify-between p-3 border rounded-lg"><div className="flex items-center gap-3"><Receipt className="h-5 w-5 text-green-600" /><div><p className="font-medium">Consultation Fee</p><p className="text-sm text-muted-foreground">{selectedPatient.lastVisit}</p></div></div><div className="text-right"><p className="font-semibold text-green-600">₹{selectedPatient.lastPayment}</p><Badge variant="secondary" className="text-xs">Paid</Badge></div></div></div></div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter className="gap-2"><Button variant="outline" onClick={() => setIsProfileOpen(false)}>Close</Button>{selectedPatient && (<><Button variant="outline" onClick={() => { setIsProfileOpen(false); handleEditPatient(selectedPatient); }}><Edit className="h-4 w-4 mr-2" />Edit</Button><Button onClick={() => { setIsProfileOpen(false); handleScheduleAppointment(selectedPatient); }}><CalendarPlus className="h-4 w-4 mr-2" />Schedule Appointment</Button></>)}</DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewPatientOpen} onOpenChange={setIsNewPatientOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Add New Patient</DialogTitle><DialogDescription>Register a new patient with complete medical information</DialogDescription></DialogHeader>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4"><TabsTrigger value="personal">Personal</TabsTrigger><TabsTrigger value="contact">Contact</TabsTrigger><TabsTrigger value="medical">Medical</TabsTrigger><TabsTrigger value="insurance">Insurance</TabsTrigger></TabsList>
            <TabsContent value="personal" className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2"><Label>Full Name *</Label><Input value={newPatient.name} onChange={(e) => setNewPatient(prev => ({ ...prev, name: e.target.value }))} placeholder="Enter patient's full name" /></div>
                <div className="space-y-2"><Label>Age *</Label><Input type="number" value={newPatient.age} onChange={(e) => setNewPatient(prev => ({ ...prev, age: e.target.value }))} placeholder="Age" min="0" /></div>
                <div className="space-y-2"><Label>Gender *</Label><Select value={newPatient.gender} onValueChange={(value: Patient['gender']) => setNewPatient(prev => ({ ...prev, gender: value }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select></div>
                <div className="space-y-2"><Label>Blood Group *</Label><Select value={newPatient.bloodGroup} onValueChange={(value: Patient['bloodGroup']) => setNewPatient(prev => ({ ...prev, bloodGroup: value }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="O+">O+</SelectItem><SelectItem value="O-">O-</SelectItem><SelectItem value="A+">A+</SelectItem><SelectItem value="A-">A-</SelectItem><SelectItem value="B+">B+</SelectItem><SelectItem value="B-">B-</SelectItem><SelectItem value="AB+">AB+</SelectItem><SelectItem value="AB-">AB-</SelectItem></SelectContent></Select></div>
                <div className="space-y-2"><Label>Height (cm)</Label><Input type="number" value={newPatient.height} onChange={(e) => setNewPatient(prev => ({ ...prev, height: e.target.value }))} placeholder="Height in cm" /></div>
                <div className="space-y-2"><Label>Weight (kg)</Label><Input type="number" value={newPatient.weight} onChange={(e) => setNewPatient(prev => ({ ...prev, weight: e.target.value }))} placeholder="Weight in kg" /></div>
                <div className="space-y-2 col-span-2"><Label>Address</Label><Input value={newPatient.address} onChange={(e) => setNewPatient(prev => ({ ...prev, address: e.target.value }))} placeholder="City, State" /></div>
              </div>
            </TabsContent>
            <TabsContent value="contact" className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Phone *</Label><Input value={newPatient.phone} onChange={(e) => setNewPatient(prev => ({ ...prev, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" /></div>
                <div className="space-y-2"><Label>Email *</Label><Input type="email" value={newPatient.email} onChange={(e) => setNewPatient(prev => ({ ...prev, email: e.target.value }))} placeholder="patient@email.com" /></div>
                <div className="space-y-2 col-span-2"><h4 className="font-semibold text-sm">Emergency Contact</h4></div>
                <div className="space-y-2"><Label>Contact Name</Label><Input value={newPatient.emergencyContactName} onChange={(e) => setNewPatient(prev => ({ ...prev, emergencyContactName: e.target.value }))} placeholder="Emergency contact name" /></div>
                <div className="space-y-2"><Label>Relation</Label><Input value={newPatient.emergencyContactRelation} onChange={(e) => setNewPatient(prev => ({ ...prev, emergencyContactRelation: e.target.value }))} placeholder="e.g., Spouse, Parent" /></div>
                <div className="space-y-2 col-span-2"><Label>Emergency Phone</Label><Input value={newPatient.emergencyContactPhone} onChange={(e) => setNewPatient(prev => ({ ...prev, emergencyContactPhone: e.target.value }))} placeholder="+91 XXXXX XXXXX" /></div>
              </div>
            </TabsContent>
            <TabsContent value="medical" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="space-y-2"><Label>Medical History</Label><Textarea value={newPatient.medicalHistory} onChange={(e) => setNewPatient(prev => ({ ...prev, medicalHistory: e.target.value }))} placeholder="Previous surgeries, chronic conditions, family history..." rows={4} /></div>
                <div className="space-y-2"><Label>Current Conditions</Label><Input value={newPatient.conditions} onChange={(e) => setNewPatient(prev => ({ ...prev, conditions: e.target.value }))} placeholder="Separate multiple conditions with commas (e.g., Diabetes, Hypertension)" /></div>
                <div className="space-y-2"><Label>Known Allergies</Label><Input value={newPatient.allergies} onChange={(e) => setNewPatient(prev => ({ ...prev, allergies: e.target.value }))} placeholder="Separate multiple allergies with commas (e.g., Penicillin, Pollen)" /></div>
              </div>
            </TabsContent>
            <TabsContent value="insurance" className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2"><Label>Insurance Provider</Label><Input value={newPatient.insuranceProvider} onChange={(e) => setNewPatient(prev => ({ ...prev, insuranceProvider: e.target.value }))} placeholder="e.g., Star Health, Max Bupa" /></div>
                <div className="space-y-2"><Label>Policy Number</Label><Input value={newPatient.insurancePolicyNo} onChange={(e) => setNewPatient(prev => ({ ...prev, insurancePolicyNo: e.target.value }))} placeholder="Policy number" /></div>
                <div className="space-y-2"><Label>Valid Until</Label><Input type="date" value={newPatient.insuranceValidUntil} onChange={(e) => setNewPatient(prev => ({ ...prev, insuranceValidUntil: e.target.value }))} /></div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter><Button variant="outline" onClick={() => setIsNewPatientOpen(false)}>Cancel</Button><Button onClick={submitNewPatient} disabled={!newPatient.name || !newPatient.email || !newPatient.phone}><PlusCircle className="h-4 w-4 mr-2" />Add Patient</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Patient Details</DialogTitle><DialogDescription>Update patient information</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2"><Label>Full Name *</Label><Input value={editData.name || ""} onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))} /></div>
              <div className="space-y-2"><Label>Email *</Label><Input type="email" value={editData.email || ""} onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))} /></div>
              <div className="space-y-2"><Label>Phone</Label><Input value={editData.phone || ""} onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))} /></div>
              <div className="space-y-2"><Label>Age</Label><Input type="number" value={editData.age || ""} onChange={(e) => setEditData(prev => ({ ...prev, age: Number(e.target.value) }))} /></div>
              <div className="space-y-2"><Label>Status</Label><Select value={editData.status || "Active"} onValueChange={(value: Patient['status']) => setEditData(prev => ({ ...prev, status: value }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Active">Active</SelectItem><SelectItem value="Inactive">Inactive</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label>Blood Group</Label><Select value={editData.bloodGroup || "O+"} onValueChange={(value: Patient['bloodGroup']) => setEditData(prev => ({ ...prev, bloodGroup: value }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="O+">O+</SelectItem><SelectItem value="O-">O-</SelectItem><SelectItem value="A+">A+</SelectItem><SelectItem value="A-">A-</SelectItem><SelectItem value="B+">B+</SelectItem><SelectItem value="B-">B-</SelectItem><SelectItem value="AB+">AB+</SelectItem><SelectItem value="AB-">AB-</SelectItem></SelectContent></Select></div>
              <div className="space-y-2 col-span-2"><Label>Address</Label><Input value={editData.address || ""} onChange={(e) => setEditData(prev => ({ ...prev, address: e.target.value }))} placeholder="City, State" /></div>
              <div className="space-y-2 col-span-2"><Label>Medical History</Label><Textarea value={editData.medicalHistory || ""} onChange={(e) => setEditData(prev => ({ ...prev, medicalHistory: e.target.value }))} rows={4} /></div>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button><Button onClick={submitEditPatient}><Check className="h-4 w-4 mr-2" />Save Changes</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Schedule Appointment</DialogTitle><DialogDescription>{selectedPatient && `Book an appointment for ${selectedPatient.name}`}</DialogDescription></DialogHeader>
          <div className="space-y-4"><div className="space-y-2"><Label>Date *</Label><Input type="date" value={appointmentData.date} onChange={(e) => setAppointmentData(prev => ({ ...prev, date: e.target.value }))} min={new Date().toISOString().split('T')[0]} /></div><div className="space-y-2"><Label>Time *</Label><Input type="time" value={appointmentData.time} onChange={(e) => setAppointmentData(prev => ({ ...prev, time: e.target.value }))} /></div><div className="space-y-2"><Label>Appointment Type</Label><Select value={appointmentData.type} onValueChange={(value) => setAppointmentData(prev => ({ ...prev, type: value }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Consultation">General Consultation</SelectItem><SelectItem value="Follow-up">Follow-up Visit</SelectItem><SelectItem value="Emergency">Emergency</SelectItem><SelectItem value="Routine Checkup">Routine Checkup</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>Reason for Visit</Label><Textarea value={appointmentData.reason} onChange={(e) => setAppointmentData(prev => ({ ...prev, reason: e.target.value }))} placeholder="Brief description..." rows={3} /></div></div>
          <DialogFooter><Button variant="outline" onClick={() => setIsScheduleOpen(false)}>Cancel</Button><Button onClick={submitScheduleAppointment}><CalendarPlus className="h-4 w-4 mr-2" />Confirm</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddPrescriptionOpen} onOpenChange={setIsAddPrescriptionOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Prescription</DialogTitle><DialogDescription>{selectedPatient && `Create prescription for ${selectedPatient.name}`}</DialogDescription></DialogHeader>
          <div className="space-y-4"><div className="space-y-2"><Label>Medication *</Label><Input value={prescriptionData.medication} onChange={(e) => setPrescriptionData(prev => ({ ...prev, medication: e.target.value }))} placeholder="Medication name" /></div><div className="space-y-2"><Label>Dosage *</Label><Input value={prescriptionData.dosage} onChange={(e) => setPrescriptionData(prev => ({ ...prev, dosage: e.target.value }))} placeholder="e.g., 500mg" /></div><div className="space-y-2"><Label>Frequency *</Label><Input value={prescriptionData.frequency} onChange={(e) => setPrescriptionData(prev => ({ ...prev, frequency: e.target.value }))} placeholder="e.g., Twice daily" /></div><div className="space-y-2"><Label>Duration *</Label><Input value={prescriptionData.duration} onChange={(e) => setPrescriptionData(prev => ({ ...prev, duration: e.target.value }))} placeholder="e.g., 30 days" /></div><div className="space-y-2"><Label>Additional Notes</Label><Textarea value={prescriptionData.notes} onChange={(e) => setPrescriptionData(prev => ({ ...prev, notes: e.target.value }))} placeholder="Special instructions..." rows={3} /></div></div>
          <DialogFooter><Button variant="outline" onClick={() => setIsAddPrescriptionOpen(false)}>Cancel</Button><Button onClick={submitAddPrescription}><Pill className="h-4 w-4 mr-2" />Add Prescription</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isSendMessageOpen} onOpenChange={setIsSendMessageOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Send Message</DialogTitle><DialogDescription>{selectedPatient && `Send a message to ${selectedPatient.name}`}</DialogDescription></DialogHeader>
          <div className="space-y-4"><div className="space-y-2"><Label>Send Via</Label><Select value={messageData.sendVia} onValueChange={(value: MessageState['sendVia']) => setMessageData(prev => ({ ...prev, sendVia: value }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="email">Email</SelectItem><SelectItem value="sms">SMS</SelectItem><SelectItem value="both">Both</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>Subject</Label><Input value={messageData.subject} onChange={(e) => setMessageData(prev => ({ ...prev, subject: e.target.value }))} placeholder="Message subject" /></div><div className="space-y-2"><Label>Message *</Label><Textarea value={messageData.message} onChange={(e) => setMessageData(prev => ({ ...prev, message: e.target.value }))} placeholder="Type your message here..." rows={5} /></div></div>
          <DialogFooter><Button variant="outline" onClick={() => setIsSendMessageOpen(false)}>Cancel</Button><Button onClick={submitSendMessage}><Send className="h-4 w-4 mr-2" />Send Message</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddLabReportOpen} onOpenChange={setIsAddLabReportOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Lab Report</DialogTitle><DialogDescription>{selectedPatient && `Upload lab report for ${selectedPatient.name}`}</DialogDescription></DialogHeader>
          <div className="space-y-4"><Alert><FileCheck className="h-4 w-4" /><AlertDescription>Lab reports will be securely stored and accessible in patient records.</AlertDescription></Alert><div className="space-y-2"><Label>Report Type</Label><Select defaultValue="blood"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="blood">Blood Test</SelectItem><SelectItem value="urine">Urine Test</SelectItem><SelectItem value="xray">X-Ray</SelectItem><SelectItem value="mri">MRI</SelectItem><SelectItem value="ct">CT Scan</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>Report Date</Label><Input type="date" defaultValue={new Date().toISOString().split('T')[0]} /></div><div className="space-y-2"><Label>Upload File</Label><Input type="file" accept=".pdf,.jpg,.jpeg,.png" /><p className="text-xs text-muted-foreground">Supported formats: PDF, JPG, PNG</p></div><div className="space-y-2"><Label>Notes</Label><Textarea placeholder="Additional notes about this report..." rows={3} /></div></div>
          <DialogFooter><Button variant="outline" onClick={() => setIsAddLabReportOpen(false)}>Cancel</Button><Button onClick={() => { alert(`Lab report added for ${selectedPatient?.name}`); setIsAddLabReportOpen(false); }}><FileCheck className="h-4 w-4 mr-2" />Upload Report</Button></DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default PatientsPage;
