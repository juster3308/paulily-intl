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
 * Fetch ALL products from Sanity CMS.
 * CMS is the single source of truth — whatever you create/edit in the CMS
 * will show up on the front end. No hardcoded product list.
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const query = `*[_type == "product"] | order(nameEn asc) {
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
      return []; // No products in CMS yet → show empty state
    }
    
    // Convert Sanity documents to front-end Product format
    return results.map((doc) => ({
      id: doc.slug?.current || doc._id.replace('product-', ''),
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
      // Raw image for <img> tag rendering
      ...(doc.image ? { _rawImage: doc.image } : {}),
    }));
  } catch (err) {
    console.warn('Sanity fetch failed:', err);
    return [];
  }
}
