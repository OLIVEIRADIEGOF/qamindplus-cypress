import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'uhh7cb',
  video: false,
  retries: {
    runMode: 1,
    openMode: 2,
  },
  e2e: {
    baseUrl: 'https://qamindplus.com.br'
  }
})