import { sanityClient, urlFor } from './sanity';
import { Product, Series, CraftStep, Stat, BrandContent } from './data';

// Sanity document types
interface SanityProduct {
  _id: string;
  name?: string;
  nameEn?: string;
  series?: string;
  seriesEn?: string;
  slug?: { current: string };
  priceRange?: string;
  material?: string;
  materialEn?: string;
  descriptionEn?: string;
  dimensions?: string;
  features?: string[];
  moq?: number;
  storyEn?: string;
  image?: any;
}

/**
 * Fetch products from Sanity and MERGE with static fallback.
 * 
 * Strategy:
 * 1. Static products ALWAYS display as baseline (never blank page)
 * 2. CMS products overlay onto matching static products by: seriesEn + nameEn
 *    - If a CMS product has the same seriesEn AND nameEn as a static product,
 *      it replaces that static product's image/text (ideal for editing existing items)
 * 3. CMS products that don't match any static product are APPENDED as new products
 *    - This lets you add unlimited products per series with unique names/slugs
 * 4. If CMS is empty/offline → pure static data shows
 */
export async function fetchProductsWithOverlay(staticProducts: Product[]): Promise<Product[]> {
  try {
    const query = `*[_type == "product"] | order(_createdAt asc) {
      _id,
      name,
      nameEn,
      series,
      seriesEn,
      slug,
      priceRange,
      material,
      materialEn,
      descriptionEn,
      dimensions,
      features,
      moq,
      storyEn,
      image
    }`;

    const results: SanityProduct[] = await sanityClient.fetch(query);

    if (!results || results.length === 0) {
      return staticProducts; // No CMS data → return pure static
    }

    // Build image URLs for CMS products
    const cmsProductsWithImages: (SanityProduct & { imageUrl: string; rawImage?: any })[] = [];
    
    for (const doc of results) {
      let imageUrl = '';
      let rawImage: any = undefined;
      
      try {
        if (doc.image && urlFor(doc.image)) {
          rawImage = doc.image;
          imageUrl = urlFor(doc.image).width(600).height(800).fit('crop').quality(90).url() || '';
        }
      } catch (imgErr) {
        console.warn('Image URL build failed for', doc.nameEn, imgErr);
        imageUrl = '';
      }

      cmsProductsWithImages.push({ ...doc, imageUrl, ...(rawImage ? { rawImage } : {}) });
    }

    // Clone static products as base
    const merged = [...staticProducts];

    // Overlay / append CMS products by matching seriesEn + nameEn
    for (const cms of cmsProductsWithImages) {
      if (!cms) continue;

      // Try to match an existing static product by series + name
      const matchIndex = merged.findIndex(
        p => p.seriesEn === cms.seriesEn && p.nameEn === cms.nameEn
      );

      if (matchIndex >= 0) {
        // --- MATCH FOUND: overlay CMS data onto this static product ---
        if (cms.name) merged[matchIndex].name = cms.name;
        if (cms.nameEn) merged[matchIndex].nameEn = cms.nameEn;
        if (cms.series) merged[matchIndex].series = cms.series;
        if (cms.seriesEn) merged[matchIndex].seriesEn = cms.seriesEn;
        if (cms.priceRange) merged[matchIndex].priceRange = cms.priceRange;
        if (cms.material) merged[matchIndex].material = cms.material;
        if (cms.materialEn) merged[matchIndex].materialEn = cms.materialEn;
        if (cms.descriptionEn) merged[matchIndex].descriptionEn = cms.descriptionEn;
        if (cms.dimensions) merged[matchIndex].dimensions = cms.dimensions;
        if (cms.features && cms.features.length > 0) merged[matchIndex].features = cms.features;
        if (cms.moq) merged[matchIndex].moq = cms.moq;
        if (cms.storyEn) merged[matchIndex].storyEn = cms.storyEn;

        // Image overlay — this is what users care about most!
        if (cms.imageUrl) {
          merged[matchIndex].image = cms.imageUrl;
        }
        if (cms.rawImage) {
          merged[matchIndex]._rawImage = cms.rawImage;
        }
      } else {
        // --- NO MATCH: append as a brand new product ---
        merged.push({
          id: cms.slug?.current || cms._id.replace('product-', '').replace('drafts.', ''),
          name: cms.name || '',
          nameEn: cms.nameEn || '',
          series: cms.series || '',
          seriesEn: cms.seriesEn || '',
          priceUnit: '',
          priceRange: cms.priceRange || '',
          material: cms.material || '',
          materialEn: cms.materialEn || '',
          description: '',
          descriptionEn: cms.descriptionEn || '',
          dimensions: cms.dimensions || '',
          moq: cms.moq || 0,
          image: cms.imageUrl,
          features: cms.features || [],
          storyEn: cms.storyEn || '',
          _rawImage: cms.rawImage,
        });
      }
    }

    return merged;
    
  } catch (err) {
    console.warn('Sanity fetch failed, using static data:', err);
    return staticProducts;
  }
}

