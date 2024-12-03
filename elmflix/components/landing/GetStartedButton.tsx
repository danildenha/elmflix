'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const GetStartedButton = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const arrow = arrowRef.current;
    if (!button || !arrow) return;

    const ctx = gsap.context(() => {
      // Initial animation
      gsap.fromTo(button,
        { y: 40, opacity: 0 },
        { 
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.3
        }
      );

      // Hover animations
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.2,
          ease: "power1.out"
        });
        gsap.to(arrow, {
          x: 4,
          duration: 0.2,
          ease: "power2.out"
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: "power1.out"
        });
        gsap.to(arrow, {
          x: 0,
          duration: 0.2,
          ease: "power2.out"
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Link 
      ref={buttonRef}
      href="/sign-up" 
      className="relative bg-gradient-to-r from-blue-600 to-blue-500 
                text-white text-lg md:text-xl px-10 py-4 rounded-lg
                shadow-[0_0_15px_rgba(59,130,246,0.5)]
                hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]
                transition-shadow duration-300 
                flex items-center gap-2 font-semibold
                focus:ring-2 focus:ring-blue-400 focus:outline-none"
      role="button"
      aria-label="Get started with ElmFlex"
    >
      Get Started
      <svg 
        ref={arrowRef}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={2} 
        stroke="currentColor" 
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" 
        />
      </svg>
    </Link>
  );
};

export default GetStartedButton;
