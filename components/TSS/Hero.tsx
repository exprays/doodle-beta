"use client"

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { ArrowBigLeft } from "lucide-react";
import Button from "./Button";
import VideoPreview from "./VideoPreview";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoLoad = (): void => {
    setLoading(false);
  };

  const handleMiniVdClick = (): void => {
    setHasClicked(true);
  };

  useGSAP(
    () => {
      if (hasClicked && videoRef.current) {
        gsap.set("#main-video", { visibility: "visible" });
        gsap.to("#main-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            (async () => {
              await videoRef.current?.play();
            })();
          },
        });
      }
    },
    {
      dependencies: [hasClicked],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={videoRef}
                  src="/videos/hero-1.mp4"
                  loop
                  muted
                  playsInline
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                  onError={() => setLoading(false)}
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={videoRef}
            src="/videos/hero-1.mp4"
            loop
            muted
            playsInline
            id="main-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
            onError={() => setLoading(false)}
          />
          
          <video
            src="/videos/hero-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
            onError={() => setLoading(false)}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-white">
          LOVE
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              A Real story by puung <br /> For his beloved
            </p>

            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<ArrowBigLeft />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        LOVE
      </h1>
    </div>
  );
};

export default Hero;