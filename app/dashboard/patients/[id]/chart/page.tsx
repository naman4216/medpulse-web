"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import {
  AlertCircle, ArrowLeft, Phone, Mail, MapPin, User, Cake,
  HeartPulse, Thermometer, Activity, Pill, FlaskConical, Calendar,
  FileText, Syringe, ClipboardList, Stethoscope, AlertTriangle, UserPlus,
  Video, DollarSign,MessageSquare, 
  PhoneCall
} from "lucide-react";

type PatientDetails = {
  id: number;
  name: string;
  avatar: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  allergies: string[];
  chronicConditions: string[];
};

type Vitals = {
  date: string;
  bp: string; 
  pulse: string; 
  temp: string; 
  spO2: string; 
  weightKg: number;
  heightCm: number;
};

type Appointment = {
  id: string;
  date: string; 
  time: string;
  type: "In-Clinic" | "Video Call";
  status: "Completed" | "Upcoming" | "Cancelled" | "No Show";
  reason: string;
  notes?: string; 
};

type Prescription = {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  status: "Active" | "Inactive" | "Discontinued";
  datePrescribed: string;
  refills: number;
};

type LabResult = {
  id: string;
  testName: string;
  date: string;
  status: "Pending" | "Complete";
  results: {
    name: string;
    value: string;
    flag: "Normal" | "Low" | "High";
    range: string;
  }[];
};

type ClinicalNote = {
  id: string;
  date: string;
  type: "SOAP" | "Progress" | "Consultation";
  content: string;
  author: "Dr. Sharma";
};

type PatientChartData = {
  details: PatientDetails;
  vitalsHistory: Vitals[];
  appointmentHistory: Appointment[];
  prescriptions: Prescription[];
  labResults: LabResult[];
  notes: ClinicalNote[];
};

