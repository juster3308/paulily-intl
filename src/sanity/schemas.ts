// ═══════════════════════════════════════════
// PAULILY International — Sanity Schemas
// ═══════════════════════════════════════════

import { defineType, defineField } from 'sanity';

const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Chinese Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameEn',
      title: 'English Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nameEn' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'series',
      title: 'Series (Chinese)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seriesEn',
      title: 'Series (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range Display',
      type: 'string',
      description: 'e.g. From ¥3,800 / Unit',
    }),
    defineField({
      name: 'materialEn',
      title: 'Material (English)',
      type: 'string',
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      description: 'e.g. 38 × 28 × 14 cm',
    }),
    defineField({
      name: 'moq',
      title: 'Minimum Order Quantity',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'nameEn',
      subtitle: 'seriesEn',
      media: 'image',
    },
  },
});

const series = defineType({
  name: 'series',
  title: 'Product Series',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Chinese Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameEn',
      title: 'English Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nameEn' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'nameEn',
      subtitle: 'name',
    },
  },
});

const craftStep = defineType({
  name: 'craftStep',
  title: 'Craftsmanship Step',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Step Number',
      type: 'string',
      description: 'e.g. 01, 02, 03',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Step Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Step Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'titleEn',
      subtitle: 'number',
      media: 'image',
    },
  },
});

const brandContent = defineType({
  name: 'brandContent',
  title: 'Brand Content',
  type: 'document',
  fields: [
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          { title: 'Hero', value: 'hero' },
          { title: 'Collection Intro', value: 'collectionIntro' },
          { title: 'Heritage', value: 'heritage' },
          { title: 'Wholesale Benefits', value: 'wholesaleBenefits' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
    }),
    defineField({
      body: 'bodyEn',
      title: 'Body Text (English)',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'image',
      title: 'Section Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'titleEn',
      subtitle: 'section',
    },
  },
});

const stat = defineType({
  name: 'stat',
  title: 'Heritage Stat',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Number / Value',
      type: 'string',
      description: 'e.g. 47, 12+, 98%',
    }),
    defineField({
      name: 'label',
      title: 'Label (English)',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'number',
      subtitle: 'label',
    },
  },
});

const siteConfig = defineType({
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'PAULILY — Crafted for the Discerning',
    }),
    defineField({
      name: 'email',
      title: 'Wholesale Email',
      type: 'string',
      initialValue: 'wholesale@paulily.com',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Shanghai, China',
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
    }),
    defineField({
      name: 'catalogPdf',
      title: 'Product Catalog PDF',
      type: 'file',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});

export const schemaTypes = [product, series, craftStep, brandContent, stat, siteConfig];
