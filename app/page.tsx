import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowRight, CheckCircle, Video, Calendar, Users, Shield, Clock, TrendingUp,
  Zap, FileText, BarChart3, Heart, BrainCircuit, MessageSquare, Briefcase,
  PlayCircle, Hospital, HeartPulse, Stethoscope, Lock, Globe, Smartphone,
  Bell, CreditCard, UserCheck, Database, Cloud, Layers, Award, Target,
  TrendingDown, DollarSign, Activity, PhoneCall, Mail, MapPin, Star,
  ChevronRight, Download, FileCheck, Clipboard, Pill, Microscope
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background w-full">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsBar />
        <TrustedBySection />
        <FeaturesSection />
        <ComprehensiveFeaturesGrid />
        <ROISection />
        <HowItWorksSection />
        <SecuritySection />
        <IntegrationsSection />
        <TestimonialsSection />
        <CaseStudySection />
        <PricingSection />
        <ComparisonSection />
        <FAQSection />
        <InvestorSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}

const Header = () => (
  <header className="w-full px-4 lg:px-6 h-20 flex items-center bg-background/95 shadow-sm border-b sticky top-0 z-50 backdrop-blur-lg">
    <div className="container mx-auto flex items-center">
      <div className="font-medium text-xl text-foreground flex items-center gap-2 cursor-pointer">
        <div className="bg-primary p-2 rounded-lg">
          <Heart className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="font-mediumtracking-tight">HealthCare Pro</span>
      </div>
      <nav className="ml-auto hidden lg:flex items-center gap-1">
        <Button variant="ghost" className="hover:text-primary">Features</Button>
        <Button variant="ghost" className="hover:text-primary">Security</Button>
        <Button variant="ghost" className="hover:text-primary">Pricing</Button>
        <Button variant="ghost" className="hover:text-primary">Testimonials</Button>
        <Button variant="ghost" className="hover:text-primary">Investors</Button>
      </nav>
      <div className="ml-auto lg:ml-4 flex items-center gap-2">
        <Button variant="outline" className="hidden sm:inline-flex">Log In</Button>
        <Button className="bg-primary hover:bg-primary/90">
          Get Started Free
        </Button>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="relative w-full py-20 md:py-15 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -z-10"></div>
    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

    <div className="container relative px-4 md:px-6 mx-auto max-w-7xl">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
            <Zap className="h-4 w-4" />
            AI-Powered Practice Management
          </div>
          <h1 className="text-4xl font-medium tracking-tighter sm:text-5xl xl:text-6xl/tight text-foreground">
            Focus On Your Patients,
            <br />
            <span className="text-primary">
              Not The Paperwork.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto lg:mx-0">
            Streamline operations, enhance patient care, and grow your revenue with India's most advanced healthcare platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 shadow-lg">
              Start 14-Day Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <PlayCircle className="mr-2 h-5 w-5" /> Watch Demo
            </Button>
          </div>
          <div className="flex items-center gap-6 pt-4 justify-center lg:justify-start text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <Card className="shadow-2xl rounded-2xl border-2 border-primary/20 overflow-hidden">
            <div className="h-10 bg-secondary/80 flex items-center px-4 gap-2">
              <div className="h-3 w-3 bg-red-500 rounded-full"></div>
              <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
            <CardContent className="p-6 bg-gradient-to-br from-background to-secondary/30">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border-l-4 border-primary">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Dr. Rohan Sharma</p>
                      <p className="text-sm text-muted-foreground">Video Consultation - 10:30 AM</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-primary">Join</Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-xs font-semibold text-green-700">Revenue</span>
                    </div>
                    <p className="text-2xl font-medium text-green-900">↑ 34%</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-700">Patients</span>
                    </div>
                    <p className="text-2xl font-medium text-blue-900">1,247</p>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">AI Insights</p>
                      <p className="text-xs text-muted-foreground">Patient satisfaction up 28% this month</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 border-2 border-primary/20">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold">HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StatsBar = () => (
  <section className="w-full py-12 bg-primary text-primary-foreground">
    <div className="container mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <p className="text-4xl font-medium mb-2">10,000+</p>
          <p className="text-sm opacity-90">Active Doctors</p>
        </div>
        <div>
          <p className="text-4xl font-medium mb-2">2M+</p>
          <p className="text-sm opacity-90">Patients Served</p>
        </div>
        <div>
          <p className="text-4xl font-medium mb-2">98%</p>
          <p className="text-sm opacity-90">Satisfaction Rate</p>
        </div>
        <div>
          <p className="text-4xl font-medium mb-2">40%</p>
          <p className="text-sm opacity-90">Time Saved</p>
        </div>
      </div>
    </div>
  </section>
);

const TrustedBySection = () => {
  const logos = [
    { name: 'Apollo Hospitals', icon: Hospital },
    { name: 'Fortis Healthcare', icon: HeartPulse },
    { name: 'Max Healthcare', icon: Stethoscope },
    { name: 'Manipal Hospitals', icon: Hospital },
    { name: 'Narayana Health', icon: Stethoscope },
    { name: 'AIIMS', icon: HeartPulse },
  ];

  return (
    <section className="w-full py-16 bg-secondary/30">
      <div className="container mx-auto max-w-7xl px-4">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-10 text-center">
          Trusted by Leading Healthcare Providers Across India
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {logos.map((logo, index) => {
            const IconComponent = logo.icon;
            return (
              <div key={index} className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                <IconComponent className="h-8 w-8" />
                <span className="text-xs font-medium text-center">{logo.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => (
  <section className="w-full py-20 bg-background">
    <div className="container px-4 mx-auto max-w-7xl">
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
          Core Features
        </div>
        <h2 className="text-4xl font-medium mb-4">Everything You Need in One Platform</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Powerful tools designed specifically for modern medical practices
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={<BrainCircuit className="h-8 w-8" />}
          title="AI-Powered Scheduling"
          description="Smart algorithms optimize your calendar, prevent double-bookings, and send automated reminders to reduce no-shows by 60%."
        />
        <FeatureCard
          icon={<Video className="h-8 w-8" />}
          title="HD Telemedicine"
          description="HIPAA-compliant video consultations with screen sharing, digital prescriptions, and integrated payment processing."
        />
        <FeatureCard
          icon={<FileText className="h-8 w-8" />}
          title="Electronic Medical Records"
          description="Complete patient history at your fingertips with voice-to-text notes, lab integration, and smart templates."
        />
        <FeatureCard
          icon={<BarChart3 className="h-8 w-8" />}
          title="Advanced Analytics"
          description="Real-time insights into revenue, patient demographics, appointment trends, and practice performance metrics."
        />
        <FeatureCard
          icon={<MessageSquare className="h-8 w-8" />}
          title="Patient Communication"
          description="Automated SMS/email reminders, follow-up messages, and a secure patient portal for 24/7 access."
        />
        <FeatureCard
          icon={<CreditCard className="h-8 w-8" />}
          title="Integrated Billing"
          description="Accept payments online, generate invoices instantly, and track revenue with automated financial reporting."
        />
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, description }) => (
  <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
    <CardHeader>
      <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const ComprehensiveFeaturesGrid = () => {
  const features = [
    { icon: Smartphone, title: "Mobile App", desc: "iOS & Android apps for on-the-go access" },
    { icon: Bell, title: "Smart Notifications", desc: "Real-time alerts for appointments & emergencies" },
    { icon: Lock, title: "Data Encryption", desc: "Bank-grade security for all patient data" },
    { icon: Cloud, title: "Cloud Backup", desc: "Automatic backups with 99.9% uptime" },
    { icon: Globe, title: "Multi-language", desc: "Support for 15+ Indian languages" },
    { icon: UserCheck, title: "Staff Management", desc: "Role-based access for your entire team" },
    { icon: Pill, title: "E-Prescription", desc: "Digital prescriptions with drug database" },
    { icon: Microscope, title: "Lab Integration", desc: "Direct integration with diagnostic labs" },
  ];

  return (
    <section className="w-full py-20 bg-secondary/30">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium mb-4">Comprehensive Feature Set</h2>
          <p className="text-lg text-muted-foreground">Built for efficiency, designed for growth</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div key={idx} className="bg-background p-6 rounded-xl border hover:border-primary/50 transition-all">
                <IconComponent className="h-8 w-8 text-primary mb-3" />
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ROISection = () => (
  <section className="w-full py-20 bg-gradient-to-br from-primary/5 to-purple-50">
    <div className="container px-4 mx-auto max-w-7xl">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
            Proven ROI
          </div>
          <h2 className="text-4xl font-medium mb-6">See Real Results in 30 Days</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our customers report significant improvements across all key metrics within the first month.
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">40% More Patients</h4>
                <p className="text-muted-foreground">Increase appointment capacity with optimized scheduling</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">5 Hours Saved Daily</h4>
                <p className="text-muted-foreground">Automate administrative tasks and focus on care</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">35% Revenue Growth</h4>
                <p className="text-muted-foreground">Better utilization and reduced no-shows</p>
              </div>
            </div>
          </div>
        </div>
        <Card className="p-8 border-2 shadow-xl">
          <h3 className="text-2xl font-medium mb-6 text-center">ROI Calculator</h3>
          <div className="space-y-4">
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Current Monthly Patients</p>
              <p className="text-3xl font-medium">200</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary">
              <p className="text-sm text-primary font-semibold mb-1">After HealthCare Pro</p>
              <p className="text-3xl font-medium text-primary">280</p>
            </div>
            <div className="border-t-2 border-dashed pt-4">
              <p className="text-sm text-muted-foreground mb-2">Additional Monthly Revenue</p>
              <p className="text-4xl font-medium text-green-600">₹1,20,000</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm font-semibold text-green-800">ROI in 3 months: <span className="text-2xl">480%</span></p>
            </div>
          </div>
          <Button className="w-full mt-6 bg-primary">Calculate Your ROI</Button>
        </Card>
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section className="w-full py-20 bg-background">
    <div className="container px-4 mx-auto max-w-7xl">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-medium mb-4">Get Started in Minutes</h2>
        <p className="text-xl text-muted-foreground">Simple onboarding, powerful results</p>
      </div>
      <div className="grid md:grid-cols-4 gap-8">
        {[
          { num: "1", title: "Sign Up", desc: "Create your account in under 2 minutes", icon: UserCheck },
          { num: "2", title: "Customize", desc: "Set up your practice profile and preferences", icon: Layers },
          { num: "3", title: "Import Data", desc: "Easily migrate your existing patient records", icon: Database },
          { num: "4", title: "Go Live", desc: "Start seeing patients immediately", icon: Zap },
        ].map((step, idx) => {
          const IconComponent = step.icon;
          return (
            <div key={idx} className="relative text-center">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-medium shadow-lg">
                {step.num}
              </div>
              <IconComponent className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
              <p className="text-muted-foreground">{step.desc}</p>
              {idx < 3 && (
                <ChevronRight className="hidden md:block absolute top-8 -right-4 h-6 w-6 text-muted-foreground" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const SecuritySection = () => (
  <section className="w-full py-20 bg-secondary/30">
    <div className="container px-4 mx-auto max-w-7xl">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
            <Shield className="h-4 w-4" />
            Enterprise-Grade Security
          </div>
          <h2 className="text-4xl font-medium mb-6">Your Data is Always Protected</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We take security seriously with multiple layers of protection to keep your practice and patient data safe.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background p-4 rounded-lg border-2 border-primary/20">
              <Lock className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-semibold mb-1">256-bit Encryption</h4>
              <p className="text-sm text-muted-foreground">Bank-grade data protection</p>
            </div>
            <div className="bg-background p-4 rounded-lg border-2 border-primary/20">
              <Shield className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-semibold mb-1">HIPAA Compliant</h4>
              <p className="text-sm text-muted-foreground">Full regulatory compliance</p>
            </div>
            <div className="bg-background p-4 rounded-lg border-2 border-primary/20">
              <Database className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-semibold mb-1">Daily Backups</h4>
              <p className="text-sm text-muted-foreground">Never lose your data</p>
            </div>
            <div className="bg-background p-4 rounded-lg border-2 border-primary/20">
              <Award className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-semibold mb-1">ISO 27001</h4>
              <p className="text-sm text-muted-foreground">International standards</p>
            </div>
          </div>
        </div>
        <div className="bg-background p-8 rounded-2xl border-2 border-primary/20 shadow-lg">
          <h3 className="text-2xl font-medium mb-6">Security Certifications</h3>
          <div className="space-y-4">
            {[
              "HIPAA Compliant Healthcare Platform",
              "ISO 27001 Information Security",
              "SOC 2 Type II Certified",
              "GDPR Compliant Data Processing",
              "Regular Third-Party Security Audits",
              "24/7 Security Monitoring"
            ].map((cert, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const IntegrationsSection = () => (
  <section className="w-full py-20 bg-secondary/30">
    <div className="container px-4 mx-auto max-w-7xl text-center">
      <h2 className="text-4xl font-medium mb-4">Seamless Integrations</h2>
      <p className="text-xl text-muted-foreground mb-12">Connect with the tools you already use</p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {[
          "Google Calendar", "WhatsApp", "Razorpay", "PhonePe",
          "Practo", "1mg", "PathLabs", "Dr. Lal PathLabs",
          "Thyrocare", "Paytm", "UPI", "Zoho"
        ].map((integration, idx) => (
          <div key={idx} className="bg-background p-6 rounded-xl border hover:border-primary/50 transition-all hover:shadow-md">
            <p className="font-semibold">{integration}</p>
          </div>
        ))}
      </div>
      <Button variant="outline" size="lg" className="mt-8">
        View All Integrations <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="w-full py-20 bg-background">
    <div className="container px-4 mx-auto max-w-7xl">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-medium mb-4">Loved by Thousands of Doctors</h2>
        <p className="text-xl text-muted-foreground">See what healthcare professionals say about us</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            quote: "HealthCare Pro transformed my practice completely. I now see 40% more patients and spend less time on paperwork. The ROI was incredible!",
            author: "Dr. Priya Sharma",
            role: "General Physician, Mumbai",
            rating: 5
          },
          {
            quote: "The telemedicine feature is a game-changer. My elderly patients love the convenience, and I can reach patients across the city effortlessly.",
            author: "Dr. Rajesh Kumar",
            role: "Cardiologist, Delhi",
            rating: 5
          },
          {
            quote: "Best investment for my clinic. The analytics help me make data-driven decisions, and the automated billing saved us countless hours.",
            author: "Dr. Anjali Mehta",
            role: "Dermatologist, Bangalore",
            rating: 5
          }
        ].map((testimonial, idx) => (
          <Card key={idx} className="border-2">
            <CardContent className="p-6">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const CaseStudySection = () => (
  <section className="w-full py-20 bg-secondary/30">
    <div className="container px-4 mx-auto max-w-7xl">
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
          Success Story
        </div>
        <h2 className="text-4xl font-medium mb-4">Real Results from Real Doctors</h2>
        <p className="text-xl text-muted-foreground">See how HealthCare Pro transformed a practice in just 8 months</p>
      </div>
      
      <Card className="border-2 shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-12 flex flex-col justify-center border-r-2 border-primary/20">
            <h3 className="text-3xl font-medium mb-4 text-foreground">Dr. Mehta's Clinic, Pune</h3>
            <p className="text-lg text-muted-foreground mb-8">
              A mid-sized clinic transformed their operations and tripled their patient base in just 8 months using HealthCare Pro.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="border-l-4 border-primary pl-4">
                <p className="text-4xl font-medium text-primary mb-2">150%</p>
                <p className="text-muted-foreground font-semibold">Patient Growth</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-4xl font-medium text-green-600 mb-2">₹96L</p>
                <p className="text-muted-foreground font-semibold">Additional Annual Revenue</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-4xl font-medium text-blue-600 mb-2">8 Months</p>
                <p className="text-muted-foreground font-semibold">Time to Achieve Results</p>
              </div>
            </div>
            
            <Button size="lg" className="w-fit bg-primary">
              Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="bg-background p-12">
            <h3 className="text-2xl font-medium mb-6">Key Improvements</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">65% Reduced Wait Times</p>
                  <p className="text-sm text-muted-foreground">Optimized scheduling eliminated bottlenecks</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">₹8L Additional Monthly Revenue</p>
                  <p className="text-sm text-muted-foreground">More appointments and better utilization</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">Zero No-Shows</p>
                  <p className="text-sm text-muted-foreground">Automated reminders kept patients on track</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <Star className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">4.9/5 Patient Satisfaction</p>
                  <p className="text-sm text-muted-foreground">Patients love the seamless experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </section>
);

const PricingSection = () => (
  <section className="w-full py-20 bg-background">
    <div className="container px-4 mx-auto max-w-7xl">
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
          Simple, Transparent Pricing
        </div>
        <h2 className="text-4xl font-medium mb-4">Choose Your Perfect Plan</h2>
        <p className="text-xl text-muted-foreground">All plans include 14-day free trial • No credit card required</p>
      </div>

      <Tabs defaultValue="monthly" className="max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 max-w-xs mx-auto mb-12">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly">
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              name="Starter"
              price="₹999"
              period="/month"
              description="Perfect for solo practitioners"
              features={[
                "Up to 50 appointments/month",
                "Video consultations",
                "Basic EMR",
                "Patient portal",
                "Email support",
                "Mobile app access"
              ]}
              buttonText="Start Free Trial"
            />
            <PricingCard
              name="Professional"
              price="₹2,499"
              period="/month"
              description="Most popular for growing practices"
              features={[
                "Unlimited appointments",
                "HD video + screen sharing",
                "Advanced EMR with templates",
                "AI-powered scheduling",
                "Analytics dashboard",
                "Digital prescriptions",
                "Priority support",
                "API access"
              ]}
              buttonText="Start Free Trial"
              highlighted={true}
            />
            <PricingCard
              name="Enterprise"
              price="₹4,999"
              period="/month"
              description="For multi-doctor clinics"
              features={[
                "Everything in Professional",
                "Up to 5 doctors",
                "Team collaboration tools",
                "Custom branding",
                "Advanced analytics",
                "Dedicated account manager",
                "Custom integrations",
                "On-site training"
              ]}
              buttonText="Contact Sales"
            />
          </div>
        </TabsContent>

        <TabsContent value="yearly">
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              name="Starter"
              price="₹9,590"
              period="/year"
              description="Perfect for solo practitioners"
              features={[
                "Up to 50 appointments/month",
                "Video consultations",
                "Basic EMR",
                "Patient portal",
                "Email support",
                "Mobile app access"
              ]}
              buttonText="Start Free Trial"
              savings="Save ₹2,398"
            />
            <PricingCard
              name="Professional"
              price="₹23,990"
              period="/year"
              description="Most popular for growing practices"
              features={[
                "Unlimited appointments",
                "HD video + screen sharing",
                "Advanced EMR with templates",
                "AI-powered scheduling",
                "Analytics dashboard",
                "Digital prescriptions",
                "Priority support",
                "API access"
              ]}
              buttonText="Start Free Trial"
              highlighted={true}
              savings="Save ₹5,998"
            />
            <PricingCard
              name="Enterprise"
              price="₹47,990"
              period="/year"
              description="For multi-doctor clinics"
              features={[
                "Everything in Professional",
                "Up to 5 doctors",
                "Team collaboration tools",
                "Custom branding",
                "Advanced analytics",
                "Dedicated account manager",
                "Custom integrations",
                "On-site training"
              ]}
              buttonText="Contact Sales"
              savings="Save ₹11,898"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">Need a custom plan for your hospital or network?</p>
        <Button variant="outline" size="lg">Contact Enterprise Sales</Button>
      </div>
    </div>
  </section>
);

const PricingCard = ({ name, price, period, description, features, buttonText, highlighted = false, savings }) => (
  <Card className={`relative ${highlighted ? 'border-2 border-primary shadow-2xl scale-105' : 'border'}`}>
    {highlighted && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
        Most Popular
      </div>
    )}
    {savings && (
      <div className="absolute -top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
        {savings}
      </div>
    )}
    <CardContent className="p-8">
      <h3 className="text-2xl font-medium mb-2">{name}</h3>
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
      <div className="mb-6">
        <span className="text-5xl font-medium">{price}</span>
        <span className="text-muted-foreground">{period}</span>
      </div>
      <Button
        size="lg"
        className={`w-full mb-8 ${highlighted ? 'bg-primary' : ''}`}
      >
        {buttonText}
      </Button>
      <ul className="space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const ComparisonSection = () => (
  <section className="w-full py-20 bg-secondary/30">
    <div className="container px-4 mx-auto max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-medium mb-4">Why Choose HealthCare Pro?</h2>
        <p className="text-xl text-muted-foreground">See how we compare to traditional practice management</p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-3 gap-4 mb-4 font-semibold text-center">
          <div></div>
          <div className="p-4 bg-muted rounded-t-lg">Traditional Methods</div>
          <div className="p-4 bg-primary text-primary-foreground rounded-t-lg">HealthCare Pro</div>
        </div>

        {[
          { feature: "Appointment Scheduling", traditional: "Manual, prone to errors", modern: "AI-powered automation" },
          { feature: "Patient Records", traditional: "Paper-based or basic digital", modern: "Comprehensive cloud EMR" },
          { feature: "Video Consultations", traditional: "Not available", modern: "HD HIPAA-compliant video" },
          { feature: "Payment Processing", traditional: "Cash/manual entry", modern: "Integrated online payments" },
          { feature: "Analytics", traditional: "Manual spreadsheets", modern: "Real-time dashboards" },
          { feature: "Support", traditional: "Limited availability", modern: "24/7 priority support" },
        ].map((row, idx) => (
          <div key={idx} className="grid grid-cols-3 gap-4 border-b py-4">
            <div className="font-medium">{row.feature}</div>
            <div className="text-center text-muted-foreground">{row.traditional}</div>
            <div className="text-center text-primary font-semibold">{row.modern}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQSection = () => (
  <section className="w-full py-20 bg-background">
    <div className="container px-4 mx-auto max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-medium mb-4">Frequently Asked Questions</h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left">Is my patient data secure and HIPAA compliant?</AccordionTrigger>
          <AccordionContent>
            Absolutely. We use bank-grade 256-bit encryption for all data. Our platform is fully HIPAA compliant and undergoes regular third-party security audits. All data is stored in secure data centers with daily backups and 99.9% uptime guarantee.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-left">How does the 14-day free trial work?</AccordionTrigger>
          <AccordionContent>
            Sign up without any credit card and get full access to all Professional plan features for 14 days. You can cancel anytime with no obligations. After the trial, choose a plan that works for you or continue using our free tier with limited features.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-left">Can I import my existing patient data?</AccordionTrigger>
          <AccordionContent>
            Yes! We provide free data migration support for all paid plans. Our team will help you securely import patient records, appointment history, and other data from your existing system. The process typically takes 2-3 business days.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-left">Do you offer training and onboarding support?</AccordionTrigger>
          <AccordionContent>
            Yes! All plans include comprehensive onboarding with video tutorials and documentation. Professional plans get priority email support, and Enterprise plans receive dedicated account management with personalized on-site training sessions.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-left">What happens if I need to cancel my subscription?</AccordionTrigger>
          <AccordionContent>
            You can cancel anytime with no penalties. Your data remains accessible for 90 days after cancellation, and you can export all your patient records before the account closes. We also offer a 30-day money-back guarantee on annual plans.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className="text-left">Is there a mobile app for doctors and patients?</AccordionTrigger>
          <AccordionContent>
            Yes! We offer native iOS and Android apps for both doctors and patients. Doctors can manage appointments, conduct video consultations, and access patient records on-the-go. Patients can book appointments, join video calls, and view their health records from their phones.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </section>
);

const InvestorSection = () => (
  <section className="w-full py-20 bg-background">
    <div className="container px-4 mx-auto max-w-7xl">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
          <Briefcase className="h-4 w-4" />
          For Investors
        </div>
        <h2 className="text-4xl font-medium mb-4">Disrupting India's $200B Healthcare Market</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're building the future of healthcare practice management with proven traction and explosive growth
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Market Opportunity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center border-b border-primary/20 pb-3">
              <span>Total Addressable Market (TAM)</span>
              <span className="text-2xl font-medium text-primary">$8.2B</span>
            </div>
            <div className="flex justify-between items-center border-b border-primary/20 pb-3">
              <span>Registered Doctors in India</span>
              <span className="text-2xl font-medium text-primary">1.3M+</span>
            </div>
            <div className="flex justify-between items-center border-b border-primary/20 pb-3">
              <span>Digital Adoption Rate</span>
              <span className="text-2xl font-medium text-primary">23%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Market Growth (CAGR)</span>
              <span className="text-2xl font-medium text-primary">32%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-2xl">Our Traction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center border-b border-green-200 pb-3">
              <span>Monthly Recurring Revenue</span>
              <span className="text-2xl font-medium text-green-700">₹2.4Cr</span>
            </div>
            <div className="flex justify-between items-center border-b border-green-200 pb-3">
              <span>Active Paying Customers</span>
              <span className="text-2xl font-medium text-green-700">10,000+</span>
            </div>
            <div className="flex justify-between items-center border-b border-green-200 pb-3">
              <span>Month-over-Month Growth</span>
              <span className="text-2xl font-medium text-green-700">18%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Customer Retention Rate</span>
              <span className="text-2xl font-medium text-green-700">94%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {[
          { icon: Target, title: "Mission", desc: "Digitize 100K practices by 2026" },
          { icon: TrendingUp, title: "Growth", desc: "3x revenue growth YoY" },
          { icon: Award, title: "Recognition", desc: "Featured in Forbes 30 Under 30" },
          { icon: Users, title: "Team", desc: "45+ healthcare & tech experts" },
        ].map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div key={idx} className="bg-secondary/50 p-6 rounded-xl border-2 border-primary/20 hover:border-primary/50 transition-all">
              <IconComponent className="h-10 w-10 mb-4 text-primary" />
              <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <Button size="lg" className="text-lg px-8 py-6 bg-primary">
          Download Investor Deck <Download className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  </section>
);

const FinalCTASection = () => (
  <section className="w-full py-24 bg-[#f9fafb] relative overflow-hidden">
    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    <div className="container relative px-4 mx-auto max-w-5xl text-center">
      <h2 className="text-5xl font-medium mb-6">Ready to Transform Your Practice?</h2>
      <p className="text-2xl mb-8 text-muted-foreground">
        Join 10,000+ doctors delivering exceptional patient care with less administrative burden
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Button size="lg" className="text-lg px-10 py-7 bg-primary shadow-lg">
          Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2">
          Schedule a Demo <Calendar className="ml-2 h-5 w-5" />
        </Button>
      </div>
      <div className="flex items-center justify-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span>14-day free trial</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span>No credit card required</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span>Cancel anytime</span>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-secondary/50 border-t">
    <div className="container px-4 mx-auto max-w-7xl py-16">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-primary p-2 rounded-lg">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-medium text-xl">HealthCare Pro</span>
          </div>
          <p className="text-muted-foreground mb-6">
            Empowering healthcare professionals with cutting-edge technology to deliver exceptional patient care.
          </p>
          <div className="flex gap-4 text-muted-foreground">
            <PhoneCall className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
            <Mail className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
            <MapPin className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-4">Product</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li className="hover:text-primary cursor-pointer transition-colors">Features</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Pricing</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Security</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Integrations</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-4">Company</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li className="hover:text-primary cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Careers</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Investors</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-4">Resources</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li className="hover:text-primary cursor-pointer transition-colors">Blog</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Help Center</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Case Studies</li>
            <li className="hover:text-primary cursor-pointer transition-colors">API Docs</li>
          </ul>
        </div>
      </div>

      <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">© 2024 HealthCare Pro. All rights reserved.</p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Cookie Policy</span>
        </div>
      </div>
    </div>
  </footer>
)