const mockPatientDatabase: Record<string, PatientChartData> = {
  "1": { 
    details: {
      id: 1,
      name: "Vikram Kumar",
      avatar: "/avatars/05.png",
      age: 45,
      phone: "+91 98765 43210",
      email: "vikram.kumar@example.com",
      address: "123 MG Road, Bangalore, 560001",
      dob: "15 Aug 1979",
      gender: "Male",
      emergencyContact: { name: "Anita Kumar", relation: "Wife", phone: "+91 98765 43219" },
      allergies: ["Penicillin"],
      chronicConditions: ["Hypertension"],
    },
    vitalsHistory: [
      { date: "2024-10-30", bp: "130/85", pulse: "75", temp: "98.4°F", spO2: "98%", weightKg: 85, heightCm: 178 },
      { date: "2024-05-15", bp: "135/88", pulse: "78", temp: "98.6°F", spO2: "97%", weightKg: 86, heightCm: 178 },
      { date: "2023-11-01", bp: "140/90", pulse: "80", temp: "98.2°F", spO2: "98%", weightKg: 88, heightCm: 178 },
    ],
    appointmentHistory: [
      { id: "apt1", date: "2024-10-30", time: "09:30 AM", type: "In-Clinic", status: "Completed", reason: "Annual Physical" },
      { id: "apt6", date: "2024-05-15", time: "10:00 AM", type: "In-Clinic", status: "Completed", reason: "Hypertension Check-up" },
      { id: "apt7", date: "2023-11-01", time: "11:30 AM", type: "Video Call", status: "Completed", reason: "Medication Review" },
    ],
    prescriptions: [
      { id: "rx1", medication: "Lisinopril", dosage: "20mg", frequency: "Once daily", status: "Active", datePrescribed: "2023-11-01", refills: 3 },
      { id: "rx2", medication: "Amlodipine", dosage: "10mg", frequency: "Once daily", status: "Active", datePrescribed: "2024-05-15", refills: 6 },
      { id: "rx3", medication: "Amoxicillin", dosage: "500mg", frequency: "Three times daily", status: "Discontinued", datePrescribed: "2024-02-10", refills: 0 },
    ],
    labResults: [
      {
        id: "lab1", testName: "Lipid Panel", date: "2024-05-15", status: "Complete",
        results: [
          { name: "Total Cholesterol", value: "210", flag: "High", range: "<200 mg/dL" },
          { name: "HDL", value: "45", flag: "Normal", range: ">40 mg/dL" },
          { name: "LDL", value: "140", flag: "High", range: "<130 mg/dL" },
        ],
      },
    ],
    notes: [
      { id: "n1", date: "2024-10-30", type: "SOAP", author: "Dr. Sharma", content: "S: Patient here for annual physical. Reports feeling well. O: BP 130/85. Lungs clear. A: Hypertension, well-controlled on current medication. P: Continue Lisinopril and Amlodipine. Order routine labs. Follow up in 6 months." }
    ],
  },
  "2": { 
    details: {
      id: 2,
      name: "Priya Singh",
      avatar: "/avatars/02.png",
      age: 32,
      phone: "+91 98765 43211",
      email: "priya.singh@example.com",
      address: "456 Park Street, Delhi, 110001",
      dob: "10 Mar 1992",
      gender: "Female",
      emergencyContact: { name: "Rahul Singh", relation: "Husband", phone: "+91 98765 43222" },
      allergies: ["None Reported"],
      chronicConditions: ["Type 1 Diabetes"],
    },
    vitalsHistory: [
      { date: "2024-10-30", bp: "110/70", pulse: "68", temp: "98.6°F", spO2: "99%", weightKg: 62, heightCm: 165 },
      { date: "2024-04-20", bp: "112/72", pulse: "70", temp: "98.5°F", spO2: "99%", weightKg: 61, heightCm: 165 },
    ],
    appointmentHistory: [
      { id: "apt2", date: "2024-10-30", time: "11:00 AM", type: "Video Call", status: "Upcoming", reason: "Follow-up - Diabetes" },
      { id: "apt8", date: "2024-04-20", time: "02:00 PM", type: "In-Clinic", status: "Completed", reason: "Diabetes Management" },
    ],
    prescriptions: [
      { id: "rx4", medication: "Insulin Glargine", dosage: "20 units", frequency: "Once daily at bedtime", status: "Active", datePrescribed: "2020-01-01", refills: 12 },
      { id: "rx5", medication: "Insulin Lispro", dosage: "4-6 units", frequency: "With meals", status: "Active", datePrescribed: "2020-01-01", refills: 12 },
    ],
    labResults: [
      {
        id: "lab2", testName: "HbA1c", date: "2024-04-20", status: "Complete",
        results: [{ name: "HbA1c", value: "7.2%", flag: "High", range: "<6.5%" }],
      },
    ],
    notes: [
      { id: "n2", date: "2024-04-20", type: "Progress", author: "Dr. Sharma", content: "Patient monitoring blood sugar 4x/day. Last HbA1c was 7.2%. Discussed diet and carb counting. Adjusted mealtime insulin lispro. Will re-check A1c in 3 months." }
    ],
  },
  "4": { 
    details: {
      id: 4,
      name: "Anjali Mehta",
      avatar: "/avatars/03.png",
      age: 55,
      phone: "+91 98765 43213",
      email: "anjali.mehta@example.com",
      address: "789 Juhu Beach, Mumbai, 400049",
      dob: "22 May 1969",
      gender: "Female",
      emergencyContact: { name: "Ravi Mehta", relation: "Husband", phone: "+91 98765 43233" },
      allergies: ["Sulfa Drugs"],
      chronicConditions: ["Hypothyroidism", "Anemia"],
    },
    vitalsHistory: [
      { date: "2024-10-29", bp: "120/80", pulse: "72", temp: "98.0°F", spO2: "98%", weightKg: 70, heightCm: 160 },
    ],
    appointmentHistory: [
      { id: "apt4", date: "2024-10-30", time: "03:00 PM", type: "Video Call", status: "Upcoming", reason: "Hypertension Review" },
      { id: "apt9", date: "2024-10-29", time: "09:00 AM", type: "In-Clinic", status: "Completed", reason: "Lab draw for fatigue" },
    ],
    prescriptions: [
      { id: "rx6", medication: "Levothyroxine", dosage: "75mcg", frequency: "Once daily", status: "Active", datePrescribed: "2022-03-10", refills: 6 },
      { id: "rx7", medication: "Ferrous Sulfate", dosage: "325mg", frequency: "Once daily", status: "Active", datePrescribed: "2024-10-29", refills: 3 },
    ],
    labResults: [
      { 
        id: "lab3", testName: "Complete Blood Count (CBC)", date: "2024-10-29", status: "Complete",
        results: [
          { name: "RBC", value: "4.8", flag: "Normal", range: "4.2-5.4" },
          { name: "WBC", value: "9.2", flag: "Normal", range: "4.5-11.0" },
          { name: "Platelets", value: "350", flag: "Normal", range: "150-450" },
          { name: "Hemoglobin", value: "11.2", flag: "Low", range: "12.0-15.5" },
        ],
      },
    ],
    notes: [
      { id: "n3", date: "2024-10-29", type: "SOAP", author: "Dr. Sharma", content: "S: Patient reports persistent fatigue and feeling cold. O: Vitals stable. CBC ordered. A: Suspect anemia, possibly related to hypothyroidism. P: Start Ferrous Sulfate 325mg daily. Follow up via video call to discuss lab results." }
    ],
  },

};

