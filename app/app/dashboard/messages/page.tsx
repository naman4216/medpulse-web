"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Search, Send, Paperclip, Archive, ChevronsRight,
  Calendar, FileText, Heart, Clock, AlertCircle, Star,
  Phone, Video, Mail, Download, Image, File, CheckCheck, Check,
  Pill, TestTube, Activity, Edit, X, Mic, MicOff, VideoOff,
  MonitorUp, Users, MessageSquare, ChevronDown, ChevronUp,
  Maximize2, Minimize2, Settings, Volume2, VolumeX, Camera,
  StopCircle, PlayCircle, Pause, MoreVertical, UserPlus,
  Smile, Reply, Bot, Save, PlusCircle, Stethoscope, History, Wind, Trash2, Pin, BellOff, Link
} from "lucide-react";
import React, { useState, useRef, useEffect, useCallback } from "react";

// --- Ultra-Enhanced Types ---
type Priority = "normal" | "urgent";
type PatientStatus = "active" | "awaiting_results" | "follow_up" | "resolved";

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
  dob: string;
  age: number;
  phone: string;
  email: string;
  appointment: string;
  bloodGroup: string;
  allergies: string[];
  chronic: string[];
  lastVisit: string;
  priority: Priority;
  archived: boolean;
  starred: boolean;
  status: PatientStatus;
  isPinned: boolean;
  isMuted: boolean;
}

interface Attachment {
  type: "image" | "pdf" | "file" | "link";
  fileName: string;
  size?: string;
  url?: string;
}

interface ReplyInfo {
  sender: string;
  text: string;
}

type ChatMessage =
  | { type: "date"; text: string }
  | {
    type: "message";
    id: number;
    sender: "me" | "patient";
    text: string;
    time: string;
    status?: "sent" | "delivered" | "read";
    attachment?: Attachment | null;
    replyingTo?: ReplyInfo | null;
    reactions?: Record<string, number>; // emoji: count
    isEdited?: boolean;
  }
  | { type: "voice_note"; id: number; sender: "me" | "patient"; time: string; duration: string; url: string }
  | { type: "system"; id: number; text: string; time: string };

// --- START: TYPESCRIPT FIX 1 ---
// Create a new type that only includes ChatMessage members that have an 'id' property.
type MessageWithId = Extract<ChatMessage, { id: number }>;
// --- END: TYPESCRIPT FIX 1 ---

type ChatHistories = Record<number, ChatMessage[]>;
interface Template { id: number; title: string; text: string }
interface VideoCallState { isActive: boolean; isVideoOn: boolean; isAudioOn: boolean; isScreenSharing: boolean; isRecording: boolean; duration: number; participantVideoOn: boolean; participantAudioOn: boolean; isFullscreen: boolean; }
interface WaitingRoomPatient { id: number; name: string; avatar: string; reason: string; waitTime: string; priority: Priority; }
interface PrescriptionItem { id: number; name: string; dosage: string; frequency: string; duration: string; notes: string; }
interface ClinicalNote { id: number; date: string; text: string; }
interface VitalSign { date: string; bp: string; hr: number; temp: number; spo2: number; }

