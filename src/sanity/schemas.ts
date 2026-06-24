// ═══════════════════════════════════════════
// PAULILY International — Sanity Schemas
// ═══════════════════════════════════════════

const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Product ID (slug)',
      type: 'slug',
      options: { source: 'nameEn' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Chinese Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'nameEn',
      title: 'English Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'series',
      title: 'Series (Chinese)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'seriesEn',
      title: 'Series (English)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'priceUnit',
      title: 'Price Unit',
      type: 'string',
      description: 'e.g. ¥3,800',
    },
    {
      name: 'priceRange',
      title: 'Price Range Display',
      type: 'string',
      description: 'e.g. From ¥3,800 / Unit',
    },
    {
      name: 'material',
      title: 'Material (Chinese)',
      type: 'string',
    },
    {
      name: 'materialEn',
      title: 'Material (English)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description (Chinese)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      description: 'e.g. 38 × 28 × 14 cm',
    },
    {
      name: 'moq',
      title: 'Minimum Order Quantity',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'features',
      title: 'Features (English)',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: {
      title: 'nameEn',
      subtitle: 'seriesEn',
      media: 'image',
    },
  },
};

const series = {
  name: 'series',
  title: 'Product Series',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Series ID (slug)',
      type: 'slug',
      options: { source: 'nameEn' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Chinese Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'nameEn',
      title: 'English Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description (Chinese)',
      type: 'text',
    },
    {
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'nameEn',
      subtitle: 'name',
    },
  },
};

const craftStep = {
  name: 'craftStep',
  title: 'Craftsmanship Step',
  type: 'document',
  fields: [
    {
      name: 'number',
      title: 'Step Number',
      type: 'string',
      description: 'e.g. 01, 02, 03',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Step Title (Chinese)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'titleEn',
      title: 'Step Title (English)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description (Chinese)',
      type: 'text',
      rows: 4,
    },
    {
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      rows: 4,
    },
    {
      name: 'image',
      title: 'Step Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  preview: {
    select: {
      title: 'titleEn',
      subtitle: 'number',
      media: 'image',
    },
  },
};

const brandContent = {
  name: 'brandContent',
  title: 'Brand Content',
  type: 'document',
  fields: [
    {
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          { title: 'Hero', value: 'hero' },
          { title: 'Collection Intro', value: 'collectionIntro' },
          { title: 'Heritage', value: 'heritage' },
          { title: 'Wholesale Benefits', value: 'wholesaleBenefits' },
          { title: 'Values', value: 'values' },
          { title: 'Quality Standards', value: 'qualityStandards' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
    },
    {
      name: 'titleZh',
      title: 'Title (Chinese)',
      type: 'string',
    },
    {
      name: 'subtitleEn',
      title: 'Subtitle / Accent (English)',
      type: 'string',
    },
    {
      name: 'bodyEn',
      title: 'Body Text (English)',
      type: 'text',
      rows: 5,
    },
    {
      name: 'bodyZh',
      title: 'Body Text (Chinese)',
      type: 'text',
      rows: 5,
    },
    {
      name: 'image',
      title: 'Section Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  preview: {
    select: {
      title: 'titleEn',
      subtitle: 'section',
    },
  },
};

const stat = {
  name: 'stat',
  title: 'Heritage Stat',
  type: 'document',
  fields: [
    {
      name: 'number',
      title: 'Number / Value',
      type: 'string',
      description: 'e.g. 47, 12+, 98%',
    },
    {
      name: 'label',
      title: 'Label (English)',
      type: 'string',
    },
    {
      name: 'labelZh',
      title: 'Label (Chinese)',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'number',
      subtitle: 'label',
    },
  },
};

const siteConfig = {
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'PAULILY — Crafted for the Discerning',
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'email',
      title: 'Wholesale Email',
      type: 'string',
      initialValue: 'wholesale@paulily.com',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Shanghai, China',
    },
    {
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
    },
    {
      name: 'catalogPdf',
      title: 'Product Catalog PDF',
      type: 'file',
    },
    {
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    },
    {
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};

export const schemaTypes = [product, series, craftStep, brandContent, stat, siteConfig];
