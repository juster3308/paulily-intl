import { sanityClient, urlFor } from './sanity';
import { Product } from './data';

// Sanity document types
interface SanityProduct {
  _id: string;
  name?: string;
  nameEn?: string;
  series?: string;
  seriesEn?: string;
  priceRangeDisplay?: string;
  material?: string;
  materialEn?: string;
  image?: any;
}

/**
 * Fetch products from Sanity and MERGE with static fallback data.
 * Matches by nameEn — if Sanity has a product, its image & data override the static version.
 * Products without a Sanity match keep their static data + SVG fallback.
 */
export async function fetchProductsWithImages(staticProducts: Product[]): Promise<Product[]> {
  try {
    const query = `*[_type == "product"] | order(nameEn asc) {
      _id,
      name,
      nameEn,
      series,
      seriesEn,
      priceRangeDisplay,
      material,
      materialEn,
      image
    }`;
    
    const results: SanityProduct[] = await sanityClient.fetch(query);
    
    if (!results || results.length === 0) {
      return staticProducts; // No Sanity data → pure static
    }
    
    // Build a lookup map from Sanity results (by nameEn)
    const sanityMap = new Map<string, SanityProduct>();
    for (const doc of results) {
      if (doc.nameEn) {
        sanityMap.set(doc.nameEn.toLowerCase(), doc);
      }
    }
    
    // Merge: for each static product, overlay Sanity data where available
    return staticProducts.map((sp) => {
      const sanityDoc = sanityMap.get(sp.nameEn.toLowerCase());
      if (!sanityDoc) {
        return sp; // No match → keep as-is (SVG fallback)
      }
      
      // Match found → overlay Sanity data (especially the real image!)
      return {
        ...sp,
        name: sanityDoc.name || sp.name,
        series: sanityDoc.series || sp.series,
        seriesEn: sanityDoc.seriesEn || sp.seriesEn,
        priceRange: sanityDoc.priceRangeDisplay || sp.priceRange,
        material: sanityDoc.material || sp.material,
        materialEn: sanityDoc.materialEn || sp.materialEn,
        image: sanityDoc.image ? urlFor(sanityDoc.image).url() : sp.image,
        // Attach raw image object for <img> tag rendering
        ...(sanityDoc.image ? { _rawImage: sanityDoc.image } : {}),
      };
    });
  } catch (err) {
    console.warn('Sanity fetch failed, using static data:', err);
    return staticProducts;
  }
}
