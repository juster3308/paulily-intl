import { sanityClient, urlFor } from './sanity';
import { Product, Series, CraftStep } from './data';

// Sanity document types (matching the schema)
interface SanityProduct {
  _id: string;
  name?: string;
  nameEn?: string;
  series?: string;
  seriesEn?: string;
  priceRangeDisplay?: string;
  material?: string;
  materialEn?: string;
  image?: any; // Sanity image object
}

export async function fetchProducts(): Promise<Product[]> {
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
      return null; // Signal to use fallback
    }
    
    return results.map((doc) => ({
      id: doc._id.replace('product-', ''),
      name: doc.name || '',
      nameEn: doc.nameEn || '',
      series: doc.series || '',
      seriesEn: doc.seriesEn || '',
      priceUnit: '',
      priceRange: doc.priceRangeDisplay || '',
      material: doc.material || '',
      materialEn: doc.materialEn || '',
      description: '',
      descriptionEn: '',
      dimensions: '',
      moq: 0,
      image: doc.image ? urlFor(doc.image).url() : '',
      features: [],
      // Keep the raw image for <img> tag rendering
      _rawImage: doc.image || null,
    }));
  } catch (err) {
    console.warn('Sanity fetch failed, using static data:', err);
    return null;
  }
}
