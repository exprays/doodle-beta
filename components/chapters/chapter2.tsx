import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { GlitchText } from '@/components/GlitchText';

interface ChapterTwoProps {
  onComplete: () => void;
}

export const ChapterTwo = ({ onComplete }: ChapterTwoProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [textComplete, setTextComplete] = useState(false);
  const [shouldStartTyping, setShouldStartTyping] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Add a small delay before starting the text animation
          setTimeout(() => {
            setShouldStartTyping(true);
          }, 800); // Delay matches the initial animation duration
        } else {
          // Reset the typing state when section is out of view
          setShouldStartTyping(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative bg-transparent"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-transparent z-0" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Left side - Visual element */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[60vh] md:h-[80vh] bg-zinc-900/20 rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-zinc-800/50 blur-xl opacity-30 animate-pulse" />
            </div>
          </motion.div>

          {/* Right side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white space-y-6"
          >
            <div className="prose prose-lg prose-invert">
              {shouldStartTyping && (
                <GlitchText
                  text="As dawn broke over the horizon, the world began to shift. The familiar landscapes morphed into something new, something we had never seen before. Each step forward revealed another layer of mystery, another piece of the puzzle we were destined to solve. The air crackled with possibility, and we knew there was no turning back."
                  onComplete={() => {
                    setTextComplete(true);
                    onComplete();
                  }}
                />
              )}
            </div>

            {textComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="pt-6"
              >
                <div className="inline-block px-6 py-3 border border-zinc-800 hover:border-zinc-700 rounded-full text-sm font-medium transform hover:scale-105 transition-all cursor-pointer bg-black/50 backdrop-blur-sm">
                  Continue the Journey
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};