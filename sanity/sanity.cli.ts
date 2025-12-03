import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '2b266qdi',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  studioHost: 'byfernandatovar.sanity.studio',
});

