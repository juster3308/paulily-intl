'use client';

import { useEffect, useRef, useState } from 'react';
import { craftSteps as staticCraftSteps, brandContentData, CraftStep, BrandContent } from '@/lib/data';
import { fetchCraftStepsWithOverlay, fetchBrandContent } from '@/lib/fetch-data';
import { urlFor } from '@/lib/sanity';
import { BrandTitle } from '@/components/BrandText';

export default function CraftsmanshipPage() {
  const fadeRefs = useRef<HTMLDivElement[]>([]);
  const [craftSteps, setCraftSteps] = useState<CraftStep[]>(staticCraftSteps);
  const [brandContent, setBrandContent] = useState<Record<string, BrandContent>>(brandContentData);

  useEffect(() => {
    fetchCraftStepsWithOverlay(staticCraftSteps).then((merged) => {
      if (merged && merged.length > 0) setCraftSteps(merged);
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
  }, [craftSteps]);

  const addRef = (el: HTMLDivElement | null) => {
    if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el);
  };

  const renderStepImage = (step: CraftStep) => {
    if (step._rawImage) {
      return (
        <img
          src={urlFor(step._rawImage).width(600).height(400).fit('crop').quality(90).url()}
          alt={step.titleEn}
          className="w-full h-full object-cover"
        />
      );
    }
    if (step.image && !step.image.startsWith('/')) {
      return <img src={step.image} alt={step.titleEn} className="w-full h-full object-cover" />;
    }
    return null;
  };

  const hero = brandContent['craftsmanship-hero'] || {};
  const quality = brandContent['craftsmanship-quality'] || {};

  return (
    <div className="min-h-screen pt-[72px]">
      {/* Hero */}
      <section className="min-h-[60vh] flex items-center justify-center bg-p-black text-white relative overflow-hidden">
        <div ref={addRef} className="fade-in text-center max-w-[700px] px-6">
          <span className="label block mb-6 text-p-gold tracking-wide">{hero.labelEn}</span>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal tracking-[-0.03em] leading-[1.1] mb-6">
            <BrandTitle title={hero.titleEn || ''} />
          </h1>
          <p className="font-accent text-[1.125rem] font-light italic text-white/50 leading-[1.7]">
            {hero.bodyEn}
          </p>
        </div>
      </section>

      {/* Three pillars */}
      <section className="section bg-p-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(24px,3vw,48px)] max-w-[1200px] mx-auto">
          {craftSteps.map((step) => (
            <div key={step.number} ref={addRef} className="craft-card fade-in bg-transparent">
              {renderStepImage(step) && (
                <div className="aspect-[3/2] mb-6 overflow-hidden">
                  {renderStepImage(step)}
                </div>
              )}
              <div className="font-serif text-[3rem] font-normal text-p-gold opacity-40 leading-none mb-8">
                {step.number}
              </div>
              <h2 className="font-serif text-[1.5rem] font-medium mb-6 tracking-[0.04em]">
                {step.titleEn}
              </h2>
              <p className="font-accent text-base font-light italic text-white/60 leading-[1.8]">
                {step.descriptionEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed breakdown */}
      <section className="section bg-p-warm-white">
        <div ref={addRef} className="fade-in max-w-[800px] mx-auto">
          <span className="label block mb-5">{quality.labelEn}</span>
          <div className="divider-wide mb-5" />
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-normal mb-8">
            <BrandTitle title={quality.titleEn || ''} />
          </h2>

          <div className="space-y-8">
            {[
              { title: 'Leather Grading', desc: 'Only Grade-A full-grain leather passes our inspection. We reject 70% of sourced hides — the remaining 30% carry zero surface defects and maintain consistent grain density across the entire panel.' },
              { title: 'Stitch Count Standard', desc: 'Minimum 8 stitches per inch on all structural seams. Each stitch is individually tensioned by hand — no machine variation, no weak points.' },
              { title: 'Hardware Lifecycle', desc: 'All metal components tested to 50,000 cycle open/close endurance. PVD coating on titanium parts rated to retain 95% surface integrity after 5 years of daily use.' },
              { title: 'Edge Finishing', desc: 'Seven progressive polishing stages from coarse deburring to mirror-burnish. No paint, no filler — the edge is the leather itself, refined to a glass-like smoothness.' },
            ].map((item, i) => (
              <div key={i} className="pb-8 border-b border-p-light-gray last:border-none">
                <h3 className="font-serif text-[1.125rem] font-medium mb-3">{item.title}</h3>
                <p className="font-accent text-sm font-light italic text-p-mid-gray leading-[1.8]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
