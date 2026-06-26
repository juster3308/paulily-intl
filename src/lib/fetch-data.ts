import { sanityClient, urlFor } from './sanity';
import { Product } from './data';

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
  image?: any;
}

/**
 * Fetch products from Sanity and MERGE with static fallback.
 * 
 * Strategy:
 * 1. Static products ALWAYS display as baseline (never blank page)
 * 2. CMS products overlay images + text onto matching static products
 * 3. Extra CMS products (beyond the 6 static ones) get appended
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

    // Overlay: for each CMS product, find matching static product by position
    // Position-based matching is most reliable — user's 1st CMS product → overlays 1st static product, etc.
    for (let i = 0; i < cmsProductsWithImages.length && i < merged.length; i++) {
      const cms = cmsProductsWithImages[i];
      if (!cms) continue;

      // Overlay CMS fields onto static product
      if (cms.nameEn) merged[i].nameEn = cms.nameEn;
      if (cms.seriesEn) merged[i].seriesEn = cms.seriesEn;
      if (cms.priceRange) merged[i].priceRange = cms.priceRange;
      if (cms.materialEn) merged[i].materialEn = cms.materialEn;
      if (cms.descriptionEn) merged[i].descriptionEn = cms.descriptionEn;

      // Image overlay — this is what user cares about most!
      if (cms.imageUrl) {
        merged[i].image = cms.imageUrl;
      }
    }

    // Append any EXTRA CMS products beyond the 6 static ones
    if (cmsProductsWithImages.length > staticProducts.length) {
      for (let i = staticProducts.length; i < cmsProductsWithImages.length; i++) {
        const cms = cmsProductsWithImages[i];
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
          dimensions: '',
          moq: 0,
          image: cms.imageUrl,
          features: [],
        });
      }
    }

    return merged;
    
  } catch (err) {
    console.warn('Sanity fetch failed, using static data:', err);
    return staticProducts;
  }
}
