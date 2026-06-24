import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';

export default defineConfig({
  name: 'paulily-intl',
  title: 'PAULILY International CMS',
  projectId: '6at2dhek',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
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
  schema: {
    types: schemaTypes,
  },
});
