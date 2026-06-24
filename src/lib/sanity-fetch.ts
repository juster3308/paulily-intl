// ═══════════════════════════════════════════
// PAULILY International — Sanity Data Fetching
// Fetches content from Sanity CMS, falls back to local data
// ═══════════════════════════════════════════

import { client, urlFor } from './sanity';
import { products as localProducts, seriesList as localSeries, craftSteps as localCraftSteps, heritageStats as localHeritageStats } from './data';

// ─── Product Queries ───

const PRODUCT_QUERY = `*[_type == "product"] | order(nameEn asc) {
  "id": id.current,
  name, nameEn, series, seriesEn,
  priceUnit, priceRange,
  material, materialEn,
  description, descriptionEn,
  dimensions, moq,
  "image": image.asset->url,
  features
}`;

const SINGLE_PRODUCT_QUERY = `*[_type == "product" && id.current == $slug][0] {
  "id": id.current,
  name, nameEn, series, seriesEn,
  priceUnit, priceRange,
  material, materialEn,
  description, descriptionEn,
  dimensions, moq,
  "image": image.asset->url,
  features
}`;

const SERIES_QUERY = `*[_type == "series"] | order(nameEn asc) {
  "id": id.current,
  name, nameEn,
  description, descriptionEn
}`;

const CRAFT_STEP_QUERY = `*[_type == "craftStep"] | order(number asc) {
  number, title, titleEn,
  description, descriptionEn,
  "image": image.asset->url
}`;

const STAT_QUERY = `*[_type == "stat"] | order(number asc) {
  number, label, labelZh
}`;

const BRAND_CONTENT_QUERY = `*[_type == "brandContent" && section == $section][0] {
  section,
  titleEn, titleZh,
  subtitleEn,
  bodyEn, bodyZh,
  "image": image.asset->url
}`;

const SITE_CONFIG_QUERY = `*[_type == "siteConfig"][0] {
  title, description,
  email, phone, location,
  "logo": logo.asset->url,
  "catalogPdf": catalogPdf.asset->url,
  instagramUrl, linkedinUrl
}`;

// ─── Fetch Functions (with local fallback) ───

export async function getProducts() {
  try {
    const sanityProducts = await client.fetch(PRODUCT_QUERY);
    if (sanityProducts && sanityProducts.length > 0) {
      return sanityProducts.map((p: any) => ({
        ...p,
        image: p.image || `/images/${p.id}.jpg`,
      }));
    }
  } catch (e) {
    console.warn('Sanity fetch failed, using local data:', e);
  }
  return localProducts;
}

export async function getProduct(slug: string) {
  try {
    const product = await client.fetch(SINGLE_PRODUCT_QUERY, { slug });
    if (product) {
      return {
        ...product,
        image: product.image || `/images/${product.id}.jpg`,
      };
    }
  } catch (e) {
    console.warn('Sanity fetch failed, using local data:', e);
  }
  return localProducts.find(p => p.id === slug) || null;
}

export async function getSeries() {
  try {
    const sanitySeries = await client.fetch(SERIES_QUERY);
    if (sanitySeries && sanitySeries.length > 0) return sanitySeries;
  } catch (e) {
    console.warn('Sanity fetch failed, using local data:', e);
  }
  return localSeries;
}

export async function getCraftSteps() {
  try {
    const steps = await client.fetch(CRAFT_STEP_QUERY);
    if (steps && steps.length > 0) return steps;
  } catch (e) {
    console.warn('Sanity fetch failed, using local data:', e);
  }
  return localCraftSteps;
}

export async function getHeritageStats() {
  try {
    const stats = await client.fetch(STAT_QUERY);
    if (stats && stats.length > 0) {
      return stats.map((s: any) => ({
        number: s.number,
        label: s.label,
        labelZh: s.labelZh,
      }));
    }
  } catch (e) {
    console.warn('Sanity fetch failed, using local data:', e);
  }
  return localHeritageStats;
}

export async function getBrandContent(section: string) {
  try {
    const content = await client.fetch(BRAND_CONTENT_QUERY, { section });
    if (content) return content;
  } catch (e) {
    console.warn('Sanity fetch failed for section:', section, e);
  }
  return null;
}

export async function getSiteConfig() {
  try {
    const config = await client.fetch(SITE_CONFIG_QUERY);
    if (config) return config;
  } catch (e) {
    console.warn('Sanity fetch failed for site config:', e);
  }
  return {
    title: 'PAULILY — Crafted for the Discerning',
    description: 'Where Eastern artistry meets uncompromising quality.',
    email: 'wholesale@paulily.com',
    phone: '+86 21 6888 XXXX',
    location: 'Shanghai, China',
    instagramUrl: '',
    linkedinUrl: '',
  };
}
