'use client';

import { NextStudio } from 'next-sanity/studio';
import { defineConfig } from 'sanity';
import { defineType, defineField } from 'sanity';
import { structureTool } from 'sanity/structure';

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
            S.documentTypeListItem('product'),
            S.documentTypeListItem('series'),
            S.documentTypeListItem('craftStep'),
            S.documentTypeListItem('brandContent'),
            S.documentTypeListItem('stat'),
            S.documentTypeListItem('siteConfig'),
          ]),
    }),
  ],
  schema: {
    types: [
      defineType({
        name: 'product',
        type: 'document',
        title: 'Product',
        fields: [
          defineField({ name: 'name', title: 'Chinese Name', type: 'string' }),
          defineField({ name: 'nameEn', title: 'English Name', type: 'string' }),
          defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'nameEn' } }),
          defineField({ name: 'series', title: 'Series (Chinese)', type: 'string' }),
          defineField({ name: 'seriesEn', title: 'Series (English)', type: 'string' }),
          defineField({ name: 'priceRange', title: 'Price Range', type: 'string' }),
          defineField({ name: 'image', title: 'Image', type: 'image' }),
        ],
      }),

      defineType({
        name: 'series',
        type: 'document',
        title: 'Product Series',
        fields: [
          defineField({ name: 'name', title: 'Chinese Name', type: 'string' }),
          defineField({ name: 'nameEn', title: 'English Name', type: 'string' }),
        ],
      }),

      defineType({
        name: 'craftStep',
        type: 'document',
        title: 'Craftsmanship Step',
        fields: [
          defineField({ name: 'number', title: 'Step Number', type: 'string' }),
          defineField({ name: 'titleEn', title: 'Title', type: 'string' }),
          defineField({ name: 'descriptionEn', title: 'Description', type: 'text' }),
        ],
      }),

      defineType({
        name: 'brandContent',
        type: 'document',
        title: 'Brand Content',
        fields: [
          defineField({ name: 'section', title: 'Section', type: 'string' }),
          defineField({ name: 'titleEn', title: 'Title', type: 'string' }),
          defineField({ name: 'bodyEn', title: 'Body Text', type: 'text' }),
        ],
      }),

      defineType({
        name: 'stat',
        type: 'document',
        title: 'Heritage Stat',
        fields: [
          defineField({ name: 'number', title: 'Value', type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'string' }),
        ],
      }),

      defineType({
        name: 'siteConfig',
        type: 'document',
        title: 'Site Configuration',
        fields: [
          defineField({ name: 'title', title: 'Site Title', type: 'string' }),
          defineField({ name: 'email', title: 'Email', type: 'string' }),
          defineField({ name: 'phone', title: 'Phone', type: 'string' }),
          defineField({ name: 'location', title: 'Location', type: 'string' }),
        ],
      }),
    ],
  },
});

export default function StudioPage() {
  return <NextStudio config={config} />;
}
