'use client';

import HeroBackground from '@/components/landing/HeroBackground';
import HeroSection from '@/components/landing/HeroSection';
import Navbar from '@/components/landing/Navbar';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <HeroBackground />
      <Navbar />
      <HeroSection />
    </main>
  );
}