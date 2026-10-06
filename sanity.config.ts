'use client'

/**
 * Sanity Studio, embedded in the Next.js app at /studio.
 */
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {apiVersion, dataset, projectId} from './sanity/env'
import {schemaTypes} from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  title: 'iGUIDE',
  projectId,
  dataset,
  schema: {types: schemaTypes},
  plugins: [structureTool(), visionTool({defaultApiVersion: apiVersion})],
})
