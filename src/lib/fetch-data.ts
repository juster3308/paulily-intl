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
 * 
 * Whatever you create in CMS = what shows on the website.
 * No name matching, no restrictions. You have full control.
 * 
 * - Returns [] if CMS is empty or fails (caller uses static fallback)
 * - Product ID = slug from CMS (used for detail page URL)
 * - Image URL generated from Sanity image asset
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
      return []; // Empty → caller will keep static fallback
    }

    const products: Product[] = [];

    for (const doc of results) {
      // Build image URL
      let imageUrl = '';
      let rawImage: any = undefined;

      try {
        if (doc.image && urlFor(doc.image)) {
          rawImage = doc.image;
          imageUrl = urlFor(doc.image).width(600).height(800).fit('crop').quality(90).url() || '';
        }
      } catch (imgErr) {
        console.warn('Failed to build image URL for', doc.nameEn, imgErr);
        imageUrl = '';
      }

      products.push({
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
        image: imageUrl,
        features: [],
        ...(rawImage ? { _rawImage: rawImage } : {}),
      });
    }

    return products;
  } catch (err) {
    console.warn('Sanity fetch failed:', err);
    return [];
  }
}
