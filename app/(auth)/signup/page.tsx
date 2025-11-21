"use client"; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Stethoscope } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // 1. Connect to Django Backend
      const res = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          user_type: 'doctor', // <--- CRITICAL: Logic to tell backend this is a Doctor
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // 2. Success
        alert("Account Created Successfully! Please Login.");
        router.push('/login');
      } else {
        // 3. Error (e.g., Email already exists)
        // data usually contains field errors like { email: ["User with this email already exists."] }
        const errorMessage = data.email ? data.email[0] : "Registration Failed";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Could not connect to server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* ... Background div ... */}
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" style={{backgroundSize: '40px 40px'}}></div>
      
      <div className="container z-10 flex justify-center px-4">
        <Card className="w-full max-w-md shadow-2xl border border-slate-200 bg-white/80 backdrop-blur-md">
          <CardHeader className="text-center space-y-4 pt-8">
            <Link href="/" className="font-medium text-xl text-slate-900 flex items-center justify-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                HealthCare Pro
              </span>
            </Link>
            <CardTitle className="text-3xl font-medium text-slate-900">Create Your Account</CardTitle>
            <CardDescription className="text-slate-600">Join the leading platform for modern medical practices.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 p-8">
            
            <form onSubmit={handleSignup} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="full-name" className="text-slate-700">Full Name</Label>
                <Input 
                  id="full-name" 
                  placeholder="Dr. John Doe" 
                  required 
                  className="bg-white/50"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)} 
                />
                {/* Note: We aren't sending Name to backend yet, just Email/Password for auth */}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-slate-700">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="dr.johndoe@example.com" 
                  required 
                  className="bg-white/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-slate-700">Create Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  className="bg-white/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 text-white text-base py-6"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
            
            {/* ... Rest of the UI (Social Login / Divider) ... */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full text-base py-6 border-slate-300">Sign up with Google</Button>
            <div className="mt-4 text-center text-sm">
              <span className="text-slate-600">Already have an account?</span>{" "}
              <Link href="/login" className="underline font-semibold text-blue-600 hover:text-blue-500">
                Log In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}