'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Lenis from 'lenis';
import { DEV_MODE } from '@/config/constants';
import { MusicPlayer } from '@/components/MusicPlayer';
import Hero from '@/components/TSS/Hero';
import About from '@/components/TSS/About';
import Features from '@/components/TSS/Features';
import FloatingImage from '@/components/TSS/FloatingImage';
import Contact from '@/components/TSS/Contact';
import Footer from '@/components/TSS/Footer';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Home() {
  const targetDate = new Date('2025-01-01T00:00:00');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Handle mounting state
  useEffect(() => {
    setIsMounted(true);
    if (DEV_MODE) {
      setLoading(false);
    }
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (!loading && isMounted) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, [loading, isMounted]);

  // Handle countdown timer
  useEffect(() => {
    if (isMounted) {
      const calculateTimeLeft = () => {
        const difference = targetDate.getTime() - new Date().getTime();
        
        if (difference <= 0) {
          setLoading(false);
          return;
        }

        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(timer);
    }
  }, [isMounted]);

  // Don't render anything until client-side hydration is complete
  if (!isMounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl font-bold mb-8">Our Story Begins Soon</h1>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-3xl font-bold">{timeLeft.days}</div>
            <div className="text-sm">Days</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-3xl font-bold">{timeLeft.hours}</div>
            <div className="text-sm">Hours</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-3xl font-bold">{timeLeft.minutes}</div>
            <div className="text-sm">Minutes</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-3xl font-bold">{timeLeft.seconds}</div>
            <div className="text-sm">Seconds</div>
          </div>
        </div>
        <p className="mt-8 text-xl">
          Until {format(targetDate, 'MMMM do, yyyy')}
        </p>
      </div>
    );
  }

  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      {DEV_MODE && (
        <div className="fixed top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm z-50">
          Dev Mode
        </div>
      )}

      <MusicPlayer 
        audioSource="/audio/background-music.mp3"
        autoplay={true}
      />
      <Hero />
      <About />
      <Features />
      <FloatingImage />
      <Contact />
      <Footer />
    </main>
  );
}