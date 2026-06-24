import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';

export default defineConfig({
  name: 'paulily-intl',
  title: 'PAULILY International CMS',
  projectId: '6at2dhek',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
