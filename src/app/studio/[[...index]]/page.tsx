'use client';

import { NextStudio } from 'next-sanity/studio';
import { defineConfig } from 'sanity';

const config = defineConfig({
  name: 'paulily-intl',
  title: 'PAULILY CMS',
  projectId: '6at2dhek',
  dataset: 'production',
  basePath: '/studio',
  schema: {
    types: [
      {
        name: 'product',
        title: 'Product',
        type: 'document',
        fields: [
          { name: 'name', title: 'Chinese Name', type: 'string' },
          { name: 'nameEn', title: 'English Name', type: 'string' },
          { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'nameEn' } },
          { name: 'series', title: 'Series (Chinese)', type: 'string' },
          { name: 'seriesEn', title: 'Series (English)', type: 'string' },
          { name: 'priceRange', title: 'Price Range', type: 'string' },
          { name: 'materialEn', title: 'Material', type: 'string' },
          { name: 'descriptionEn', title: 'Description', type: 'text' },
          { name: 'image', title: 'Image', type: 'image' },
        ],
      },
      {
        name: 'series',
        title: 'Product Series',
        type: 'document',
        fields: [
          { name: 'name', title: 'Chinese Name', type: 'string' },
          { name: 'nameEn', title: 'English Name', type: 'string' },
          { name: 'descriptionEn', title: 'Description', type: 'text' },
        ],
      },
      {
        name: 'craftStep',
        title: 'Craftsmanship Step',
        type: 'document',
        fields: [
          { name: 'number', title: 'Step Number', type: 'string' },
          { name: 'titleEn', title: 'Title', type: 'string' },
          { name: 'descriptionEn', title: 'Description', type: 'text' },
          { name: 'image', title: 'Image', type: 'image' },
        ],
      },
      {
        name: 'brandContent',
        title: 'Brand Content',
        type: 'document',
        fields: [
          { name: 'section', title: 'Section', type: 'string' },
          { name: 'titleEn', title: 'Title', type: 'string' },
          { name: 'bodyEn', title: 'Body Text', type: 'text' },
        ],
      },
      {
        name: 'stat',
        title: 'Heritage Stat',
        type: 'document',
        fields: [
          { name: 'number', title: 'Value', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' },
        ],
      },
      {
        name: 'siteConfig',
        title: 'Site Configuration',
        type: 'document',
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
