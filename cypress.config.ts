import { defineConfig } from 'cypress'

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
    baseUrl: 'http://localhost:4200',
  }
})