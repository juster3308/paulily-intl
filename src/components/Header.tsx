'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between
      px-[clamp(24px,4vw,80px)] transition-all duration-300 ease
      ${scrolled ? 'h-14 bg-white/[0.97] backdrop-blur-xl' : 'h-[72px] bg-white/[0.92] backdrop-blur-[20px]'}
      border-b border-black/[0.06]`}>
      
      <a href="/" className="font-serif text-[1.375rem] tracking-brand font-medium text-p-black no-underline transition-[letter-spacing] duration-300 hover:tracking-[0.42em]">
        P A U L I L Y
      </a>

      <ul className="hidden md:flex gap-9 items-center list-none">
        {['Collection', 'Craftsmanship', 'Heritage', 'Wholesale'].map((item) => (
          <li key={item}>
            <a href={`/#${item.toLowerCase()}`}
              className="font-sans text-[0.75rem] tracking-nav uppercase text-p-dark-gray no-underline font-medium
                relative pb-0.5 transition-colors duration-300 hover:text-p-black
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-p-gold
                after:transition-[width] duration-300 hover:after:w-full">
              {item}
            </a>
          </li>
        ))}
      </ul>

      <a href="/#inquiry" className="hidden md:inline-block font-sans text-[0.6875rem] tracking-[0.14em] uppercase bg-p-black text-p-pure-white py-2.5 px-6 border-none cursor-pointer font-medium no-underline transition-all duration-300 hover:bg-p-gold hover:text-p-black">
        Request Catalog
      </a>

      {/* Mobile menu button */}
      <button className="hidden max-md:block bg-transparent border-none cursor-pointer p-2 text-p-black">
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
          <rect y="0" width="20" height="1.5" fill="#0A0A0A"/>
          <rect y="6" width="20" height="1.5" fill="#0A0A0A"/>
          <rect y="12" width="20" height="1.5" fill="#0A0A0A"/>
        </svg>
      </button>
    </nav>
  );
}