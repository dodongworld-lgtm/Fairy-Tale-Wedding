import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    alias: {
      '../lib/prisma': path.resolve(__dirname, 'src/__mocks__/prisma.ts'),
      '../../lib/prisma': path.resolve(__dirname, 'src/__mocks__/prisma.ts'),
      '../lib/geminiClient': path.resolve(__dirname, 'src/__mocks__/geminiClient.ts'),
      '../../lib/geminiClient': path.resolve(__dirname, 'src/__mocks__/geminiClient.ts')
    }
  },
  resolve: {
    alias: {
      '../lib/prisma': path.resolve(__dirname, 'src/__mocks__/prisma.ts'),
      '../../lib/prisma': path.resolve(__dirname, 'src/__mocks__/prisma.ts'),
      '../lib/geminiClient': path.resolve(__dirname, 'src/__mocks__/geminiClient.ts'),
      '../../lib/geminiClient': path.resolve(__dirname, 'src/__mocks__/geminiClient.ts')
    }
  }
})