// ═══════════════════════════════════════════
// Series fetch with overlay
// ═══════════════════════════════════════════

// Sanity series document types
interface SanitySeries {
  _id: string;
  name?: string;
  nameEn?: string;
  description?: string;
  descriptionEn?: string;
  image?: any;
}

/**
 * Fetch series from Sanity and MERGE with static fallback.
 * 
 * Strategy: overlay pattern — match by nameEn:
 * 1. Static series ALWAYS display as baseline
 * 2. CMS series overlay data onto matching static series (by nameEn)
 * 3. Extra CMS series (new nameEn) get appended
 * 4. If CMS is empty/offline → pure static data shows
 */
export async function fetchSeriesWithOverlay(staticSeries: Series[]): Promise<Series[]> {
  try {
    const query = `*[_type == "series"] | order(_createdAt asc) {
      _id,
      name,
      nameEn,
      description,
      descriptionEn,
      image
    }`;

    const results: SanitySeries[] = await sanityClient.fetch(query);

    if (!results || results.length === 0) {
      return staticSeries;
    }

    // Build image URLs for CMS series
    const cmsSeriesWithImages: (SanitySeries & { imageUrl: string; rawImage?: any })[] = [];
    
    for (const doc of results) {
      let imageUrl = '';
      let rawImage: any = undefined;
      
      try {
        if (doc.image && urlFor(doc.image)) {
          rawImage = doc.image;
          imageUrl = urlFor(doc.image).width(400).height(400).fit('crop').quality(90).url() || '';
        }
      } catch (imgErr) {
        console.warn('Series image URL build failed for', doc.nameEn, imgErr);
        imageUrl = '';
      }

      cmsSeriesWithImages.push({ ...doc, imageUrl, ...(rawImage ? { rawImage } : {}) });
    }

    // Clone static series as base
    const merged = [...staticSeries];

    // Overlay: match CMS series to static series by nameEn
    for (const cms of cmsSeriesWithImages) {
      const matchIndex = merged.findIndex(s => s.nameEn === cms.nameEn);
      
      if (matchIndex >= 0) {
        // Overlay onto matching static series
        if (cms.name) merged[matchIndex].name = cms.name;
        if (cms.nameEn) merged[matchIndex].nameEn = cms.nameEn;
        if (cms.description) merged[matchIndex].description = cms.description;
        if (cms.descriptionEn) merged[matchIndex].descriptionEn = cms.descriptionEn;
        if (cms.imageUrl) merged[matchIndex].image = cms.imageUrl;
        if (cms.rawImage) merged[matchIndex]._rawImage = cms.rawImage;
      } else {
        // New series not in static list — append it
        const slugId = cms.nameEn
          ? cms.nameEn.toLowerCase().replace(/\s+/g, '-')
          : cms._id.replace('series-', '').replace('drafts.', '');
        merged.push({
          id: slugId,
          name: cms.name || '',
          nameEn: cms.nameEn || '',
          description: cms.description || '',
          descriptionEn: cms.descriptionEn || '',
          image: cms.imageUrl,
          _rawImage: cms.rawImage,
        });
      }
    }

    return merged;
    
  } catch (err) {
    console.warn('Sanity series fetch failed, using static data:', err);
    return staticSeries;
  }
}

// ═══════════════════════════════════════════
// Craftsmanship steps fetch with overlay
// ═══════════════════════════════════════════

interface SanityCraftStep {
  _id: string;
  number?: string;
  titleEn?: string;
  descriptionEn?: string;
  image?: any;
}

export async function fetchCraftStepsWithOverlay(staticSteps: CraftStep[]): Promise<CraftStep[]> {
  try {
    const query = `*[_type == "craftStep"] | order(number asc) {
      _id,
      number,
      titleEn,
      descriptionEn,
      image
    }`;

    const results: SanityCraftStep[] = await sanityClient.fetch(query);

    if (!results || results.length === 0) {
      return staticSteps;
    }

    const cmsSteps = results.map((doc) => {
      let imageUrl = '';
      let rawImage: any = undefined;
      try {
        if (doc.image && urlFor(doc.image)) {
          rawImage = doc.image;
          imageUrl = urlFor(doc.image).width(600).height(600).fit('crop').quality(90).url() || '';
        }
      } catch (imgErr) {
        console.warn('Craft step image URL build failed for', doc.titleEn, imgErr);
      }

      return {
        number: doc.number || '',
        title: doc.titleEn || '',
        titleEn: doc.titleEn || '',
        description: doc.descriptionEn || '',
        descriptionEn: doc.descriptionEn || '',
        image: imageUrl,
        _rawImage: rawImage,
      };
    });

    // Overlay by step number, fallback to append
    const merged = [...staticSteps];
    for (const cms of cmsSteps) {
      const matchIndex = merged.findIndex(s => s.number === cms.number);
      if (matchIndex >= 0) {
        if (cms.titleEn) merged[matchIndex].titleEn = cms.titleEn;
        if (cms.titleEn) merged[matchIndex].title = cms.titleEn;
        if (cms.descriptionEn) merged[matchIndex].descriptionEn = cms.descriptionEn;
        if (cms.descriptionEn) merged[matchIndex].description = cms.descriptionEn;
        if (cms.image) merged[matchIndex].image = cms.image;
        if (cms._rawImage) merged[matchIndex]._rawImage = cms._rawImage;
      } else {
        merged.push(cms);
      }
    }

    return merged;
  } catch (err) {
    console.warn('Sanity craft steps fetch failed, using static data:', err);
    return staticSteps;
  }
}

