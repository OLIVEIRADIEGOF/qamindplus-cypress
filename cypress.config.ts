import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'uhh7cb',
  video: true,
  retries: 0,
  e2e: {
    baseUrl: 'https://qamindplus.com.br',
  },
})