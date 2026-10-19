'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema, singletonTypes} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import {lpLayouts} from './lib/landingPages/layouts'
import {studioTemplateValue} from './lib/landingPages/samples'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    ...schema,
    // Singletons can't be created from the "+" menu (they already exist at a fixed ID)
    // Landing pages start from a layout ("New landing page: Lead form", …) instead of an empty page
    templates: (templates) => [
      ...templates.filter(({schemaType}) => !singletonTypes.has(schemaType) && schemaType !== 'landingPage'),
      ...lpLayouts.map((layout) => ({
        id: `landingPage-${layout.id}`,
        title: `Landing page: ${layout.name}`,
        description: layout.bestFor,
        schemaType: 'landingPage',
        // Opened from a folder in the Studio, the new page goes into that folder
        parameters: [{name: 'folderId', type: 'string'}],
        value: ({folderId}: {folderId?: string} = {}) => ({
          ...studioTemplateValue(layout.id),
          ...(folderId ? {folder: {_type: 'reference', _ref: folderId}} : {}),
        }),
      })),
    ],
  },
  document: {
    // Singletons can't be duplicated or deleted
    actions: (actions, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
