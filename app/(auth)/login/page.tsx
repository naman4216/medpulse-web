
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Stethoscope } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // TODO: Uncomment API call later
    // try {
    //   const res = await fetch('http://127.0.0.1:8000/api/login/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email: email,        // UPDATED
    //       password: password,
    //     }),
    //   });

    //   const data = await res.json();

    //   if (res.ok) {
    //     // Save tokens
    //     localStorage.setItem('accessToken', data.access);
    //     localStorage.setItem('refreshToken', data.refresh);
    //     localStorage.setItem('userType', data.user_type);

    //     console.log("Login Successful:", data.user_type);

    //     // Redirect
    //     router.push('/dashboard');

    //   } else {
    //     alert("Login Failed: " + (data.detail || JSON.stringify(data)));
    //   }
    // } catch (error) {
    //   console.error("Network Error:", error);
    //   alert("Something went wrong connecting to the server.");
    // }

    // Temporary: Direct redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" style={{ backgroundSize: '40px 40px' }}></div>
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
            <CardTitle className="text-3xl font-medium text-slate-900">Welcome Back, Doctor</CardTitle>
            <CardDescription className="text-slate-600">Enter your credentials to access your dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 p-8">
            <form onSubmit={handleLogin} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-slate-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="dr.smith@example.com"
                  required
                  className="bg-white/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-white/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <Link href="#" className="ml-auto inline-block text-sm underline text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 text-white text-base py-6">
                Log In
              </Button>
            </form>

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
            <Button variant="outline" className="w-full text-base py-6 border-slate-300">Sign in with Google</Button>
            <div className="mt-4 text-center text-sm">
              <span className="text-slate-600">Don't have an account?</span>{" "}
              <Link href="/signup" className="underline font-semibold text-blue-600 hover:text-blue-500">
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}