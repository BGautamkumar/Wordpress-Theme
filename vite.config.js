import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        products: './pages/products.html',
        features: './pages/features.html',
        blog: './pages/blog.html',
        signin: './pages/signin.html',
        signup: './pages/signup.html',
        pricing: './pages/pricing.html',
        templates: './pages/templates.html'
      }
    }
  },
  server: {
    port: 3000
  }
})
