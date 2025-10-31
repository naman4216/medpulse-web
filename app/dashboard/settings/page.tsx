// File: app/dashboard/settings/page.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Bell, CreditCard, Download, KeyRound, User, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-medium tracking-tight">Settings</h1>
        <p className="text-muted-foreground pt-1">
          Manage your account, preferences, and billing information.
        </p>
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile"><User className="w-4 h-4 mr-2" />Profile</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="w-4 h-4 mr-2" />Notifications</TabsTrigger>
          <TabsTrigger value="billing"><CreditCard className="w-4 h-4 mr-2" />Billing</TabsTrigger>
          <TabsTrigger value="security"><Shield className="w-4 h-4 mr-2" />Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>Update your personal and professional information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Dr. Sharma" />
                  <AvatarFallback>DS</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Label htmlFor="picture">Profile Picture</Label>
                  <Input id="picture" type="file" className="max-w-xs" />
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Dr. Priya Sharma" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="dr.priya.sharma@healthcarepro.com" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Select defaultValue="cardiologist">
                    <SelectTrigger id="specialization">
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiologist">Cardiologist</SelectItem>
                      <SelectItem value="dermatologist">Dermatologist</SelectItem>
                      <SelectItem value="general-physician">General Physician</SelectItem>
                      <SelectItem value="pediatrician">Pediatrician</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">Medical License Number</Label>
                  <Input id="license" defaultValue="MH-123456" />
                </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea id="bio" rows={4} defaultValue="Experienced Cardiologist with over 15 years in private practice. Committed to providing excellent patient care through modern technology." />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="pt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications from HealthCare Pro.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-3">Appointment Reminders</h4>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="appointment-reminders">Send me reminders for upcoming appointments</Label>
                            <Switch id="appointment-reminders" defaultChecked />
                        </div>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-3">Patient Messages</h4>
                         <div className="flex items-center justify-between">
                            <Label htmlFor="patient-messages">Notify me about new messages from patients</Label>
                            <Switch id="patient-messages" defaultChecked />
                        </div>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-3">Weekly Summary</h4>
                         <div className="flex items-center justify-between">
                            <Label htmlFor="weekly-summary">Email me a weekly summary of my practice activity</Label>
                            <Switch id="weekly-summary" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
            </Card>
        </TabsContent>

        <TabsContent value="billing" className="pt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Billing & Subscription</CardTitle>
                    <CardDescription>Manage your subscription and view payment history.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="p-4 border rounded-lg bg-slate-50">
                        <h4 className="font-semibold mb-2">Current Plan</h4>
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-2xl font-medium text-slate-800">Professional Plan</p>
                                <p className="text-muted-foreground">Renews on November 30, 2025.</p>
                            </div>
                            <Button variant="outline">Upgrade Plan</Button>
                        </div>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Payment Method</h4>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <CreditCard className="w-8 h-8 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">Visa ending in 4242</p>
                                    <p className="text-sm text-muted-foreground">Expires 12/2028</p>
                                </div>
                            </div>
                            <Button variant="outline">Update</Button>
                        </div>
                    </div>
                    <div>
                         <h4 className="font-semibold mb-2">Billing History</h4>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-center">Invoice</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Oct 30, 2025</TableCell>
                                    <TableCell>Professional Plan Subscription</TableCell>
                                    <TableCell className="text-right">₹2,499.00</TableCell>
                                    <TableCell className="text-center">
                                        <Button variant="ghost" size="icon"><Download className="w-4 h-4" /></Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Sep 30, 2025</TableCell>
                                    <TableCell>Professional Plan Subscription</TableCell>
                                    <TableCell className="text-right">₹2,499.00</TableCell>
                                     <TableCell className="text-center">
                                        <Button variant="ghost" size="icon"><Download className="w-4 h-4" /></Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
                 <CardFooter className="flex justify-end">
                  <Button variant="destructive">Cancel Subscription</Button>
                </CardFooter>
            </Card>
        </TabsContent>

        <TabsContent value="security" className="pt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your password and account security.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="p-4 border rounded-lg space-y-4">
                        <h4 className="font-semibold">Change Password</h4>
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                         <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                         <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Two-Factor Authentication (2FA)</h4>
                        <div className="flex items-center justify-between">
                            <div>
                               <p className="text-muted-foreground text-sm">Add an extra layer of security to your account.</p>
                            </div>
                            <Button variant="outline">Enable 2FA</Button>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Update Security Settings</Button>
                </CardFooter>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}