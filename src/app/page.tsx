'use client';

import { useEffect, useRef, useState } from 'react';
import { products as staticProducts, craftSteps, heritageStats, wholesaleBenefits } from '@/lib/data';
import { fetchProductsWithImages } from '@/lib/fetch-data';
import { urlFor } from '@/lib/sanity';

// Extend Product type to include raw image
interface ProductWithImage {
  id: string;
  name: string;
  nameEn: string;
  series: string;
  seriesEn: string;
  priceUnit: string;
  priceRange: string;
  material: string;
  materialEn: string;
  description: string;
  descriptionEn: string;
  dimensions: string;
  moq: number;
  image: string;
  features: string[];
  _rawImage?: any;
}

export default function Home() {
  const fadeRefs = useRef<HTMLDivElement[]>([]);
  
  // State for Sanity-fetched products (with images)
  const [products, setProducts] = useState<ProductWithImage[]>(staticProducts);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Fetch products from Sanity on mount (merges with static data)
  useEffect(() => {
    fetchProductsWithImages(staticProducts).then((merged) => {
      if (merged && merged.length > 0) {
        setProducts(merged);
      }
    });
  }, []);

  const addFadeRef = (el: HTMLDivElement | null) => {
    if (el && !fadeRefs.current.includes(el)) {
      fadeRefs.current.push(el);
    }
  };

  // Render product image - real image from Sanity or SVG fallback
  const renderProductImage = (product: ProductWithImage) => {
    const hasRealImage = product._rawImage || (product.image && !product.image.startsWith('/'));
    
    if (hasRealImage) {
      const imgUrl = product._rawImage 
        ? urlFor(product._rawImage).width(600).height(800).fit('crop').quality(90).url()
        : product.image;
      
      return (
        <img
          src={imgUrl}
          alt={product.nameEn}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          loading="lazy"
          onLoad={(e) => setImagesLoaded(prev => ({ ...prev, [product.id]: true }))}
        />
      );
    }
    
    // SVG fallback (no image in Sanity)
    return (
      <svg width="120" height="160" viewBox="0 0 120 160" fill="none" className="transition-transform duration-500 group-hover:scale-[1.05]">
        <rect x="20" y="30" width="80" height="110" rx="8" stroke="#C9A84C" strokeWidth="1" fill="none"/>
        <path d="M30 30 Q60 5 90 30" stroke="#C9A84C" strokeWidth="1" fill="none"/>
        <rect x="50" y="50" width="20" height="24" rx="3" stroke="#3A3A3A" strokeWidth="0.5" fill="none"/>
      </svg>
    );
  };

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section id="hero" className="min-h-screen flex items-center justify-center bg-p-warm-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, #0A0A0A 49px, #0A0A0A 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, #0A0A0A 49px, #0A0A0A 50px)`,
          }}
        />

        <div ref={addFadeRef} className="text-center max-w-[800px] px-6 relative fade-in">
          <span className="label block mb-8 text-p-gold tracking-wide">Established · Shanghai</span>
          
          <h1 className="font-serif font-normal leading-[1.08] tracking-[-0.03em] text-p-black mb-8
            text-[clamp(3rem,7vw,5.5rem)]">
            Crafted for<br />
            the <em className="font-accent italic text-p-gold font-light">Discerning</em>
          </h1>

          <p className="font-accent text-[clamp(1.1rem,2vw,1.4rem)] font-light italic text-p-mid-gray leading-[1.7] max-w-[520px] mx-auto mb-12">
            Where Eastern artistry meets uncompromising quality. Each piece is a dialogue between heritage and modernity — made for those who recognize excellence without explanation.
          </p>

          <div className="flex gap-4 justify-center items-center flex-col md:flex-row">
            <a href="#collection" className="btn-primary">View Collection</a>
            <a href="#inquiry" className="btn-secondary">Wholesale Inquiry</a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-p-silver text-[0.625rem] tracking-wide uppercase font-sans">
          <span>Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-p-silver to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </section>

      {/* ══════════ COLLECTION ══════════ */}
      <section id="collection" className="section">
        <div ref={addFadeRef} className="text-center max-w-[600px] mx-auto mb-[clamp(48px,6vw,80px)] fade-in">
          <span className="label block mb-4">The Collection</span>
          <div className="divider mx-auto my-4" />
          <h2 className="section-title font-serif font-normal tracking-[-0.02em] text-[clamp(2rem,4vw,3rem)] mb-5">
            Quiet Precision
          </h2>
          <p className="font-accent text-[1.125rem] font-light italic text-p-mid-gray leading-[1.7]">
            Six signature silhouettes — each defined by restraint, structure, and the quiet confidence of exceptional material.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(20px,3vw,40px)] max-w-[1200px] mx-auto">
          {products.map((product) => (
            <div key={product.id} ref={addFadeRef} className="fade-in group relative overflow-hidden bg-p-off-white cursor-pointer transition-transform duration-300 hover:-translate-y-1">
              {/* Product image - REAL IMAGE FROM SANITY OR SVG FALLBACK */}
              <div className="aspect-[3/4] bg-p-cream flex items-center justify-center overflow-hidden relative">
                {renderProductImage(product)}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 flex items-center justify-center transition-[background] duration-300 group-hover:bg-[rgba(10,10,10,0.15)]">
                  <span className="font-sans text-[0.6875rem] tracking-label uppercase text-white opacity-0 translate-y-2 transition-all duration-300 font-medium py-2.5 px-6 border border-white/60 group-hover:opacity-100 group-hover:translate-y-0">
                    View Details
                  </span>
                </div>
              </div>

              {/* Product info */}
              <div className="p-5 pb-6">
                <span className="font-sans text-[0.625rem] tracking-[0.22em] uppercase text-p-gold font-medium mb-1.5 block">
                  {product.seriesEn}
                </span>
                <h3 className="font-serif text-[1.125rem] font-medium tracking-[0.02em] mb-1.5">
                  {product.nameEn}
                </h3>
                <p className="font-sans text-sm text-p-mid-gray font-normal">
                  {product.priceRange}
                </p>
                <p className="font-accent text-xs text-p-silver italic mt-1">
                  {product.materialEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ CATALOG DOWNLOAD ══════════ */}
      <section className="bg-p-cream py-[clamp(40px,5vw,64px)] px-[clamp(24px,4vw,80px)] text-center">
        <div ref={addFadeRef} className="fade-in">
          <span className="label block mb-4">Resources</span>
          <h3 className="font-serif text-[clamp(1.25rem,2.5vw,1.75rem)] font-normal mb-3">
            Download Our Full Product Catalog
          </h3>
          <p className="font-accent text-base italic font-light text-p-mid-gray mb-6">
            Complete specifications, dimensions, material details, and MOQ information for wholesale partners.
          </p>
          <button className="btn-primary">Download PDF Catalog</button>
        </div>
      </section>

      {/* ══════════ CRAFTSMANSHIP ══════════ */}
      <section id="craftsmanship" className="section bg-p-black text-white relative">
        <div ref={addFadeRef} className="text-center max-w-[600px] mx-auto mb-[clamp(48px,6vw,80px)] fade-in">
          <span className="label block mb-4 text-p-gold tracking-wide">The Process</span>
          <div className="divider mx-auto my-4" />
          <h2 className="font-serif font-normal tracking-[-0.02em] text-white text-[clamp(2rem,4vw,3rem)] mb-5">
            Uncompromising Craft
          </h2>
          <p className="font-accent text-[1.125rem] font-light italic text-white/50 leading-[1.7]">
            Every PAULILY piece passes through 47 individual steps — from raw material selection to final inspection. No shortcuts. No compromises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(24px,3vw,48px)] max-w-[1200px] mx-auto">
          {craftSteps.map((step) => (
            <div key={step.number} ref={addFadeRef} className="craft-card fade-in">
              <div className="font-serif text-[2.5rem] font-normal text-p-gold opacity-40 leading-none mb-6">
                {step.number}
              </div>
              <h3 className="font-serif text-[1.25rem] font-medium mb-4 tracking-[0.04em]">
                {step.titleEn}
              </h3>
              <p className="font-accent text-[0.9375rem] font-light italic text-white/60 leading-[1.8]">
                {step.descriptionEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ HERITAGE ══════════ */}
      <section id="heritage" className="section bg-p-warm-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[clamp(40px,6vw,80px)] items-center">
          {/* Image area */}
          <div ref={addFadeRef} className="fade-in aspect-[4/5] bg-p-cream border border-p-light-gray flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-5 left-5 right-5 bottom-5 border border-p-gold/20" />
            <svg width="180" height="220" viewBox="0 0 180 220" fill="none">
              <rect x="30" y="50" width="120" height="150" rx="10" stroke="#C9A84C" strokeWidth="1" fill="none"/>
              <path d="M50 50 Q90 20 130 50" stroke="#C9A84C" strokeWidth="1" fill="none"/>
              <text x="90" y="120" fontFamily="'Playfair Display', serif" fontSize="14" fill="#C9A84C" textAnchor="middle" letterSpacing="4">PAULILY</text>
              <line x1="60" y1="140" x2="120" y2="140" stroke="#D4D4D4" strokeWidth="0.5"/>
              <text x="90" y="155" fontFamily="'Cormorant Garamond', serif" fontSize="8" fill="#9A9A9A" textAnchor="middle" fontStyle="italic">est. Shanghai</text>
            </svg>
          </div>

          {/* Text area */}
          <div ref={addFadeRef} className="fade-in">
            <span className="label block mb-5">Our Heritage</span>
            <div className="divider-wide mb-5" />
            <h2 className="font-serif text-[clamp(2rem,3.5vw,2.75rem)] font-normal leading-[1.15] mb-6">
              A Brand Born<br />
              from <em className="text-p-gold font-accent italic font-light">Conviction</em>
            </h2>
            <p className="font-accent text-[1.0625rem] font-light italic text-p-mid-gray leading-[1.8] mb-5">
              PAULILY was founded in Shanghai with a singular conviction: that Chinese craftsmanship deserves the same global reverence as its European counterparts. We do not imitate — we originate.
            </p>
            <p className="font-accent text-[1.0625rem] font-light italic text-p-mid-gray leading-[1.8]">
              Our design philosophy draws from the tension between Eastern aesthetic discipline and Western architectural precision. The result is a product that speaks quietly but carries unmistakable authority.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10 pt-10 border-t border-p-light-gray">
              {heritageStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-[1.75rem] font-normal text-p-gold mb-1">
                    {stat.number}
                  </div>
                  <div className="font-sans text-[0.6875rem] tracking-[0.14em] uppercase text-p-silver font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ WHOLESALE INQUIRY ══════════ */}
      <section id="inquiry" className="section bg-p-off-white">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-[clamp(40px,6vw,80px)] items-start">
          {/* Info side */}
          <div ref={addFadeRef} className="fade-in">
            <span className="label block mb-5">Wholesale Partnership</span>
            <div className="divider-wide mb-5" />
            <h2 className="font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-normal mb-5">
              Let&apos;s Build<br />
              Something <em className="text-p-gold font-accent italic font-light">Together</em>
            </h2>
            <p className="font-accent text-base font-light italic text-p-mid-gray leading-[1.8] mb-6">
              We welcome inquiries from established retailers, distributors, and brand partners worldwide. Our wholesale program offers competitive margins, dedicated account management, and flexible MOQ arrangements.
            </p>

            {/* Contact items */}
            <div className="mt-6 space-y-3">
              {[
                { icon: '✉', text: 'wholesale@paulily.com' },
                { icon: '☎', text: '+86 21 6888 XXXX' },
                { icon: '⌂', text: 'Shanghai, China' },
              ].map((item) => (
                <div key={item.icon} className="flex items-center gap-3 font-sans text-[0.8125rem] text-p-dark-gray">
                  <div className="w-8 h-8 border border-p-light-gray flex items-center justify-center text-xs text-p-gold">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Benefits box */}
            <div className="mt-6 p-5 border border-p-light-gray bg-p-pure-white">
              <span className="label block mb-2 text-p-gold">Wholesale Benefits</span>
              <div className="font-sans text-[0.8125rem] text-p-dark-gray leading-[1.8]">
                {wholesaleBenefits.map((b, i) => (
                  <div key={i}>· {b}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Form side */}
          <div ref={addFadeRef} className="fade-in bg-p-pure-white p-[clamp(32px,4vw,48px)] border border-p-light-gray">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="form-label">Company Name</label>
                  <input type="text" className="form-input" placeholder="Your company" />
                </div>
                <div>
                  <label className="form-label">Contact Person</label>
                  <input type="text" className="form-input" placeholder="Full name" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="email@company.com" />
                </div>
                <div>
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-input" placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Country / Region</label>
                <select className="form-select">
                  <option>Select your region</option>
                  <option>North America</option>
                  <option>Europe</option>
                  <option>Asia-Pacific</option>
                  <option>Middle East</option>
                  <option>South America</option>
                  <option>Africa</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label">Business Type</label>
                <select className="form-select">
                  <option>Select your business type</option>
                  <option>Retailer</option>
                  <option>Distributor</option>
                  <option>E-commerce Platform</option>
                  <option>Brand Partner</option>
                  <option>Private Label / OEM</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label">Products of Interest</label>
                <select className="form-select">
                  <option>Select product category</option>
                  <option>Full Collection</option>
                  <option>INK DRAGON Series</option>
                  <option>Shadow Series</option>
                  <option>Lonely Walker Series</option>
                  <option>Gothic Series</option>
                  <option>Custom / Private Label</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label">Estimated Order Volume</label>
                <select className="form-select">
                  <option>Select estimated volume</option>
                  <option>50 – 200 units</option>
                  <option>200 – 500 units</option>
                  <option>500 – 1,000 units</option>
                  <option>1,000+ units</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label">Additional Notes</label>
                <textarea className="form-textarea" placeholder="Tell us about your business, market focus, or any specific requirements..." />
              </div>

              <button type="submit" className="form-submit">Submit Inquiry</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
