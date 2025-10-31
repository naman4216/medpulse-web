"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search, Send, Paperclip, Archive, ChevronsRight,
  Calendar, FileText, Heart, Clock, AlertCircle, Star,
  Phone, Video, Mail, Download, Image, File, CheckCheck, Check,
  Pill, TestTube, Activity, Edit, X
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

// --- Types ---
type Priority = "normal" | "urgent";

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
}

interface Attachment {
  type: "image" | "pdf" | "file";
  fileName: string;
  size: string;
}

type ChatMessage =
  | { type: "date"; text: string }
  | {
      type: "message";
      sender: "me" | "patient";
      text: string;
      time: string;
      status?: "sent" | "delivered" | "read";
      attachment?: Attachment | null;
    };

type ChatHistories = Record<number, ChatMessage[]>;

interface Template { id: number; title: string; text: string }

const initialConversations: Conversation[] = [
  {
    id: 1,
    name: "Anjali Singh",
    lastMessage: "Thank you, doctor! I'll follow up next week.",
    time: "10:42 AM",
    unread: 0,
    avatar: "/avatars/02.png",
    online: true,
    dob: "15/08/1985",
    age: 39,
    phone: "+91 98765 43210",
    email: "anjali.singh@email.com",
    appointment: "Nov 5, 2025",
    bloodGroup: "O+",
    allergies: ["Penicillin"],
    chronic: ["Hypertension"],
    lastVisit: "Oct 15, 2025",
    priority: "normal",
    archived: false,
    starred: false
  },
  {
    id: 2,
    name: "Rohan Verma",
    lastMessage: "Experiencing chest pain since morning.",
    time: "9:30 AM",
    unread: 3,
    avatar: "/avatars/01.png",
    online: false,
    dob: "22/03/1990",
    age: 34,
    phone: "+91 91234 56789",
    email: "rohan.v@email.com",
    appointment: "Nov 12, 2025",
    bloodGroup: "A+",
    allergies: ["None"],
    chronic: ["Diabetes Type 2"],
    lastVisit: "Sep 28, 2025",
    priority: "urgent",
    archived: false,
    starred: true
  },
  {
    id: 3,
    name: "Vikram Reddy",
    lastMessage: "Can I get a refill for my prescription?",
    time: "Yesterday",
    unread: 0,
    avatar: "/avatars/03.png",
    online: true,
    dob: "10/11/1978",
    age: 46,
    phone: "+91 99887 76655",
    email: "vikram.reddy@email.com",
    appointment: "Dec 1, 2025",
    bloodGroup: "B+",
    allergies: ["Sulfa drugs"],
    chronic: ["Asthma"],
    lastVisit: "Oct 20, 2025",
    priority: "normal",
    archived: false,
    starred: false
  },
  {
    id: 4,
    name: "Sneha Patel",
    lastMessage: "The new medication is working well.",
    time: "2 days ago",
    unread: 0,
    avatar: "/avatars/04.png",
    online: false,
    dob: "05/02/2000",
    age: 24,
    phone: "+91 92345 67890",
    email: "sneha.p@email.com",
    appointment: "N/A",
    bloodGroup: "AB+",
    allergies: ["Latex"],
    chronic: ["None"],
    lastVisit: "Oct 5, 2025",
    priority: "normal",
    archived: false,
    starred: false
  },
];

