// components/GlitchText.tsx
'use client';

import { useEffect, useState, useRef } from 'react';

interface GlitchTextProps {
  text: string;
  onComplete?: () => void;
  className?: string;
}

export const GlitchText = ({ text, onComplete, className }: GlitchTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [glitchChar, setGlitchChar] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return; // Don't start animation until visible

    if (currentIndex === text.length) {
      onComplete?.();
      return;
    }

    // Typewriter effect
    const typeTimer = setTimeout(() => {
      setDisplayText(prev => prev + text[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }, 100);

    // Glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchChar(glitchChars[Math.floor(Math.random() * glitchChars.length)]);
    }, 50);

    return () => {
      clearTimeout(typeTimer);
      clearInterval(glitchInterval);
    };
  }, [currentIndex, text, onComplete, isVisible]);

  return (
    <div ref={containerRef} className={`relative font-mono ${className}`}>
      <span className="relative z-10">
        {displayText}
        {currentIndex < text.length && isVisible && (
          <span className="animate-glitch">{glitchChar}</span>
        )}
      </span>
    </div>
  );
};