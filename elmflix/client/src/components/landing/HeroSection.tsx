'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import GetStartedButton from './GetStartedButton';

const WORDS = ['Movies', 'Watch', 'Replays'] as const;

const HeroSection = () => {
  const textRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    const text = textRef.current;
    const content = contentRef.current;
    if (!text || !content) return;
    
    // Initial entrance animation
    const tl = gsap.timeline({
      defaults: { 
        ease: "power3.out",
        duration: 0.8
      }
    });

    tl.fromTo(headingRef.current,
      { 
        y: 40,
        opacity: 0
      },
      { 
        y: 0,
        opacity: 1
      }
    )
    .fromTo(descriptionRef.current,
      { 
        y: 40,
        opacity: 0
      },
      { 
        y: 0,
        opacity: 1
      },
      "-=0.6"
    );

    // Word change animation
    let currentIndex = 0;
    const changeWord = () => {
      gsap.timeline()
        .to(text, {
          opacity: 0,
          duration: 0.3,
          ease: "power1.in",
          onComplete: () => {
            currentIndex = (currentIndex + 1) % WORDS.length;
            if (text) text.textContent = WORDS[currentIndex];
          }
        })
        .to(text, {
          opacity: 1,
          duration: 0.3,
          ease: "power1.out",
        });
    };

    // Start word change animation after initial entrance
    setTimeout(() => {
      const interval = setInterval(changeWord, 2000);
      return () => clearInterval(interval);
    }, 2000);
  }, []);

  return (
    <section 
      className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen"
      role="region"
      aria-label="Hero section"
    >
      <div className="mt-20 sm:mt-24 lg:mt-28 px-4">
        <h1 
          ref={headingRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight"
          aria-live="polite"
        >
          Unlimited{' '}
          <span 
            ref={textRef}
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 inline-block min-w-[120px]"
            aria-label="Dynamic text showing: Movies, Watch, and Replays"
          >
            {WORDS[0]}
          </span>
        </h1>
        
        <div ref={contentRef} className="flex flex-col items-center">
          <p 
            ref={descriptionRef}
            className="text-gray-300 text-base sm:text-xl md:text-2xl max-w-[300px] sm:max-w-2xl 
                      mx-auto mb-8 sm:mb-10 font-medium tracking-wide leading-relaxed opacity-90"
          >
            Stream your favorite content anytime
          </p>
          <GetStartedButton />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;