const initialChatHistory: ChatHistories = {
  1: [
    { type: 'date', text: 'Today' },
      { type: 'message', sender: "patient", text: "Good morning, Doctor. I have a question about my recent test results.", time: "9:15 AM", status: "read" },
      { type: 'message', sender: "me", text: "Good morning, Anjali. Of course, I have your results right here. Everything looks normal, no need to worry.", time: "9:17 AM", status: "read" },
      { type: 'message', sender: "patient", text: "That's a huge relief! Thank you so much for the quick response.", time: "9:18 AM", status: "read" },
      { type: 'message', sender: "me", text: "You're welcome. Let me know if you have any other questions. Stay healthy!", time: "9:20 AM", status: "read" },
      { type: 'message', sender: "patient", text: "Thank you, doctor! I'll follow up next week.", time: "9:22 AM", status: "read" },
      { type: 'message', sender: 'me', text: 'Here is a copy of your test results.', time: '9:25 AM', status: "read", attachment: { type: 'pdf', fileName: 'lab_report.pdf', size: '245 KB' } },
  ],
  2: [
    { type: 'date', text: 'Today' },
      { type: 'message', sender: "patient", text: "Doctor, I'm experiencing chest pain since this morning. Should I be worried?", time: "9:30 AM", status: "delivered" },
      { type: 'message', sender: "patient", text: "It's a sharp pain on the left side.", time: "9:31 AM", status: "delivered" },
      { type: 'message', sender: "patient", text: "Also feeling a bit dizzy.", time: "9:32 AM", status: "delivered" },
  ],
  3: [],
  4: []
};

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(initialConversations[0]);
  const [isPatientInfoVisible, setPatientInfoVisible] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [messageInput, setMessageInput] = useState<string>('');
  const [chatHistories, setChatHistories] = useState<ChatHistories>(initialChatHistory);
  const [isScheduleDialogOpen, setScheduleDialogOpen] = useState<boolean>(false);
  const [isPrescriptionDialogOpen, setPrescriptionDialogOpen] = useState<boolean>(false);
  const [isTemplateDialogOpen, setTemplateDialogOpen] = useState<boolean>(false);
  const [attachmentPreview, setAttachmentPreview] = useState<Attachment | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const messageTemplates = [
    { id: 1, title: "Follow-up Reminder", text: "This is a reminder about your upcoming appointment. Please arrive 15 minutes early to complete any necessary paperwork." },
    { id: 2, title: "Test Results Ready", text: "Your test results are now available. Please schedule an appointment to discuss them in detail." },
    { id: 3, title: "Prescription Refill", text: "Your prescription has been approved for refill. You can collect it from the pharmacy." },
    { id: 4, title: "Post-Consultation", text: "Thank you for your visit today. Please follow the treatment plan we discussed and contact me if you have any concerns." },
  ];

  const handleSendMessage = () => {
    if (!messageInput.trim() && !attachmentPreview) return;

    const newMessage: ChatMessage = {
      type: 'message',
      sender: "me",
      text: messageInput,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: "sent",
      attachment: attachmentPreview ?? null
    };

    setChatHistories((prev) => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMessage]
    }));

    setConversations(prev => prev.map(conv =>
      conv.id === selectedConversation.id
        ? { ...conv, lastMessage: messageInput || "Sent an attachment", time: "Just now" }
        : conv
    ));

    setMessageInput('');
    setAttachmentPreview(null);

    setTimeout(() => {
      setChatHistories((prev) => ({
        ...prev,
        [selectedConversation.id]: prev[selectedConversation.id].map((msg, idx) => {
          if (msg.type === 'message' && idx === prev[selectedConversation.id].length - 1 && msg.status === 'sent') {
            return { ...msg, status: 'delivered' };
          }
          return msg;
        })
      }));
    }, 1000);
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const fileType = file.type.startsWith('image/') ? 'image' :
                      file.type === 'application/pdf' ? 'pdf' : 'file';
      setAttachmentPreview({
        type: fileType,
        fileName: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB'
      });
    }
  };

  const toggleStar = (convId: number) => {
    setConversations(prev => prev.map(conv =>
      conv.id === convId ? { ...conv, starred: !conv.starred } : conv
    ));
    if (selectedConversation.id === convId) {
      setSelectedConversation(prev => ({ ...prev, starred: !prev.starred }));
    }
  };

  const toggleArchive = (convId: number) => {
    setConversations(prev => prev.map(conv =>
      conv.id === convId ? { ...conv, archived: !conv.archived } : conv
    ));
  };

  const markAsUrgent = (convId: number) => {
    setConversations(prev => prev.map(conv =>
      conv.id === convId ? { ...conv, priority: conv.priority === 'urgent' ? 'normal' : 'urgent' } : conv
    ));
    if (selectedConversation.id === convId) {
      setSelectedConversation(prev => ({
        ...prev,
        priority: prev.priority === 'urgent' ? 'normal' : 'urgent'
      }));
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      (activeTab === 'All' && !conv.archived) ||
      (activeTab === 'Unread' && conv.unread > 0 && !conv.archived) ||
      (activeTab === 'Archived' && conv.archived) ||
      (activeTab === 'Urgent' && conv.priority === 'urgent' && !conv.archived) ||
      (activeTab === 'Starred' && conv.starred && !conv.archived);
    return matchesSearch && matchesTab;
  });

  const currentChat = chatHistories[selectedConversation.id] || [];

  const insertTemplate = (template: Template) => {
    setMessageInput(template.text);
    setTemplateDialogOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">Secure Messaging</h1>
            <p className="text-muted-foreground pt-1">Communicate directly and securely with your patients.</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              <Clock className="w-3 h-3 mr-1" />
              {conversations.filter(c => c.unread > 0).length} Unread
            </Badge>
            <Badge variant="destructive" className="text-sm">
              <AlertCircle className="w-3 h-3 mr-1" />
              {conversations.filter(c => c.priority === 'urgent').length} Urgent
            </Badge>
          </div>
        </div>
      </header>

      <Card className="mt-6 flex-1 overflow-hidden">
        <div className="grid md:grid-cols-12 h-full">
          <div className="md:col-span-4 lg:col-span-3 border-r flex flex-col h-full">
            <div className="p-4 border-b shrink-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="shrink-0 w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger value="All" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">All</TabsTrigger>
                <TabsTrigger value="Unread" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Unread</TabsTrigger>
                <TabsTrigger value="Urgent" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Urgent</TabsTrigger>
                <TabsTrigger value="Starred" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Starred</TabsTrigger>
                <TabsTrigger value="Archived" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Archived</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map(convo => (
                  <div
                    key={convo.id}
                    className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-slate-50 border-l-4 ${
                      convo.priority === 'urgent' ? 'border-l-red-500' : 'border-l-transparent'
                    } ${selectedConversation.id === convo.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedConversation(convo)}
                  >
                    <div className="relative">
                      <Avatar className="border">
                        <AvatarImage src={convo.avatar} />
                        <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {convo.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 min-w-0">
                          <p className="font-semibold truncate">{convo.name}</p>
                          {convo.starred && <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">{convo.time}</p>
                      </div>
                      <div className="flex items-center justify-between mt-1 gap-2">
                        <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                        {convo.unread > 0 && (
                          <Badge className="w-5 h-5 flex items-center justify-center p-0 bg-blue-600 text-white flex-shrink-0">
                            {convo.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {filteredConversations.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    <p>No conversations found</p>
                  </div>
                )}
              </div>
            </Tabs>
          </div>

          <div className={`flex flex-col h-full ${isPatientInfoVisible ? 'md:col-span-5 lg:col-span-6' : 'md:col-span-8 lg:col-span-9'}`}>
            <div className="shrink-0 flex items-center justify-between p-4 border-b bg-slate-50/50">
              <div className="flex items-center gap-3">
                <Avatar className="border">
                  <AvatarImage src={selectedConversation.avatar} />
                  <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-lg">{selectedConversation.name}</p>
                    {selectedConversation.priority === 'urgent' && (
                      <Badge variant="destructive" className="text-xs">URGENT</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${selectedConversation.online ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                    <p className="text-xs text-muted-foreground">{selectedConversation.online ? 'Online' : 'Offline'}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon"><Phone className="w-4 h-4" /></Button>
                    </TooltipTrigger>
                    <TooltipContent><p>Voice Call</p></TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon"><Video className="w-4 h-4" /></Button>
                    </TooltipTrigger>
                    <TooltipContent><p>Video Call</p></TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleStar(selectedConversation.id)}
                      >
                        <Star className={`w-4 h-4 ${selectedConversation.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>{selectedConversation.starred ? 'Unstar' : 'Star'}</p></TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => markAsUrgent(selectedConversation.id)}
                      >
                        <AlertCircle className={`w-4 h-4 ${selectedConversation.priority === 'urgent' ? 'text-red-500' : ''}`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>Mark as {selectedConversation.priority === 'urgent' ? 'Normal' : 'Urgent'}</p></TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleArchive(selectedConversation.id)}
                      >
                        <Archive className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>Archive</p></TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setPatientInfoVisible(!isPatientInfoVisible)}
                      >
                        <ChevronsRight className={`w-4 h-4 transition-transform ${isPatientInfoVisible ? 'rotate-180' : ''}`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>{isPatientInfoVisible ? 'Hide' : 'Show'} Patient Info</p></TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-50">
              {currentChat.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center space-y-2">
                    <Mail className="w-12 h-12 mx-auto opacity-50" />
                    <p>No messages yet. Start a conversation!</p>
                  </div>
                </div>
              ) : (
                currentChat.map((msg, index) => (
                  msg.type === 'date' ? (
                    <div key={index} className="text-center text-xs text-muted-foreground my-4">
                      {msg.text}
                    </div>
                  ) : (
                    <div key={index} className={`flex items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      {msg.sender === 'patient' && (
                        <Avatar className="w-8 h-8 border">
                          <AvatarImage src={selectedConversation.avatar} />
                          <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl ${
                        msg.sender === 'me'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white border rounded-bl-none'
                      }`}>
                        {msg.text && <p className="text-sm p-3">{msg.text}</p>}
                        {msg.attachment && (
                          <div className={`mx-3 mb-3 ${msg.text ? 'mt-0' : 'mt-3'} p-3 ${
                            msg.sender === 'me' ? 'bg-blue-500' : 'bg-slate-100'
                          } rounded-lg flex items-center gap-3`}>
                            {msg.attachment.type === 'image' && <Image className="w-4 h-4" />}
                            {msg.attachment.type === 'pdf' && <FileText className="w-4 h-4" />}
                            {msg.attachment.type === 'file' && <File className="w-4 h-4" />}
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-semibold truncate ${
                                msg.sender === 'me' ? 'text-white' : 'text-slate-700'
                              }`}>{msg.attachment.fileName}</p>
                              <p className={`text-xs ${
                                msg.sender === 'me' ? 'text-blue-100' : 'text-muted-foreground'
                              }`}>{msg.attachment.size}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                        <div className={`flex items-center justify-end gap-1 px-3 pb-2 text-xs ${
                          msg.sender === 'me' ? 'text-blue-200' : 'text-muted-foreground'
                        }`}>
                          <span>{msg.time}</span>
                          {msg.sender === 'me' && (
                            msg.status === 'read' ? <CheckCheck className="w-3 h-3" /> :
                            msg.status === 'delivered' ? <CheckCheck className="w-3 h-3 opacity-50" /> :
                            <Check className="w-3 h-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                ))
              )}
              {selectedConversation.online && currentChat.length > 0 && (
                <div className="flex items-end gap-2 justify-start">
                  <Avatar className="w-8 h-8 border">
                    <AvatarImage src={selectedConversation.avatar} />
                    <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1 bg-white border rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="shrink-0 p-4 border-t bg-white space-y-3">
              {attachmentPreview && (
                <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-lg">
                  {attachmentPreview.type === 'image' && <Image className="w-4 h-4" />}
                  {attachmentPreview.type === 'pdf' && <FileText className="w-4 h-4" />}
                  {attachmentPreview.type === 'file' && <File className="w-4 h-4" />}
                  <div className="flex-1">
                    <p className="text-xs font-semibold">{attachmentPreview.fileName}</p>
                    <p className="text-xs text-muted-foreground">{attachmentPreview.size}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setAttachmentPreview(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <div className="relative">
                <Textarea
                  placeholder="Type your message..."
                  className="pr-32 resize-none"
                  rows={2}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="absolute right-2 bottom-2 flex items-center gap-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileAttach}
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setTemplateDialogOpen(true)}
                        >
                          <FileText className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Templates</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="w-4 h-4 text-muted-foreground" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim() && !attachmentPreview}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Dialog open={isScheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      Schedule Follow-up
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Schedule Follow-up Appointment</DialogTitle>
                      <DialogDescription>
                        Create a follow-up appointment for {selectedConversation.name}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="appointment-date">Date</Label>
                        <Input id="appointment-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="appointment-time">Time</Label>
                        <Input id="appointment-time" type="time" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="appointment-type">Appointment Type</Label>
                        <Select>
                          <SelectTrigger id="appointment-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="checkup">Regular Checkup</SelectItem>
                            <SelectItem value="followup">Follow-up</SelectItem>
                            <SelectItem value="consultation">Consultation</SelectItem>
                            <SelectItem value="emergency">Emergency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="appointment-notes">Notes</Label>
                        <Textarea id="appointment-notes" placeholder="Additional notes..." rows={3} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setScheduleDialogOpen(false)}>Cancel</Button>
                      <Button onClick={() => {
                        setScheduleDialogOpen(false);
                        setMessageInput("Your follow-up appointment has been scheduled. You'll receive a confirmation shortly.");
                      }}>Schedule & Notify</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={isPrescriptionDialogOpen} onOpenChange={setPrescriptionDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Pill className="w-4 h-4 mr-1" />
                      Send Prescription
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create Prescription</DialogTitle>
                      <DialogDescription>
                        Generate and send prescription to {selectedConversation.name}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="rx-medication">Medication Name</Label>
                          <Input id="rx-medication" placeholder="e.g., Amoxicillin" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rx-dosage">Dosage</Label>
                          <Input id="rx-dosage" placeholder="e.g., 500mg" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="rx-frequency">Frequency</Label>
                          <Select>
                            <SelectTrigger id="rx-frequency">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="once">Once daily</SelectItem>
                              <SelectItem value="twice">Twice daily</SelectItem>
                              <SelectItem value="thrice">Three times daily</SelectItem>
                              <SelectItem value="four">Four times daily</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rx-duration">Duration</Label>
                          <Input id="rx-duration" placeholder="e.g., 7 days" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rx-instructions">Special Instructions</Label>
                        <Textarea
                          id="rx-instructions"
                          placeholder="Take with food, avoid alcohol, etc."
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rx-refills">Refills</Label>
                        <Select>
                          <SelectTrigger id="rx-refills">
                            <SelectValue placeholder="Number of refills" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">No refills</SelectItem>
                            <SelectItem value="1">1 refill</SelectItem>
                            <SelectItem value="2">2 refills</SelectItem>
                            <SelectItem value="3">3 refills</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setPrescriptionDialogOpen(false)}>Cancel</Button>
                      <Button onClick={() => {
                        setPrescriptionDialogOpen(false);
                        setMessageInput("I've sent your prescription. You can collect it from any pharmacy with your prescription ID.");
                      }}>Generate & Send</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="sm">
                  <TestTube className="w-4 h-4 mr-1" />
                  Order Lab Test
                </Button>
                
                <Button variant="outline" size="sm">
                  <Activity className="w-4 h-4 mr-1" />
                  Request Vitals
                </Button>
              </div>
            </div>
          </div>
          
          {isPatientInfoVisible && (
            <div className="md:col-span-3 lg:col-span-3 border-l flex flex-col h-full bg-slate-50/50">
              <div className="shrink-0 p-4 border-b bg-white">
                <h3 className="font-semibold text-lg">Patient Information</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-muted-foreground">BASIC INFO</h4>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Full Name</p>
                      <p className="font-medium">{selectedConversation.name}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-muted-foreground text-xs">Age</p>
                        <p className="font-medium">{selectedConversation.age} years</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Blood Group</p>
                        <p className="font-medium">{selectedConversation.bloodGroup}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Date of Birth</p>
                      <p className="font-medium">{selectedConversation.dob}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground">CONTACT</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="text-muted-foreground text-xs">Phone</p>
                        <p className="font-medium">{selectedConversation.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="text-muted-foreground text-xs">Email</p>
                        <p className="font-medium text-xs">{selectedConversation.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground">MEDICAL INFO</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Allergies</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedConversation.allergies.map((allergy, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Chronic Conditions</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedConversation.chronic.map((condition, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground">APPOINTMENTS</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Last Visit</p>
                      <p className="font-medium">{selectedConversation.lastVisit}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Next Appointment</p>
                      <p className="font-medium">{selectedConversation.appointment}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground">QUICK ACTIONS</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <FileText className="w-4 h-4 mr-1" />
                      Records
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <TestTube className="w-4 h-4 mr-1" />
                      Labs
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Pill className="w-4 h-4 mr-1" />
                      Rx History
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Heart className="w-4 h-4 mr-1" />
                      Vitals
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground">RECENT ACTIVITY</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2 p-2 bg-white rounded border">
                      <TestTube className="w-3 h-3 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">Blood Test Completed</p>
                        <p className="text-muted-foreground">Oct 15, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-white rounded border">
                      <Pill className="w-3 h-3 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">Prescription Refilled</p>
                        <p className="text-muted-foreground">Oct 10, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-white rounded border">
                      <Calendar className="w-3 h-3 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">Follow-up Scheduled</p>
                        <p className="text-muted-foreground">Oct 5, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Dialog open={isTemplateDialogOpen} onOpenChange={setTemplateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Templates</DialogTitle>
            <DialogDescription>
              Select a pre-written template to send to your patient
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            {messageTemplates.map((template) => (
              <div
                key={template.id}
                className="p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => insertTemplate(template)}
              >
                <p className="font-semibold text-sm">{template.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{template.text}</p>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTemplateDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
