
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { GALLERY_IMAGES } from '@/constants/images';

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
  const galleryWrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const mainImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const galleryWrapper = galleryWrapperRef.current;
    const sideCols = document.querySelectorAll('.gallery-col:not(.main)');
    const mainImg = mainImgRef.current;
    const sticky = stickyRef.current;

    if (!galleryWrapper || !mainImg || !sticky) return;

    // Initially hide the gallery section
    gsap.set(sticky, { autoAlpha: 0 });

    // Show gallery when second chapter comes into view
    gsap.to(sticky, {
      autoAlpha: 1,
      scrollTrigger: {
        trigger: sticky,
        start: 'top center',
        end: 'top top',
        toggleActions: 'play none none reverse',
      }
    });

    // Main gallery animation
    ScrollTrigger.create({
      trigger: '.gallery-scroll-section',
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const scale = 1 + self.progress * 2.65;
        const yTranslate = self.progress * 300;
        const mainImgScale = 2 - self.progress * 0.85;

        galleryWrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
        
        sideCols.forEach((col) => {
          (col as HTMLElement).style.transform = `translateY(${yTranslate}px)`;
        });

        mainImg.style.transform = `scale(${mainImgScale})`;
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <div ref={stickyRef} className="fixed inset-0 bg-black overflow-hidden">
        <div 
          ref={galleryWrapperRef} 
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vw] h-screen flex gap-16"
        >
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <div 
              key={colIndex}
              className={`gallery-col ${
                colIndex === 2 ? 'main' : `side-${colIndex + 1}`
              }`}
            >
              {Array.from({ length: 3 }).map((_, imgIndex) => (
                <div 
                  key={imgIndex}
                  className={`img ${
                    colIndex === 2 && imgIndex === 1 ? 'main' : ''
                  }`}
                >
                  <img
                    src={GALLERY_IMAGES.default}
                    alt={`Gallery image ${imgIndex + 1}`}
                    ref={colIndex === 2 && imgIndex === 1 ? mainImgRef : undefined}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <section className="hero h-screen relative p-8">
          <div className="hero-img absolute inset-0">
            <img src={GALLERY_IMAGES.hero} alt="Hero" className="object-cover" />
          </div>
          <div className="header relative w-full flex justify-between text-white mt-auto">
            <h1>Serene</h1>
            <h1>drift</h1>
          </div>
        </section>

        <section className="intro h-screen bg-[blanchedalmond] text-[#05364c] flex flex-col justify-between items-center text-center py-16">
          <div className="tagline">
            <p>Inspired with chaotic mind</p>
          </div>
          <div className="w-[1.5px] h-[30%] bg-[#05364c]" />
          <div className="intro-header">
            <h1>Elevating</h1>
            <h1>serenity</h1>
          </div>
        </section>

        <section className="gallery-scroll-section h-[600vh] bg-transparent" />

        <section className="outro h-screen bg-[blanchedalmond] text-[#05364c] flex flex-col justify-between items-center text-center p-8">
          <h1>Crafted</h1>
          <h1>beauty</h1>
        </section>

        <section className="footer h-screen relative">
          <div className="footer-bg absolute inset-0">
            <img src={GALLERY_IMAGES.footer} alt="Footer" className="object-cover" />
          </div>
        </section>
      </div>

      <style jsx>{`
        .gallery-col {
          position: relative;
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 4em;
          will-change: transform;
        }
        .img {
          flex: 1;
          overflow: hidden;
          background-color: aliceblue;
        }
        .img.main img {
          position: relative;
          transform: scale(2);
          will-change: transform;
        }
        h1 {
          font-size: 12vw;
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.025em;
        }
      `}</style>
    </>
  );
};

export default GallerySection;