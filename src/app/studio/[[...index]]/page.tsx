'use client';

import { NextStudio } from 'next-sanity/studio';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { defineType, defineField } from 'sanity';

// ─── Schemas (inline) ──────────────────────
const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Chinese Name', type: 'string', validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'nameEn', title: 'English Name', type: 'string', validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'nameEn' }, validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'series', title: 'Series (Chinese)', type: 'string' }),
    defineField({ name: 'seriesEn', title: 'Series (English)', type: 'string' }),
    defineField({ name: 'priceRange', title: 'Price Range Display', type: 'string' }),
    defineField({ name: 'materialEn', title: 'Material', type: 'string' }),
    defineField({ name: 'descriptionEn', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true } }),
  ],
});

const series = defineType({
  name: 'series',
  title: 'Product Series',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Chinese Name', type: 'string', validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'nameEn', title: 'English Name', type: 'string', validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'descriptionEn', title: 'Description', type: 'text' }),
  ],
});

const craftStep = defineType({
  name: 'craftStep',
  title: 'Craftsmanship Step',
  type: 'document',
  fields: [
    defineField({ name: 'number', title: 'Step Number', type: 'string' }),
    defineField({ name: 'titleEn', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() }),
    defineField({ name: 'descriptionEn', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Image', type: 'image' }),
  ],
});

const brandContent = defineType({
  name: 'brandContent',
  title: 'Brand Content',
  type: 'document',
  fields: [
    defineField({ name: 'section', title: 'Section', type: 'string' }),
    defineField({ name: 'titleEn', title: 'Title', type: 'string' }),
    defineField({ name: 'bodyEn', title: 'Body Text', type: 'text' }),
  ],
});

const stat = defineType({
  name: 'stat',
  title: 'Heritage Stat',
  type: 'document',
  fields: [
    defineField({ name: 'number', title: 'Value', type: 'string' }),
    defineField({ name: 'label', title: 'Label', type: 'string' }),
  ],
});

const siteConfig = defineType({
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Site Title', type: 'string', initialValue: 'PAULILY — Crafted for the Discerning' }),
    defineField({ name: 'email', title: 'Email', type: 'string', initialValue: 'wholesale@paulily.com' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string', initialValue: 'Shanghai, China' }),
  ],
});

const schemaTypes = [product, series, craftStep, brandContent, stat, siteConfig];

// ─── Config (inline) ───────────────────────
const config = defineConfig({
  name: 'paulily-intl',
  title: 'PAULILY CMS',
  projectId: '6at2dhek',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S: any) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('product').title('Products'),
            S.divider(),
            S.documentTypeListItem('series').title('Product Series'),
            S.documentTypeListItem('craftStep').title('Craftsmanship Steps'),
            S.divider(),
            S.documentTypeListItem('brandContent').title('Brand Content'),
            S.documentTypeListItem('stat').title('Heritage Stats'),
            S.divider(),
            S.documentTypeListItem('siteConfig').title('Site Configuration'),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});

// ─── Page Component ────────────────────────
export default function StudioPage() {
  return <NextStudio config={config} />;
}
