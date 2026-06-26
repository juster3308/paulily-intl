'use client';

import { useState, useEffect } from 'react';
import { products as staticProducts } from '@/lib/data';
import { fetchProductsWithOverlay } from '@/lib/fetch-data';
import { urlFor } from '@/lib/sanity';

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

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [products, setProducts] = useState<ProductWithImage[]>(staticProducts);

  // Find product by ID (slug) or name match
  const product = products.find(p => p.id === params.id) ||
    products.find(p => p.nameEn?.toLowerCase().replace(/\s+/g, '-') === params.id.toLowerCase());
  const [activeTab, setActiveTab] = useState<'specs' | 'story'>('specs');

  useEffect(() => {
    fetchProductsWithOverlay(staticProducts).then((merged) => {
      if (merged && merged.length > 0) setProducts(merged);
    });
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-p-warm-white">
        <div className="text-center">
          <h1 className="font-serif text-2xl mb-4">Product Not Found</h1>
          <a href="/collection" className="btn-primary">Back to Collection</a>
        </div>
      </div>
    );
  }

  const hasRealImage = product._rawImage || (product.image && !product.image.startsWith('/'));
  const imgUrl = hasRealImage 
    ? (product._rawImage ? urlFor(product._rawImage).width(800).height(1000).fit('crop').quality(90).url() : product.image)
    : null;

  return (
    <div className="min-h-screen pt-[72px]">
      <section className="section bg-p-warm-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-[clamp(40px,6vw,80px)] items-start">
          {/* Image area - REAL IMAGE FROM SANITY OR SVG FALLBACK */}
          <div className="aspect-[4/5] bg-p-cream border border-p-light-gray flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-5 left-5 right-5 bottom-5 border border-p-gold/20" />
            {imgUrl ? (
              <img src={imgUrl} alt={product.nameEn} className="w-full h-full object-cover" />
            ) : (
              <svg width="200" height="260" viewBox="0 0 200 260" fill="none">
                <rect x="40" y="50" width="120" height="160" rx="10" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
                <path d="M60 50 Q100 15 140 50" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
                <rect x="80" y="80" width="40" height="40" rx="5" stroke="#3A3A3A" strokeWidth="0.8" fill="none"/>
                <line x1="100" y1="88" x2="100" y2="108" stroke="#9A9A9A" strokeWidth="0.5"/>
              </svg>
            )}
          </div>

          {/* Info area */}
          <div>
            <span className="label block mb-3 text-p-gold">{product.seriesEn} Series</span>
            <h1 className="font-serif text-[clamp(2rem,3.5vw,2.75rem)] font-normal leading-[1.15] mb-3">
              {product.nameEn}
            </h1>
            <div className="divider-wide mb-6" />
            
            <p className="font-accent text-base font-light italic text-p-mid-gray leading-[1.8] mb-8">
              {product.descriptionEn || `${product.nameEn} is a signature piece from our ${product.seriesEn} series, crafted with exceptional materials and uncompromising attention to detail.`}
            </p>

            {/* Price & MOQ */}
            <div className="bg-p-off-white p-6 border border-p-light-gray mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="label">Wholesale Price</span>
                <span className="font-serif text-[1.5rem] text-p-gold">{product.priceRange}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="label">Minimum Order</span>
                <span className="font-sans text-sm text-p-dark-gray">{product.moq || '—'} units</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 mb-6 border-b border-p-light-gray">
              <button onClick={() => setActiveTab('specs')}
                className={`font-sans text-[0.6875rem] tracking-label uppercase pb-3 cursor-pointer transition-all duration-300 border-none bg-transparent
                  ${activeTab === 'specs' ? 'text-p-black border-b-2 border-b-p-gold font-medium' : 'text-p-silver font-normal'}`}>
                Specifications
              </button>
              <button onClick={() => setActiveTab('story')}
                className={`font-sans text-[0.6875rem] tracking-label uppercase pb-3 cursor-pointer transition-all duration-300 border-none bg-transparent
                  ${activeTab === 'story' ? 'text-p-black border-b-2 border-b-p-gold font-medium' : 'text-p-silver font-normal'}`}>
                Story
              </button>
            </div>

            {activeTab === 'specs' && (
              <div>
                {product.dimensions && (
                  <div className="mb-6">
                    <span className="label block mb-3">Dimensions</span>
                    <p className="font-sans text-sm text-p-dark-gray">{product.dimensions}</p>
                  </div>
                )}
                {product.materialEn && (
                  <div className="mb-6">
                    <span className="label block mb-3">Material</span>
                    <p className="font-sans text-sm text-p-dark-gray">{product.materialEn}</p>
                  </div>
                )}
                {product.features && product.features.length > 0 && (
                  <div>
                    <span className="label block mb-3">Features</span>
                    <ul className="list-none space-y-2">
                      {product.features.map((f, i) => (
                        <li key={i} className="font-sans text-sm text-p-dark-gray flex items-center gap-3">
                          <span className="w-[4px] h-[4px] bg-p-gold rounded-full inline-block" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'story' && (
              <div>
                <p className="font-accent text-base font-light italic text-p-mid-gray leading-[1.8]">
                  {product.descriptionEn || `The ${product.nameEn} represents the pinnacle of ${product.seriesEn} craftsmanship.`}
                </p>
                <p className="font-accent text-base font-light italic text-p-mid-gray leading-[1.8] mt-4">
                  Each {product.nameEn} undergoes 47 hand-crafted steps before leaving our Shanghai workshop. From material selection through seven-stage edge polishing, every detail is a commitment to excellence without compromise.
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-4 mt-8">
              <a href="/contact" className="btn-primary">Request Wholesale Quote</a>
              <a href="/collection" className="btn-secondary">Back to Collection</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
