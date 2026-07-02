import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6at2dhek';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
// Default to live API (not CDN) so CMS edits appear immediately.
// Set NEXT_PUBLIC_SANITY_USE_CDN=true in production if you prefer CDN caching.
const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
