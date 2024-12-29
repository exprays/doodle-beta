import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GlitchText } from '@/components/GlitchText';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { BorderBeam } from './BorderBeam';

interface VideoSectionProps {
  videoUrl: string;
  text: string;
  onComplete?: () => void;
}

export const VideoSection = ({ videoUrl, text, onComplete }: VideoSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldStartTyping, setShouldStartTyping] = useState(false);
  const [textComplete, setTextComplete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start video after initial animation
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.play();
              setIsPlaying(true);
            }
            // Start text animation after video starts
            setTimeout(() => {
              setShouldStartTyping(true);
            }, 500);
          }, 800);
        } else {
          // Pause video and reset states when out of view
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
          setShouldStartTyping(false);
          setTextComplete(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      // Reset text animation when video is reset
      setShouldStartTyping(false);
      setTextComplete(false);
      setTimeout(() => {
        setShouldStartTyping(true);
      }, 500);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative bg-transparent overflow-hidden"
    >
      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8 items-center p-4"
        >
          {/* Video Container */}
          <div className="relative w-full aspect-video">
          <BorderBeam duration={12} size={250} delay={9}/>
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/40 z-10" />
            
            {/* Mobile Text Overlay */}
            <div className="md:hidden absolute inset-0 z-20 flex items-center justify-center p-6 bg-black/60">
              {shouldStartTyping && (
                <div className="w-full">
                  <GlitchText
                    text={text}
                    onComplete={() => {
                      setTextComplete(true);
                      onComplete?.();
                    }}
                  />
                </div>
              )}
            </div>

            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1 }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover rounded-xl"
                loop
                muted
                playsInline
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>

            {/* Video Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute bottom-4 left-4 z-30 flex space-x-4"
            >
              <button
                onClick={handlePlayPause}
                className="p-2 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </button>
              <button
                onClick={handleReset}
                className="p-2 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-all"
              >
                <RotateCcw className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </div>

          {/* Desktop Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block text-white space-y-6"
          >
            <div className="prose prose-lg prose-invert">
              {shouldStartTyping && (
                <GlitchText
                  text={text}
                  onComplete={() => {
                    setTextComplete(true);
                    onComplete?.();
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
                  Continue Watching
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;