// --- Initial Data (Expanded) ---
const initialConversations: Conversation[] = [
  { id: 1, name: "Anjali Singh", lastMessage: "Thank you, doctor! I'll follow up next week.", time: "10:42 AM", unread: 0, avatar: "/avatars/02.png", online: true, dob: "15/08/1985", age: 39, phone: "+91 98765 43210", email: "anjali.singh@email.com", appointment: "Nov 5, 2025", bloodGroup: "O+", allergies: ["Penicillin"], chronic: ["Hypertension"], lastVisit: "Oct 15, 2025", priority: "normal", archived: false, starred: false, status: 'follow_up', isPinned: true, isMuted: false },
  { id: 2, name: "Rohan Verma", lastMessage: "Experiencing chest pain since morning.", time: "9:30 AM", unread: 3, avatar: "/avatars/01.png", online: false, dob: "22/03/1990", age: 34, phone: "+91 91234 56789", email: "rohan.v@email.com", appointment: "Nov 12, 2025", bloodGroup: "A+", allergies: ["None"], chronic: ["Diabetes Type 2"], lastVisit: "Sep 28, 2025", priority: "urgent", archived: false, starred: true, status: 'active', isPinned: false, isMuted: false },
  { id: 3, name: "Vikram Reddy", lastMessage: "Can I get a refill for my prescription?", time: "Yesterday", unread: 0, avatar: "/avatars/03.png", online: true, dob: "10/11/1978", age: 46, phone: "+91 99887 76655", email: "vikram.reddy@email.com", appointment: "Dec 1, 2025", bloodGroup: "B+", allergies: ["Sulfa drugs"], chronic: ["Asthma"], lastVisit: "Oct 20, 2025", priority: "normal", archived: false, starred: false, status: 'active', isPinned: false, isMuted: true },
  { id: 4, name: "Sneha Patel", lastMessage: "The new medication is working well.", time: "2 days ago", unread: 0, avatar: "/avatars/04.png", online: false, dob: "05/02/2000", age: 24, phone: "+91 92345 67890", email: "sneha.p@email.com", appointment: "N/A", bloodGroup: "AB+", allergies: ["Latex"], chronic: ["None"], lastVisit: "Oct 5, 2025", priority: "normal", archived: false, starred: false, status: 'resolved', isPinned: false, isMuted: false },
];
const initialChatHistory: ChatHistories = {
  1: [{ type: 'date', text: 'Today' }, { id: 101, type: 'message', sender: "patient", text: "Good morning, Doctor. I have a question about my recent test results.", time: "9:15 AM", status: "read" }, { id: 102, type: 'message', sender: "me", text: "Good morning, Anjali. Of course, I have your results right here. Everything looks normal, no need to worry.", time: "9:17 AM", status: "read", isEdited: true }, { id: 103, type: 'message', sender: "patient", text: "That's a huge relief! Thank you so much for the quick response.", time: "9:18 AM", status: "read", reactions: { "👍": 1, "❤️": 1 } }, { id: 106, type: 'message', sender: 'me', text: 'Here is a copy of your test results.', time: '9:25 AM', status: "read", attachment: { type: 'pdf', fileName: 'lab_report_anjali.pdf', size: '245 KB' } }, { id: 107, type: 'voice_note', sender: 'patient', time: '9:30 AM', duration: '0:22', url: '#' }, { id: 108, type: 'system', text: 'Appointment for Nov 5, 2025 confirmed.', time: '9:45 AM' }],
  2: [{ type: 'date', text: 'Today' }, { id: 201, type: 'message', sender: "patient", text: "Doctor, I'm experiencing chest pain since this morning. Should I be worried?", time: "9:30 AM", status: "delivered" }], 3: [], 4: []
};
const patientClinicalNotes: Record<number, ClinicalNote[]> = { 1: [{ id: 1, date: "Oct 15, 2025", text: "Patient presented with controlled hypertension." }], 2: [{ id: 1, date: "Sep 28, 2025", text: "Routine check-up for Type 2 Diabetes." }], };
const patientVitals: Record<number, VitalSign[]> = { 1: [{ date: "Oct 15, 2025", bp: "130/85 mmHg", hr: 75, temp: 36.8, spo2: 98 }], 2: [{ date: "Sep 28, 2025", bp: "125/80 mmHg", hr: 80, temp: 37.0, spo2: 99 }], };
const commonLabTests = ["Complete Blood Count (CBC)", "Lipid Panel", "HbA1c", "Thyroid Panel (TSH)", "Liver Function Test (LFT)", "Kidney Function Test (KFT)", "Urine Analysis", "Vitamin D, B12"];

