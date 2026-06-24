// ═══════════════════════════════════════════
// PAULILY International — Sanity Data Fetching
// ═══════════════════════════════════════════

import { client } from './sanity';
import { products as localProducts, seriesList as localSeries, craftSteps as localCraftSteps, heritageStats as localHeritageStats } from './data';
import type { Product, Series, CraftStep } from './data';

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

export async function getProducts(): Promise<Product[]> {
  try {
    const results: Product[] = await client.fetch(PRODUCT_QUERY);
    if (results && results.length > 0) return results;
  } catch (e) {
    // Silently fall back to local data
  }
  return localProducts;
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const result: Product = await client.fetch(SINGLE_PRODUCT_QUERY, { slug });
    if (result) return result;
  } catch (e) {
    // Silently fall back to local data
  }
  return localProducts.find((p) => p.id === slug) || null;
}

export async function getSeries(): Promise<Series[]> {
  try {
    const results: Series[] = await client.fetch(SERIES_QUERY);
    if (results && results.length > 0) return results;
  } catch (e) {
    // Silently fall back to local data
  }
  return localSeries;
}

export async function getCraftSteps(): Promise<CraftStep[]> {
  try {
    const results: CraftStep[] = await client.fetch(CRAFT_STEP_QUERY);
    if (results && results.length > 0) return results;
  } catch (e) {
    // Silently fall back to local data
  }
  return localCraftSteps;
}

export async function getHeritageStats() {
  try {
    const stats = await client.fetch(STAT_QUERY);
    if (stats && stats.length > 0) return stats;
  } catch (e) {
    // Silently fall back to local data
  }
  return localHeritageStats;
}
