"use client"

import { useState, useRef, ReactNode, MouseEvent } from "react";
import { ArrowBigLeft } from "lucide-react";
import { GlitchText } from "../GlitchText";
import { useRouter } from "next/navigation";

interface BentoTiltProps {
  children: ReactNode;
  className?: string;
}

interface CursorPosition {
  x: number;
  y: number;
}

interface BentoCardProps {
  id: string;
  src: string;
  title: ReactNode;
  description?: string;
  isComingSoon?: boolean;
  buttonText?: string;
  fullStory?: string;
  type?: 'video' | 'text' | 'ai-chat';
}

export const BentoTilt: React.FC<BentoTiltProps> = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState<string>("");
  const itemRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>): void => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = (): void => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard: React.FC<BentoCardProps> = ({
  id,
  src,
  title,
  description,
  isComingSoon,
  buttonText,
  type = 'video'
}) => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState<number>(0);
  const hoverButtonRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>): void => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = (): void => setHoverOpacity(1);
  const handleMouseLeave = (): void => setHoverOpacity(0);
  
  const handleClick = () => {
    if (type === 'ai-chat') {
      // Handle AI chat functionality
      console.log('Opening AI chat...');
    } else {
      router.push(`/story/${id}`);
    }
  };

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
            <p className="relative z-20">{buttonText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features: React.FC = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10 p-4">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Hii sudu....💗😃
        </p>
        <GlitchText className="max-w-md font-circular-web text-lg text-blue-50 opacity-50" text="Happy new year! What a wonderful journey it have been.... from meeting randomly to being the closest ones 💗.... Life is so unpredictable isn't it? I am so happy to meet you"/>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          id="vacation"
          src="videos/summer.mp4"
          title={
            <>
              vacati<b>o</b>n
            </>
          }
          description="Travelling with you will be the most amazing thing I will ever do."
          isComingSoon
          buttonText="Read story"
          fullStory="Our summer adventures were filled with unexpected joy and countless memories..."
        />
      </BentoTilt>

      <div className="grid h-[350vh] w-full grid-cols-2 grid-rows-7 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            id="love"
            src="videos/latte.mp4"
            title={
              <>
                Lo<b>v</b>e
              </>
            }
            description="How beautiful it is to find someone who wants nothing but your company:)"
            isComingSoon
            buttonText="Read story"
            fullStory="The journey of our love story began with a simple coffee date..."
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 ms-0">
          <BentoCard
            id="yummy"
            src="videos/bakery.mp4"
            title={
              <>
                yu<b>m</b>my
              </>
            }
            description="Tere aankhone ke siwa is duniya mein aur rakha kya he?"
            isComingSoon
            buttonText="Read Story"
            fullStory="The aroma of freshly baked treats filled our special moments..."
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 md:col-span-1 md:me-0">
          <BentoCard
            id="crazy"
            src="videos/happy.mp4"
            title={
              <>
                cr<b>a</b>zy
              </>
            }
            description="When you smile, everything around me stops for a while"
            isComingSoon
            buttonText="Read story"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>

            <ArrowBigLeft className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/vietnam.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-2 md:row-span-2">
          <BentoCard
            id="cute"
            src="videos/alright.mp4"
            title={
              <>
                Cu<b>t</b>e
              </>
            }
            description="Koi no yokan - means closer to love at second sight! It is the feeling when you meet someone that you are going to fall in love with"
            isComingSoon
            buttonText="Read story"
            fullStory="The journey of our love story began with a simple coffee date..."
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 ms-0">
          <BentoCard
            id="kiss"
            src="videos/kisses.mp4"
            title={
              <>
                Ki<b>s</b>s
              </>
            }
            description="The most intimate moments we share together are the ones that mean the most."
            isComingSoon
            buttonText="Read Story"
            fullStory="The aroma of freshly baked treats filled our special moments..."
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 md:row-span-2 md:col-span-1 ms-0">
          <BentoCard
            id="hugs"
            src="videos/hugs.mp4"
            title={
              <>
                H<b>u</b>gs
              </>
            }
            description="Jab koi baat bigaad jaye, jab koi mushkil pad jaye..tum dena saath mera, O humnavaaa!"
            isComingSoon
            buttonText="Read Story"
            fullStory="The aroma of freshly baked treats filled our special moments..."
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 ms-0">
          <BentoCard
            id="happy"
            src="videos/funplay.mp4"
            title={
              <>
                <b>H</b>appy
              </>
            }
            description="Love meant when someone gets you more than you get yourself. The person who knows you better than you know yourself."
            isComingSoon
            buttonText="Read Story"
            fullStory="The aroma of freshly baked treats filled our special moments..."
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;