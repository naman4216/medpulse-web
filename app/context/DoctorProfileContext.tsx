// File: app/context/DoctorProfileContext.tsx
"use client";

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface DoctorProfile {
  name: string;
  qualification: string;
  registration: string;
  clinic: string;
  phone: string;
  email: string;
}

interface DoctorProfileContextType {
  doctorProfile: DoctorProfile;
  setDoctorProfile: (profile: DoctorProfile) => void;
  saveDoctorProfile: () => void;
}

const DoctorProfileContext = createContext<DoctorProfileContextType | undefined>(undefined);

const defaultDoctorProfile: DoctorProfile = {
  name: "Dr. Priya Sharma",
  qualification: "cardiologist",
  registration: "MH-123456",
  clinic: "Healthcare Pro Clinic",
  phone: "+91 98765 43200",
  email: "dr.priya.sharma@healthcarepro.com"
};

export function DoctorProfileProvider({ children }: { children: ReactNode }) {
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile>(defaultDoctorProfile);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('doctorProfile');
      if (raw) {
        setDoctorProfile(JSON.parse(raw));
      }
    } catch (e) {
      console.error("Failed to load doctor profile from localStorage", e);
    }
  }, []);

  const saveDoctorProfile = () => {
    try {
      localStorage.setItem('doctorProfile', JSON.stringify(doctorProfile));
      alert('Doctor profile saved');
    } catch (e) {
      console.error(e);
      alert('Failed to save profile');
    }
  };

  return (
    <DoctorProfileContext.Provider value={{ doctorProfile, setDoctorProfile, saveDoctorProfile }}>
      {children}
    </DoctorProfileContext.Provider>
  );
}

export function useDoctorProfile() {
  const context = useContext(DoctorProfileContext);
  if (context === undefined) {
    throw new Error('useDoctorProfile must be used within a DoctorProfileProvider');
  }
  return context;
}