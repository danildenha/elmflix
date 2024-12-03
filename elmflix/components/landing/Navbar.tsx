'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';

const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { 
        ease: "power3.out",
        duration: 0.8
      }
    });

    tl.fromTo(navRef.current,
      { 
        y: -100,
        opacity: 0 
      },
      { 
        y: 0,
        opacity: 1,
      }
    );
  }, []);

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-8 lg:px-12 py-6 sm:py-8"
      role="navigation"
      aria-label="Main navigation"
    >
      <Link 
        href="/" 
        className="flex items-center"
        aria-label="ElmFlex Home"
      >
        <div className="relative w-44 sm:w-52 lg:w-64 h-16 sm:h-20 lg:h-24">
          <Image
            src="/images/logo.png"
            alt="ElmFlex Logo"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 176px,
                   (max-width: 1200px) 208px,
                   256px"
          />
        </div>
      </Link>

      <Link 
        href="/sign-in"
        className="px-5 py-2 text-base font-semibold bg-blue-700 hover:bg-blue-800 text-white 
                  transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl
                  hover:scale-105 transform focus:ring-2 focus:ring-blue-400 focus:outline-none"
        role="button"
        aria-label="Sign in to your account"
      >
        Sign In
      </Link>
    </nav>
  );
};

export default Navbar;