export default function MessagesPage() {
  // --- State Management ---
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(initialConversations[0]);
  const [isPatientInfoVisible, setPatientInfoVisible] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [messageInput, setMessageInput] = useState<string>('');
  const [chatHistories, setChatHistories] = useState<ChatHistories>(initialChatHistory);
  const [isPatientTyping, setPatientTyping] = useState<boolean>(false);
  const [editingMessage, setEditingMessage] = useState<MessageWithId | null>(null);

  // --- Dialogs & Modals ---
  const [isScheduleDialogOpen, setScheduleDialogOpen] = useState<boolean>(false);
  const [isPrescriptionDialogOpen, setPrescriptionDialogOpen] = useState<boolean>(false);
  const [isLabTestDialogOpen, setLabTestDialogOpen] = useState<boolean>(false);
  const [isTemplateDialogOpen, setTemplateDialogOpen] = useState<boolean>(false);
  const [isWaitingRoomOpen, setWaitingRoomOpen] = useState<boolean>(false);
  // Use the new MessageWithId type for the state, ensuring .id is always available.
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<MessageWithId | null>(null);

  // --- Refs & Attachments ---
  const [attachmentPreview, setAttachmentPreview] = useState<Attachment | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // --- Advanced Chat Features ---
  const [replyingTo, setReplyingTo] = useState<MessageWithId | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  // --- Video Call ---
  const [videoCall, setVideoCall] = useState<VideoCallState>({ isActive: false, isVideoOn: true, isAudioOn: true, isScreenSharing: false, isRecording: false, duration: 0, participantVideoOn: true, participantAudioOn: true, isFullscreen: false, });
  const [callNotes, setCallNotes] = useState<string>('');
  const [showCallNotes, setShowCallNotes] = useState<boolean>(false);

  // --- Clinical Data ---
  const [prescriptionItems, setPrescriptionItems] = useState<PrescriptionItem[]>([{ id: 1, name: "Paracetamol", dosage: "500mg", frequency: "Twice a day", duration: "5 days", notes: "Take after meals" }]);
  const [prescriptionDiagnosis, setPrescriptionDiagnosis] = useState<string>("");
  const [clinicalNotes, setClinicalNotes] = useState(patientClinicalNotes);
  const [vitals, setVitals] = useState(patientVitals);
  const [newNote, setNewNote] = useState("");
  const [selectedLabTests, setSelectedLabTests] = useState<Set<string>>(new Set());

  // --- Mock Data ---
  const waitingRoomPatients: WaitingRoomPatient[] = [{ id: 5, name: "Priya Sharma", avatar: "/avatars/05.png", reason: "Fever and Cough", waitTime: "5 min", priority: "normal" }, { id: 6, name: "Amit Kumar", avatar: "/avatars/06.png", reason: "Follow-up for BP", waitTime: "12 min", priority: "urgent" },];
  const messageTemplates: Template[] = [{ id: 1, title: "Follow-up Reminder", text: "This is a reminder about your upcoming appointment." }, { id: 2, title: "Test Results Ready", text: "Your test results are now available." },];
  const availableReactions = ["👍", "❤️", "😂", "😮", "😢", "🙏"];
  const handleStartReply = (message: MessageWithId) => {
    setReplyingTo(message);
  };
  // --- Handlers ---
  const handleSendMessage = useCallback(() => {
    if (!messageInput.trim() && !attachmentPreview) return;

    if (editingMessage && editingMessage.type === 'message') {
      setChatHistories(prev => ({
        ...prev,
        [selectedConversation.id]: prev[selectedConversation.id].map(msg => {
          if (msg.type === 'message' && msg.id === editingMessage.id) {
            return { ...msg, text: messageInput, isEdited: true };
          }
          return msg;
        })
      }));
      setEditingMessage(null);
    } else {
      const newMessage: ChatMessage = {
        type: 'message', id: Date.now(), sender: "me", text: messageInput,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: "sent", attachment: attachmentPreview ?? null,
        replyingTo: replyingTo && replyingTo.type === 'message' ? { sender: replyingTo.sender === 'me' ? "You" : selectedConversation.name, text: replyingTo.text } : null,
      };
      setChatHistories(prev => ({ ...prev, [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMessage] }));
      setConversations(prev => prev.map(conv => conv.id === selectedConversation.id ? { ...conv, lastMessage: messageInput || "Sent an attachment", time: "Just now" } : conv));
    }

    setMessageInput('');
    setAttachmentPreview(null);
    setReplyingTo(null);

    if (!editingMessage) {
      setTimeout(() => { setChatHistories(prev => ({ ...prev, [selectedConversation.id]: prev[selectedConversation.id].map((msg, idx) => (msg.type === 'message' && idx === prev[selectedConversation.id].length - 1) ? { ...msg, status: 'delivered' } : msg) })); }, 1000);
      setTimeout(() => { setPatientTyping(true); }, 1500);
      setTimeout(() => { setChatHistories(prev => ({ ...prev, [selectedConversation.id]: prev[selectedConversation.id].map((msg, idx) => (msg.type === 'message' && idx === prev[selectedConversation.id].length - 1) ? { ...msg, status: 'read' } : msg) })); setPatientTyping(false); }, 3500);
    }
  }, [messageInput, attachmentPreview, selectedConversation.id, replyingTo, editingMessage]);

  const handleStartEdit = (message: MessageWithId) => {
    if (message.type !== 'message') return;
    setEditingMessage(message);
    setMessageInput(message.text);
    setReplyingTo(null);
  }
  const cancelEdit = () => { setEditingMessage(null); setMessageInput(''); }

  const handleDeleteMessage = (messageId: number) => {
    setChatHistories(prev => ({ ...prev, [selectedConversation.id]: prev[selectedConversation.id].filter(msg => 'id' in msg && msg.id !== messageId) }));
    setShowDeleteConfirm(null);
  };

  const handleToggleReaction = (messageId: number, emoji: string) => {
    setChatHistories(prev => ({
      ...prev, [selectedConversation.id]: prev[selectedConversation.id].map(msg => {
        // --- START: TYPESCRIPT FIX 2 ---
        // Check for 'type' before accessing 'id'. This narrows the type.
        if (msg.type === 'message' && msg.id === messageId) {
          // --- END: TYPESCRIPT FIX 2 ---
          const newReactions = { ...(msg.reactions || {}) };
          if (newReactions[emoji]) { delete newReactions[emoji]; } else { newReactions[emoji] = (newReactions[emoji] || 0) + 1; }
          return { ...msg, reactions: newReactions };
        } return msg;
      })
    }));
  };

  const startRecording = () => setIsRecording(true);
  const stopRecording = () => {
    setIsRecording(false);
    const newVoiceNote: ChatMessage = { type: 'voice_note', id: Date.now(), sender: 'me', time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), duration: '0:15', url: '#' };
    setChatHistories(prev => ({ ...prev, [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newVoiceNote] }));
  };

  const generateChatSummary = () => {
    const summary = "AI Summary: Patient reported chest pain and dizziness. Doctor advised immediate consultation. Lab results for Anjali Singh were normal. A follow-up was scheduled.";
    setMessageInput(summary);
    sendSystemMessage(`🤖 AI-generated summary inserted.`);
  };

  const saveNewClinicalNote = () => { if (!newNote.trim()) return; const note: ClinicalNote = { id: Date.now(), date: new Date().toLocaleDateString('en-GB'), text: newNote }; setClinicalNotes(prev => ({ ...prev, [selectedConversation.id]: [...(prev[selectedConversation.id] || []), note] })); setNewNote(""); };
  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target?.files?.[0]; if (file) { const fileType = file.type.startsWith('image/') ? 'image' : file.type === 'application/pdf' ? 'pdf' : 'file'; setAttachmentPreview({ type: fileType, fileName: file.name, size: (file.size / 1024).toFixed(2) + ' KB' }); } };
  const togglePin = (convId: number) => setConversations(prev => prev.map(c => c.id === convId ? { ...c, isPinned: !c.isPinned } : c).sort((a, b) => Number(b.isPinned) - Number(a.isPinned)));
  const toggleMute = (convId: number) => { setConversations(prev => prev.map(c => c.id === convId ? { ...c, isMuted: !c.isMuted } : c)); if (selectedConversation.id === convId) setSelectedConversation(prev => ({ ...prev, isMuted: !prev.isMuted })) };
  const sendSystemMessage = (text: string) => { const newMessage: ChatMessage = { type: 'system', id: Date.now(), text, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }; setChatHistories(prev => ({ ...prev, [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMessage] })); };

  const handleOrderLabs = () => {
    if (selectedLabTests.size === 0) return;
    const tests = Array.from(selectedLabTests).join(', ');
    sendSystemMessage(`Lab tests ordered: ${tests}. Awaiting results.`);
    setLabTestDialogOpen(false);
    setSelectedLabTests(new Set());
  }

  const admitFromWaitingRoom = (patientId: number) => { const patient = waitingRoomPatients.find(p => p.id === patientId); if (patient) { setWaitingRoomOpen(false); alert(`Admitting ${patient.name}. Joining call...`); } };
  const startVideoCall = () => { setVideoCall(prev => ({ ...prev, isActive: true, duration: 0 })); sendSystemMessage("📹 Video consultation started"); };
  const endVideoCall = () => { sendSystemMessage(`📹 Video consultation ended (Duration: ${formatDuration(videoCall.duration)})`); setVideoCall({ isActive: false, isVideoOn: true, isAudioOn: true, isScreenSharing: false, isRecording: false, duration: 0, participantVideoOn: true, participantAudioOn: true, isFullscreen: false }); };
  const formatDuration = (seconds: number) => { const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`; };

  const sortedConversations = conversations.filter(conv => { const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()); const matchesTab = (activeTab === 'All' && !conv.archived) || (activeTab === 'Unread' && conv.unread > 0 && !conv.archived) || (activeTab === 'Archived' && conv.archived) || (activeTab === 'Urgent' && conv.priority === 'urgent' && !conv.archived) || (activeTab === 'Starred' && conv.starred && !conv.archived); return matchesSearch && matchesTab; }).sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
  const currentChat = chatHistories[selectedConversation.id] || [];

  useEffect(() => { let timer: NodeJS.Timeout; if (videoCall.isActive) { timer = setInterval(() => setVideoCall(prev => ({ ...prev, duration: prev.duration + 1 })), 1000); } return () => clearInterval(timer); }, [videoCall.isActive]);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800">
      <TooltipProvider>
        {/* Left Panel: Conversation List */}
        <aside className="w-1/4 min-w-[350px] max-w-[400px] border-r border-slate-200 flex flex-col">
          <header className="p-4 border-b border-slate-200">
            <h1 className="text-3xl font-medium tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Messages</h1>
            <div className="relative mt-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /><Input placeholder="Search patients..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
          </header>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="p-2"><TabsList className="grid w-full grid-cols-5"><TabsTrigger value="All">All</TabsTrigger><TabsTrigger value="Unread">Unread</TabsTrigger><TabsTrigger value="Urgent">Urgent</TabsTrigger><TabsTrigger value="Starred">Starred</TabsTrigger><TabsTrigger value="Archived">Archived</TabsTrigger></TabsList></Tabs>
          <div className="flex-1 overflow-y-auto">
            {sortedConversations.map(conv => (
              <div key={conv.id} onClick={() => setSelectedConversation(conv)} className={`flex items-center p-3 m-2 rounded-lg cursor-pointer transition-colors relative ${selectedConversation.id === conv.id ? 'bg-blue-100' : 'hover:bg-slate-100'}`}>
                {conv.isPinned && <Pin className="absolute top-2 right-2 w-4 h-4 text-slate-500" />}
                <div className="relative"><Avatar className="w-12 h-12"><AvatarImage src={conv.avatar} /><AvatarFallback>{conv.name.charAt(0)}</AvatarFallback></Avatar>{conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}</div>
                <div className="flex-1 ml-4">
                  <div className="flex justify-between items-center"><h3 className="font-semibold text-sm">{conv.name}</h3><span className="text-xs text-slate-500">{conv.time}</span></div>
                  <div className="flex justify-between items-start mt-1"><p className="text-xs text-slate-600 truncate max-w-[180px]">{conv.lastMessage}</p><div className="flex items-center gap-2">{conv.isMuted && <BellOff className="w-4 h-4 text-slate-400" />}{conv.priority === 'urgent' && <AlertCircle className="w-4 h-4 text-red-500" />}{conv.unread > 0 && <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center">{conv.unread}</Badge>}</div></div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Middle Panel: Chat Interface */}
        <main className="flex-1 flex flex-col">
          <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-4"><Avatar className="w-10 h-10"><AvatarImage src={selectedConversation.avatar} /><AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback></Avatar><div><h2 className="font-medium text-lg">{selectedConversation.name}</h2><span className="text-sm text-slate-500">{selectedConversation.online ? 'Online' : 'Offline'}</span></div></div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={startVideoCall}><Video className="w-5 h-5" /></Button>
              <Button variant="outline" size="icon"><Phone className="w-5 h-5" /></Button>
              <Popover>
                <PopoverTrigger asChild><Button variant="outline" size="icon"><MoreVertical className="w-5 h-5" /></Button></PopoverTrigger>
                <PopoverContent className="w-48 p-2">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => togglePin(selectedConversation.id)}><Pin className="w-4 h-4 mr-2" />{selectedConversation.isPinned ? "Unpin" : "Pin"} Chat</Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => toggleMute(selectedConversation.id)}><BellOff className="w-4 h-4 mr-2" />{selectedConversation.isMuted ? "Unmute" : "Mute"} Chat</Button>
                </PopoverContent>
              </Popover>
              <Button variant="outline" size="icon" onClick={() => setPatientInfoVisible(!isPatientInfoVisible)}><ChevronsRight className={`w-5 h-5 transition-transform ${isPatientInfoVisible ? 'rotate-180' : ''}`} /></Button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 bg-slate-100/50">
            <div className="space-y-2">
              {currentChat.map((msg, idx) => {
                if (msg.type === 'date') return <div key={msg.text + idx} className="text-center text-xs text-slate-500 my-4">{msg.text}</div>;
                if (msg.type === 'system') return <div key={msg.id} className="flex items-center justify-center my-4 gap-2 text-xs text-slate-500"><Activity className="w-4 h-4" /><p>{msg.text} - <span className="opacity-80">{msg.time}</span></p></div>;
                if (msg.type === 'voice_note') return (<div key={msg.id} className={`flex gap-3 ${msg.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}><Avatar className="w-8 h-8"><AvatarImage src={msg.sender === 'me' ? '/avatars/doctor.png' : selectedConversation.avatar} /><AvatarFallback>{msg.sender === 'me' ? 'Dr' : selectedConversation.name.charAt(0)}</AvatarFallback></Avatar><div className="flex items-center gap-2 p-2 rounded-lg bg-white shadow-sm"><PlayCircle className="w-6 h-6 text-blue-500" /><div className="w-40 h-1 bg-slate-200 rounded-full"></div><span className="text-xs text-slate-500">{msg.duration}</span></div></div>);

                // --- START: TYPESCRIPT FIX 3 ---
                // Add an explicit check for 'message' type to narrow it down for the final return.
                if (msg.type === 'message') {
                  // --- END: TYPESCRIPT FIX 3 ---
                  return (
                    <div key={msg.id} className={`flex gap-3 items-end group ${msg.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <Popover>
                        <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}>
                          <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => handleStartReply(msg)}><Reply className="w-4 h-4" /></Button></TooltipTrigger><TooltipContent><p>Reply</p></TooltipContent></Tooltip>
                          <PopoverTrigger asChild><Button variant="ghost" size="icon" className="w-7 h-7"><Smile className="w-4 h-4" /></Button></PopoverTrigger>
                          {msg.sender === 'me' && <>
                            <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => handleStartEdit(msg)}><Edit className="w-4 h-4" /></Button></TooltipTrigger><TooltipContent><p>Edit</p></TooltipContent></Tooltip>
                            <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => setShowDeleteConfirm(msg)}><Trash2 className="w-4 h-4 text-red-500" /></Button></TooltipTrigger><TooltipContent><p>Delete</p></TooltipContent></Tooltip>
                          </>}
                        </div>
                        <PopoverContent className="p-1 w-auto"><div className="flex gap-1">{availableReactions.map(emoji => <Button key={emoji} variant="ghost" size="icon" className="w-8 h-8 text-lg" onClick={() => handleToggleReaction(msg.id, emoji)}>{emoji}</Button>)}</div></PopoverContent>
                      </Popover>
                      <Avatar className="w-8 h-8"><AvatarImage src={msg.sender === 'me' ? '/avatars/doctor.png' : selectedConversation.avatar} /><AvatarFallback>{msg.sender === 'me' ? 'Dr' : selectedConversation.name.charAt(0)}</AvatarFallback></Avatar>
                      <div className={`relative max-w-md p-3 rounded-lg ${msg.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-white shadow-sm'}`}>
                        {msg.replyingTo && <div className="p-2 mb-2 text-xs border-l-2 border-slate-300/50 bg-black/10 rounded-md"><strong>{msg.replyingTo.sender}</strong><p className="truncate opacity-80">{msg.replyingTo.text}</p></div>}
                        <p className="text-sm">{msg.text}</p>
                        <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'me' ? 'justify-end' : ''}`}><span className="text-xs opacity-70">{msg.time} {msg.isEdited && "(edited)"}</span>{msg.sender === 'me' && (msg.status === 'read' ? <CheckCheck className="w-4 h-4 text-green-300" /> : msg.status === 'delivered' ? <CheckCheck className="w-4 h-4" /> : <Check className="w-4 h-4" />)}</div>
                        {msg.reactions && Object.keys(msg.reactions).length > 0 && <div className="absolute -bottom-3 right-2 flex items-center gap-1"><div className="bg-white rounded-full px-1.5 py-0.5 shadow-md flex gap-1">{Object.entries(msg.reactions).map(([emoji, count]) => <span key={emoji} className="text-xs">{emoji}{count > 1 && <span className="text-slate-500 text-[10px] ml-0.5">{count}</span>}</span>)}</div></div>}
                      </div>
                    </div>
                  )
                }
                return null; // Should not be reached if all types are handled
              })}
            </div>
            {isPatientTyping && <div className="flex gap-3 flex-row mt-4"><Avatar className="w-8 h-8"><AvatarImage src={selectedConversation.avatar} /><AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback></Avatar><div className="max-w-md p-3 rounded-lg bg-white flex items-center gap-1"><span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span><span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span><span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-300"></span></div></div>}
            <div ref={chatEndRef}></div>
          </div>

          {/* ... (rest of the component is unchanged) ... */}
          <footer className="p-4 bg-white border-t border-slate-200">
            {(replyingTo || editingMessage) && <div className="flex justify-between items-center gap-2 p-2 bg-slate-100 rounded-md border mb-2"><div className="flex-1"><p className="text-xs font-semibold">{editingMessage ? "Editing Message" : `Replying to ${selectedConversation.name}`}</p><p className="text-xs text-slate-600 truncate">{editingMessage && editingMessage.type === 'message' ? editingMessage.text : replyingTo && replyingTo.type === 'message' ? replyingTo.text : ''}</p></div><Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => { setReplyingTo(null); cancelEdit(); }}><X className="w-4 h-4" /></Button></div>}
            <div className="relative">
              <Textarea placeholder="Type your message..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }} className="pr-32 min-h-[50px] resize-none" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}><Paperclip className="w-5 h-5" /></Button>
                <input type="file" ref={fileInputRef} onChange={handleFileAttach} className="hidden" />
                {isRecording ? <Button onClick={stopRecording} variant="destructive"><StopCircle className="w-5 h-5" /></Button> : <Button variant="ghost" size="icon" onClick={startRecording}><Mic className="w-5 h-5" /></Button>}
                <Button onClick={handleSendMessage}><Send className="w-5 h-5" /></Button>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Dialog open={isTemplateDialogOpen} onOpenChange={setTemplateDialogOpen}><DialogTrigger asChild><Button variant="outline" size="sm"><FileText className="w-4 h-4 mr-2" />Templates</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Message Templates</DialogTitle></DialogHeader><div className="space-y-2 max-h-80 overflow-y-auto">{messageTemplates.map(t => <Card key={t.id} className="cursor-pointer hover:bg-slate-50" onClick={() => { setMessageInput(t.text); setTemplateDialogOpen(false) }}><CardHeader><CardTitle className="text-sm">{t.title}</CardTitle></CardHeader><CardContent className="text-xs text-slate-600">{t.text}</CardContent></Card>)}</div></DialogContent></Dialog>
              <Button variant="outline" size="sm" onClick={generateChatSummary}><Bot className="w-4 h-4 mr-2" />AI Summary</Button>
              <Dialog open={isPrescriptionDialogOpen} onOpenChange={setPrescriptionDialogOpen}><DialogTrigger asChild><Button variant="outline" size="sm"><Pill className="w-4 h-4 mr-2" />Prescription</Button></DialogTrigger><DialogContent className="max-w-3xl"><DialogHeader><DialogTitle>New Prescription for {selectedConversation.name}</DialogTitle></DialogHeader><div className="space-y-4 py-4"><Input placeholder="Diagnosis (e.g., Viral Fever)" value={prescriptionDiagnosis} onChange={(e) => setPrescriptionDiagnosis(e.target.value)} /><div className="grid grid-cols-12 gap-2 font-medium text-xs px-2"><span className="col-span-3">Medication</span><span className="col-span-2">Dosage</span><span className="col-span-2">Frequency</span><span className="col-span-2">Duration</span><span className="col-span-2">Notes</span></div>{prescriptionItems.map((item, index) => (<div key={item.id} className="grid grid-cols-12 gap-2 items-center"><Input placeholder="Name" className="col-span-3" /><Input placeholder="500mg" className="col-span-2" /><Input placeholder="1-0-1" className="col-span-2" /><Input placeholder="5 days" className="col-span-2" /><Input placeholder="After food" className="col-span-2" /><Button variant="ghost" size="icon" className="col-span-1" onClick={() => setPrescriptionItems(prev => prev.filter(p => p.id !== item.id))}><X className="w-4 h-4" /></Button></div>))}<Button variant="outline" size="sm" onClick={() => setPrescriptionItems(prev => [...prev, { id: Date.now(), name: "", dosage: "", frequency: "", duration: "", notes: "" }])}>+ Add Medication</Button></div><DialogFooter><Button>Sign & Send Prescription</Button></DialogFooter></DialogContent></Dialog>
              <Dialog open={isLabTestDialogOpen} onOpenChange={setLabTestDialogOpen}><DialogTrigger asChild><Button variant="outline" size="sm"><TestTube className="w-4 h-4 mr-2" />Lab Tests</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Order Lab Tests for {selectedConversation.name}</DialogTitle></DialogHeader><div className="grid grid-cols-2 gap-4 py-4">{commonLabTests.map(test => (<div key={test} className="flex items-center space-x-2"><input type="checkbox" id={test} checked={selectedLabTests.has(test)} onChange={() => { const newSet = new Set(selectedLabTests); if (newSet.has(test)) { newSet.delete(test) } else { newSet.add(test) }; setSelectedLabTests(newSet); }} /><Label htmlFor={test} className="text-sm font-medium leading-none">{test}</Label></div>))}</div><DialogFooter><Button onClick={handleOrderLabs}>Order Selected ({selectedLabTests.size}) Tests</Button></DialogFooter></DialogContent></Dialog>
              <Dialog open={isScheduleDialogOpen} onOpenChange={setScheduleDialogOpen}><DialogTrigger asChild><Button variant="outline" size="sm"><Calendar className="w-4 h-4 mr-2" />Schedule</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Schedule Appointment</DialogTitle><DialogDescription>For {selectedConversation.name}</DialogDescription></DialogHeader><div className="grid gap-4 py-4"><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="date" className="text-right">Date</Label><Input id="date" type="date" className="col-span-3" /></div><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="time" className="text-right">Time</Label><Input id="time" type="time" className="col-span-3" /></div><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="type" className="text-right">Type</Label><Select><SelectTrigger className="col-span-3"><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent><SelectItem value="video">Video Call</SelectItem><SelectItem value="in-person">In-Person</SelectItem></SelectContent></Select></div></div><DialogFooter><Button>Confirm Schedule</Button></DialogFooter></DialogContent></Dialog>
            </div>
          </footer>
        </main>

        {isPatientInfoVisible && (
          <aside className="w-1/4 min-w-[350px] max-w-[400px] border-l border-slate-200 flex flex-col bg-white">
            <header className="p-4 border-b border-slate-200 text-center">
              <Avatar className="w-24 h-24 mx-auto"><AvatarImage src={selectedConversation.avatar} /><AvatarFallback className="text-4xl">{selectedConversation.name.charAt(0)}</AvatarFallback></Avatar>
              <h2 className="text-xl font-medium mt-4">{selectedConversation.name}</h2>
              <p className="text-sm text-slate-500">{selectedConversation.age} years old</p>
              <div className="flex justify-center gap-2 mt-4">
                <Button variant={selectedConversation.starred ? "default" : "outline"} size="icon"><Star className="w-4 h-4" /></Button>
                <Button variant="outline" size="icon"><AlertCircle className={`w-4 h-4 ${selectedConversation.priority === 'urgent' ? 'text-red-500' : ''}`} /></Button>
                <Button variant="outline" size="icon"><Archive className="w-4 h-4" /></Button>
              </div>
            </header>
            <Tabs defaultValue="details" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-5 shrink-0"><TabsTrigger value="details">Details</TabsTrigger><TabsTrigger value="history">History</TabsTrigger><TabsTrigger value="vitals">Vitals</TabsTrigger><TabsTrigger value="notes">Notes</TabsTrigger><TabsTrigger value="files">Files</TabsTrigger></TabsList>
              <div className="flex-1 overflow-y-auto">
                <TabsContent value="details" className="p-4 space-y-4">
                  <div className="text-sm"><span className="font-medium">Phone:</span> {selectedConversation.phone}</div>
                  <div className="text-sm"><span className="font-medium">Email:</span> {selectedConversation.email}</div>
                  <div className="text-sm"><span className="font-medium">Next Appointment:</span> {selectedConversation.appointment}</div>
                </TabsContent>
                <TabsContent value="history" className="p-4 space-y-4">
                  <div><h4 className="font-semibold mb-2">Allergies</h4><div className="flex flex-wrap gap-2">{selectedConversation.allergies.map(a => (<Badge key={a} variant="secondary">{a}</Badge>))}</div></div>
                  <div><h4 className="font-semibold mb-2">Chronic Conditions</h4><div className="flex flex-wrap gap-2">{selectedConversation.chronic.map(c => (<Badge key={c} variant="outline">{c}</Badge>))}</div></div>
                </TabsContent>
                <TabsContent value="vitals" className="p-4 space-y-2">
                  <h4 className="font-semibold mb-2">Recent Vital Signs</h4>
                  {vitals[selectedConversation.id]?.map((v, i) => (<Card key={i}><CardContent className="p-3 text-xs grid grid-cols-2 gap-1"><div><span className="font-medium">BP:</span> {v.bp}</div><div><span className="font-medium">HR:</span> {v.hr} bpm</div><div><span className="font-medium">Temp:</span> {v.temp}°C</div><div><span className="font-medium">SpO2:</span> {v.spo2}%</div><div className="col-span-2 text-slate-500">{v.date}</div></CardContent></Card>))}
                </TabsContent>
                <TabsContent value="notes" className="p-4 space-y-2 h-full flex flex-col">
                  <h4 className="font-semibold mb-2">Private Clinical Notes</h4>
                  <div className="flex-1 space-y-2 overflow-y-auto">{clinicalNotes[selectedConversation.id]?.map(n => (<Card key={n.id}><CardContent className="p-3"><p className="text-xs">{n.text}</p><p className="text-xs text-slate-500 mt-1">{n.date}</p></CardContent></Card>))}</div>
                  <div className="mt-auto pt-2"><Textarea placeholder="Add a new note..." value={newNote} onChange={(e) => setNewNote(e.target.value)} className="mb-2" /><Button size="sm" className="w-full" onClick={saveNewClinicalNote}>Save Note</Button></div>
                </TabsContent>
                <TabsContent value="files" className="p-4 space-y-2">
                  {currentChat.filter(msg => msg.type === 'message' && msg.attachment).map((msg) => (
                    msg.type === 'message' && msg.attachment && (
                      <div key={msg.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded-md border">
                        <FileText className="w-5 h-5 text-red-600" />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-slate-800">{msg.attachment.fileName}</p>
                          <p className="text-xs text-slate-500">{msg.attachment.size}</p>
                        </div>
                        <Download className="w-4 h-4 text-slate-500 cursor-pointer" />
                      </div>
                    )
                  ))}
                </TabsContent>
              </div>
            </Tabs>
          </aside>
        )}

        <Dialog open={isWaitingRoomOpen} onOpenChange={setWaitingRoomOpen}><DialogTrigger asChild><Button className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-lg" onClick={() => setWaitingRoomOpen(true)}><Users className="w-6 h-6 mr-1" /> {waitingRoomPatients.length}</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Virtual Waiting Room</DialogTitle></DialogHeader><div className="space-y-3 max-h-96 overflow-y-auto">{waitingRoomPatients.map(p => (<Card key={p.id}><CardHeader className="flex flex-row items-center justify-between p-4"><div className="flex items-center gap-4"><Avatar><AvatarImage src={p.avatar} /><AvatarFallback>{p.name.charAt(0)}</AvatarFallback></Avatar><div><CardTitle className="text-base">{p.name}</CardTitle><CardDescription>{p.reason}</CardDescription></div></div><div className="text-right"><div className="text-sm font-medium">{p.waitTime} wait</div>{p.priority === 'urgent' && <Badge variant="destructive">Urgent</Badge>}</div></CardHeader><CardFooter className="p-2 border-t"><Button className="w-full" onClick={() => admitFromWaitingRoom(p.id)}>Admit & Start Call</Button></CardFooter></Card>))}</div></DialogContent></Dialog>

        <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Delete Message?</DialogTitle><DialogDescription>This action cannot be undone. Are you sure you want to permanently delete this message?</DialogDescription></DialogHeader>
            <DialogFooter><Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>Cancel</Button><Button variant="destructive" onClick={() => showDeleteConfirm && handleDeleteMessage(showDeleteConfirm.id)}>Delete</Button></DialogFooter>
          </DialogContent>
        </Dialog>

        {videoCall.isActive && (
          <div className={`fixed inset-0 bg-slate-900 z-50 flex flex-col ${videoCall.isFullscreen ? '' : 'p-4'}`}>
            <div className="flex-1 relative grid grid-cols-2 gap-2">
              <div className="relative bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center"><Avatar className="w-32 h-32 border-4 border-white"><AvatarImage src={selectedConversation.avatar} /><AvatarFallback className="text-4xl">{selectedConversation.name.charAt(0)}</AvatarFallback></Avatar><div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1.5 rounded-lg flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div><span className="text-white font-medium">{selectedConversation.name}</span></div></div>
              <div className="relative bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center">{videoCall.isVideoOn ? <Avatar className="w-32 h-32 border-4 border-white"><AvatarImage src="/avatars/doctor.png" /><AvatarFallback className="text-4xl">Dr</AvatarFallback></Avatar> : <div className="text-center text-white"><VideoOff className="w-16 h-16 mx-auto mb-2" />Camera Off</div>}<div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1.5 rounded-lg flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div><span className="text-white font-medium">You</span>{!videoCall.isAudioOn && <MicOff className="w-4 h-4 text-red-500" />}</div>{videoCall.isRecording && <div className="absolute top-4 right-4 bg-red-600 px-3 py-1.5 rounded-lg flex items-center gap-2 animate-pulse"><div className="w-2 h-2 bg-white rounded-full"></div><span className="text-white text-sm font-medium">REC</span></div>}</div>
              {videoCall.isScreenSharing && <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2"><MonitorUp className="w-5 h-5 text-white" /><span className="text-white font-medium">Sharing your screen</span></div>}
              <div className="absolute top-4 left-4 bg-black/70 px-4 py-2 rounded-lg flex items-center gap-2 text-white font-mono font-medium"><Clock className="w-4 h-4" />{formatDuration(videoCall.duration)}</div>
            </div>
            <div className="shrink-0 p-4 bg-slate-900/50 backdrop-blur-sm rounded-b-lg">
              <div className="flex items-center justify-center gap-4">
                <Button size="lg" variant={videoCall.isAudioOn ? "secondary" : "destructive"} className="rounded-full w-14 h-14" onClick={() => setVideoCall(p => ({ ...p, isAudioOn: !p.isAudioOn }))}>{videoCall.isAudioOn ? <Mic /> : <MicOff />}</Button>
                <Button size="lg" variant={videoCall.isVideoOn ? "secondary" : "destructive"} className="rounded-full w-14 h-14" onClick={() => setVideoCall(p => ({ ...p, isVideoOn: !p.isVideoOn }))}>{videoCall.isVideoOn ? <Video /> : <VideoOff />}</Button>
                <Button size="lg" variant={videoCall.isScreenSharing ? "default" : "secondary"} className="rounded-full w-14 h-14" onClick={() => setVideoCall(p => ({ ...p, isScreenSharing: !p.isScreenSharing }))}><MonitorUp /></Button>
                <Button size="lg" variant="secondary" className={`rounded-full w-14 h-14 ${videoCall.isRecording ? 'ring-2 ring-red-500' : ''}`} onClick={() => setVideoCall(p => ({ ...p, isRecording: !p.isRecording }))}>{videoCall.isRecording ? <StopCircle className="text-red-500" /> : <PlayCircle />}</Button>
                <Button size="lg" variant="destructive" className="rounded-full w-24 h-14" onClick={endVideoCall}>End Call</Button>
                <Button size="lg" variant="secondary" className="rounded-full w-14 h-14" onClick={() => setShowCallNotes(!showCallNotes)}><FileText /></Button>
                <Button size="lg" variant="secondary" className="rounded-full w-14 h-14" onClick={() => setVideoCall(p => ({ ...p, isFullscreen: !p.isFullscreen }))}>{videoCall.isFullscreen ? <Minimize2 /> : <Maximize2 />}</Button>
              </div>
            </div>
          </div>
        )}
      </TooltipProvider>
    </div>
  );
}
