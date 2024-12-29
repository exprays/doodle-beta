import { useState, useRef, MouseEvent } from "react";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { StoryContent } from "@/types/types";
import { AIChat } from "./AiChat";

interface BentoCardProps {
  storyContent: StoryContent;
}

export const BentoCard: React.FC<BentoCardProps> = ({ storyContent }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const hoverButtonRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleClick = () => {
    if (storyContent.type === 'ai-chat') {
      setShowChat(true);
    } else {
      router.push(`/story/${storyContent.id}`);
    }
  };

  return (
    <div className="relative size-full">
      {storyContent.type === 'video' && storyContent.src ? (
        <video
          src={storyContent.src}
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      ) : (
        <div 
          className="absolute left-0 top-0 size-full"
          style={{ backgroundColor: storyContent.backgroundColor || '#000' }}
        />
      )}

      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{storyContent.title}</h1>
          <p className="mt-3 max-w-64 text-xs md:text-base">{storyContent.description}</p>
        </div>

        <div
          ref={hoverButtonRef}
          onClick={handleClick}
          onMouseMove={(e: MouseEvent<HTMLDivElement>) => {
            if (!hoverButtonRef.current) return;
            const rect = hoverButtonRef.current.getBoundingClientRect();
            setCursorPosition({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            });
          }}
          onMouseEnter={() => setHoverOpacity(1)}
          onMouseLeave={() => setHoverOpacity(0)}
          className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
        >
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
            style={{
              opacity: hoverOpacity,
              background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
            }}
          />
          <ArrowBigLeft className="relative z-20" />
          <p className="relative z-20">{storyContent.buttonText}</p>
        </div>
      </div>

      {showChat && <AIChat onClose={() => setShowChat(false)} />}
    </div>
  );
};
