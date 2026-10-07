import { defineConfig } from 'cypress'

const BASE_URL = process.env.CYPRESS_BASE_URL

export default defineConfig({
  projectId: 'uhh7cb',
  video: false,
  retries: {
    runMode: 1,
    openMode: 2,
  },
  expose: {
    apiVersion: 'v1',
    featureFlag: true
  },
  e2e: {
    baseUrl: BASE_URL,
  }
})