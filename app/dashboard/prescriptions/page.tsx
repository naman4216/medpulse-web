"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Pill, FileText, Download, Plus, X, Search, Trash2, Calendar,
  User, Phone, Mail, TestTube, AlertCircle, Building, Activity
} from "lucide-react";

// --- Databases (Kept exactly as yours) ---
const medicineDatabase = [
  { id: "M001", name: "Paracetamol", shortcut: "PCM", strength: "500mg", type: "Tablet", common: true },
  { id: "M002", name: "Ibuprofen", shortcut: "IBU", strength: "400mg", type: "Tablet", common: true },
  { id: "M003", name: "Amoxicillin", shortcut: "AMX", strength: "500mg", type: "Capsule", common: true },
  { id: "M004", name: "Azithromycin", shortcut: "AZI", strength: "500mg", type: "Tablet", common: true },
  { id: "M005", name: "Omeprazole", shortcut: "OME", strength: "20mg", type: "Capsule", common: true },
  { id: "M006", name: "Metformin", shortcut: "MET", strength: "500mg", type: "Tablet", common: true },
  { id: "M007", name: "Amlodipine", shortcut: "AML", strength: "5mg", type: "Tablet", common: true },
  { id: "M008", name: "Atorvastatin", shortcut: "ATO", strength: "10mg", type: "Tablet", common: true },
  { id: "M009", name: "Lisinopril", shortcut: "LIS", strength: "10mg", type: "Tablet", common: false },
  { id: "M010", name: "Aspirin", shortcut: "ASP", strength: "75mg", type: "Tablet", common: true },
  { id: "M011", name: "Clopidogrel", shortcut: "CLO", strength: "75mg", type: "Tablet", common: false },
  { id: "M012", name: "Pantoprazole", shortcut: "PAN", strength: "40mg", type: "Tablet", common: true },
  { id: "M013", name: "Ciprofloxacin", shortcut: "CIP", strength: "500mg", type: "Tablet", common: true },
  { id: "M014", name: "Doxycycline", shortcut: "DOX", strength: "100mg", type: "Capsule", common: false },
  { id: "M015", name: "Cetirizine", shortcut: "CET", strength: "10mg", type: "Tablet", common: true },
  { id: "M016", name: "Montelukast", shortcut: "MON", strength: "10mg", type: "Tablet", common: false },
  { id: "M017", name: "Salbutamol", shortcut: "SAL", strength: "100mcg", type: "Inhaler", common: true },
  { id: "M018", name: "Prednisolone", shortcut: "PRE", strength: "5mg", type: "Tablet", common: false },
  { id: "M019", name: "Diclofenac", shortcut: "DIC", strength: "50mg", type: "Tablet", common: true },
  { id: "M020", name: "Tramadol", shortcut: "TRA", strength: "50mg", type: "Capsule", common: false },
];

const labTestDatabase = [
  { id: "L001", name: "Complete Blood Count", shortcut: "CBC", category: "Hematology", common: true },
  { id: "L002", name: "Lipid Profile", shortcut: "LIP", category: "Biochemistry", common: true },
  { id: "L003", name: "Liver Function Test", shortcut: "LFT", category: "Biochemistry", common: true },
  { id: "L004", name: "Kidney Function Test", shortcut: "KFT", category: "Biochemistry", common: true },
  { id: "L005", name: "Thyroid Profile", shortcut: "THY", category: "Hormones", common: true },
  { id: "L006", name: "HbA1c", shortcut: "A1C", category: "Diabetes", common: true },
  { id: "L007", name: "Fasting Blood Sugar", shortcut: "FBS", category: "Diabetes", common: true },
  { id: "L008", name: "Random Blood Sugar", shortcut: "RBS", category: "Diabetes", common: true },
  { id: "L009", name: "Urine Routine", shortcut: "URO", category: "Urine", common: true },
  { id: "L010", name: "ECG", shortcut: "ECG", category: "Cardiac", common: true },
  { id: "L011", name: "Chest X-Ray", shortcut: "CXR", category: "Radiology", common: true },
  { id: "L012", name: "Ultrasound Abdomen", shortcut: "USG", category: "Radiology", common: true },
  { id: "L013", name: "Vitamin D", shortcut: "VTD", category: "Vitamins", common: true },
  { id: "L014", name: "Vitamin B12", shortcut: "B12", category: "Vitamins", common: true },
  { id: "L015", name: "ESR", shortcut: "ESR", category: "Hematology", common: true },
  { id: "L016", name: "CRP", shortcut: "CRP", category: "Inflammation", common: false },
  { id: "L017", name: "Serum Electrolytes", shortcut: "ELE", category: "Biochemistry", common: true },
  { id: "L018", name: "Prothrombin Time", shortcut: "PT", category: "Coagulation", common: false },
];

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  timing: string;
  notes: string;
}

