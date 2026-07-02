'use client';

import { useState, useEffect } from 'react';
import { products as staticProducts, seriesList as staticSeriesList, Series } from '@/lib/data';
import { fetchProductsWithOverlay, fetchSeriesWithOverlay } from '@/lib/fetch-data';
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

export default function CollectionPage() {
  const [filter, setFilter] = useState<string>('all');

  // Start with static (instant render), overlay CMS data
  const [products, setProducts] = useState<ProductWithImage[]>(staticProducts);
  const [seriesData, setSeriesData] = useState<Series[]>(staticSeriesList);

  // Read filter from URL query param on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlFilter = params.get('filter');
    if (urlFilter) setFilter(urlFilter);
  }, []);

  // Fetch CMS data
  useEffect(() => {
    fetchProductsWithOverlay(staticProducts).then((merged) => {
      if (merged && merged.length > 0) setProducts(merged);
    });
    fetchSeriesWithOverlay(staticSeriesList).then((merged) => {
      if (merged && merged.length > 0) setSeriesData(merged);
    });
  }, []);

  // Series filter buttons: use CMS-driven series data
  const allSeriesNames = seriesData.map(s => s.nameEn);

  const filteredProducts = filter === 'all'
    ? []
    : products.filter(p => p.seriesEn === filter);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    if (newFilter === 'all') {
      window.history.pushState({}, '', '/collection');
    } else {
      window.history.pushState({}, '', `/collection?filter=${newFilter}`);
    }
  };

  // Get cover image for a series — prefer CMS series image, fallback to first product image
  const getSeriesImageUrl = (series: Series): string | null => {
    if (series._rawImage) {
      return urlFor(series._rawImage).width(600).height(600).fit('crop').quality(90).url();
    }
    if (series.image && !series.image.startsWith('/')) {
      return series.image;
    }
    // Fallback: first product in this series with a real image
    const product = products.find(p =>
      p.seriesEn === series.nameEn &&
      (p._rawImage || (p.image && !p.image.startsWith('/')))
    );
    if (product) {
      if (product._rawImage) {
        return urlFor(product._rawImage).width(600).height(600).fit('crop').quality(90).url();
      }
      return product.image;
    }
    return null;
  };

  const renderSeriesImage = (series: Series) => {
    const imgUrl = getSeriesImageUrl(series);
    if (imgUrl) {
      return (
        <img
          src={imgUrl}
          alt={series.nameEn}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          loading="lazy"
        />
      );
    }
    return (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="transition-transform duration-500 group-hover:scale-[1.05]">
        <rect x="25" y="30" width="70" height="70" rx="8" stroke="#C9A84C" strokeWidth="1" fill="none"/>
        <path d="M35 30 Q60 10 85 30" stroke="#C9A84C" strokeWidth="1" fill="none"/>
        <rect x="50" y="55" width="20" height="20" rx="3" stroke="#3A3A3A" strokeWidth="0.5" fill="none"/>
      </svg>
    );
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
        />
      );
    }

    return (
      <svg width="120" height="160" viewBox="0 0 120 160" fill="none" className="transition-transform duration-500 group-hover:scale-[1.05]">
        <rect x="20" y="30" width="80" height="110" rx="8" stroke="#C9A84C" strokeWidth="1" fill="none"/>
        <path d="M30 30 Q60 5 90 30" stroke="#C9A84C" strokeWidth="1" fill="none"/>
        <rect x="50" y="50" width="20" height="24" rx="3" stroke="#3A3A3A" strokeWidth="0.5" fill="none"/>
      </svg>
    );
  };

  // Series grid shown when "All Series" is selected
  const renderSeriesGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[clamp(20px,3vw,40px)] max-w-[1200px] mx-auto">
      {seriesData.map((series) => {
        const count = products.filter(p => p.seriesEn === series.nameEn).length;
        return (
          <div
            key={series.nameEn}
            onClick={() => handleFilterChange(series.nameEn)}
            className="group cursor-pointer"
          >
            <div className="aspect-square bg-p-cream flex items-center justify-center overflow-hidden relative mb-5">
              {renderSeriesImage(series)}
              <div className="absolute inset-0 bg-black/0 flex items-center justify-center transition-[background] duration-300 group-hover:bg-[rgba(10,10,10,0.15)]">
                <span className="font-sans text-[0.6875rem] tracking-label uppercase text-white opacity-0 translate-y-2 transition-all duration-300 font-medium py-2.5 px-6 border border-white/60 group-hover:opacity-100 group-hover:translate-y-0">
                  View Series
                </span>
              </div>
            </div>
            <div className="text-center">
              <span className="font-sans text-[0.625rem] tracking-[0.22em] uppercase text-p-gold font-medium mb-1.5 block">
                {series.nameEn}
              </span>
              <h3 className="font-serif text-[1.25rem] font-medium tracking-[0.02em] mb-1.5">
                {series.nameEn}
              </h3>
              <p className="font-sans text-sm text-p-mid-gray">
                {count} {count === 1 ? 'product' : 'products'}
              </p>
              <p className="font-accent text-xs text-p-silver italic mt-2 leading-relaxed">
                {series.descriptionEn || series.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Product grid shown when a specific series is selected
  const renderProductGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(20px,3vw,40px)] max-w-[1200px] mx-auto">
      {filteredProducts.map((product) => (
        <div key={product.id} className="group relative overflow-hidden bg-p-pure-white cursor-pointer transition-transform duration-300 hover:-translate-y-1">
          <a href={`/collection/${product.id}`} className="no-underline text-p-black">
            <div className="aspect-[3/4] bg-p-cream flex items-center justify-center overflow-hidden relative">
              {renderProductImage(product)}
              <div className="absolute inset-0 bg-black/0 flex items-center justify-center transition-[background] duration-300 group-hover:bg-[rgba(10,10,10,0.15)]">
                <span className="font-sans text-[0.6875rem] tracking-label uppercase text-white opacity-0 translate-y-2 transition-all duration-300 font-medium py-2.5 px-6 border border-white/60 group-hover:opacity-100 group-hover:translate-y-0">
                  View Details
                </span>
              </div>
            </div>
            <div className="p-5 pb-6">
              <span className="font-sans text-[0.625rem] tracking-[0.22em] uppercase text-p-gold font-medium mb-1.5 block">
                {product.seriesEn}
              </span>
              <h3 className="font-serif text-[1.125rem] font-medium tracking-[0.02em] mb-1.5">{product.nameEn}</h3>
              <p className="font-sans text-sm text-p-mid-gray">{product.priceRange}</p>
              <p className="font-accent text-xs text-p-silver italic mt-1">{product.materialEn}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen pt-[72px]">
      {/* Header */}
      <section className="section bg-p-warm-white">
        <div className="text-center max-w-[600px] mx-auto">
          <span className="label block mb-4">Full Collection</span>
          <div className="divider mx-auto my-4" />
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-5">
            The Complete Catalog
          </h1>
          <p className="font-accent text-[1.125rem] font-light italic text-p-mid-gray leading-[1.7]">
            Explore every series and discover the right silhouette for your market.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="bg-p-pure-white border-b border-p-light-gray py-6 px-[clamp(24px,4vw,80px)]">
        <div className="max-w-[1200px] mx-auto flex flex-wrap gap-3 items-center justify-center">
          <button
            onClick={() => handleFilterChange('all')}
            className={`font-sans text-[0.6875rem] tracking-label uppercase px-5 py-2.5 border cursor-pointer transition-all duration-300
              ${filter === 'all' ? 'bg-p-black text-white border-p-black' : 'bg-transparent text-p-dark-gray border-p-light-gray hover:border-p-gold hover:text-p-gold'}`}>
            All Series
          </button>
          {allSeriesNames.map((seriesName) => (
            <button key={seriesName}
              onClick={() => handleFilterChange(seriesName)}
              className={`font-sans text-[0.6875rem] tracking-label uppercase px-5 py-2.5 border cursor-pointer transition-all duration-300
                ${filter === seriesName ? 'bg-p-black text-white border-p-black' : 'bg-transparent text-p-dark-gray border-p-light-gray hover:border-p-gold hover:text-p-gold'}`}>
              {seriesName}
            </button>
          ))}
        </div>
      </div>

      {/* Content: series grid when All, product grid when filtered */}
      <section className="section bg-p-off-white">
        {filter === 'all' ? renderSeriesGrid() : renderProductGrid()}
      </section>
    </div>
  );
}
