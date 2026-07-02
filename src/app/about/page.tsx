'use client';

import { useEffect, useRef, useState } from 'react';
import { heritageStats as staticHeritageStats, brandContentData, Stat, BrandContent } from '@/lib/data';
import { fetchStatsWithOverlay, fetchBrandContent } from '@/lib/fetch-data';
import { BrandTitle, splitBodyParagraphs } from '@/components/BrandText';

export default function AboutPage() {
  const fadeRefs = useRef<HTMLDivElement[]>([]);
  const [stats, setStats] = useState<Stat[]>(staticHeritageStats);
  const [brandContent, setBrandContent] = useState<Record<string, BrandContent>>(brandContentData);

  useEffect(() => {
    fetchStatsWithOverlay(staticHeritageStats).then((merged) => {
      if (merged && merged.length > 0) setStats(merged);
    });
    fetchBrandContent(brandContentData).then((merged) => {
      if (merged) setBrandContent(merged);
    });
  }, []);

  useEffect(() => {
    fadeRefs.current = [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [stats]);

  const addRef = (el: HTMLDivElement | null) => {
    if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el);
  };

  const hero = brandContent['about-hero'] || {};
  const story = brandContent['about-story'] || {};
  const values = brandContent['about-values'] || {};

  return (
    <div className="min-h-screen pt-[72px]">
      {/* Hero */}
      <section className="min-h-[60vh] flex items-center justify-center bg-p-warm-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, #0A0A0A 49px, #0A0A0A 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, #0A0A0A 49px, #0A0A0A 50px)`,
          }}
        />
        <div ref={addRef} className="fade-in text-center max-w-[700px] px-6 relative">
          <span className="label block mb-6">{hero.labelEn}</span>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal tracking-[-0.03em] leading-[1.1] mb-6">
            <BrandTitle title={hero.titleEn || ''} />
          </h1>
          <p className="font-accent text-[1.125rem] font-light italic text-p-mid-gray leading-[1.7]">
            {hero.bodyEn}
          </p>
        </div>
      </section>

      {/* Brand story */}
      <section className="section bg-p-pure-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[clamp(40px,6vw,80px)] items-center">
          <div ref={addRef} className="fade-in aspect-[4/5] bg-p-cream border border-p-light-gray flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-5 left-5 right-5 bottom-5 border border-p-gold/20" />
            <svg width="180" height="220" viewBox="0 0 180 220" fill="none">
              <rect x="30" y="50" width="120" height="150" rx="10" stroke="#C9A84C" strokeWidth="1" fill="none"/>
              <path d="M50 50 Q90 20 130 50" stroke="#C9A84C" strokeWidth="1" fill="none"/>
              <text x="90" y="120" fontFamily="'Playfair Display', serif" fontSize="14" fill="#C9A84C" textAnchor="middle" letterSpacing="4">PAULILY</text>
            </svg>
          </div>

          <div ref={addRef} className="fade-in">
            <span className="label block mb-5">{story.labelEn}</span>
            <div className="divider-wide mb-5" />
            
            <h2 className="font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-normal leading-[1.15] mb-6">
              <BrandTitle title={story.titleEn || ''} />
            </h2>

            {splitBodyParagraphs(story.bodyEn || '').map((para, i) => (
              <p key={i} className="font-accent text-base font-light italic text-p-mid-gray leading-[1.8] mb-5 last:mb-0">
                {para}
              </p>
            ))}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10 pt-10 border-t border-p-light-gray">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-[1.75rem] font-normal text-p-gold mb-1">{stat.number}</div>
                  <div className="font-sans text-[0.6875rem] tracking-[0.14em] uppercase text-p-silver font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-p-off-white">
        <div ref={addRef} className="fade-in max-w-[800px] mx-auto text-center">
          <span className="label block mb-5">{values.labelEn}</span>
          <div className="divider mx-auto mb-5" />
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-normal mb-12">
            <BrandTitle title={values.titleEn || ''} />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Material Honesty', desc: 'We never use bonded leather, synthetic blends, or misleading labeling. Every material we specify is exactly what you receive.' },
              { title: 'Process Transparency', desc: 'Our wholesale partners receive full documentation of every production step — from hide origin to final QC report.' },
              { title: 'Long-term Partnership', desc: '98% repeat order rate speaks for itself. We invest in relationships, not transactions.' },
            ].map((v, i) => (
              <div key={i} className="p-8 border border-p-light-gray bg-p-pure-white hover:border-p-gold/40 transition-colors duration-300">
                <div className="font-serif text-[1.75rem] font-normal text-p-gold opacity-40 mb-4">{String(i+1).padStart(2, '0')}</div>
                <h3 className="font-serif text-[1.125rem] font-medium mb-3">{v.title}</h3>
                <p className="font-accent text-sm font-light italic text-p-mid-gray leading-[1.8]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