function PatientInfoCard({ patient }: { patient: PatientDetails }) {
  return (
    <Card className="sticky top-4">
      <CardHeader className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 mb-4 ring-4 ring-blue-100">
          <AvatarImage src={patient.avatar} alt={patient.name} />
          <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl">{patient.name}</CardTitle>
        <CardDescription>Patient ID: {patient.id}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-2"><User className="h-4 w-4" /> Gender</span>
            <span className="font-medium">{patient.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-2"><Cake className="h-4 w-4" /> DOB</span>
            <span className="font-medium">{patient.dob} (Age {patient.age})</span>
          </div>
        </div>
        <Separator />
        <div className="space-y-2 text-sm">
          <h4 className="font-semibold mb-1">Contact Information</h4>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{patient.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{patient.email}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
            <span className="font-medium">{patient.address}</span>
          </div>
        </div>
        <Separator />
        <div className="space-y-2 text-sm">
          <h4 className="font-semibold mb-1">Emergency Contact</h4>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{patient.emergencyContact.name}</span>
            <span className="font-medium">{patient.emergencyContact.relation}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{patient.emergencyContact.phone}</span>
          </div>
        </div>
        <Separator />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={`/dashboard/messages?patient=${patient.id}`}>
              <MessageSquare className="h-4 w-4 mr-2" /> Message
            </Link>
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <Link href={`/dashboard/messages?patient=${patient.id}&video=true`}>
              <PhoneCall className="h-4 w-4 mr-2" /> Start Call
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AlertsCard({ allergies, conditions }: { allergies: string[], conditions: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Alerts & Conditions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h4 className="font-semibold text-sm mb-2">Allergies</h4>
          <div className="flex flex-wrap gap-2">
            {allergies[0] === "None Reported" ? (
              <Badge variant="secondary">None Reported</Badge>
            ) : (
              allergies.map(allergy => (
                <Badge key={allergy} variant="destructive">{allergy}</Badge>
              ))
            )}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-2">Chronic Conditions</h4>
          <div className="flex flex-wrap gap-2">
            {conditions.length === 0 ? (
              <Badge variant="secondary">None</Badge>
            ) : (
              conditions.map(condition => (
                // --- FIX: Replaced invalid "warning" variant with className ---
                <Badge key={condition} variant="outline" className="border-amber-600 text-amber-800">{condition}</Badge>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PatientChartPage() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.id as string;

  const [patientData, setPatientData] = useState<PatientChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const data = mockPatientDatabase[patientId];
    if (data) {
      setPatientData(data);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, [patientId]);

  const handleSaveNote = () => {
    if (!newNote.trim() || !patientData) return;

    const note: ClinicalNote = {
      id: `n${patientData.notes.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      type: "Progress",
      author: "Dr. Sharma",
      content: newNote,
    };

    setPatientData({
      ...patientData,
      notes: [note, ...patientData.notes], 
    });
    setNewNote(""); 
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Activity className="h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-2 text-lg">Loading Patient Chart...</p>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold">Patient Not Found</h1>
        <p className="text-muted-foreground">No chart data found for patient ID: {patientId}</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  const latestVitals = patientData.vitalsHistory[0];

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <PatientInfoCard patient={patientData.details} />
          <AlertsCard allergies={patientData.details.allergies} conditions={patientData.details.chronicConditions} />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="labs">Lab Results</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HeartPulse className="h-5 w-5 text-blue-500" />
                    Latest Vitals
                  </CardTitle>
                  <CardDescription>As of {latestVitals.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div className="text-center p-3 bg-blue-50 border border-blue-100 rounded-lg"><div className="text-2xl font-bold text-blue-700">{latestVitals.bp}</div><div className="text-xs text-muted-foreground">BP (mmHg)</div></div>
                    <div className="text-center p-3 bg-red-50 border border-red-100 rounded-lg"><div className="text-2xl font-bold text-red-700">{latestVitals.pulse}</div><div className="text-xs text-muted-foreground">Pulse (bpm)</div></div>
                    <div className="text-center p-3 bg-amber-50 border border-amber-100 rounded-lg"><div className="text-2xl font-bold text-amber-700">{latestVitals.temp}</div><div className="text-xs text-muted-foreground">Temp (°F)</div></div>
                    <div className="text-center p-3 bg-indigo-50 border border-indigo-100 rounded-lg"><div className="text-2xl font-bold text-indigo-700">{latestVitals.spO2}</div><div className="text-xs text-muted-foreground">SpO2 (%)</div></div>
                    <div className="text-center p-3 bg-green-50 border border-green-100 rounded-lg"><div className="text-2xl font-bold text-green-700">{latestVitals.weightKg}</div><div className="text-xs text-muted-foreground">Weight (kg)</div></div>
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Pill className="h-5 w-5 text-green-500" />Active Medications</CardTitle></CardHeader>
                  <CardContent><ul className="space-y-2">{patientData.prescriptions.filter(p => p.status === "Active").map(rx => (<li key={rx.id} className="flex justify-between text-sm"><span className="font-medium">{rx.medication}</span><span className="text-muted-foreground">{rx.dosage}</span></li>))}</ul></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5 text-purple-500" />Problem List</CardTitle></CardHeader>
                  <CardContent><ul className="space-y-2">{patientData.details.chronicConditions.map(c => (<li key={c} className="flex items-center gap-2 text-sm font-medium"><AlertCircle className="h-4 w-4 text-amber-600" />{c}</li>))}</ul></CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="appointments">
              <Card>
                <CardHeader><CardTitle>Appointment History</CardTitle></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader><TableRow><TableHead>Date & Time</TableHead><TableHead>Type</TableHead><TableHead>Reason</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {patientData.appointmentHistory.map(apt => (
                        <TableRow key={apt.id}>
                          <TableCell className="font-medium">{apt.date} at {apt.time}</TableCell>
                          <TableCell><Badge variant={apt.type === "In-Clinic" ? "default" : "secondary"} className="flex items-center w-fit">{apt.type === "In-Clinic" ? <UserPlus className="h-3 w-3 mr-1" /> : <Video className="h-3 w-3 mr-1" />}{apt.type}</Badge></TableCell>
                          <TableCell>{apt.reason}</TableCell>
                          <TableCell>
                            {/* --- FIX: Replaced invalid variants with className --- */}
                            <Badge variant={
                              apt.status === "Completed" ? "secondary" :
                              apt.status === "Upcoming" ? "secondary" :
                              "destructive"
                            } className={
                              apt.status === "Completed" ? "bg-green-100 text-green-800" :
                              apt.status === "Upcoming" ? "bg-blue-100 text-blue-800" :
                              ""
                            }>{apt.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="labs">
              <Card>
                <CardHeader><CardTitle>Lab Results</CardTitle></CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {patientData.labResults.map(lab => (
                      <AccordionItem value={lab.id} key={lab.id}>
                        <AccordionTrigger><div className="flex justify-between w-full pr-4"><span className="font-medium">{lab.testName}</span><span className="text-muted-foreground text-sm">{lab.date}</span></div></AccordionTrigger>
                        <AccordionContent>
                          <Table>
                            <TableHeader><TableRow><TableHead>Test</TableHead><TableHead>Value</TableHead><TableHead>Flag</TableHead><TableHead>Reference Range</TableHead></TableRow></TableHeader>
                            <TableBody>
                              {lab.results.map(res => (
                                <TableRow key={res.name}>
                                  <TableCell>{res.name}</TableCell>
                                  <TableCell className={`font-bold ${res.flag === "High" ? "text-red-600" : res.flag === "Low" ? "text-blue-600" : ""}`}>{res.value}</TableCell>
                                  <TableCell>
                                    {res.flag !== "Normal" && (
                                      // --- FIX: Replaced invalid "info" variant with className ---
                                      <Badge variant={res.flag === "High" ? "destructive" : "secondary"} className={res.flag === "Low" ? "bg-blue-100 text-blue-800" : ""}>
                                        {res.flag}
                                      </Badge>
                                    )}
                                  </TableCell>
                                  <TableCell>{res.range}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medications">
              <Card>
                <CardHeader><CardTitle>Medication History</CardTitle></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader><TableRow><TableHead>Medication</TableHead><TableHead>Dosage</TableHead><TableHead>Status</TableHead><TableHead>Date Prescribed</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {patientData.prescriptions.map(rx => (
                        <TableRow key={rx.id}>
                          <TableCell className="font-medium">{rx.medication}</TableCell>
                          <TableCell>{rx.dosage} {rx.frequency}</TableCell>
                          <TableCell>
                             {/* --- FIX: Replaced invalid "success" variant with className --- */}
                            <Badge variant={
                              rx.status === "Active" ? "secondary" :
                              rx.status === "Inactive" ? "secondary" :
                              "outline"
                            } className={rx.status === "Active" ? "bg-green-100 text-green-800" : ""}>{rx.status}</Badge>
                          </TableCell>
                          <TableCell>{rx.datePrescribed}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader><CardTitle>New Clinical Note</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <Textarea placeholder="Enter new SOAP or progress note..." value={newNote} onChange={(e) => setNewNote(e.target.value)} rows={5}/>
                  <Button onClick={handleSaveNote} disabled={!newNote.trim()}>Save Note</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Note History</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {patientData.notes.map(note => (
                    <div key={note.id} className="border p-4 rounded-lg bg-slate-50">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2"><Badge variant="secondary">{note.type} Note</Badge><span className="text-sm font-medium">by {note.author}</span></div>
                        <span className="text-sm text-muted-foreground">{note.date}</span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
}