interface LabTest {
  name: string;
  notes: string;
}

// Added Vitals interface for the PDF
interface Vitals {
  bp: string;
  weight: string;
  temp: string;
  pulse: string;
}

interface PrescriptionData {
  patientName: string;
  patientAge: string;
  patientGender: string;
  patientPhone: string;
  patientEmail: string;
  date: string;
  diagnosis: string;
  complaint: string;
  medicines: Medicine[];
  labTests: LabTest[];
  followUp: string;
  additionalNotes: string;
  vitals: Vitals; // Added vitals to state
}

export default function PrescriptionSystem() {
  // --- FIX 1: Hydration Safe Date State ---
  const [printDate, setPrintDate] = useState("");

  // Handle patient query param
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('patient');
    if (patientId) {
      // In a real app, fetch patient data from API
      // For now, we'll use mock data
      const mockPatients: Record<string, { name: string; age: string; gender: string; phone: string; email: string }> = {
        'PAT001': { name: 'Rohan Verma', age: '32', gender: 'Male', phone: '+91 98765 43210', email: 'rohan.v@example.com' },
        'PAT002': { name: 'Anjali Singh', age: '28', gender: 'Female', phone: '+91 98765 43211', email: 'anjali.s@example.com' },
        'PAT003': { name: 'Vikram Reddy', age: '52', gender: 'Male', phone: '+91 98765 43212', email: 'vikram.r@example.com' },
        'PAT004': { name: 'Sneha Patel', age: '35', gender: 'Female', phone: '+91 98765 43213', email: 'sneha.p@example.com' },
        'PAT005': { name: 'Amit Kumar', age: '45', gender: 'Male', phone: '+91 98765 43214', email: 'amit.k@example.com' },
        'PAT006': { name: 'Priya Sharma', age: '29', gender: 'Female', phone: '+91 98765 43215', email: 'priya.s@example.com' },
      };
      const patient = mockPatients[patientId];
      if (patient) {
        setPrescription(prev => ({
          ...prev,
          patientName: patient.name,
          patientAge: patient.age,
          patientGender: patient.gender,
          patientPhone: patient.phone,
          patientEmail: patient.email,
        }));
      }
    }
  }, []);

  const [prescription, setPrescription] = useState<PrescriptionData>({
    patientName: "",
    patientAge: "",
    patientGender: "Male",
    patientPhone: "",
    patientEmail: "",
    date: new Date().toISOString().split('T')[0],
    diagnosis: "",
    complaint: "",
    medicines: [],
    labTests: [],
    followUp: "",
    additionalNotes: "",
    vitals: { bp: "", weight: "", temp: "", pulse: "" }
  });

  const [medicineSearch, setMedicineSearch] = useState("");
  const [labTestSearch, setLabTestSearch] = useState("");
  const [showMedicineDialog, setShowMedicineDialog] = useState(false);
  const [showLabTestDialog, setShowLabTestDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [currentMedicine, setCurrentMedicine] = useState<Medicine>({
    name: "",
    dosage: "",
    frequency: "1-0-1",
    duration: "7 days",
    timing: "After food",
    notes: ""
  });

  const [currentLabTest, setCurrentLabTest] = useState<LabTest>({
    name: "",
    notes: ""
  });

  // --- FIX 2: Use Ref for the hidden phantom render ---
  const printableRef = useRef<HTMLDivElement>(null);

  const [doctorProfile] = useState({
    name: "Dr. Evelyn Reed",
    qualification: "MBBS, MD (General Medicine)",
    registration: "REG12345XYZ",
    clinic: "Community Health Clinic",
    phone: "+91 98765 43210",
    email: "dr.reed@communityclinic.com",
    address: "123, Health Avenue, Medical District"
  });

  // --- FIX 1: Effect to set date on client only ---
  useEffect(() => {
    setPrintDate(new Date().toLocaleString());
  }, []);

  const filteredMedicines = useMemo(() => {
    const search = medicineSearch.toLowerCase();
    return medicineDatabase.filter(med =>
      med.name.toLowerCase().includes(search) ||
      med.shortcut.toLowerCase().includes(search) ||
      med.type.toLowerCase().includes(search)
    );
  }, [medicineSearch]);

  const filteredLabTests = useMemo(() => {
    const search = labTestSearch.toLowerCase();
    return labTestDatabase.filter(test =>
      test.name.toLowerCase().includes(search) ||
      test.shortcut.toLowerCase().includes(search) ||
      test.category.toLowerCase().includes(search)
    );
  }, [labTestSearch]);

  // --- Helper Functions (Kept same) ---
  const addMedicine = () => {
    if (currentMedicine.name && currentMedicine.dosage) {
      setPrescription(prev => ({
        ...prev,
        medicines: [...prev.medicines, currentMedicine]
      }));
      setCurrentMedicine({
        name: "",
        dosage: "",
        frequency: "1-0-1",
        duration: "7 days",
        timing: "After food",
        notes: ""
      });
      setShowMedicineDialog(false);
      setMedicineSearch("");
    }
  };

  const addLabTest = () => {
    if (currentLabTest.name) {
      setPrescription(prev => ({
        ...prev,
        labTests: [...prev.labTests, currentLabTest]
      }));
      setCurrentLabTest({ name: "", notes: "" });
      setShowLabTestDialog(false);
      setLabTestSearch("");
    }
  };

  const removeMedicine = (index: number) => {
    setPrescription(prev => ({
      ...prev,
      medicines: prev.medicines.filter((_, i) => i !== index)
    }));
  };

  const removeLabTest = (index: number) => {
    setPrescription(prev => ({
      ...prev,
      labTests: prev.labTests.filter((_, i) => i !== index)
    }));
  };

  const selectMedicine = (med: typeof medicineDatabase[0]) => {
    setCurrentMedicine(prev => ({
      ...prev,
      name: `${med.name} ${med.strength}`,
      dosage: med.strength
    }));
    setMedicineSearch("");
  };

  const selectLabTest = (test: typeof labTestDatabase[0]) => {
    setCurrentLabTest(prev => ({
      ...prev,
      name: test.name
    }));
    setLabTestSearch("");
  };

  const clearPrescription = () => {
    if (confirm("Are you sure you want to clear this prescription?")) {
      setPrescription({
        patientName: "",
        patientAge: "",
        patientGender: "Male",
        patientPhone: "",
        patientEmail: "",
        date: new Date().toISOString().split('T')[0],
        diagnosis: "",
        complaint: "",
        medicines: [],
        labTests: [],
        followUp: "",
        additionalNotes: "",
        vitals: { bp: "", weight: "", temp: "", pulse: "" }
      });
    }
  };

  // --- FIX 3: Robust PDF Generation ---
  const downloadPDF = async () => {
    const element = printableRef.current;
    if (!element) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(element, {
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 794, // A4 px width
        windowHeight: 1123 // A4 px height
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      pdf.save(`prescription_${prescription.patientName || 'patient'}_${prescription.date}.pdf`);

    } catch (error) {
      console.error('PDF generation error:', error);
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  // --- FIX 4: Professional Document Component (Separated logic) ---
  const PrescriptionDocument = () => (
    <div className="w-[210mm] min-h-[297mm] bg-white p-8 mx-auto relative text-slate-800 shadow-none">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-blue-600 pb-6 mb-6">
        <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Building className="h-10 w-10" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-blue-800 uppercase tracking-wide">{doctorProfile.clinic}</h1>
                <p className="text-sm text-slate-500 mt-1">{doctorProfile.address}</p>
            </div>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold text-slate-900">{doctorProfile.name}</h2>
          <p className="text-sm text-blue-600 font-medium">{doctorProfile.qualification}</p>
          <div className="mt-2 text-sm text-slate-500 space-y-1">
            <p className="flex items-center justify-end gap-2"><Phone className="h-3 w-3" /> {doctorProfile.phone}</p>
            <p className="flex items-center justify-end gap-2"><Mail className="h-3 w-3" /> {doctorProfile.email}</p>
            <p className="font-mono text-xs mt-1">Reg: {doctorProfile.registration}</p>
          </div>
        </div>
      </div>

      {/* Patient Meta Data & Vitals */}
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
        <div className="grid grid-cols-3 gap-y-4 gap-x-8">
            <div>
                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block">Patient Name</span>
                <span className="font-semibold text-slate-900">{prescription.patientName || "---"}</span>
            </div>
            <div>
                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block">Age / Gender</span>
                <span className="font-semibold text-slate-900">{prescription.patientAge || "--"} / {prescription.patientGender}</span>
            </div>
            <div>
                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block">Date</span>
                <span className="font-semibold text-slate-900">{prescription.date}</span>
            </div>
        </div>
      </div>

      {/* Vitals Row (Only shows if data exists) */}
      {(prescription.vitals.bp || prescription.vitals.weight || prescription.vitals.temp) && (
        <div className="flex gap-6 mb-6 py-2 border-y border-dashed border-slate-300">
             {prescription.vitals.bp && <div className="text-sm font-medium">BP: <span className="font-bold text-slate-900">{prescription.vitals.bp}</span></div>}
             {prescription.vitals.pulse && <div className="text-sm font-medium">Pulse: <span className="font-bold text-slate-900">{prescription.vitals.pulse}</span></div>}
             {prescription.vitals.weight && <div className="text-sm font-medium">Weight: <span className="font-bold text-slate-900">{prescription.vitals.weight}</span></div>}
             {prescription.vitals.temp && <div className="text-sm font-medium">Temp: <span className="font-bold text-slate-900">{prescription.vitals.temp}</span></div>}
        </div>
      )}

      {/* Content Body */}
      <div className="space-y-6 min-h-[400px]">
        {prescription.complaint && (
            <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase mb-1">Chief Complaint</h3>
                <p className="text-slate-800">{prescription.complaint}</p>
            </div>
        )}

        {prescription.diagnosis && (
            <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase mb-1">Diagnosis</h3>
                <p className="text-slate-800">{prescription.diagnosis}</p>
            </div>
        )}

        {/* Rx Table Layout */}
        <div>
            <div className="flex items-center gap-2 text-blue-700 border-b border-blue-200 pb-2 mb-3">
                <Pill className="h-5 w-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Prescription (Rx)</span>
            </div>
            
            <table className="w-full text-sm text-left">
                <thead className="bg-blue-50 text-blue-800">
                    <tr>
                        <th className="px-3 py-2 rounded-l-md">Medicine</th>
                        <th className="px-3 py-2">Dosage</th>
                        <th className="px-3 py-2">Frequency</th>
                        <th className="px-3 py-2 rounded-r-md">Duration</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {prescription.medicines.map((med, idx) => (
                        <tr key={idx}>
                            <td className="px-3 py-3">
                                <div className="font-bold text-slate-800">{med.name}</div>
                                {med.notes && <div className="text-xs text-slate-500 italic mt-1">{med.notes}</div>}
                            </td>
                            <td className="px-3 py-3">{med.dosage}</td>
                            <td className="px-3 py-3">{med.frequency} <span className="text-xs text-slate-400 ml-1">({med.timing})</span></td>
                            <td className="px-3 py-3">{med.duration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Investigations */}
        {prescription.labTests.length > 0 && (
             <div className="mt-6">
                <div className="flex items-center gap-2 text-slate-700 border-b border-slate-200 pb-2 mb-3">
                    <TestTube className="h-4 w-4" />
                    <span className="text-sm font-medium uppercase tracking-wider">Investigations</span>
                </div>
                <ul className="grid grid-cols-2 gap-2">
                    {prescription.labTests.map((test, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded">
                            <div className="h-1.5 w-1.5 rounded-full bg-slate-400"></div>
                            <span>{test.name}</span>
                            {test.notes && <span className="text-xs text-slate-400 italic">- {test.notes}</span>}
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {/* Advice */}
        {(prescription.followUp || prescription.additionalNotes) && (
             <div className="mt-8 bg-amber-50 p-4 rounded-lg border border-amber-100">
                {prescription.followUp && (
                    <div className="flex gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-amber-700" />
                        <span className="text-sm font-bold text-amber-800">Follow Up:</span>
                        <span className="text-sm text-amber-900">{prescription.followUp}</span>
                    </div>
                )}
                {prescription.additionalNotes && (
                    <div className="flex gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-700" />
                        <span className="text-sm font-bold text-amber-800">Note:</span>
                        <span className="text-sm text-amber-900">{prescription.additionalNotes}</span>
                    </div>
                )}
            </div>
        )}
      </div>

      {/* Footer / Signature */}
      <div className="absolute bottom-8 left-8 right-8">
        <div className="flex justify-between items-end">
            <div className="text-xs text-slate-400 max-w-xs">
                This is a computer generated prescription. <br/>
                Generated on: {printDate}
            </div>
            <div className="text-center">
                <div className="h-16 w-32 mb-2 border-b border-slate-300"></div>
                <div className="font-bold text-slate-900">{doctorProfile.name}</div>
                <div className="text-xs text-slate-500">Signature</div>
            </div>
        </div>
      </div>
    </div>
  );

  // --- MAIN RENDER (Your Original UI) ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      
      {/* --- HIDDEN RENDER AREA FOR PDF GENERATION (Added) --- */}
      <div className="fixed left-[-10000px] top-0 overflow-hidden">
        <div ref={printableRef}>
            <PrescriptionDocument />
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6 no-print">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Prescription System
            </h1>
            <p className="text-muted-foreground mt-1">Create and manage patient prescriptions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearPrescription}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
            <Button onClick={() => setShowPreview(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <Download className="h-4 w-4 mr-2" />
              Generate PDF
            </Button>
          </div>
        </div>

        {/* Quick Shortcuts Info */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Quick Shortcuts:</strong> Type medicine shortcuts (PCM, IBU, AMX) or test shortcuts (CBC, LFT, ECG) for faster entry
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Patient Information */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Patient Name *</Label>
                <Input
                  value={prescription.patientName}
                  onChange={(e) => setPrescription(prev => ({ ...prev, patientName: e.target.value }))}
                  placeholder="Enter patient name"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Age *</Label>
                  <Input
                    value={prescription.patientAge}
                    onChange={(e) => setPrescription(prev => ({ ...prev, patientAge: e.target.value }))}
                    placeholder="Age"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={prescription.patientGender}
                    onChange={(e) => setPrescription(prev => ({ ...prev, patientGender: e.target.value }))}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={prescription.patientPhone}
                  onChange={(e) => setPrescription(prev => ({ ...prev, patientPhone: e.target.value }))}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={prescription.patientEmail}
                  onChange={(e) => setPrescription(prev => ({ ...prev, patientEmail: e.target.value }))}
                  placeholder="patient@email.com"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={prescription.date}
                  onChange={(e) => setPrescription(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Clinical Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Clinical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Added Vitals Section neatly inside Clinical Info to match UI */}
              <div className="grid grid-cols-4 gap-2 bg-blue-50 p-3 rounded-md border border-blue-100">
                <div><Label className="text-xs">BP</Label><Input className="h-8" placeholder="120/80" value={prescription.vitals.bp} onChange={e => setPrescription(prev => ({...prev, vitals: {...prev.vitals, bp: e.target.value}}))} /></div>
                <div><Label className="text-xs">Pulse</Label><Input className="h-8" placeholder="72" value={prescription.vitals.pulse} onChange={e => setPrescription(prev => ({...prev, vitals: {...prev.vitals, pulse: e.target.value}}))} /></div>
                <div><Label className="text-xs">Temp</Label><Input className="h-8" placeholder="98.4" value={prescription.vitals.temp} onChange={e => setPrescription(prev => ({...prev, vitals: {...prev.vitals, temp: e.target.value}}))} /></div>
                <div><Label className="text-xs">Weight</Label><Input className="h-8" placeholder="kg" value={prescription.vitals.weight} onChange={e => setPrescription(prev => ({...prev, vitals: {...prev.vitals, weight: e.target.value}}))} /></div>
              </div>

              <div className="space-y-2">
                <Label>Chief Complaint / History *</Label>
                <Textarea
                  value={prescription.complaint}
                  onChange={(e) => setPrescription(prev => ({ ...prev, complaint: e.target.value }))}
                  placeholder="Patient's main complaint and brief history (2-3 lines)"
                  rows={3}
                  className="resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label>Diagnosis *</Label>
                <Input
                  value={prescription.diagnosis}
                  onChange={(e) => setPrescription(prev => ({ ...prev, diagnosis: e.target.value }))}
                  placeholder="Enter diagnosis"
                />
              </div>

              {/* Medicines Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Pill className="h-4 w-4" />
                    Medicines ({prescription.medicines.length})
                  </Label>
                  <Button size="sm" onClick={() => setShowMedicineDialog(true)}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Medicine
                  </Button>
                </div>
                {prescription.medicines.length > 0 ? (
                  <div className="space-y-2">
                    {prescription.medicines.map((med, idx) => (
                      <div key={idx} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-semibold text-sm">{idx + 1}. {med.name}</div>
                            <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                              <div>Frequency: {med.frequency} | Duration: {med.duration}</div>
                              <div>Timing: {med.timing}</div>
                              {med.notes && <div className="italic">Note: {med.notes}</div>}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeMedicine(idx)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed">
                    <Pill className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No medicines added</p>
                  </div>
                )}
              </div>

              {/* Lab Tests Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <TestTube className="h-4 w-4" />
                    Lab Tests ({prescription.labTests.length})
                  </Label>
                  <Button size="sm" onClick={() => setShowLabTestDialog(true)} variant="outline">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Test
                  </Button>
                </div>
                {prescription.labTests.length > 0 ? (
                  <div className="space-y-2">
                    {prescription.labTests.map((test, idx) => (
                      <div key={idx} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-semibold text-sm">{idx + 1}. {test.name}</div>
                            {test.notes && (
                              <div className="text-xs text-muted-foreground mt-1 italic">{test.notes}</div>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeLabTest(idx)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed">
                    <TestTube className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No lab tests added</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Follow-up</Label>
                  <Input
                    value={prescription.followUp}
                    onChange={(e) => setPrescription(prev => ({ ...prev, followUp: e.target.value }))}
                    placeholder="e.g., After 7 days, 2 weeks"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <Input
                    value={prescription.additionalNotes}
                    onChange={(e) => setPrescription(prev => ({ ...prev, additionalNotes: e.target.value }))}
                    placeholder="Any special instructions"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Medicine Dialog */}
        <Dialog open={showMedicineDialog} onOpenChange={setShowMedicineDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Medicine</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Search Medicine (Type name or shortcut)</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={medicineSearch}
                    onChange={(e) => setMedicineSearch(e.target.value)}
                    placeholder="Type: PCM, IBU, AMX or full name..."
                    className="pl-10"
                  />
                </div>
                {medicineSearch && filteredMedicines.length > 0 && (
                  <div className="border rounded-lg max-h-48 overflow-y-auto">
                    {filteredMedicines.map((med) => (
                      <button
                        key={med.id}
                        onClick={() => selectMedicine(med)}
                        className="w-full text-left p-3 hover:bg-slate-50 border-b last:border-b-0 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-sm">{med.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {med.strength} • {med.type}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {med.shortcut}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Medicine Name *</Label>
                <Input
                  value={currentMedicine.name}
                  onChange={(e) => setCurrentMedicine(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Medicine name with strength"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Dosage *</Label>
                  <Input
                    value={currentMedicine.dosage}
                    onChange={(e) => setCurrentMedicine(prev => ({ ...prev, dosage: e.target.value }))}
                    placeholder="e.g., 500mg, 1 tablet"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Frequency *</Label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={currentMedicine.frequency}
                    onChange={(e) => setCurrentMedicine(prev => ({ ...prev, frequency: e.target.value }))}
                  >
                    <option>1-0-0 (Once daily morning)</option>
                    <option>0-1-0 (Once daily afternoon)</option>
                    <option>0-0-1 (Once daily night)</option>
                    <option>1-0-1 (Twice daily)</option>
                    <option>1-1-1 (Three times daily)</option>
                    <option>1-1-1-1 (Four times daily)</option>
                    <option>SOS (When needed)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Duration *</Label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={currentMedicine.duration}
                    onChange={(e) => setCurrentMedicine(prev => ({ ...prev, duration: e.target.value }))}
                  >
                    <option>3 days</option>
                    <option>5 days</option>
                    <option>7 days</option>
                    <option>10 days</option>
                    <option>14 days</option>
                    <option>1 month</option>
                    <option>2 months</option>
                    <option>3 months</option>
                    <option>Continuous</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Timing</Label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={currentMedicine.timing}
                    onChange={(e) => setCurrentMedicine(prev => ({ ...prev, timing: e.target.value }))}
                  >
                    <option>After food</option>
                    <option>Before food</option>
                    <option>With food</option>
                    <option>Empty stomach</option>
                    <option>At bedtime</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <Textarea
                  value={currentMedicine.notes}
                  onChange={(e) => setCurrentMedicine(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any special instructions (e.g., Take with milk, Avoid alcohol)"
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowMedicineDialog(false)}>
                Cancel
              </Button>
              <Button onClick={addMedicine} disabled={!currentMedicine.name || !currentMedicine.dosage}>
                <Plus className="h-4 w-4 mr-2" />
                Add Medicine
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Lab Test Dialog */}
        <Dialog open={showLabTestDialog} onOpenChange={setShowLabTestDialog}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Add Lab Test</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Search Test (Type name or shortcut)</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={labTestSearch}
                    onChange={(e) => setLabTestSearch(e.target.value)}
                    placeholder="Type: CBC, LFT, ECG or full name..."
                    className="pl-10"
                  />
                </div>
                {labTestSearch && filteredLabTests.length > 0 && (
                  <div className="border rounded-lg max-h-64 overflow-y-auto">
                    {filteredLabTests.map((test) => (
                      <button
                        key={test.id}
                        onClick={() => selectLabTest(test)}
                        className="w-full text-left p-3 hover:bg-slate-50 border-b last:border-b-0 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-sm">{test.name}</div>
                            <div className="text-xs text-muted-foreground">{test.category}</div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {test.shortcut}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Test Name *</Label>
                <Input
                  value={currentLabTest.name}
                  onChange={(e) => setCurrentLabTest(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Lab test name"
                />
              </div>

              <div className="space-y-2">
                <Label>Special Instructions</Label>
                <Textarea
                  value={currentLabTest.notes}
                  onChange={(e) => setCurrentLabTest(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="e.g., Fasting required, Morning sample"
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowLabTestDialog(false)}>
                Cancel
              </Button>
              <Button onClick={addLabTest} disabled={!currentLabTest.name}>
                <Plus className="h-4 w-4 mr-2" />
                Add Test
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Preview and PDF Dialog (UPDATED) */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 bg-slate-100">
          <DialogHeader className="p-4 bg-white border-b">
            <DialogTitle>Prescription Preview</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-8 flex justify-center">
            {/* Showing the Professional Document layout in Preview */}
            <div className="scale-[0.85] origin-top shadow-2xl">
                <PrescriptionDocument />
            </div>
          </div>

          <DialogFooter className="p-4 bg-white border-t gap-2">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close
            </Button>
            <Button onClick={downloadPDF} disabled={isGenerating} className="bg-gradient-to-r from-blue-600 to-indigo-600 min-w-[140px]">
              {isGenerating ? "Generating..." : <><Download className="h-4 w-4 mr-2" /> Download PDF</>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}