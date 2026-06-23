'use client';

import { useState } from 'react';
import { wholesaleBenefits } from '@/lib/data';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen pt-[72px]">
      {/* Hero */}
      <section className="min-h-[40vh] flex items-center justify-center bg-p-warm-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, #0A0A0A 49px, #0A0A0A 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, #0A0A0A 49px, #0A0A0A 50px)`,
          }}
        />
        <div className="text-center max-w-[700px] px-6 relative">
          <span className="label block mb-6">Wholesale Partnership</span>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal tracking-[-0.03em] leading-[1.1] mb-6">
            Let&apos;s Build<br/>
            Something <em className="font-accent italic text-p-gold font-light">Together</em>
          </h1>
          <p className="font-accent text-[1.125rem] font-light italic text-p-mid-gray leading-[1.7]">
            Whether you&apos;re an established retailer or a new distributor — we&apos;d love to explore how PAULILY can strengthen your portfolio.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="section bg-p-off-white">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-[clamp(40px,6vw,80px)] items-start">
          {/* Info side */}
          <div>
            <span className="label block mb-5">Wholesale Benefits</span>
            <div className="divider-wide mb-6" />

            <div className="p-6 border border-p-light-gray bg-p-pure-white mb-6">
              {wholesaleBenefits.map((b, i) => (
                <div key={i} className="font-sans text-[0.8125rem] text-p-dark-gray leading-[1.8]">
                  · {b}
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="space-y-4 mb-8">
              {[
                { icon: '✉', label: 'Email', text: 'wholesale@paulily.com' },
                { icon: '☎', label: 'Phone', text: '+86 21 6888 XXXX' },
                { icon: '⌂', label: 'Location', text: 'Shanghai, China' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-p-light-gray flex items-center justify-center text-sm text-p-gold">
                    {item.icon}
                  </div>
                  <div>
                    <span className="label block">{item.label}</span>
                    <span className="font-sans text-sm text-p-dark-gray">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Business hours */}
            <div className="p-6 border border-p-light-gray bg-p-pure-white">
              <span className="label block mb-3 text-p-gold">Business Hours</span>
              <div className="font-sans text-sm text-p-dark-gray leading-[1.8]">
                <div>Monday – Friday: 9:00 – 18:00 (CST)</div>
                <div>Saturday: 10:00 – 15:00 (CST)</div>
                <div className="text-p-silver text-xs mt-2 italic">We typically respond within 24 business hours.</div>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div className="bg-p-pure-white p-[clamp(32px,4vw,48px)] border border-p-light-gray">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="form-label">Company Name *</label>
                  <input type="text" className="form-input" placeholder="Your company" required />
                </div>
                <div>
                  <label className="form-label">Contact Person *</label>
                  <input type="text" className="form-input" placeholder="Full name" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="form-label">Email *</label>
                  <input type="email" className="form-input" placeholder="email@company.com" required />
                </div>
                <div>
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-input" placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Country / Region *</label>
                <select className="form-select" required>
                  <option value="">Select your region</option>
                  <option>North America</option>
                  <option>Europe</option>
                  <option>Asia-Pacific</option>
                  <option>Middle East</option>
                  <option>South America</option>
                  <option>Africa</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label">Business Type *</label>
                <select className="form-select" required>
                  <option value="">Select your business type</option>
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
                  <option value="">Select product category</option>
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
                  <option value="">Select estimated volume</option>
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

              <button type="submit" className="form-submit"
                style={submitted ? { background: '#C9A84C', color: '#0A0A0A' } : {}}>
                {submitted ? 'Inquiry Sent ✓' : 'Submit Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}