// ═══════════════════════════════════════════
// Heritage stats fetch with overlay
// ═══════════════════════════════════════════

interface SanityStat {
  _id: string;
  number?: string;
  label?: string;
}

export async function fetchStatsWithOverlay(staticStats: Stat[]): Promise<Stat[]> {
  try {
    const query = `*[_type == "stat"] | order(_createdAt asc) {
      _id,
      number,
      label
    }`;

    const results: SanityStat[] = await sanityClient.fetch(query);

    if (!results || results.length === 0) {
      return staticStats;
    }

    const cmsStats = results.map(doc => ({
      number: doc.number || '',
      label: doc.label || '',
      labelZh: '',
    }));

    // Overlay by label, fallback to append
    const merged = [...staticStats];
    for (const cms of cmsStats) {
      const matchIndex = merged.findIndex(s => s.label === cms.label);
      if (matchIndex >= 0) {
        if (cms.number) merged[matchIndex].number = cms.number;
        if (cms.label) merged[matchIndex].label = cms.label;
      } else {
        merged.push(cms);
      }
    }

    return merged;
  } catch (err) {
    console.warn('Sanity stats fetch failed, using static data:', err);
    return staticStats;
  }
}

// ═══════════════════════════════════════════
// Site configuration fetch (no static fallback)
// ═══════════════════════════════════════════

export interface SiteConfig {
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  heroTitle?: string;
  heroSubtitle?: string;
  logo?: any;
}

interface SanitySiteConfig {
  title?: string;
  description?: string;
  email?: string;
  phone?: string;
  location?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  logo?: any;
}

export async function fetchSiteConfig(): Promise<SiteConfig | null> {
  try {
    const query = `*[_type == "siteConfig"][0] {
      title,
      description,
      email,
      phone,
      location,
      heroTitle,
      heroSubtitle,
      logo
    }`;

    const result: SanitySiteConfig | null = await sanityClient.fetch(query);

    if (!result) return null;

    return {
      title: result.title || 'PAULILY',
      description: result.description || '',
      email: result.email || 'wholesale@paulily.com',
      phone: result.phone || '+86 21 6888 XXXX',
      location: result.location || 'Shanghai, China',
      heroTitle: result.heroTitle,
      heroSubtitle: result.heroSubtitle,
      logo: result.logo,
    };
  } catch (err) {
    console.warn('Sanity site config fetch failed:', err);
    return null;
  }
}

// ═══════════════════════════════════════════
// Brand content fetch with overlay
// ═══════════════════════════════════════════

interface SanityBrandContent {
  _id: string;
  section?: string;
  labelEn?: string;
  titleEn?: string;
  bodyEn?: string;
}

/**
 * Fetch brand content from Sanity and MERGE with static fallback.
 *
 * Strategy:
 * 1. Static content ALWAYS serves as baseline (never blank sections)
 * 2. CMS documents override matching sections by `section` field
 * 3. If CMS is empty/offline → pure static content shows
 */
export async function fetchBrandContent(
  staticContent: Record<string, BrandContent>
): Promise<Record<string, BrandContent>> {
  try {
    const query = `*[_type == "brandContent"] {
      _id,
      section,
      labelEn,
      titleEn,
      bodyEn
    }`;

    const results: SanityBrandContent[] = await sanityClient.fetch(query);

    if (!results || results.length === 0) {
      return staticContent;
    }

    // Clone static as base
    const merged = { ...staticContent };

    // Overlay: each CMS document overrides the matching section
    for (const doc of results) {
      if (!doc.section) continue;
      merged[doc.section] = {
        labelEn: doc.labelEn ?? merged[doc.section]?.labelEn,
        titleEn: doc.titleEn ?? merged[doc.section]?.titleEn,
        bodyEn: doc.bodyEn ?? merged[doc.section]?.bodyEn,
      };
    }

    return merged;
  } catch (err) {
    console.warn('Sanity brand content fetch failed, using static data:', err);
    return staticContent;
  }
}
