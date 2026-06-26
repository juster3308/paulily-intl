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
 * Hybrid strategy: Static products as baseline + Sanity overlay
 * 
 * 1. Static products ALWAYS show (site never looks empty)
 * 2. Sanity data overlays matching products (by nameEn, slug, or position)
 * 3. Any EXTRA Sanity products (not matching any static) are appended
 * 
 * This way the user can freely rename products in CMS —
 * matching is flexible: tries nameEn first, then slug, then position index.
 */
export async function fetchProductsWithImages(staticProducts: Product[]): Promise<Product[]> {
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
      return staticProducts; // No Sanity data → show all static products
    }
    
    // Build the merged product list
    const merged: Product[] = staticProducts.map((staticP, index) => {
      // Try to find a matching Sanity product (flexible matching)
      const sanityMatch = results.find(s => {
        // Match by nameEn (exact)
        if (s.nameEn && staticP.nameEn && s.nameEn === staticP.nameEn) return true;
        // Match by nameEn (case-insensitive, ignore slashes)
        if (s.nameEn && staticP.nameEn) {
          const normalize = (str: string) => str.toLowerCase().replace(/[\/\s\-]/g, '');
          if (normalize(s.nameEn) === normalize(staticP.nameEn)) return true;
        }
        // Match by slug matching static product id
        if (s.slug?.current === staticP.id) return true;
        return false;
      });
      
      // If no name/slug match, try position-based match (first Sanity product → first static product)
      // Only if there aren't enough Sanity products to match all static ones by name
      const positionMatch = !sanityMatch && index < results.length 
        ? results[index] 
        : null;
      
      const overlay = sanityMatch || positionMatch;
      
      if (overlay) {
        // Overlay Sanity data onto static product
        return {
          ...staticP,
          name: overlay.name || staticP.name,
          nameEn: overlay.nameEn || staticP.nameEn,
          series: overlay.series || staticP.series,
          seriesEn: overlay.seriesEn || staticP.seriesEn,
          priceRange: overlay.priceRange || staticP.priceRange,
          material: overlay.material || staticP.material,
          materialEn: overlay.materialEn || staticP.materialEn,
          descriptionEn: overlay.descriptionEn || staticP.descriptionEn,
          // Image: use Sanity real image if available, otherwise keep static
          ...(overlay.image ? { 
            image: urlFor(overlay.image).url(),
            _rawImage: overlay.image 
          } : {}),
        };
      }
      
      // No match → keep static product unchanged
      return staticP;
    });
    
    // Append any EXTRA Sanity products that didn't match any static product
    const matchedIds = new Set(
      results
        .filter(s => 
          merged.some(m => m.nameEn === s.nameEn) ||
          merged.some(m => m.id === s.slug?.current)
        )
        .map(s => s._id)
    );
    
    const extraProducts: Product[] = results
      .filter(s => !matchedIds.has(s._id) && !merged.some(m => m._rawImage && m.nameEn === s.nameEn))
      .map(s => ({
        id: s.slug?.current || s._id.replace('product-', '').replace('drafts.', ''),
        name: s.name || '',
        nameEn: s.nameEn || '',
        series: s.series || '',
        seriesEn: s.seriesEn || '',
        priceUnit: '',
        priceRange: s.priceRange || '',
        material: s.material || '',
        materialEn: s.materialEn || '',
        description: '',
        descriptionEn: s.descriptionEn || '',
        dimensions: '',
        moq: 0,
        image: s.image ? urlFor(s.image).url() : '',
        features: [],
        ...(s.image ? { _rawImage: s.image } : {}),
      }));
    
    return [...merged, ...extraProducts];
    
  } catch (err) {
    console.warn('Sanity fetch failed, using static data:', err);
    return staticProducts;
  }
}

/**
 * Pure CMS mode: Fetch ALL products from Sanity only.
 * Use this if you want complete control from CMS with no static fallback.
 */
export async function fetchProducts(): Promise<Product[]> {
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
      return [];
    }
    
    return results.map((doc) => ({
      id: doc.slug?.current || doc._id.replace('product-', '').replace('drafts.', ''),
      name: doc.name || '',
      nameEn: doc.nameEn || '',
      series: doc.series || '',
      seriesEn: doc.seriesEn || '',
      priceUnit: '',
      priceRange: doc.priceRange || '',
      material: doc.material || '',
      materialEn: doc.materialEn || '',
      description: '',
      descriptionEn: doc.descriptionEn || '',
      dimensions: '',
      moq: 0,
      image: doc.image ? urlFor(doc.image).url() : '',
      features: [],
      ...(doc.image ? { _rawImage: doc.image } : {}),
    }));
  } catch (err) {
    console.warn('Sanity fetch failed:', err);
    return [];
  }
}
