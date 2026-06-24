'use client';

import { NextStudio } from 'next-sanity/studio';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

const config = defineConfig({
  name: 'paulily-intl',
  title: 'PAULILY CMS',
  projectId: '6at2dhek',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [
      {
        name: 'product',
        type: 'document',
        title: 'Product',
        fields: [
          { name: 'name', title: 'Chinese Name', type: 'string' },
          { name: 'nameEn', title: 'English Name', type: 'string' },
          { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'nameEn' } },
          { name: 'series', title: 'Series (Chinese)', type: 'string' },
          { name: 'seriesEn', title: 'Series (English)', type: 'string' },
          { name: 'priceRange', title: 'Price Range Display', type: 'string' },
          { name: 'image', title: 'Product Image', type: 'image' },
        ],
      },
      {
        name: 'series',
        type: 'document',
        title: 'Product Series',
        fields: [
          { name: 'name', title: 'Chinese Name', type: 'string' },
          { name: 'nameEn', title: 'English Name', type: 'string' },
        ],
      },
      {
        name: 'craftStep',
        type: 'document',
        title: 'Craftsmanship Step',
        fields: [
          { name: 'number', title: 'Step Number', type: 'string' },
          { name: 'titleEn', title: 'Title (EN)', type: 'string' },
          { name: 'descriptionEn', title: 'Description (EN)', type: 'text' },
        ],
      },
      {
        name: 'brandContent',
        type: 'document',
        title: 'Brand Content',
        fields: [
          { name: 'section', title: 'Section ID', type: 'string' },
          { name: 'titleEn', title: 'Title (EN)', type: 'string' },
          { name: 'bodyEn', title: 'Body Text (EN)', type: 'text' },
        ],
      },
      {
        name: 'stat',
        type: 'document',
        title: 'Heritage Stat',
        fields: [
          { name: 'number', title: 'Value', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' },
        ],
      },
      {
        name: 'siteConfig',
        type: 'document',
        title: 'Site Configuration',
        fields: [
          { name: 'title', title: 'Site Title', type: 'string' },
          { name: 'email', title: 'Email', type: 'string' },
          { name: 'phone', title: 'Phone', type: 'string' },
          { name: 'location', title: 'Location', type: 'string' },
        ],
      },
    ],
  },
});

export default function StudioPage() {
  return <NextStudio config={config} />;
}
